import React from "react";
import './EnableYoutube.scss';
import { IconLogo } from "../../../../assets/images";

function ActivateYoutube(_props = {}) {

    const { _handleClose = () => { }, hideHeader = false } = _props;

    return (
        < React.Fragment >
            <div style={{ marginBottom: hideHeader ? "-20px" : "" }} className="enable_youtube_wraper">
                {!hideHeader ? <div className="enable_youtube_header">
                    <a
                        href="/"
                        rel="noopener noreferrer"
                        className="logo"
                    >
                        <IconLogo />
                    </a>
                </div> : ""}
                <div style={{ padding: hideHeader ? "0px" : "" }} className="active_youtube_body">
                    <div className="active_youtube_body_inner">
                        <h2>Waiting for YouTube to activate your account</h2>
                        <p>if you just enabled live streaming you will need to wait <strong>24-48hrs</strong> for youtube to activate your account.
                            Try connecting your channel again in <strong>24 hours</strong>.</p>
                            <button style={{ marginBottom: hideHeader ? "0px" : "" }}
                            type="button" className="active_youtube_btn" onClick={_handleClose} >Return to Dashboard</button>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
}

export default ActivateYoutube;
