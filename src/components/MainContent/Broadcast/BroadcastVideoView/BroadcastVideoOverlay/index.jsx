import React, { useEffect, useState } from 'react';
import "./BroadcastVideoOverlay.scss";
import { ImgBroadcastOverlayBg1, ImgBroadcastOverlayBg2, ImgBroadcastOverlayBg3, ImgTransparent } from '../../../../../assets/img';

function BroadcastVideoOverlay(props) {
    const { FbBannerTopOverlay = 0 } = props;
    const [getBannerImage, setBannerImage] = useState(ImgTransparent);
    useEffect(() => {
        switch (FbBannerTopOverlay) {
            case 0:
                setBannerImage(ImgTransparent);
                break;
            case 1:
                setBannerImage(ImgBroadcastOverlayBg1);
                break;
            case 2:
                setBannerImage(ImgBroadcastOverlayBg2);
                break;
            case 3:
                setBannerImage(ImgBroadcastOverlayBg3);
                break;
            default:
                setBannerImage(ImgTransparent);
                break;
        }
    }, [FbBannerTopOverlay]);

    return (
        <div className='broadcast_video_overlay'>
            <img src={getBannerImage} alt="banner-overlay" />
        </div>
    );
}

export default BroadcastVideoOverlay;
