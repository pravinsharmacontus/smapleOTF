import React, { useEffect, useState } from 'react';
import '../BannerBackgroundTheme.scss';
import { useSelector } from "react-redux";
import { IconTickLite, Iconplus, ImgBroadcastOverlayBgSm1, ImgBroadcastOverlayBgSm2, ImgBroadcastOverlayBgSm3 } from '../../../../../assets/img';
import { updateBannerTopOverlay } from '../../../../../firebase/firebaseRealtimeFunctions';
import { currentStageArrn, getCurrentOrgId } from '../../../../../helper/utility';
import { updateBannerOverlayImg } from '../../../../../aws/broadcastFunction';
import { getStageData } from '../../../../../aws/awsHelper';

function BannerOverlayTheme(props = {}) {
    const [getSelectedBg, setSelectedBg] = useState(0);
    const { _handleInput = () => { } } = props;
    const awsStageReducer = useSelector((state) => state?.awsStageReducer); //store
    const _stageArn = currentStageArrn(awsStageReducer);
    const temphide = false;
    const broadcastBranding = useSelector((state) => state?.broadcastBranding); //store
    const FbBannerTopOverlay = broadcastBranding?.bannerTopOverlay || 0;

    const handleBannerOverlayImg = (seletedBg = 0) => {
        const awsStageData = awsStageReducer?.method === "create" ? getStageData(awsStageReducer) : awsStageReducer;
        updateBannerTopOverlay(getCurrentOrgId(), _stageArn, seletedBg);
        setSelectedBg(seletedBg);
        updateBannerOverlayImg(seletedBg, awsStageData?.stageArn);
    };

    const handleActiveBaner = () => {
        return (
            <div className='tick_box'>
                <IconTickLite />
            </div>
        );
    };

    useEffect(() => {
        setSelectedBg(FbBannerTopOverlay === "" ? 0 : FbBannerTopOverlay);
    }, [FbBannerTopOverlay]);

    console.log(FbBannerTopOverlay, 'FbBannerTopOverlay');

    return (
        <div className='banner_bg_theme_wraper'>
            <div className="banner_theme_list">
                <button onClick={() => handleBannerOverlayImg(0)} type='buton' className={`banner_theme ${getSelectedBg === 0 ? "selected" : " "}`}>
                    <div className='theme_style'>None</div>
                </button>
                <button onClick={() => handleBannerOverlayImg(1)} type='buton' style={{padding : "3px"}} className={`banner_theme ${getSelectedBg === 1 ? "selected" : " "}`}>
                    <img src={ImgBroadcastOverlayBgSm1} alt="overlay-banner1" />
                    {getSelectedBg === 1 ? handleActiveBaner() : null}
                </button>
                <button onClick={() => handleBannerOverlayImg(2)} type='buton'style={{padding : "3px"}} className={`banner_theme ${getSelectedBg === 2 ? "selected" : " "}`}>
                    <img src={ImgBroadcastOverlayBgSm2} alt="overlay-banner2" />
                    {getSelectedBg === 2 ? handleActiveBaner() : null}
                </button>
                <button onClick={() => handleBannerOverlayImg(3)} type='buton'style={{padding : "3px"}} className={`banner_theme ${getSelectedBg === 3 ? "selected" : " "}`}>
                    <img src={ImgBroadcastOverlayBgSm3} alt="overlay-banner3" />
                    {getSelectedBg === 3 ? handleActiveBaner() : null}
                </button>
                {temphide && <button
                    type="button"
                    onClick={(event) => {
                        event.preventDefault();
                        _handleInput();
                    }}
                    className="choose banner_theme"
                >
                    <i className="plus">
                        <Iconplus />
                    </i>
                    <span>Upload</span>
                </button>}
            </div>
            {temphide && <div className="info">(Recommened size: 1280X720, Max file size: 20MB)</div> }
        </div>
    );
}

export default BannerOverlayTheme;
