import React, { useEffect, useState } from 'react';
import Modal1 from '../../../../../common/Modal/Modal1';
import AnimatePopup from '../../../../../common/AnimatePopup';
import { IconScreenShare } from '../../../../../assets/img';
import Ripples from 'react-ripples';
import "./ScreenShare.scss";
import { initialScreenShare, leaveScreenShare } from '../../../../../aws/ivsfunctions';
import { useSelector } from 'react-redux';
import { awsApi } from '../../../../../aws/awsApiSupport';
import { updateScreenShare } from '../../../../../firebase/firebaseRealtimeFunctions';
import { filteredSSDate, getCurrentOrgId, getCurrentUserId } from '../../../../../helper/utility';
import { closeScreenShareAlert } from '../../../../../common/helper';
import { ToastService } from '../../../../../common';
import { IconToastInfo } from '../../../../../assets/images';

function ScreenSharing(props = {}) {
    const [getScreenSharePopup, setScreenSharePopup] = useState(false);
    const awsStageReducer = useSelector((state) => state?.awsStageReducer); //store
    const broadcastBranding = useSelector((state) => state?.broadcastBranding); //store
    const fbIsScreenShare = broadcastBranding?.isScreenShare || false;
    const participants = useSelector((state) => state?.stageParticipants); //store
    const fbHlsLink = broadcastBranding?.hlsLink || false;

    const handleScreenSharingPopup = async (state) => {
        if (!state) {
            await leaveScreenShare();
        }
        setScreenSharePopup(state);
    };
    const handleScreenSharingAction = async (state) => {
        setScreenSharePopup(false);
        updateScreenShare(getCurrentOrgId(), getCurrentUserId())
        const screenShareToken = await awsApi(awsStageReducer)
        initialScreenShare(screenShareToken);
    };
    const tooltipFunc = () => {
        if (fbIsScreenShare) {
            if (fbIsScreenShare === getCurrentUserId()) {
                return `You are Presenting the screen`
            }
            const SSData = filteredSSDate(participants)
            return SSData?.length > 0 ? <><span title={SSData[0]?.attributes?.displayName} className='text_controler '>{SSData[0]?.attributes?.displayName}</span> is Presenting</>
                : `Someone is trying to Present`
        } else {
            return "Screen Share"
        }
    }
    useEffect(() => {
        if (fbIsScreenShare !== getCurrentUserId()) {
            if (getScreenSharePopup) {
                setScreenSharePopup(false);
                ToastService.infoToastblue((
                    <div className="customToast">
                        <i className="info">
                            <IconToastInfo />
                        </i>
                        <p>{`Someone has initialized to Present in the ${fbHlsLink ? " live stream" : " broadcast "}`}</p>
                    </div>
                ));
                closeScreenShareAlert()
            }
        }
    }, [fbIsScreenShare])

    return (
        <>
            <div className="action_feild">
                <button
                    onClick={async (e) => {
                        e.target.blur();
                        await handleScreenSharingPopup(!fbIsScreenShare);
                    }}
                    className={`default setting tooltip_black_wraper ${fbIsScreenShare ? " active " : " "
                        } ${false ? " _disabled_btn" : " "
                        } `}
                    type="button"
                    style={{ cursor: false ? "default" : "" }}
                >
                    <IconScreenShare style={{ width: "19px", height: "19px" }} />
                    <div className="tooltip_black flex full" style={{ whiteSpace: "nowrap" }}>{tooltipFunc()}</div>
                </button>
            </div>
            {getScreenSharePopup ?
                <Modal1>
                    <AnimatePopup
                        parentClass={"common_action_popup"}
                        setShow={true}
                        _handleOnOutsideClick={async () => await handleScreenSharingPopup(false)}
                    >
                        <div>
                            <div style={{ width: "461px" }} className="ActionPopupInner ">
                                <div className="Action_popup_header">
                                    <div className="danger icon">
                                        <IconScreenShare style={{ color: "#FF4747" }} />
                                    </div>
                                    <h4>Screen Share</h4>
                                </div>
                                <div className='screen_share_content'>
                                    <p style={{ width: "360px", maxWidth: "360px" }} className='medium'>While sharing your screen:</p>
                                    <p style={{ width: "360px", maxWidth: "360px" }}>- Make sure to always share the proper resolution. </p>
                                    <p style={{ width: "360px", maxWidth: "360px" }}>- Screen sharing works best on a good computer.</p>
                                </div>
                                <div className="group-btn">
                                    <Ripples className="li">
                                        <button
                                            type="button"
                                            className="btn-Blue sm red"
                                            onClick={() => handleScreenSharingAction()}
                                        >
                                            Share Screen
                                        </button>
                                    </Ripples>
                                    <Ripples className="li">
                                        <button
                                            type="button"
                                            className="btn-cancel sm cancel"
                                            onClick={() => setScreenSharePopup(false)}

                                        >
                                            Cancel
                                        </button>
                                    </Ripples>
                                </div>
                            </div>
                        </div>
                    </AnimatePopup>
                </Modal1>
                : null}
        </>
    );
}

export default ScreenSharing;
