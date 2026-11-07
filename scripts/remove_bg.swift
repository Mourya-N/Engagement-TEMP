import Foundation
import Vision
import CoreImage
import CoreGraphics

guard CommandLine.arguments.count > 2 else {
    print("Usage: remove_bg <input> <output>")
    exit(1)
}

let inputPath = CommandLine.arguments[1]
let outputPath = CommandLine.arguments[2]

let inputURL = URL(fileURLWithPath: inputPath)
guard let inputImage = CIImage(contentsOf: inputURL) else {
    print("Failed to load input image")
    exit(1)
}

let request = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: inputImage, options: [:])

do {
    try handler.perform([request])
    guard let result = request.results?.first else {
        print("No foreground found")
        exit(1)
    }
    
    let maskBuffer = try result.generateMaskedImage(
        ofInstances: result.allInstances,
        from: handler,
        croppedToInstancesExtent: false
    )
    
    let outputCI = CIImage(cvPixelBuffer: maskBuffer)
    let context = CIContext(options: nil)
    guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB) else {
        print("Failed to get color space")
        exit(1)
    }
    
    let outputURL = URL(fileURLWithPath: outputPath)
    try context.writePNGRepresentation(of: outputCI, to: outputURL, format: .RGBA8, colorSpace: colorSpace)
    print("SUCCESS: saved to \(outputPath)")
} catch {
    print("Error: \(error)")
    exit(1)
}

