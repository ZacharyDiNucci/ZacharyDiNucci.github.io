import "./ArticleVideo.scss"
import React, {useEffect, useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleVideo({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-video`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleVideoItems dataWrapper={dataWrapper}
                              selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}


/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */

function ArticleVideoItems({ dataWrapper, selectedItemCategoryId }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    return (
        <div className={`article-video-items`}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleVideoItem itemWrapper={itemWrapper}
                                 key={key}/>
            ))}
        </div>
    )
}


/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */

function ArticleVideoItem({ itemWrapper }) {
    // Try different ways to access the video ID
    const videoId = itemWrapper.youtube_video_id || 
                   itemWrapper.settings?.youtube_video_id || 
                   itemWrapper.locales?.youtube_video_id;
    
    console.log("Found video ID:", videoId);
    
    const isYouTubeVideo = videoId;
    const isLocalVideo = itemWrapper.video_src || itemWrapper.settings?.video_src;
    
    if (isYouTubeVideo) {
        return (
            <div className={`article-video-item article-video-youtube`}>
                <div className={`article-video-wrapper`}>
                    <iframe
                        className="article-video-youtube-embed"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0&modestbranding=1`}
                        title={itemWrapper.locales?.title || "Game Video"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                            width: itemWrapper.video_width || '100%',
                            height: itemWrapper.video_height || '400px',
                            borderRadius: itemWrapper.video_border_radius || '12px',
                            boxShadow: itemWrapper.video_box_shadow ? '0 8px 32px rgba(0,0,0,0.3)' : 'none'
                        }}
                    />
                    {itemWrapper.overlay_text && (
                        <div className={`article-video-overlay ${itemWrapper.overlay_position || 'bottom-left'}`}>
                            <h3 className="article-video-overlay-text">
                                {itemWrapper.overlay_text}
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        )
    }
    
    if (isLocalVideo) {
        return (
            <div className={`article-video-item article-video-local`}>
                <div className={`article-video-wrapper`}>
                    <video
                        className="article-video-local-player"
                        width={itemWrapper.video_width || '100%'}
                        height={itemWrapper.video_height || '400px'}
                        autoPlay={itemWrapper.autoplay !== false}
                        muted={itemWrapper.muted !== false}
                        loop={itemWrapper.loop !== false}
                        controls={itemWrapper.controls || false}
                        poster={itemWrapper.video_poster}
                        style={{
                            borderRadius: itemWrapper.video_border_radius || '12px',
                            boxShadow: itemWrapper.video_box_shadow ? '0 8px 32px rgba(0,0,0,0.3)' : 'none'
                        }}
                    >
                        <source src={itemWrapper.video_src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {itemWrapper.overlay_text && (
                        <div className={`article-video-overlay ${itemWrapper.overlay_position || 'bottom-left'}`}>
                            <h3 className="article-video-overlay-text">
                                {itemWrapper.overlay_text}
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        )
    }
    
    // Fallback if no video is specified
    return (
        <div className={`article-video-item article-video-placeholder`}>
            <div className="article-video-placeholder-content">
                <p>No video source specified</p>
            </div>
        </div>
    )
}

export default ArticleVideo
