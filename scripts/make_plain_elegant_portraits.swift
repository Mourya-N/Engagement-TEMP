import Foundation
import CoreImage
import CoreGraphics
import AppKit
import ImageIO

let context = CIContext(options: [.useSoftwareRenderer: false])
guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB) else { exit(1) }

// Size for individual card portraits (e.g. 1200 x 1200 square or 1200 x 1400)
let portraitSize = CGSize(width: 1200, height: 1200)
let portraitRect = CGRect(origin: .zero, size: portraitSize)

// Function to generate plain elegant royal background
func createPlainRoyalBackground(width: CGFloat, height: CGFloat, centerGlow: CIColor, edgeColor: CIColor) -> CIImage {
    // Radial gradient from bright soft ivory/champagne center to royal warm edge
    let center = CIVector(x: width * 0.5, y: height * 0.6)
    let radial = CIFilter(name: "CIRadialGradient", parameters: [
        "inputCenter": center,
        "inputRadius0": NSNumber(value: Float(width * 0.15)),
        "inputRadius1": NSNumber(value: Float(width * 0.85)),
        "inputColor0": centerGlow,
        "inputColor1": edgeColor
    ])!.outputImage!.cropped(to: CGRect(x: 0, y: 0, width: width, height: height))
    
    return radial
}

// 1. PROCESS BRIDE (media_1794076202749_406a5eaa.jpg cutout)
if let brideCutout = CIImage(contentsOf: URL(fileURLWithPath: "/Users/mouuuryan/Desktop/Engagement-kavana/public/images/bride-cutout.png")) {
    let bg = createPlainRoyalBackground(
        width: portraitSize.width,
        height: portraitSize.height,
        centerGlow: CIColor(red: 0.99, green: 0.97, blue: 0.93, alpha: 1.0), // #FDFBF7 soft ivory glow
        edgeColor: CIColor(red: 0.88, green: 0.78, blue: 0.65, alpha: 1.0)   // #E0C7A6 warm champagne gold
    )
    
    // Scale & position bride for circular card portrait (focus on smiling face, maang tikka, necklace, blouse)
    let extent = brideCutout.extent
    // We want the head & upper torso to fill the circle gracefully
    let targetH = portraitSize.height * 0.92
    let scale = targetH / extent.height
    let scaled = brideCutout.transformed(by: CGAffineTransform(scaleX: scale, y: scale))
    
    let posX = (portraitSize.width - scaled.extent.width) * 0.5 - 20
    let posY: CGFloat = -40 // lower slightly so necklace & jewelry are well visible
    let positioned = scaled.transformed(by: CGAffineTransform(translationX: -scaled.extent.origin.x + posX,
                                                                 y: -scaled.extent.origin.y + posY))
    
    // Ambient soft shadow
    let shadowMask = positioned.applyingFilter("CIColorMatrix", parameters: [
        "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 0.28)
    ])
    let blurredShadow = shadowMask.applyingFilter("CIGaussianBlur", parameters: [
        "inputRadius": 22.0
    ]).cropped(to: portraitRect)
    
    let withShadow = blurredShadow.applyingFilter("CISourceOverCompositing", parameters: [
        "inputBackgroundImage": bg
    ])
    let finalBride = positioned.applyingFilter("CISourceOverCompositing", parameters: [
        "inputBackgroundImage": withShadow
    ]).cropped(to: portraitRect)
    
    try! context.writeJPEGRepresentation(of: finalBride,
                                         to: URL(fileURLWithPath: "/Users/mouuuryan/Desktop/Engagement-kavana/public/images/kavana-portrait.jpg"),
                                         colorSpace: colorSpace,
                                         options: [:])
    print("SUCCESS: kavana-portrait.jpg saved")
}

// 2. PROCESS GROOM (media_1794076202768_087a0729.jpg cutout)
if let groomCutout = CIImage(contentsOf: URL(fileURLWithPath: "/Users/mouuuryan/Desktop/Engagement-kavana/public/images/groom-cutout.png")) {
    let bg = createPlainRoyalBackground(
        width: portraitSize.width,
        height: portraitSize.height,
        centerGlow: CIColor(red: 0.99, green: 0.97, blue: 0.93, alpha: 1.0),
        edgeColor: CIColor(red: 0.88, green: 0.78, blue: 0.65, alpha: 1.0)
    )
    
    // Despill red edge fringe from the red curtain
    // We can do this with CIColorMatrix or custom kernel, or slight matte erosion
    let extent = groomCutout.extent
    let targetH = portraitSize.height * 0.96
    let scale = targetH / extent.height
    let scaled = groomCutout.transformed(by: CGAffineTransform(scaleX: scale, y: scale))
    
    let posX = (portraitSize.width - scaled.extent.width) * 0.5
    let posY: CGFloat = -30
    let positioned = scaled.transformed(by: CGAffineTransform(translationX: -scaled.extent.origin.x + posX,
                                                                 y: -scaled.extent.origin.y + posY))
    
    // Ambient soft shadow
    let shadowMask = positioned.applyingFilter("CIColorMatrix", parameters: [
        "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 0.28)
    ])
    let blurredShadow = shadowMask.applyingFilter("CIGaussianBlur", parameters: [
        "inputRadius": 22.0
    ]).cropped(to: portraitRect)
    
    let withShadow = blurredShadow.applyingFilter("CISourceOverCompositing", parameters: [
        "inputBackgroundImage": bg
    ])
    let finalGroom = positioned.applyingFilter("CISourceOverCompositing", parameters: [
        "inputBackgroundImage": withShadow
    ]).cropped(to: portraitRect)
    
    try! context.writeJPEGRepresentation(of: finalGroom,
                                         to: URL(fileURLWithPath: "/Users/mouuuryan/Desktop/Engagement-kavana/public/images/sweekar-portrait.jpg"),
                                         colorSpace: colorSpace,
                                         options: [:])
    print("SUCCESS: sweekar-portrait.jpg saved")
}

