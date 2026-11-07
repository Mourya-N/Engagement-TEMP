import Foundation
import CoreImage
import CoreImage.CIFilterBuiltins
import CoreGraphics
import AppKit
import ImageIO

guard CommandLine.arguments.count > 3 else {
    print("Usage: composite_portrait <cutout_png> <background_img> <output_jpg/png>")
    exit(1)
}

let cutoutPath = CommandLine.arguments[1]
let bgPath = CommandLine.arguments[2]
let outputPath = CommandLine.arguments[3]

guard let cutoutCI = CIImage(contentsOf: URL(fileURLWithPath: cutoutPath)) else {
    print("Failed to load cutout")
    exit(1)
}

guard let bgCI = CIImage(contentsOf: URL(fileURLWithPath: bgPath)) else {
    print("Failed to load background")
    exit(1)
}

// Target output dimensions (4:5 aspect ratio, e.g. 2000 x 2500)
let targetWidth: CGFloat = 2000
let targetHeight: CGFloat = 2500
let targetRect = CGRect(x: 0, y: 0, width: targetWidth, height: targetHeight)

// 1. Scale and Crop Background to fill targetRect
let bgExtent = bgCI.extent
let scaleX = targetWidth / bgExtent.width
let scaleY = targetHeight / bgExtent.height
let bgScale = max(scaleX, scaleY)

let scaledBG = bgCI.transformed(by: CGAffineTransform(scaleX: bgScale, y: bgScale))
let bgCropX = (scaledBG.extent.width - targetWidth) / 2.0
let bgCropY = (scaledBG.extent.height - targetHeight) / 2.0
let croppedBG = scaledBG.cropped(to: CGRect(x: scaledBG.extent.origin.x + bgCropX,
                                            y: scaledBG.extent.origin.y + bgCropY,
                                            width: targetWidth,
                                            height: targetHeight))
                        .transformed(by: CGAffineTransform(translationX: -scaledBG.extent.origin.x - bgCropX,
                                                              y: -scaledBG.extent.origin.y - bgCropY))

// Apply subtle optical bokeh/depth-of-field to background (radius: 4.0) so couple pops out
let bokehBG = croppedBG.applyingFilter("CIGaussianBlur", parameters: [
    "inputRadius": 4.0
]).cropped(to: targetRect)

// 2. Position the Couple Cutout
// Optimal framing: heads comfortably below the arch & chandelier (leaving ~15% headroom)
let cutoutExtent = cutoutCI.extent
let coupleTargetHeight = targetHeight * 0.85
let coupleScale = coupleTargetHeight / cutoutExtent.height
let scaledCutout = cutoutCI.transformed(by: CGAffineTransform(scaleX: coupleScale, y: coupleScale))

let coupleWidth = scaledCutout.extent.width
let coupleX = (targetWidth - coupleWidth) / 2.0
let coupleY: CGFloat = 0.0

let positionedCutout = scaledCutout.transformed(by: CGAffineTransform(translationX: -scaledCutout.extent.origin.x + coupleX,
                                                                        y: -scaledCutout.extent.origin.y + coupleY))

// 3. Create a soft ambient contact shadow behind couple
let shadowMask = positionedCutout.applyingFilter("CIColorMatrix", parameters: [
    "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 0),
    "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 0),
    "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 0),
    "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 0.35)
])
let blurredShadow = shadowMask.applyingFilter("CIGaussianBlur", parameters: [
    "inputRadius": 30.0
]).cropped(to: targetRect)

// 4. Subtle warm color balance adjustment on couple to blend with royal warm palace lighting
let warmCouple = positionedCutout.applyingFilter("CITemperatureAndTint", parameters: [
    "inputNeutral": CIVector(x: 6500, y: 0),
    "inputTargetNeutral": CIVector(x: 6250, y: 0) // natural golden warmth
])

// 5. Composite: BokehBG -> Shadow -> Couple
let withShadow = blurredShadow.applyingFilter("CISourceOverCompositing", parameters: [
    "inputBackgroundImage": bokehBG
])
let finalComposite = warmCouple.applyingFilter("CISourceOverCompositing", parameters: [
    "inputBackgroundImage": withShadow
]).cropped(to: targetRect)

// 6. Write output as high quality JPEG
let context = CIContext(options: [.useSoftwareRenderer: false])
guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB) else { exit(1) }

let outURL = URL(fileURLWithPath: outputPath)
do {
    try context.writeJPEGRepresentation(of: finalComposite,
                                        to: outURL,
                                        colorSpace: colorSpace,
                                        options: [:])
    print("SUCCESS: Composite created at \(outputPath)")
} catch {
    print("Error: \(error)")
    exit(1)
}
