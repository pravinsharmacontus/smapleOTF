import React, { useEffect, useState } from "react";
import './EnableYoutube.scss';
import { IconLogo } from "../../../../assets/images";
import { ImgRequestAccess, ImgYoutubeActive } from "../../../../assets/img";

function EnableYoutube(_props = {}) {
    const { className = "", hideHeader = false, _handleClose = () => { }, editStream = false } = _props;
    const [getAuthUser, setAuthUser] = useState("");
    const getAccessToken = JSON.parse(localStorage.getItem('tokenResponse'));
    const getAccessTokenIntegration = JSON.parse(localStorage.getItem('tokenResponse integration'));
    console.log("store getAccessTokenIntegration", getAccessToken?.authuser);
    console.log("getAccessTokenIntegration", getAccessTokenIntegration?.authuser);
    useEffect(() => {
        if (getAccessTokenIntegration) {
            setAuthUser(getAccessTokenIntegration?.authuser);
        } else {
            setAuthUser(getAccessToken?.authuser);
        }
    }, [])
    useEffect(() => {
        return () => {
            localStorage.removeItem('tokenResponse');
            localStorage.removeItem('tokenResponse integration');
        }
    }, [])
    return (
        < React.Fragment >
            <div style={{ marginBottom: hideHeader ? "-22px" : "", overflow : "auto" }} className={`enable_youtube_wraper ${className}`}>
                {!hideHeader ? <div className="enable_youtube_header">
                    <a
                        href="/"
                        rel="noopener noreferrer"
                        className="logo"
                    >
                        <IconLogo />
                    </a>
                </div> : null }
                <div className="enable_youtube_body">
                    <div style={{ padding: hideHeader ? "28px 0px 0px 0px" : "" }} className="enable_youtube_body_inner">
                        {!hideHeader ? <h3>Enable live streaming on Youtube</h3> : null}
                        <p>To stream to youtube, Youtube requires enabling live stream on your channel. To do this, follow these steps:</p>
                        <div className="enable_youtube_content">
                            <div className="enable_youtube_content_inner">
                                <h4 className="heading">1. Go to your YouTube live dashboard by clicking on the below button</h4>
                                <div className="inner">
                                    <a target="_blank" rel="noreferrer"
                                        href={`https://www.youtube.com/signin?authuser=${getAuthUser}&next=%2Flive_dashboard&app=desktop`}
                                        className="action_btn">Open YouTube Live Dashboard
                                    </a>
                                </div>
                            </div>
                            <div className="enable_youtube_content_inner">
                                <h4 className="heading">2. Follow YouTube's steps to enable live streaming</h4>
                                <div className="inner">
                                    <img className="request_image" src={ImgRequestAccess} width="508px" height="288px" alt="integration info " />
                                </div>
                            </div>
                            <div className="enable_youtube_content_inner">
                            <h4 className="heading">3. Once live streaming is enabled, return to OnTheFly and
                                    <button type="button" onClick={() => window.close()}
                                        className="btn_return">connect again </button>. it often takes 24-48 hours to be approved.</h4>
                                <div className="inner">
                                    <img className="request_image" src={ImgYoutubeActive} width="920px" height="578px" alt="integration info " />
                                </div>
                            </div>
                        </div>
                        {/* <Link to="/integration"
                            className="action_btn_return">Return to Integration
                        </Link> */}
                        <button type="button" style={{ marginBottom: !hideHeader ? "0px" : "" }}
                            className="action_btn_return" onClick={() => _handleClose(false)} >{editStream ? "Return to Broadcast" : "Return to Integration"} </button>
                    </div>
                </div>
            </div>
        </React.Fragment >

    );
}

export default EnableYoutube;
