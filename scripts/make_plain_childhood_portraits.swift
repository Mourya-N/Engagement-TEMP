import Foundation
import CoreImage
import CoreGraphics
import AppKit
import ImageIO

let context = CIContext(options: [.useSoftwareRenderer: false])
guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB) else { exit(1) }

let targetWidth: CGFloat = 1600
let targetHeight: CGFloat = 2000
let targetRect = CGRect(x: 0, y: 0, width: targetWidth, height: targetHeight)

// Generate the EXACT plain elegant royal background from couple-hero.jpg
func createRoyalBackground(centerOffsetY: CGFloat = 0.52) -> CIImage {
    let center = CIVector(x: targetWidth * 0.5, y: targetHeight * centerOffsetY)
    
    // 1. Soft radial gradient: radiant champagne ivory glow in center -> rich royal warm gold tone
    let royalBG = CIFilter(name: "CIRadialGradient", parameters: [
        "inputCenter": center,
        "inputRadius0": NSNumber(value: 180),
        "inputRadius1": NSNumber(value: 1350),
        "inputColor0": CIColor(red: 0.99, green: 0.98, blue: 0.95, alpha: 1.0), // #FDFBF7 bright luminous ivory
        "inputColor1": CIColor(red: 0.89, green: 0.80, blue: 0.68, alpha: 1.0)  // #E3CCA9 warm royal champagne gold
    ])!.outputImage!.cropped(to: targetRect)

    // 2. Subtle royal burgundy corner vignette to frame the portrait
    let vignetteCenter = CIVector(x: targetWidth * 0.5, y: targetHeight * 0.5)
    let vignette = CIFilter(name: "CIRadialGradient", parameters: [
        "inputCenter": vignetteCenter,
        "inputRadius0": NSNumber(value: 700),
        "inputRadius1": NSNumber(value: 1550),
        "inputColor0": CIColor(red: 0, green: 0, blue: 0, alpha: 0.0),
        "inputColor1": CIColor(red: 0.38, green: 0.12, blue: 0.17, alpha: 0.14) // soft royal burgundy tint at far corners
    ])!.outputImage!.cropped(to: targetRect)

    return vignette.applyingFilter("CISourceOverCompositing", parameters: [
        "inputBackgroundImage": royalBG
    ])
}

// Function to slightly soften alpha edges to prevent any hard pixel stepped edges
func softenCutoutEdges(_ input: CIImage) -> CIImage {
    let alpha = input.applyingFilter("CIColorMatrix", parameters: [
        "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 1)
    ])
    let blurredAlpha = alpha.applyingFilter("CIGaussianBlur", parameters: [
        "inputRadius": 0.8
    ])
    return CIFilter(name: "CIBlendWithAlphaMask", parameters: [
        "inputImage": input,
        "inputBackgroundImage": CIImage.empty(),
        "inputMaskImage": blurredAlpha
    ])!.outputImage!
}

// ==========================================
// 1. GENERATE KAVANA CHILDHOOD PORTRAIT
// ==========================================
print("Generating Kavana childhood portrait...")
guard let kavanaCutoutRaw = CIImage(contentsOf: URL(fileURLWithPath: "public/images/kavana-childhood-cutout-clean.png")) else {
    print("Could not load kavana-childhood-cutout-clean.png")
    exit(1)
}

let kavanaCutout = softenCutoutEdges(kavanaCutoutRaw)
let kavanaBG = createRoyalBackground(centerOffsetY: 0.54)

let kavanaExtent = kavanaCutout.extent
let kavanaTargetHeight = targetHeight * 0.80
let kavanaScale = kavanaTargetHeight / kavanaExtent.height

let kavanaCenterOffsetX = -kavanaExtent.midX
let kavanaCenterOffsetY = -kavanaExtent.midY
let kavanaScaled = kavanaCutout
    .transformed(by: CGAffineTransform(translationX: kavanaCenterOffsetX, y: kavanaCenterOffsetY))
    .transformed(by: CGAffineTransform(scaleX: kavanaScale, y: kavanaScale))

let kavanaX = targetWidth * 0.5
let kavanaY = targetHeight * 0.50

let kavanaPositioned = kavanaScaled.transformed(by: CGAffineTransform(
    translationX: kavanaX,
    y: kavanaY
))

// Soft ambient contact & cast shadow matching couple-hero.jpg
let kavanaShadowMask = kavanaPositioned.applyingFilter("CIColorMatrix", parameters: [
    "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 0.16),
    "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 0.09),
    "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 0.05),
    "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 0.28)
])
let kavanaBlurredShadow = kavanaShadowMask
    .transformed(by: CGAffineTransform(translationX: 0, y: -16))
    .applyingFilter("CIGaussianBlur", parameters: [
        "inputRadius": 28.0
    ]).cropped(to: targetRect)

// Tight contact shadow for grounded depth
let kavanaTightShadowMask = kavanaPositioned.applyingFilter("CIColorMatrix", parameters: [
    "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 0.12),
    "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 0.06),
    "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 0.03),
    "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 0.38)
])
let kavanaTightShadow = kavanaTightShadowMask
    .transformed(by: CGAffineTransform(translationX: 0, y: -6))
    .applyingFilter("CIGaussianBlur", parameters: [
        "inputRadius": 8.0
    ]).cropped(to: targetRect)

// Warm ambient color calibration matching couple-hero.jpg
let kavanaWarm = kavanaPositioned
    .applyingFilter("CITemperatureAndTint", parameters: [
        "inputNeutral": CIVector(x: 6500, y: 0),
        "inputTargetNeutral": CIVector(x: 6250, y: 0)
    ])
    .applyingFilter("CIColorControls", parameters: [
        "inputContrast": 1.03,
        "inputSaturation": 1.04,
        "inputBrightness": 0.01
    ])

let kavanaWithShadow1 = kavanaBlurredShadow.applyingFilter("CISourceOverCompositing", parameters: [
    "inputBackgroundImage": kavanaBG
])
let kavanaWithShadow2 = kavanaTightShadow.applyingFilter("CISourceOverCompositing", parameters: [
    "inputBackgroundImage": kavanaWithShadow1
])
let kavanaFinal = kavanaWarm.applyingFilter("CISourceOverCompositing", parameters: [
    "inputBackgroundImage": kavanaWithShadow2
]).cropped(to: targetRect)

try! context.writeJPEGRepresentation(of: kavanaFinal,
                                     to: URL(fileURLWithPath: "public/images/kavana-childhood.jpg"),
                                     colorSpace: colorSpace,
                                     options: [:])
print("SUCCESS: kavana-childhood.jpg generated successfully!")

// ==========================================
// 2. GENERATE SWEEKAR CHILDHOOD PORTRAIT
// ==========================================
print("Generating Sweekar childhood portrait...")
guard let sweekarCutoutRaw = CIImage(contentsOf: URL(fileURLWithPath: "public/images/sweekar-childhood-cutout.png")) else {
    print("Could not load sweekar-childhood-cutout.png")
    exit(1)
}

let sweekarCutout = softenCutoutEdges(sweekarCutoutRaw)
let sweekarBG = createRoyalBackground(centerOffsetY: 0.52)

let sweekarExtent = sweekarCutout.extent
let sweekarTargetHeight = targetHeight * 0.80
let sweekarScale = sweekarTargetHeight / sweekarExtent.height

let sweekarCenterOffsetX = -sweekarExtent.midX
let sweekarCenterOffsetY = -sweekarExtent.midY
let sweekarScaled = sweekarCutout
    .transformed(by: CGAffineTransform(translationX: sweekarCenterOffsetX, y: sweekarCenterOffsetY))
    .transformed(by: CGAffineTransform(scaleX: sweekarScale, y: sweekarScale))

let sweekarX = targetWidth * 0.5
let sweekarY = targetHeight * 0.49

let sweekarPositioned = sweekarScaled.transformed(by: CGAffineTransform(
    translationX: sweekarX,
    y: sweekarY
))

// Soft ambient contact & cast shadow matching couple-hero.jpg
let sweekarShadowMask = sweekarPositioned.applyingFilter("CIColorMatrix", parameters: [
    "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 0.16),
    "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 0.09),
    "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 0.05),
    "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 0.28)
])
let sweekarBlurredShadow = sweekarShadowMask
    .transformed(by: CGAffineTransform(translationX: 0, y: -16))
    .applyingFilter("CIGaussianBlur", parameters: [
        "inputRadius": 28.0
    ]).cropped(to: targetRect)

// Tight contact shadow for grounded depth
let sweekarTightShadowMask = sweekarPositioned.applyingFilter("CIColorMatrix", parameters: [
    "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 0.12),
    "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 0.06),
    "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 0.03),
    "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 0.38)
])
let sweekarTightShadow = sweekarTightShadowMask
    .transformed(by: CGAffineTransform(translationX: 0, y: -6))
    .applyingFilter("CIGaussianBlur", parameters: [
        "inputRadius": 8.0
    ]).cropped(to: targetRect)

// Warm ambient color calibration matching couple-hero.jpg
let sweekarWarm = sweekarPositioned
    .applyingFilter("CITemperatureAndTint", parameters: [
        "inputNeutral": CIVector(x: 6500, y: 0),
        "inputTargetNeutral": CIVector(x: 6250, y: 0)
    ])
    .applyingFilter("CIColorControls", parameters: [
        "inputContrast": 1.03,
        "inputSaturation": 1.04,
        "inputBrightness": 0.01
    ])

let sweekarWithShadow1 = sweekarBlurredShadow.applyingFilter("CISourceOverCompositing", parameters: [
    "inputBackgroundImage": sweekarBG
])
let sweekarWithShadow2 = sweekarTightShadow.applyingFilter("CISourceOverCompositing", parameters: [
    "inputBackgroundImage": sweekarWithShadow1
])
let sweekarFinal = sweekarWarm.applyingFilter("CISourceOverCompositing", parameters: [
    "inputBackgroundImage": sweekarWithShadow2
]).cropped(to: targetRect)

try! context.writeJPEGRepresentation(of: sweekarFinal,
                                     to: URL(fileURLWithPath: "public/images/sweekar-childhood.jpg"),
                                     colorSpace: colorSpace,
                                     options: [:])
print("SUCCESS: sweekar-childhood.jpg generated successfully!")
