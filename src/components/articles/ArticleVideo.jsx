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
    
    // Try to access items the same way other components do
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy ? dataWrapper.getOrderedItemsFilteredBy(null) : []
    console.log("getOrderedItemsFilteredBy result:", filteredItems)
    
    // Fallback to direct items access
    const directItems = dataWrapper.items || []
    console.log("direct items:", directItems)
    
    // Use whichever method returns data
    const items = filteredItems.length > 0 ? filteredItems : directItems
    console.log("using items:", items)
    
    // Get the first item
    const firstItemWrapper = items[0]
    console.log("first item wrapper:", firstItemWrapper)
    
    // Try to access video properties from the item wrapper
    let videoData = {};
    if (firstItemWrapper) {
        // If it's a wrapper object, try different access methods
        videoData = {
            video_src: firstItemWrapper.video_src || firstItemWrapper.data?.video_src || firstItemWrapper.settings?.video_src,
            video_poster: firstItemWrapper.video_poster || firstItemWrapper.data?.video_poster || firstItemWrapper.settings?.video_poster,
            video_width: firstItemWrapper.video_width || firstItemWrapper.data?.video_width || firstItemWrapper.settings?.video_width || "600",
            video_height: firstItemWrapper.video_height || firstItemWrapper.data?.video_height || firstItemWrapper.settings?.video_height || "400",
            video_border_radius: firstItemWrapper.video_border_radius || firstItemWrapper.data?.video_border_radius || firstItemWrapper.settings?.video_border_radius || "12px",
            overlay_text: firstItemWrapper.overlay_text || firstItemWrapper.data?.overlay_text || firstItemWrapper.settings?.overlay_text,
            autoplay: firstItemWrapper.autoplay !== false,
            muted: firstItemWrapper.muted !== false,
            loop: firstItemWrapper.loop !== false,
            controls: firstItemWrapper.controls || false
        };
    }

    console.log("Final video data:", videoData)
    console.log("========================")

    const videoSrc = videoData.video_src
    const videoPoster = videoData.video_poster
    const videoWidth = videoData.video_width
    const videoHeight = videoData.video_height
    const borderRadius = videoData.video_border_radius
    const overlayText = videoData.overlay_text
    const autoplay = videoData.autoplay
    const muted = videoData.muted
    const loop = videoData.loop
    const controls = videoData.controls

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