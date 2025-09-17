import "./ArticleVideo.scss"
import React from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import {useUtils} from "/src/hooks/utils.js"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleVideo({ dataWrapper, id }) {
    const utils = useUtils()
    
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
    
    // Try to access video properties from the item wrapper's preview section
    let videoData = {};
    let titleText = "";
    let descriptionText = "";
    
    if (firstItemWrapper && firstItemWrapper.preview) {
        console.log("Preview object found:", firstItemWrapper.preview)
        videoData = {
            // YouTube video from preview (like ArticlePortfolio)
            youtube_url: firstItemWrapper.preview.youtubeVideo,
            video_width: "600",
            video_height: "400",
            video_border_radius: "12px"
        };
        
        // Get title and text from locales
        titleText = firstItemWrapper.locales?.title || "";
        descriptionText = firstItemWrapper.locales?.text || "";
    }

    console.log("Final video data:", videoData)
    console.log("Title text:", titleText)
    console.log("Description text:", descriptionText)
    console.log("========================")

    // Check if we have YouTube URL
    const youtubeUrl = videoData.youtube_url
    const videoWidth = videoData.video_width
    const videoHeight = videoData.video_height
    const borderRadius = videoData.video_border_radius

    console.log("YouTube URL:", youtubeUrl)

    // If no YouTube URL provided, show placeholder
    if (!youtubeUrl) {
        console.log("No YouTube URL found, showing placeholder")
        return (
            <Article id={dataWrapper.uniqueId}
                     type={Article.Types.SPACING_DEFAULT}
                     dataWrapper={dataWrapper}
                     className={`article-video`}>
                <div className="article-video-placeholder">
                    <p>No YouTube video specified</p>
                </div>
            </Article>
        )
    }

    // Convert YouTube URL to embed using the same method as YoutubeVideoModal
    console.log("Converting YouTube URL to embed using modal's method:", youtubeUrl)
    const parsedUrl = utils.url.toYoutubeEmbed(youtubeUrl)
    // Add YouTube parameters for autoplay, mute, loop, no controls
    const finalUrl = parsedUrl + "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
    console.log("Final embed URL with parameters:", finalUrl)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-video`}>
            <div className="article-video-container">
                {/* Title and Description Section */}
                {(titleText || descriptionText) && (
                    <div className="article-video-header">
                        {titleText && (
                            <h3 className="article-video-title" dangerouslySetInnerHTML={{__html: titleText}} />
                        )}
                        {descriptionText && (
                            <p className="article-video-description" dangerouslySetInnerHTML={{__html: descriptionText}} />
                        )}
                    </div>
                )}
                
                {/* Video Section */}
                <div className="article-video-wrapper" style={{
                    width: videoWidth + "px",
                    height: videoHeight + "px",
                    borderRadius: borderRadius,
                    overflow: "hidden",
                    position: "relative"
                }}>
                    <iframe 
                        src={finalUrl}
                        className="article-video-youtube-iframe"
                        title="YouTube Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none"
                        }}
                    />
                </div>
            </div>
        </Article>
    )
}

export default ArticleVideo