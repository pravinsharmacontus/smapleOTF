import React, { useEffect, useState } from "react";
import './EnableYoutube.scss';
import { IconLogo } from "../../../../assets/images";
import { IconFbDark, IconInternet, IconMute, IconTime, IconYoutube } from "../../../../assets/img";

function YouTubebroadcast(_props = {}) {
    const [mediaType, setMediaType] = useState("");
    const mediaSelection = JSON.parse(localStorage.getItem('Select_Media'));
    const youtubeId = JSON.parse(localStorage.getItem('broadcastId'))
    ? JSON.parse(localStorage.getItem('broadcastId')) : "";
    const faceookId = JSON.parse(localStorage.getItem('Facebook_Live_Url'))
    ? JSON.parse(localStorage.getItem('Facebook_Live_Url')) : "";

    useEffect(() => {
        if(mediaSelection === "YT" && youtubeId ){
            setMediaType("Youtube");
        }else {
            setMediaType("Facebook");
        }
    })

    return (
        < React.Fragment >
            <div className="enable_youtube_wraper">
                <div className="enable_youtube_header">
                    <a
                        href="/"
                        rel="noopener noreferrer"
                        className="logo"
                    >
                        <IconLogo />
                    </a>
                </div>
                <div className="active_youtube_body">
                    <div className="active_youtube_body_inner">
                        <div className="icon_center">
                            {mediaSelection === "YT" && youtubeId ? <IconYoutube /> : <IconFbDark /> }
                        </div>
                        <h2>You're about to watch a {mediaType} broadcast.</h2>
                        <div className="list_view_wraper">
                            <div className="list_view">
                                <div className="icon"><IconInternet /></div>
                                <p>When you're live on <strong>{mediaType}</strong>, we advise closing it. This will conserve bandwidth and be easier on your computer.</p>
                            </div>
                            <div className="list_view">
                                <div className="icon"><IconMute /></div>
                                <p>If you must have {mediaType} open, <strong>Mute it</strong> so you can't hear yourself</p>
                            </div>
                            <div className="list_view">
                                <div className="icon"><IconTime /></div>
                                <p>Take note that {mediaType} <strong> delays broadcasts by 10 seconds.</strong></p>
                            </div>
                        </div>
                        {mediaSelection === "YT" && youtubeId &&
                            <a target="_self" rel="noreferrer"
                                href={`https://youtube.com/live/${youtubeId}`}
                                className="active_youtube_btn">Continue to {mediaType}
                            </a>
                        }
                        {mediaSelection === "FB" && faceookId &&
                            <a target="_self" rel="noreferrer"
                                href={faceookId}
                                className="active_youtube_btn">Continue to {mediaType}
                            </a>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment >

    );
}

export default YouTubebroadcast;
