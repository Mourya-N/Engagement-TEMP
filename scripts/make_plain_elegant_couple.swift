import Foundation
import CoreImage
import CoreGraphics
import AppKit
import ImageIO

let context = CIContext(options: [.useSoftwareRenderer: false])
guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB) else { exit(1) }

let targetWidth: CGFloat = 2000
let targetHeight: CGFloat = 2500
let targetRect = CGRect(x: 0, y: 0, width: targetWidth, height: targetHeight)

guard let coupleCutout = CIImage(contentsOf: URL(fileURLWithPath: "/tmp/couple-cutout-hd.png")) else {
    print("Could not load couple-cutout-hd.png")
    exit(1)
}

// 1. Generate Plain Elegant Royal Studio Background
// Soft radial gradient: radiant champagne ivory glow in center -> rich royal warm gold tone -> subtle royal burgundy warmth at edges
let center = CIVector(x: targetWidth * 0.5, y: targetHeight * 0.58)
let royalBG = CIFilter(name: "CIRadialGradient", parameters: [
    "inputCenter": center,
    "inputRadius0": NSNumber(value: 200),
    "inputRadius1": NSNumber(value: 1500),
    "inputColor0": CIColor(red: 0.99, green: 0.98, blue: 0.95, alpha: 1.0), // #FDFBF7 bright luminous ivory
    "inputColor1": CIColor(red: 0.89, green: 0.80, blue: 0.68, alpha: 1.0)  // #E3CCA9 warm royal champagne gold
])!.outputImage!.cropped(to: targetRect)

// Subtle royal burgundy corner vignette to frame the couple
let vignetteCenter = CIVector(x: targetWidth * 0.5, y: targetHeight * 0.5)
let vignette = CIFilter(name: "CIRadialGradient", parameters: [
    "inputCenter": vignetteCenter,
    "inputRadius0": NSNumber(value: 800),
    "inputRadius1": NSNumber(value: 1700),
    "inputColor0": CIColor(red: 0, green: 0, blue: 0, alpha: 0.0),
    "inputColor1": CIColor(red: 0.38, green: 0.12, blue: 0.17, alpha: 0.16) // soft royal burgundy tint at far corners
])!.outputImage!.cropped(to: targetRect)

let elegantBG = vignette.applyingFilter("CISourceOverCompositing", parameters: [
    "inputBackgroundImage": royalBG
])

// 2. Position the Couple
let extent = coupleCutout.extent
let coupleTargetHeight = targetHeight * 0.88
let scale = coupleTargetHeight / extent.height
let scaled = coupleCutout.transformed(by: CGAffineTransform(scaleX: scale, y: scale))

let posX = (targetWidth - scaled.extent.width) * 0.5
let posY: CGFloat = 0.0 // Ground level
let positioned = scaled.transformed(by: CGAffineTransform(translationX: -scaled.extent.origin.x + posX,
                                                             y: -scaled.extent.origin.y + posY))

// 3. Realistic soft ambient contact & cast shadow
let shadowMask = positioned.applyingFilter("CIColorMatrix", parameters: [
    "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 0),
    "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 0),
    "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 0),
    "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 0.28)
])
let blurredShadow = shadowMask.applyingFilter("CIGaussianBlur", parameters: [
    "inputRadius": 28.0
]).cropped(to: targetRect)

// 4. Warm ambient color calibration
let warmCouple = positioned.applyingFilter("CITemperatureAndTint", parameters: [
    "inputNeutral": CIVector(x: 6500, y: 0),
    "inputTargetNeutral": CIVector(x: 6300, y: 0)
])

// 5. Composite: ElegantBG -> Shadow -> WarmCouple
let withShadow = blurredShadow.applyingFilter("CISourceOverCompositing", parameters: [
    "inputBackgroundImage": elegantBG
])
let finalComposite = warmCouple.applyingFilter("CISourceOverCompositing", parameters: [
    "inputBackgroundImage": withShadow
]).cropped(to: targetRect)

try! context.writeJPEGRepresentation(of: finalComposite,
                                     to: URL(fileURLWithPath: "/Users/mouuuryan/Desktop/Engagement-kavana/public/images/couple-hero.jpg"),
                                     colorSpace: colorSpace,
                                     options: [:])

print("SUCCESS: couple-hero.jpg with plain elegant royal background generated")
