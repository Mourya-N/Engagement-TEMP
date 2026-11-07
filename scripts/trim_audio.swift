import Foundation
import AVFoundation

let inputURL = URL(fileURLWithPath: "/Users/mouuuryan/Desktop/Engagement-kavana/public/audio/radhe-wedding-song.m4a")
let outputURL = URL(fileURLWithPath: "/Users/mouuuryan/Desktop/Engagement-kavana/public/audio/radhe-trimmed.m4a")

if FileManager.default.fileExists(atPath: outputURL.path) {
    try? FileManager.default.removeItem(at: outputURL)
}

let asset = AVAsset(url: inputURL)
guard let exportSession = AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetAppleM4A) else {
    print("Cannot create export session")
    exit(1)
}

let startTime = CMTime(seconds: 6.0, preferredTimescale: 44100)
let duration = CMTimeSubtract(asset.duration, startTime)
let timeRange = CMTimeRange(start: startTime, duration: duration)

exportSession.outputURL = outputURL
exportSession.outputFileType = .m4a
exportSession.timeRange = timeRange

let semaphore = DispatchSemaphore(value: 0)
exportSession.exportAsynchronously {
    if exportSession.status == .completed {
        print("SUCCESS: Trimmed audio saved to \(outputURL.path)")
    } else {
        print("Error: \(String(describing: exportSession.error))")
    }
    semaphore.signal()
}
semaphore.wait()

