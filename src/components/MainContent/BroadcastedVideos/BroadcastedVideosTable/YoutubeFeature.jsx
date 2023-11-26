import React from "react";
import './EnableYoutube.scss';
import { IconLogo } from "../../../../assets/images";

function YoutubeFeature(_props = {}) {

    function handleMenu(url = "") {
        window.open(url, "", "width=800, height=720");
    }

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
                        <button onClick={() => handleMenu("http://localhost:3000/activate-youtube")}
                            className="active_youtube_btn" type="button">Waiting for YouTube</button>
                        <button onClick={() => handleMenu("http://localhost:3000/enable-youtube")} className="active_youtube_btn" type="button">Enable live streaming</button>
                        <button onClick={() => handleMenu("http://localhost:3000/account-connected")} className="active_youtube_btn" type="button">Connected to YouTube</button>
                    </div>
                </div>
            </div>
        </React.Fragment >

    );
}

export default YoutubeFeature;
