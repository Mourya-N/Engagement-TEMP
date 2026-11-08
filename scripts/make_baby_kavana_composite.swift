import Foundation
import CoreImage
import CoreImage.CIFilterBuiltins
import CoreGraphics
import AppKit
import ImageIO

let cutoutPath = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "public/images/kavana-childhood-cutout-clean.png"
let bgPath = CommandLine.arguments.count > 2 ? CommandLine.arguments[2] : "/Users/mouuuryan/.gemini/antigravity/brain/50f02ce4-cff8-46d6-bee1-4272af3333dc/royal_indian_baby_background_1794112755579.jpg"
let outputPath = CommandLine.arguments.count > 3 ? CommandLine.arguments[3] : "public/images/kavana-childhood.jpg"

guard let cutoutCI = CIImage(contentsOf: URL(fileURLWithPath: cutoutPath)),
      let bgCI = CIImage(contentsOf: URL(fileURLWithPath: bgPath)) else {
    print("Error: Could not load input images")
    exit(1)
}

let ciContext = CIContext(options: [.useSoftwareRenderer: false])
let colorSpace = CGColorSpace(name: CGColorSpace.sRGB)!

// Target 4:5 aspect ratio dimensions (1200 x 1500)
let targetWidth: CGFloat = 1200
let targetHeight: CGFloat = 1500
let targetRect = CGRect(x: 0, y: 0, width: targetWidth, height: targetHeight)

// 1. Prepare Background: scale & crop to target 1200 x 1500
let bgExtent = bgCI.extent
let scaleX = targetWidth / bgExtent.width
let scaleY = targetHeight / bgExtent.height
let bgScale = max(scaleX, scaleY)

let scaledBG = bgCI.transformed(by: CGAffineTransform(scaleX: bgScale, y: bgScale))
let bgCropX = (scaledBG.extent.width - targetWidth) / 2.0
let bgCropY = max(0, (scaledBG.extent.height - targetHeight) * 0.38)

let croppedBG = scaledBG.cropped(to: CGRect(x: scaledBG.extent.origin.x + bgCropX,
                                            y: scaledBG.extent.origin.y + bgCropY,
                                            width: targetWidth,
                                            height: targetHeight))
                        .transformed(by: CGAffineTransform(translationX: -scaledBG.extent.origin.x - bgCropX,
                                                              y: -scaledBG.extent.origin.y - bgCropY))

// 2. Scale & Position Baby Kavana
let babyTargetHeight: CGFloat = 740.0
let babyScale = babyTargetHeight / cutoutCI.extent.height

// Rotate slightly (+5 deg) for natural alignment with the circular bed's silk swirl
let centerOffsetX = -cutoutCI.extent.midX
let centerOffsetY = -cutoutCI.extent.midY
let rotatedBaby = cutoutCI
    .transformed(by: CGAffineTransform(translationX: centerOffsetX, y: centerOffsetY))
    .transformed(by: CGAffineTransform(rotationAngle: 5.0 * .pi / 180.0))
    .transformed(by: CGAffineTransform(scaleX: babyScale, y: babyScale))

let babyWidth = rotatedBaby.extent.width
let babyX = (targetWidth - babyWidth) / 2.0 - 5.0
let babyY: CGFloat = 375.0 // perfectly centered inside the plush circular bed

let positionedBaby = rotatedBaby.transformed(by: CGAffineTransform(
    translationX: -rotatedBaby.extent.origin.x + babyX,
    y: -rotatedBaby.extent.origin.y + babyY
))

// 3. Color Grade & Vintage Warmth:
// Natural golden candlelight tones, soften harsh flash highlights
let warmBaby = positionedBaby
    .applyingFilter("CITemperatureAndTint", parameters: [
        "inputNeutral": CIVector(x: 6500, y: 0),
        "inputTargetNeutral": CIVector(x: 6050, y: -2)
    ])
    .applyingFilter("CIColorControls", parameters: [
        "inputContrast": 1.04,
        "inputSaturation": 1.06,
        "inputBrightness": 0.01
    ])
    .applyingFilter("CIHighlightShadowAdjust", parameters: [
        "inputHighlightAmount": 0.90,
        "inputShadowAmount": 1.10
    ])

// 4. Contact Shadows onto the Silk Bedding:
// Light comes from top-right window -> cast soft warm shadow towards bottom-left
let broadShadowMask = positionedBaby.applyingFilter("CIColorMatrix", parameters: [
    "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 0.16),
    "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 0.10),
    "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 0.05),
    "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 0.45)
])
let broadShadow = broadShadowMask
    .transformed(by: CGAffineTransform(translationX: -8, y: -14))
    .applyingFilter("CIGaussianBlur", parameters: [
        "inputRadius": 25.0
    ]).cropped(to: targetRect)

let tightShadowMask = positionedBaby.applyingFilter("CIColorMatrix", parameters: [
    "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 0.10),
    "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 0.05),
    "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 0.02),
    "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 0.60)
])
let tightShadow = tightShadowMask
    .transformed(by: CGAffineTransform(translationX: -3, y: -5))
    .applyingFilter("CIGaussianBlur", parameters: [
        "inputRadius": 7.0
    ]).cropped(to: targetRect)

// 5. Composite: Background -> Broad Shadow -> Tight Shadow -> Baby
let c1 = broadShadow.applyingFilter("CISourceOverCompositing", parameters: [
    "inputBackgroundImage": croppedBG
])
let c2 = tightShadow.applyingFilter("CISourceOverCompositing", parameters: [
    "inputBackgroundImage": c1
])
let c3 = warmBaby.applyingFilter("CISourceOverCompositing", parameters: [
    "inputBackgroundImage": c2
]).cropped(to: targetRect)

// 6. Subtle Warm Vignette
let finalImage = c3.applyingFilter("CIVignette", parameters: [
    "inputIntensity": 0.22,
    "inputRadius": 1.5
]).cropped(to: targetRect)

// 7. Write high quality JPEG
let outURL = URL(fileURLWithPath: outputPath)
do {
    try ciContext.writeJPEGRepresentation(of: finalImage,
                                          to: outURL,
                                          colorSpace: colorSpace,
                                          options: [:])
    print("SUCCESS: Perfect composite saved to \(outputPath)")
} catch {
    print("Error writing output: \(error)")
    exit(1)
}
