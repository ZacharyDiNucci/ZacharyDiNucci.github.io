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
    console.log("dataWrapper:", dataWrapper)
    console.log("dataWrapper.items:", dataWrapper.items)
    
    // Get the first item from the items array
    const items = dataWrapper.items || []
    const firstItem = items[0] || {}
    
    console.log("items array:", items)
    console.log("first item:", firstItem)
    
    const videoSrc = firstItem.video_src
    const videoPoster = firstItem.video_poster
    const videoWidth = firstItem.video_width || "600"
    const videoHeight = firstItem.video_height || "400"
    const borderRadius = firstItem.video_border_radius || "12px"
    const overlayText = firstItem.overlay_text
    const autoplay = firstItem.autoplay !== false // default true
    const muted = firstItem.muted !== false // default true
    const loop = firstItem.loop !== false // default true
    const controls = firstItem.controls || false // default false

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