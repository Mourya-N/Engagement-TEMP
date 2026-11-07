import Foundation
import CoreImage
import CoreGraphics
import ImageIO

guard let heroCI = CIImage(contentsOf: URL(fileURLWithPath: "/Users/mouuuryan/Desktop/Engagement-kavana/public/images/couple-hero.jpg")) else {
    exit(1)
}

let context = CIContext()
guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB) else { exit(1) }

// In CoreImage, (0,0) is bottom-left!
// Height is 2500.
// Kavana's head in CI coordinates:
// x: 380, width: 680
// y from bottom: 2500 - 1350 = 1150, height: 750
let kavanaRect = CGRect(x: 380, y: 1200, width: 700, height: 750)
let kavanaCrop = heroCI.cropped(to: kavanaRect).transformed(by: CGAffineTransform(translationX: -380, y: -1200))
try context.writeJPEGRepresentation(of: kavanaCrop,
                                    to: URL(fileURLWithPath: "/Users/mouuuryan/Desktop/Engagement-kavana/public/images/kavana-portrait.jpg"),
                                    colorSpace: colorSpace,
                                    options: [:])

// Sweekar's head in CI coordinates:
let sweekarRect = CGRect(x: 1040, y: 1250, width: 700, height: 750)
let sweekarCrop = heroCI.cropped(to: sweekarRect).transformed(by: CGAffineTransform(translationX: -1040, y: -1250))
try context.writeJPEGRepresentation(of: sweekarCrop,
                                    to: URL(fileURLWithPath: "/Users/mouuuryan/Desktop/Engagement-kavana/public/images/sweekar-portrait.jpg"),
                                    colorSpace: colorSpace,
                                    options: [:])

print("SUCCESS: Cropped individual portraits")
