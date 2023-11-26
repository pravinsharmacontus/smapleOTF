import React from 'react';
import "./BroadcastBrandDetails.scss";
import BroadcastBrand from './BroadcastBrand';
import BroadcastChat from './BroadcastChat';
import ParticipantsList from './ParticipantsList';
import "./ShareVideo.scss";
import ShareLiveBroadcast from './ShareLiveBroadcast';

function BroadcastBrandDetails(_props = {}) {
    const { isHost = false, _handleMenusOpen = () => { }, getMenus = '', getMenusOpen = false, handleLayoutViewType = () => { }, handleResizedImage = () => { },
        getvideoDetailsEle = {}, getSelectedUrl = "", getSelectedThumb = "", playData = {},
        handleInput = () => { }, getBannerText = "", videoId = "", disableClick = false,
        _handleAudioMute = () => { },
        _handleVideoMute = () => { },
        getGoLive,
        muteStatus
    } = _props;
    return (
        <>
            <div style={{ display: (getMenus === "" || !getMenusOpen) ? "none" : "block" }}
                onClick={_handleMenusOpen} className="broadcast_video_outside_click"></div>
            <div id="broadcast_video_info" className={`broadcast_video_info ${getMenus === "" || !getMenusOpen ? " hidden " : " open "}`}>
                <div className='broadcast_video_info_header'>
                    <h3> {getMenus === 'Brand' && isHost ? "Brand" : null}
                        {getMenus === "Chat" ? "Private Chat" : null}
                        {getMenus === "Participants" ? "Participants" : null}
                        {getMenus === "Share" ? "Share" : null}
                    </h3>
                </div>
                <div className='broadcast_video_info_inner' style={{ padding: getMenus !== 'Brand' ? " 0px " : "" }}>
                    {getMenus === 'Brand' && isHost ? <BroadcastBrand
                        handleResizedImage={handleResizedImage}
                        getBannerText={getBannerText}
                        _handleInput={handleInput}
                        disableClick={disableClick}
                        handleLayoutViewType={(e) => handleLayoutViewType(e)} /> : null}
                    {getMenus === "Chat" ? <BroadcastChat /> : null}
                    {getMenus === "Participants" ? <ParticipantsList
                        muteStatus={muteStatus}
                        _handleAudioMute={(e) => _handleAudioMute(e)}
                        _handleVideoMute={(e) => _handleVideoMute(e)}
                        isHost={isHost}
                        getGoLive={getGoLive} /> : null}
                    {getMenus === "Share" ?
                        <ShareLiveBroadcast
                            _videoId={videoId}
                            shareLiveUrl={true}
                            getvideoDetailsEle={getvideoDetailsEle}
                            getSelectedUrl={getSelectedUrl}
                            getSelectedThumb={getSelectedThumb}
                            playData={playData}
                            getMenusOpen={getMenusOpen}
                        />
                        : null}
                </div>
            </div>
        </>
    );
}

export default BroadcastBrandDetails;
