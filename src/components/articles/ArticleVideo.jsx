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
    const settings = dataWrapper.settings
    const youtubeVideoId = settings.youtube_video_id
    const videoWidth = settings.video_width || "600"
    const videoHeight = settings.video_height || "400"
    const borderRadius = settings.video_border_radius || "12px"
    const overlayText = settings.overlay_text

    // If no video ID provided, show placeholder
    if (!youtubeVideoId) {
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

    console.log("Video ID found, rendering iframe with URL:", `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=1&rel=0`)

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
                    <iframe
                        src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=1&rel=0`}
                        title="Game Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none"
                        }}
                    />
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