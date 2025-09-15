import "./ArticleVideo.scss"
import React from 'react'
import Article from "/src/components/articles/base/Article.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleVideo({ dataWrapper, id }) {
    console.log("=== ArticleVideo Debug ===")
    console.log("Full dataWrapper:", dataWrapper)
    console.log("dataWrapper keys:", Object.keys(dataWrapper))
    console.log("dataWrapper.data:", dataWrapper.data)
    console.log("dataWrapper.items:", dataWrapper.items)
    console.log("dataWrapper.settings:", dataWrapper.settings)
    console.log("dataWrapper._data:", dataWrapper._data)
    
    // Try different ways to access the data
    let videoData = null;
    
    // Method 1: Direct items access
    if (dataWrapper.items && dataWrapper.items.length > 0) {
        videoData = dataWrapper.items[0];
        console.log("Found data via items:", videoData);
    }
    
    // Method 2: Check if items are in _data or data
    else if (dataWrapper.data && dataWrapper.data.items && dataWrapper.data.items.length > 0) {
        videoData = dataWrapper.data.items[0];
        console.log("Found data via data.items:", videoData);
    }
    
    // Method 3: Check if items are in _data
    else if (dataWrapper._data && dataWrapper._data.items && dataWrapper._data.items.length > 0) {
        videoData = dataWrapper._data.items[0];
        console.log("Found data via _data.items:", videoData);
    }
    
    // Method 4: Check settings
    else if (dataWrapper.settings) {
        videoData = dataWrapper.settings;
        console.log("Found data via settings:", videoData);
    }
    
    console.log("Final videoData:", videoData);
    
    if (!videoData) {
        console.log("No video data found anywhere!")
        videoData = {};
    }
    
    const videoSrc = videoData.video_src
    const videoPoster = videoData.video_poster
    const videoWidth = videoData.video_width || "600"
    const videoHeight = videoData.video_height || "400"
    const borderRadius = videoData.video_border_radius || "12px"
    const overlayText = videoData.overlay_text
    const autoplay = videoData.autoplay !== false // default true
    const muted = videoData.muted !== false // default true
    const loop = videoData.loop !== false // default true
    const controls = videoData.controls || false // default false

    console.log("video_src:", videoSrc)
    console.log("video_poster:", videoPoster)
    console.log("video_width:", videoWidth)
    console.log("video_height:", videoHeight)
    console.log("overlay_text:", overlayText)
    console.log("autoplay:", autoplay, "muted:", muted, "loop:", loop, "controls:", controls)
    console.log("========================")

    // If no video source provided, show placeholder
    if (!videoSrc) {
        console.log("No video source found, showing placeholder")
        return (
            <Article id={dataWrapper.uniqueId}
                     type={Article.Types.SPACING_DEFAULT}
                     dataWrapper={dataWrapper}
                     className={`article-video`}>
                <div className="article-video-placeholder">
                    <p>No video source specified</p>
                </div>
            </Article>
        )
    }

    console.log("Video source found, rendering video element with src:", videoSrc)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-video`}>
            <div className="article-video-container">
                <div className="article-video-wrapper" style={{
                    width: videoWidth + "px",
                    height: videoHeight + "px",
                    borderRadius: borderRadius,
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
                }}>
                    <video
                        src={videoSrc}
                        poster={videoPoster}
                        width={videoWidth}
                        height={videoHeight}
                        autoPlay={autoplay}
                        muted={muted}
                        loop={loop}
                        controls={controls}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    >
                        Your browser does not support the video tag.
                    </video>
                    {overlayText && (
                        <div className="article-video-overlay">
                            <h3>{overlayText}</h3>
                        </div>
                    )}
                </div>
            </div>
        </Article>
    )
}

export default ArticleVideo