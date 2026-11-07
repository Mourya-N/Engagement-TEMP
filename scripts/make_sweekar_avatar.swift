import Foundation
import CoreImage
import CoreGraphics
import AppKit
import ImageIO

let context = CIContext(options: [.useSoftwareRenderer: false])
guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB) else { exit(1) }

let avatarSize = CGSize(width: 800, height: 800)
let avatarRect = CGRect(origin: .zero, size: avatarSize)

func makeRoyalStudioBG() -> CIImage {
    let center = CIVector(x: 400, y: 460)
    return CIFilter(name: "CIRadialGradient", parameters: [
        "inputCenter": center,
        "inputRadius0": NSNumber(value: 80),
        "inputRadius1": NSNumber(value: 500),
        "inputColor0": CIColor(red: 0.99, green: 0.98, blue: 0.95, alpha: 1.0),
        "inputColor1": CIColor(red: 0.90, green: 0.82, blue: 0.70, alpha: 1.0)
    ])!.outputImage!.cropped(to: avatarRect)
}

// GROOM AVATAR
if let groomCutout = CIImage(contentsOf: URL(fileURLWithPath: "/Users/mouuuryan/Desktop/Engagement-kavana/public/images/groom-cutout.png")) {
    let bg = makeRoyalStudioBG()
    
    let extent = groomCutout.extent
    let cropBox = CGRect(x: extent.origin.x + extent.width * 0.22,
                         y: extent.origin.y + extent.height * 0.58,
                         width: extent.width * 0.58,
                         height: extent.height * 0.42)
    let cropped = groomCutout.cropped(to: cropBox)
    
    let scale = (avatarSize.height * 0.95) / cropped.extent.height
    let scaled = cropped.transformed(by: CGAffineTransform(scaleX: scale, y: scale))
    
    let posX = (avatarSize.width - scaled.extent.width) * 0.5
    let posY: CGFloat = 0.0
    let positioned = scaled.transformed(by: CGAffineTransform(translationX: -scaled.extent.origin.x + posX,
                                                                 y: -scaled.extent.origin.y + posY))
    
    let shadowMask = positioned.applyingFilter("CIColorMatrix", parameters: [
        "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 0.28)
    ])
    let blurredShadow = shadowMask.applyingFilter("CIGaussianBlur", parameters: [
        "inputRadius": 18.0
    ]).cropped(to: avatarRect)
    
    let withShadow = blurredShadow.applyingFilter("CISourceOverCompositing", parameters: [
        "inputBackgroundImage": bg
    ])
    let finalGroom = positioned.applyingFilter("CISourceOverCompositing", parameters: [
        "inputBackgroundImage": withShadow
    ]).cropped(to: avatarRect)
    
    try! context.writeJPEGRepresentation(of: finalGroom,
                                         to: URL(fileURLWithPath: "/Users/mouuuryan/Desktop/Engagement-kavana/public/images/sweekar-portrait.jpg"),
                                         colorSpace: colorSpace,
                                         options: [:])
    print("SUCCESS: sweekar-portrait.jpg updated")
}

