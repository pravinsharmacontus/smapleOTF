import React from 'react';
import { convertToLowerCase } from '../../../../helper/Validation';
import OutsideClickHandler from 'react-outside-click-handler';
import LabelTooptip from '../../../../common/LabelTooptip';
import { useTranslation } from "react-i18next";
import "./CreateLiveStreaming.scss";
import {
  IconX,
  Iconplus,
} from "../../../../assets/img";
import {
  FacebookIcon,
  IconXCircle,
  ImgCustomerPlaceholer,
  ImgProfile,
  LinkedInIcon,
  YoutubeIcon,
} from "../../../../assets/images";
import Ripples from "react-ripples";
import Image from "../../../../common/Image";

const AddAccComponent = (props = {}) => {
    const {
        customButton = false,
        handleAccConnectMenuClose = () => { },
        handleAccConnectMenu = () => { },
        getAccConnectMenu,
        getAccDropMenu,
        selectedMediaList,
        handleRemoveAcc = () => { },
        _handleConnectAccount = () => { },
        googleLogin = () => { },
        getSelectedAcc,
        getEditFbId,
        youtubeDropdown = false
    } = props;
    const tempHide = false;
    const refreshPage = () => { console.log(submitStatus, "refreshPage") };
    const { t } = useTranslation();

    return (<>
      <fieldset className="custom_action_wraper">
        <div className="custom_action_wraper_inner custom_width">
          <OutsideClickHandler
            onOutsideClick={() => handleAccConnectMenuClose()}
          >
            <div className={` invite_member_wraper custom_action single_btn_action`}>
              <div className="action_invite_acc_list">
                {customButton ?
                  <div className="action_custom">
                    <button
                      onClick={() => {
                        handleAccConnectMenu();
                      }}
                      className={`action_invite_member_custom ${getAccConnectMenu && getAccDropMenu
                        ? "active"
                        : ""
                        }`}
                      type="button"
                    >
                      <span>Add New Social Account</span>
                    </button>
                  </div>
                  :
                  <div className="action_invite_member_list">
                    <div className="head_info">
                      <span>{t("Link Social Media")}</span>
                      <LabelTooptip
                        minHeight={"50px"}
                        iconType="question"
                        tooltipDesc={
                          "Linking social media will give access to live stream in selected social media platform."
                        }
                      />
                    </div>
                    <button
                      onClick={() => {
                        handleAccConnectMenu();
                      }}
                      className={`action_invite_member ${getAccConnectMenu && getAccDropMenu
                        ? "active"
                        : ""
                        }`}
                      type="button"
                    >
                      <Iconplus />
                      <span>Connect Account</span>
                    </button>
                  </div>
                }

                {tempHide && (
                  <>
                    <div className="button _disable">
                      <button
                        type="button"
                        className="icon_button"
                      >
                        <LinkedInIcon />
                      </button>
                      <button
                        className="remove_acc"
                        type="button"
                      >
                        <IconXCircle />
                      </button>
                      <img
                        className="userinfo_img"
                        src={ImgCustomerPlaceholer}
                        alt="profile"
                      />
                    </div>
                  </>
                )}
              </div>
              {!customButton && <div className="account_list">
                {youtubeEnable || getYTAuthToken || tempHide ? (<>
                  <div
                    className={` acc_info_wraper button ${getSelectedAcc === "youtube" ? " " : " not_selected"} `}
                  >
                    <button
                      onClick={() =>
                        handleSelectedAcc("", "", "youtube")
                      }
                      type="button"
                      className={`  ${getSelectedAcc === "youtube" ? " active " : " "}  acc_info_list`}
                    >
                      <div className="acc_icon">
                        <YoutubeIcon />
                        <Image className="userinfo_img"
                          placeholderImg={ImgProfile}
                          src={ImgProfile}
                          alt={"profile"} />
                      </div>
                      <div className="acc_info">
                        <h4 title={"name"}>{"name"}</h4>
                        <h5>Youtube Channel</h5>
                      </div>
                    </button>
                    {tempHide && <button
                      className="acc_remove"
                      type="button"
                    >
                      <IconX />
                    </button>}
                  </div>
                </>
                ) : null}
                {selectedMediaList?.length > 0 && selectedMediaList[0] !== undefined &&
                  selectedMediaList.map((item, index) => {
                    const { id = "", profile = "", name = "", media_type: mediaType = "", config_type: configType = "",
                      media_name: mediaName = "", media_profile: mediaProfile = "", media_id: mediaId = "",
                    } = item;
                    let accType = "";
                    if (configType === "page") {
                      accType = "Facebook Page";
                    } else {
                      accType = "Facebook Profile";
                    }
                    if (mediaType == "YT") {
                      accType = "YouTube Channel";
                    }
                    // // const getFBconnected = JSON.parse(localStorage.getItem("EditConnectedFB"));
                    return (
                      <div
                        className={` acc_info_wraper button ${!(getSelectedAcc === mediaId && id === getEditFbId)
                          ? " active "
                          : " not_selected"
                          } `}
                        key={convertToLowerCase(index + "socialMediaList")}
                      >
                        <button
                          // onClick={() =>
                          //   handleSelectedAcc(id, config_id, media_type)
                          // }
                          type="button"
                          className={` ${(getSelectedAcc === mediaType && id === getEditFbId) ? " active " : " "}  acc_info_list`}
                        >
                          <div className="acc_icon">
                            {mediaType === "YT" ? <YoutubeIcon /> : <FacebookIcon />}
                            <Image className="userinfo_img"
                              placeholderImg={ImgProfile}
                              src={profile || mediaProfile}
                              alt={"profile"} />
                          </div>
                          <div className="acc_info">
                            <h4 title={name}>{name || mediaName || "No name"}</h4>
                            <h5>{accType}</h5>
                          </div>
                        </button>
                        {<button
                          className="acc_remove"
                          type="button"
                          onClick={() => handleRemoveAcc(id)}
                        >
                          <IconX />
                        </button>}
                      </div>
                    );
                  })
                }
              </div>}
              {getAccConnectMenu && getAccDropMenu ? (
                <div className="drop">
                  <>
                    {!tempHide && (
                      <Ripples
                        color="#105ef126"
                        className="button"
                        onClick={() => {
                          _handleConnectAccount("FacebookPage");
                        }}
                        type="button"
                      >
                        <button className="" type="button">
                          <i>
                            <FacebookIcon />
                          </i>
                          <span>Facebook Page</span>
                        </button>
                      </Ripples>
                    )}
                    {tempHide && (
                      <Ripples
                        color="#105ef126"
                        className="button"
                        onClick={() => {
                          _handleConnectAccount("FacebookGroup");
                        }}
                        type="button"
                      >
                        <button className="" type="button">
                          <i>
                            <FacebookIcon />
                          </i>
                          <span>Facebook Group</span>
                        </button>
                      </Ripples>
                    )}
                    {!tempHide && (
                      <Ripples
                        color="#105ef126"
                        className="button"
                        onClick={() => {
                          _handleConnectAccount("FacebookProfile");
                        }}
                        type="button"
                      >
                        <button className="" type="button">
                          <i>
                            <FacebookIcon />
                          </i>
                          <span>Facebook Profile</span>
                        </button>
                      </Ripples>
                    )}
                    <Ripples
                      color="#105ef126"
                      className="button"
                      onClick={() => {
                        if (youtubeDropdown) {
                          refreshPage();
                        } else {
                          googleLogin();
                          handleAccConnectMenu();
                        }
                      }}
                      type="button"
                    >
                      <button className="" type="button">
                        <i>
                          <YoutubeIcon />
                        </i>
                        <span>Youtube Channel</span>
                      </button>
                    </Ripples>
                    {tempHide && (<> <button
                      onClick={() =>
                        _handleConnectAccount("LinkedInPage")
                      }
                      type="button"
                    >
                      <i>
                        <LinkedInIcon />
                      </i>
                      <span>
                        {t("BROADCAST.LINKEDIN_PAGE")}
                      </span>
                    </button>
                      <button
                        onClick={() =>
                          _handleConnectAccount(
                            "LinkedInProfile"
                          )
                        }
                        type="button"
                      >
                        <i>
                          <LinkedInIcon />
                        </i>
                        <span>
                          {t("BROADCAST.LINKEDIN_PROFILE")}
                        </span>
                      </button>
                    </>)
                    }
                  </>
                </div>
              ) : null}
            </div>
          </OutsideClickHandler>
        </div>
      </fieldset>
    </>
    );
  };

  export default AddAccComponent;
