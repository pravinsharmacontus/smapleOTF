import React from "react";
import './EnableYoutube.scss';
import Lottie from 'lottie-react';
import { LottieTick } from "../../../../assets/img";
import { IconLogo } from "../../../../assets/images";

function AccountConnected(_props = {}) {

    const { _hideHeader = false } = _props;

    return (
        < React.Fragment >
            <div className="enable_youtube_wraper">
            {!_hideHeader ? <div className="enable_youtube_header">
                    <a
                        href="/"
                        rel="noopener noreferrer"
                        className="logo"
                    >
                        <IconLogo />
                    </a>
                </div> : null }
                <div className="active_account_body">
                    <div className="active_account_body_inner">
                        <Lottie
                            className="icon_animate"
                            animationData={LottieTick}
                            loop={true}
                        />
                        <h3>Connected to YouTube Channel</h3>
                    </div>
                </div>
            </div>
        </React.Fragment >

    );
}

export default AccountConnected;
