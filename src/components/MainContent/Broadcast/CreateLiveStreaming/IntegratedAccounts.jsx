import React, { useEffect, useState } from "react";
import "./CreateLiveStreaming.scss";
import Modal from "../../../../common/Modal";
import AnimatePopup from "../../../../common/AnimatePopup";
import {
    IconX,
} from "../../../../assets/img";
import { convertToLowerCase } from "../../../../helper/Validation";
import { FacebookIcon, IconInfo5, IconInfoSm, ImgProfile, YoutubeIcon } from "../../../../assets/images";
import Image from "../../../../common/Image";
import CommonCheckbox from "../../../Common/CommonCheckbox";
import store from "../../../../store";
import SocialReconnect from "../../Integrations/SocialReconnect";
import YTReconnect from "../../Integrations/YTReconnect";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ssoYTGmailClientId } from "../../../../helper/ApiUrl";

function IntegratedAccounts(_props = {}) {
    const {
        AddAccComponent = '',
        _handleOnOutsideClick = () => { },
        socialMediaList = [],
        handleChooseMedia = () => { },
        connectedId = "",
        errorsCount = ""
    } = _props;

    const tempHide = false;
    const isEnableMultiSelect = false;
    const [selectMediaId, setSelectMediaId] = useState(false);
    const [getDelayShow, setDelayShow] = useState(false);
    const [chatCheckBox, setChatCheckBox] = useState(false);
    const [getConnectMedia, setConnectMedia] = useState(connectedId);
    const [getConnectedMediaType, setConnectedMediaType] = useState(false);
    const handleCheckbox = (id = {}, mediaType = "") => {
        setChatCheckBox(id);
        setSelectMediaId(id);
        setConnectedMediaType(mediaType);
        setConnectMedia(id);
    };

    useEffect(() => {
        setTimeout(() => {
            store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
        }, 300);
        setTimeout(() => {
            store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
            setDelayShow(true);
        }, 1000);
    }, []);

    return (
        <>
            <Modal>
                <AnimatePopup
                    setShow={true}
                    _handleOnOutsideClick={() => _handleOnOutsideClick()}
                >
                    <div
                        className={`  create_live_streaming integrated_accounts_list`}
                    >
                        {errorsCount ? <div className="integrated_alert open">
                            <span className="integrated_alert_icon">
                                <IconInfo5 />
                            </span>
                            <div className="integrated_alert_text">
                                {errorsCount > 0 ? `${errorsCount} Errors! OnTheFly has lost access to some of your social media accounts` : null}
                            </div>
                        </div> : null}
                        <button
                            onClick={_handleOnOutsideClick}
                            className="action_close"
                            type="button"
                        >
                            <IconX />
                        </button>

                        <div className="create_live_streaming_inner">
                            <div className="create_live_streaming_head">
                                <h2>
                                    Integrated Social Accounts
                                    {socialMediaList?.length > 0 ? <span className="create_live_streaming_count">
                                        ({socialMediaList?.length > 9 ? socialMediaList?.length : `0${socialMediaList?.length}`})
                                    </span>
                                        : null}
                                </h2>
                                <p>
                                    {isEnableMultiSelect ?
                                        "You can multiselect the accounts where you want to go live" :
                                        "You are limited to choosing one account to go live with."
                                    }
                                </p>
                            </div>
                            {AddAccComponent}
                            <div className="create_live_streaming_body">
                                <form action="">
                                    {console.log(socialMediaList, "socialMediaList")}
                                    {socialMediaList?.length > 0 ?
                                        <div className="account_list_sm">
                                            {socialMediaList?.length > 0 && getDelayShow &&
                                                socialMediaList.map((item, index) => {
                                                    const { profile = "", config_id: configId = "", name = "",
                                                        config_type: configType = "", media_type: mediaType = "",
                                                        media_name: mediaName = "", media_profile: mediaProfile = "", media_id: mediaId = "", status = "" } = item;
                                                    let accType = "";
                                                    const accId = configId ? configId : mediaId;
                                                    if (configType === "page") {
                                                        accType = "Facebook Page";
                                                    } else {
                                                        accType = "Facebook Profile";
                                                    }
                                                    if (mediaType === "YT") {
                                                        accType = "YouTube Channel";
                                                    }
                                                    return (
                                                        <button
                                                            style={{ cursor: status === 2 ? "default" : "" }}
                                                            type="button"
                                                            onClick={() => { status !== 2 && handleCheckbox((accId === chatCheckBox) ? "-1" : accId, mediaType); }}
                                                            className={` ${status === 2 ? "noclick" : " "} 
                                                            ${((accId === chatCheckBox || accId === getConnectMedia) && status === 1) ?
                                                                    " active " : " not_selected "} 
                                                        acc_info_wraper  button`}
                                                            key={convertToLowerCase(index + "socialMediaList")}
                                                        >
                                                            <div
                                                                className={` ${((accId === chatCheckBox || accId === getConnectMedia) && status === 1) ? " active " : " "}
                                                                acc_info_list `}
                                                            >
                                                                <div className="acc_icon">
                                                                    {mediaType === "YT" ? <YoutubeIcon /> : <FacebookIcon />}
                                                                    <Image className="userinfo_img"
                                                                        placeholderImg={ImgProfile}
                                                                        src={profile || mediaProfile}
                                                                        alt={"profile"} />
                                                                </div>
                                                                <div className="acc_info">
                                                                    <h4 title={name || mediaName}>{name || mediaName}</h4>
                                                                    <h5>{accType}</h5>
                                                                </div>
                                                                {status === 2 ? //status 2 is token expiry and 1 is active account
                                                                    <button type='button' className='btn_reconnection'>
                                                                        <span className='btn_reconnection_icon'><IconInfoSm /></span>
                                                                        <div className={`btn_reconnection_info_toast
                                                                          ${(socialMediaList?.length - 1 === index && index !== 0) ? " top " : " "}`}>
                                                                            Access to your {mediaType === "FB" ? " Facebook " : " YouTube "}
                                                                            account was lost. Please click on reconnect to connect
                                                                            and continue using service.
                                                                        </div>
                                                                        {mediaType === "FB" ?
                                                                            <SocialReconnect
                                                                                className={`btn_reconnection p-0`}
                                                                                textActionButton={"Reconnect"}
                                                                                scope={"public_profile,publish_video"}
                                                                                type={configId ? "page" : ""}
                                                                                reconnectItems={{ mediaId, mediaType, configId, configType }}
                                                                            />
                                                                            :
                                                                            <GoogleOAuthProvider clientId={ssoYTGmailClientId}>
                                                                                <YTReconnect />
                                                                            </GoogleOAuthProvider>
                                                                        }
                                                                    </button>
                                                                    :
                                                                    null
                                                                }
                                                            </div>
                                                            {tempHide && <CommonCheckbox
                                                                parentClass={"acc_checkbox"}
                                                                id="agree_terms"
                                                                name="chatCheckBox"
                                                                checkVal={mediaId === chatCheckBox}
                                                            />}
                                                        </button>
                                                    );
                                                })
                                            }
                                        </div>
                                        : <>
                                            <div className="account_list_empty" style={{ opacity: getDelayShow ? 1 : 0 }}>
                                                <h5>Sorry, No social accounts linked yet to go live!</h5>
                                                <p>Please click on the above button to integrate your multiple social accounts and go live to engage with your audience.</p>
                                            </div>
                                        </>
                                    }
                                    {socialMediaList?.length > 0 ? <div className="action_create_broadcast_wraper">
                                        <button
                                            className="action_create_broadcast"
                                            onClick={() => { handleChooseMedia(selectMediaId, getConnectedMediaType); _handleOnOutsideClick(); }}
                                            type="button"
                                        >
                                            Save
                                        </button>
                                    </div> : null}
                                </form>
                            </div>
                        </div>
                    </div>
                </AnimatePopup>
            </Modal>
        </>
    );
}

export default IntegratedAccounts;
