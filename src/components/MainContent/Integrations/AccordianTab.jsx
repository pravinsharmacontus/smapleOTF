import React, { memo } from 'react';
import { IconArrow, IconDisconnect, IconFbDark } from '../../../assets/img';
import { convertToLowerCase } from '../../../helper/Validation';
import { IconInfoSm, ImgProfile } from '../../../assets/images';
import Image from '../../../common/Image';
import SocialReconnect from './SocialReconnect';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ssoYTGmailClientId } from '../../../helper/ApiUrl';
import YTReconnect from './YTReconnect';

function AccordianTab(_props = {}) {
    const { _heading = "", _desc = "", _isAccordionOpen = "", _menuId: isAccordionOpen = "",
        children = "", _icon = <IconFbDark />, _activeId = "", _getDeleteDrop = "",
        _handleAccordion = () => { }, _handleDeleteAcc = () => { }, accountList = [] } = _props;

    return (
        <>
            <h3>{_heading}</h3>
            <div className="accordionbox">
                <div
                    onClick={_handleAccordion}
                    className="accordion_header"
                >
                    <div className="accordion_headerleft">
                        <p>
                            {_desc}
                        </p>
                    </div>
                    <button
                        type="button"
                        className={`${_isAccordionOpen === isAccordionOpen ? " active " : ""
                            }accordion_right`}
                    >
                        <IconArrow />
                    </button>
                </div>
                {_isAccordionOpen === isAccordionOpen && (
                    <div className="accordion_body">
                        <div className="box_row">
                            {children}
                        </div>
                        {accountList?.length > 0 &&
                            <div className='acc_active_list'>
                                {accountList.map((item, index) => {
                                    console.log("qwqw accountList", accountList, accountList.length - 1)
                                    const { id = "", profile = '', name = "", config_type: configType = "",
                                        media_type: mediaType = "", media_name: mediaName = "", media_profile: mediaProfile = "",
                                        media_id: mediaId = "", config_id: configId = "", status = "" } = item;
                                    let accType = "";
                                    if (configType === "page") {
                                        accType = "Facebook Page";
                                    } else {
                                        accType = "Facebook Profile";
                                    }
                                    if (mediaType == "YT") {
                                        accType = "YouTube Channel";
                                    }
                                    return (
                                        <div key={convertToLowerCase(index + "fbAccountList")}
                                            className={` acc_active_li ${id === _activeId ? "active" : " "}`}>
                                            <div type="button" className="acc_active_card">
                                                <div className='acc_active_img_card'>
                                                    <Image className="acc_active_img" placeholderImg={ImgProfile} src={profile || mediaProfile} alt={"acc_active_name"} />
                                                    <i className="acc_acc_img">{_icon}</i>
                                                </div>
                                                <div className='acc_active_info'>
                                                    <strong title={name || mediaName} className='acc_active_name'>{name || mediaName}</strong>
                                                    <span className='acc_active_type'>{accType}</span>
                                                </div>

                                                {status === 2 ?  //status 2 is token expiry and 1 is active account
                                                    <button type='button' className='btn_reconnect'>
                                                        <span className='btn_reconnect_icon'><IconInfoSm /></span>
                                                        <div className={` btn_reconnect_info_toast ${accountList?.length - 1 === index && index !== 0 ? " top " : ""}`}>
                                                            Access to your {mediaType === "FB" ? " Facebook " : " YouTube "}
                                                             account was lost. Please click on reconnect to connect and continue using service.
                                                        </div>
                                                        {mediaType === "FB" ?
                                                            <SocialReconnect
                                                                className={`btn_reconnect_text btn_reconnect p-0`}
                                                                textActionButton={"Reconnect"}
                                                                scope={"public_profile,publish_video"}
                                                                type={configId ? "page" : ""}
                                                                reconnectItems={{ mediaId, mediaType, configId, configType }}
                                                            />
                                                            :
                                                            // // <strong className='btn_reconnect_text' onClick={() => youtubeReconnect()}>Reconnects</strong>
                                                            <GoogleOAuthProvider clientId={ssoYTGmailClientId}>
                                                                <YTReconnect />
                                                            </GoogleOAuthProvider>
                                                        }
                                                    </button>
                                                    :
                                                    null
                                                }
                                                <div className="relative drop_action_wraper">
                                                    <button
                                                        title="Disconnect"
                                                        className={`drop_action_btn ${_getDeleteDrop === id ? "active" : ""
                                                            }`}
                                                        type="button"
                                                        onClick={() => _handleDeleteAcc(mediaId, true, name || mediaName, configType, mediaType, configId)}
                                                    >
                                                        <IconDisconnect />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        }
                    </div>
                )}
            </div>
        </>
    );
}

export default memo(AccordianTab);
