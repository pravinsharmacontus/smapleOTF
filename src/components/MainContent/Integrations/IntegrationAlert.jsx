import React, { useEffect, useState, memo } from 'react';
import { IconInfo5, IconX } from '../../../assets/images';

function IntegrationAlert(_props = {}) {
    const { errorsCount = "", _handleAlertClose = () => { }, alertState = false, } = _props;
    const [getAnimate, setAnimate] = useState(false);
    const [getAnimateClose, setAnimateClose] = useState(false);
    useEffect(() => {
        if (!alertState) {
            setAnimate(false);
            setTimeout(() => {
                setAnimateClose(false);
            }, 2000);
        }
        else {
            setAnimateClose(true);
            setTimeout(() => {
                setAnimate(true);
            }, 500);
        }
    }, [alertState]);
    return (<>
        {getAnimateClose ?
            <div className={`${getAnimate ? "open" : "close"} integration_box_alert `}>
                <div className="integration_box_alert_body">
                    <span className="integration_box_alert_icon">
                        <IconInfo5 />
                    </span>
                    <div className="integration_box_alert_text">
                        {errorsCount} Errors! OnTheFly has lost access to some of your social media accounts
                    </div>
                    <button onClick={_handleAlertClose} title="close" className="integration_box_alert_close">
                        <IconX />
                    </button>
                </div>
            </div>
            : null
        }
    </>
    );
}

export default memo(IntegrationAlert);
