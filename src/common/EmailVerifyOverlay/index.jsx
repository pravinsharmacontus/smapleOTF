import React, { useEffect, useState } from 'react';
import './EmailVerifyOverlay.scss';
import { IconTriangle2 } from '../../assets/images';

const EmailVerifyOverlay = (props = {}) => {
    const {
        globalData = {}
    } = props;
    const [view, setView] = useState(false);
    const { CusPage = {} } = globalData;
    const { customerDtls: { emailId = "" } = {} } = CusPage;

    useEffect(() => {
        setTimeout(() => {
            setView(true);
        }, 1200);
        document && document.getElementById("SideMenuWrapper") && document.getElementById("SideMenuWrapper").classList.add('overlayView');
        return () => {
            setView(false);
            document && document.getElementById("SideMenuWrapper") && document.getElementById("SideMenuWrapper").classList.remove('overlayView');
        };
    }, []);

    return (
        <React.Fragment>
            <div
                style={{ display: `${view ? "flex" : "none"}` }}
                className='email_verify_overlay'
            >
                <div className='email_verify_overlay_inner'>
                    <div className='email_verify_overlay_header'>
                        <div className='email_verify_content'>
                            <IconTriangle2 />
                            <p>Verify your mail address. We have sent an mail to
                                <strong>{" "}"{emailId}"{" "}</strong>
                                please click on the link to activate your account
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default EmailVerifyOverlay;
