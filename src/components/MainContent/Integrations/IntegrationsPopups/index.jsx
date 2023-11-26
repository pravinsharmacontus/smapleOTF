import React, { useState } from "react";
import "./FacebookPopups.scss";
import ActionCommonPopup from "../../ActionCommonPopup";
import {
  IconConnect,
  IconLock,
  IconShareRounded,
  LottieConnected,
} from "../../../../assets/img";
import { ImgProfile } from "../../../../assets/images";
import { convertToLowerCase } from "../../../../helper/Validation";
import Lottie from "lottie-react";
import ImgOnTheFlyAppCard from "./img/add.png";
import { ReactComponent as IconTick } from "./img/tick.svg";
import { useSelector } from "react-redux";
import ImgOnTheFlyAdd from "./img/app.png";
import FbPermissionAction from "./FbPermissionAction";
import Image from "../../../../common/Image";
import AutoFocusUtility from "../../../../helper/AutoFocusUtility";

const PermissionsCommon = (props = {}) => {
  const { permissionFor = "" } = props;
  return (
    <>
      <AutoFocusUtility/>
      <div className="action_head">
        <i className="delete">
          <IconLock />
        </i>
        <strong>Facebook Permissions</strong>
      </div>
      <p style={{ marginTop: "20px", marginBottom: permissionFor === "profile" ? "6px" : "" }} className="desc">
        You need to grant a few permissions to connect a {" "}
        <strong>Facebook {permissionFor}</strong>. You'll also need to grant permissions to your timeline.
      </p>
      {permissionFor !== "profile" &&
        <p className="desc" style={{ marginTop: "20px" }}>
          Don't worry, <strong> we will never post to your timeline</strong> unless
          you connect your profile separately.
        </p>
      }
    </>
  );
};

const ConnectedCommon = (props = {}) => {
  const { connectedTo = "" } = props;
  return (
    <>
      <div className="facebook_acc_success">
        <Lottie
          className="icon_animate"
          animationData={LottieConnected}
          loop={true}
        />
        <h4 className="facebook_status">Connected to Facebook {connectedTo}</h4>
      </div>
    </>
  );
};

const IntegrationsPopups = (props) => {
  const {
    _handleAction = () => { },
    _handleClose = () => { },
    _type = "",
    activePage = () => { },
    choosePage = () => { },
    fbId = () => { },
    fbGroupId
  } = props;
  const [chooseId, setChooseId] = useState();

  const FacebookPermissions = ({ permissionFor = "", scope = "" }) => {
    return (
      <ActionCommonPopup
        handleAction={_handleAction}
        handleClose={_handleClose}
        onExited={_handleClose}
        parentClass="md"
        btnBlue={true}
        popupAction={_type}
        customActionComponent={<FbPermissionAction
          activePages={activePage}
          className={`Btn outline blue`}
          textActionButton={"Connect Facebook"}
          type={permissionFor}
          scope={scope}
        />}
      >
        <PermissionsCommon permissionFor={permissionFor} />
      </ActionCommonPopup>
    );
  };

  const ChooseFacebookPage = (fbPageDetails) => {
    const handleSelectedPage = async (selectId) => {
      choosePage(fbPageDetails, selectId);
      setChooseId(selectId);
    };
    const globalData = useSelector((state) => state) || {};
    const { fbPageList } = globalData?.facebookData?.facebookPageList || {};
    return (
      <ActionCommonPopup
        handleAction={_handleAction}
        handleClose={_handleClose}
        onExited={() => _handleClose(false)}
        parentClass="md"
        enableCancelButton={false}
        textActionButton={"Done"}
      >
        <div className="action_head">
          <i className="delete">
            <IconShareRounded />
          </i>
          <strong>Choose a Facebook page</strong>
        </div>
        <p className="desc">
          Choose the page you would like to connect to OnTheFly.
        </p>
        <div className="facebookpage_list">
          {fbPageList?.length > 0 && fbPageList !== undefined &&
            fbPageList.map((item, index) => {
              const { id = "", profile = "", name = "", accType = "Page", connected = false } = item;
              return (
                <button
                  type="button"
                  onClick={connected ? () => { } : () => handleSelectedPage(id)}
                  key={convertToLowerCase(index + "fbPageList")}
                  color="#1EAC8F10"
                  className={`b-r-30 fb_page_li ${connected ? "_disabled_btn_" : ""} ${id === chooseId ? "active" : " "
                    }`}
                >
                  <div
                    className="fb_page_card"
                  >
                    <div className="fb_page_img_card">
                      <Image className="fb_page_img" placeholderImg={ImgProfile} src={profile || ImgProfile} alt={"fb_page_name"} />
                    </div>
                    <div className="fb_page_info">
                      <strong title={name} className="fb_page_name">
                        {name}
                      </strong>
                      <span className="fb_page_type">{accType}</span>
                    </div>
                    {connected ? (
                      <div className="fb_page_status">
                        <strong>Connected</strong>
                      </div>
                    ) : null}
                    {id === chooseId ? (
                      <div className="fb_page_status">
                        <IconTick />
                      </div>
                    ) : null}
                  </div>
                </button>
              );
            })}
        </div>
      </ActionCommonPopup>
    );
  };

  const FacebookNotFound = (connectedTo = "") => {
    return (
      <ActionCommonPopup
        handleAction={_handleAction}
        handleClose={_handleClose}
        onExited={() => _handleClose(false)}
        parentClass="md"
        btnBlue={true}
        textCancelButton="Close"
        textActionButton={`Create a Facebook ${connectedTo}`}
      >
        <div className="action_head">
          <i className="delete">
            <IconConnect />
          </i>
          <strong>Facebook {connectedTo} not found</strong>
        </div>
        <p className="desc">
          We couldn't find any <strong>Facebook {connectedTo}</strong> linked to your
          account. You must be an admin of facebook page to show up here.
        </p>
      </ActionCommonPopup>
    );
  };

  const AddOntheflYFacebookGroup = (groupId) => {
    return (
      <ActionCommonPopup
        handleAction={_handleAction}
        handleClose={_handleClose}
        onExited={() => _handleClose(false)}
        parentClass="md"
        enableCancelButton={false}
        textActionButton={"Close"}
        maxWidth={"693px"}
      >
        <div className="action_head">
          <i className="delete">
            <IconLock />
          </i>
          <strong>Add OnTheFly App to your Facebook group</strong>
        </div>
        <div className="fb_group_connect_detail">
          <h3 className="heading">To connect your group to OnTheFly:</h3>
          <div className="fb_group_connect_details">
            <strong className="point_heading">
              1. Open the group settings
            </strong>
            {/* <button className="btn_group_connect" type="button">
              Open Facebook Group settings
            </button> */}
            <a target="_blank" rel="noreferrer"
              href={`https://www.facebook.com/groups/${groupId}/apps/store`}
              className="btn_group_connect">Open Facebook Group settings
            </a>
            <strong className="point_heading">
              2. Search for "OnTheFly" and click on the OnTheFly app card
            </strong>
            <img
              className="point_img"
              width="298px"
              height="295px"
              src={ImgOnTheFlyAdd}
              alt="OnTheFly app card"
            />
            <strong className="point_heading">
              3. Click on the OnTheFly card and it will display a popup, Click
              "Add"
            </strong>
            <img
              className="point_img"
              width="331px"
              height="258px"
              src={ImgOnTheFlyAppCard}
              alt="OnTheFly add"
            />
          </div>
        </div>
      </ActionCommonPopup>
    );
  };
  const ChooseFacebookGroup = (fbGroupDetails) => {
    const handleSelectedGroup = async (selectId) => {
      choosePage(fbGroupDetails, selectId);
      setChooseId(selectId);
    };
    const globalData = useSelector((state) => state) || {};
    const { fbGroupList } = globalData?.facebookData?.facebookGroupList || {};
    return (
      <ActionCommonPopup
        handleAction={_handleAction}
        handleClose={_handleClose}
        onExited={() => _handleClose(false)}
        parentClass="md"
        enableCancelButton={false}
        textActionButton={"Done"}
      >
        <div className="action_head">
          <i className="delete">
            <IconShareRounded />
          </i>
          <strong>Choose a Facebook group</strong>
        </div>
        <p className="desc">
          Choose the group you would like to connect to OnTheFly.
        </p>
        <div className="facebookpage_list">
          {fbGroupList?.length > 0 && fbGroupList !== undefined &&
            fbGroupList.map((item, index) => {
              const { id = "", cover = "", name = "", accType = "Group", connected = false } = item;
              const { source } = cover;
              return (
                <button
                  onClick={connected ? () => { } : () => handleSelectedGroup(id)}
                  type="button"
                  key={convertToLowerCase(index + "fbGroupList")}
                  color="#1EAC8F10"
                  className={`b-r-30 fb_page_li ${connected ? "_disabled_btn_" : ""} ${id === chooseId ? "active" : " "
                    }`}
                >
                  <div
                    className="fb_page_card"
                  >
                    <div className="fb_page_img_card">
                      <Image className="fb_page_img" placeholderImg={ImgProfile} src={source} alt={"fb_page_name"} />
                    </div>
                    <div className="fb_page_info">
                      <strong title={name} className="fb_page_name">
                        {name}
                      </strong>
                      <span className="fb_page_type">{accType}</span>
                    </div>
                    {connected ? (
                      <div className="fb_page_status">
                        <strong>Connected</strong>
                      </div>
                    ) : null}
                    {id === chooseId ? (
                      <div className="fb_page_status">
                        <IconTick />
                      </div>
                    ) : null}
                  </div>
                </button>
              );
            })}
        </div>
      </ActionCommonPopup>
    );
  };

  const ChooseFacebookProfile = (fbProfileDetails) => {
    const handleSelectedProfile = async (selectProfileId) => {
      choosePage(fbProfileDetails, selectProfileId);
      setChooseId(selectProfileId);
    };
    const globalData = useSelector((state) => state) || {};
    const { fbProfileList } = globalData?.facebookData?.facebookProfileList || {};
    return (
      <ActionCommonPopup
        handleAction={_handleAction}
        handleClose={_handleClose}
        onExited={() => _handleClose(false)}
        parentClass="md"
        enableCancelButton={false}
        textActionButton={"Done"}
      >
        <div className="action_head">
          <i className="delete">
            <IconShareRounded />
          </i>
          <strong>Connect to Facebook profile</strong>
        </div>
        <p className="desc">
          Choose the profile you would like to connect to OnTheFly.
        </p>
        <div className="facebookpage_list">
          {fbProfileList?.length > 0 && fbProfileList !== undefined &&
            fbProfileList.map((item, index) => {
              const { id = "", profile = "", name = "", accType = "Profile", connected = false } = item;
              return (
                <button
                  type="button"
                  key={convertToLowerCase(id + "fbAccountList")}
                  onClick={connected ? () => { } : () => handleSelectedProfile(id)}
                  color="#1EAC8F10"
                  className={`b-r-30 fb_page_li ${connected ? "_disabled_btn_" : ""} ${id === chooseId ? "active" : " "
                    }`}
                >
                  <div
                    className="fb_page_card"
                  >
                    <div className="fb_page_img_card">
                      <Image className="fb_page_img" placeholderImg={ImgProfile} src={profile} alt={"fb_page_name"} />
                    </div>
                    <div className="fb_page_info">
                      <strong className="fb_page_name">{name}</strong>
                      <span className="fb_page_type">{accType}</span>
                    </div>
                    {connected ? (
                      <div className="fb_page_status">
                        <strong>Connected</strong>
                      </div>
                    ) : null}
                    {id === chooseId ? (
                      <div className="fb_page_status">
                        <IconTick />
                      </div>
                    ) : null}
                  </div>
                </button>
              );
            })
          }
        </div>
      </ActionCommonPopup>
    );
  };

  const FacebookSuccess = ({ connectedTo }) => {
    return (
      <ActionCommonPopup
        handleAction={_handleAction}
        handleClose={_handleClose}
        onExited={() => _handleClose(false)}
        parentClass="md facebook_acc_success_modal"
        enableCancelButton={false}
        enableActionButton={false}
      >
        <ConnectedCommon connectedTo={connectedTo} />
      </ActionCommonPopup>
    );
  };

  const YoutubeSuccess = () => {
    return (
      <ActionCommonPopup
        handleAction={_handleAction}
        handleClose={_handleClose}
        onExited={() => _handleClose(false)}
        parentClass="md facebook_acc_success_modal"
        enableCancelButton={false}
        enableActionButton={false}
      >
        <div className="facebook_acc_success">
          <Lottie
            className="icon_animate"
            animationData={LottieConnected}
            loop={true}
          />
          <h4 className="facebook_status">Connected to YouTube Channel</h4>
        </div>
      </ActionCommonPopup>
    );
  };

  switch (_type) {
    // Page
    case "FacebookPagePermissions":
      return FacebookPermissions(
        { permissionFor: "page",
          scope: "pages_show_list,pages_read_engagement,pages_read_user_content,pages_manage_posts,pages_manage_engagement,publish_video"
        }
      );
    case "ChooseFacebookPage":
      return ChooseFacebookPage(fbId);
    case "FacebookPageNotFound":
      return FacebookNotFound("page");
    case "FacebookPageSuccess":
      return FacebookSuccess({ connectedTo: "Page" });
    // Group
    case "FacebookGroupPermissions":
      return FacebookPermissions({
        permissionFor: "group",
        scope: "groups_access_member_info, publish_to_groups, publish_video"
      });
    case "ChooseFacebookGroup":
      return ChooseFacebookGroup(fbId);
    case "FacebookGroupNotFound":
      return FacebookNotFound("group");
    case "FacebookGroupSuccess":
      return FacebookSuccess({ connectedTo: "Group" });
    case "AddOntheflYFacebookGroup":
      return AddOntheflYFacebookGroup(fbGroupId);
    // Profile
    case "FacebookProfilePermissions":
      return FacebookPermissions({ permissionFor: "profile", scope: "public_profile,publish_video" });
    case "ChooseFacebookProfile":
      return ChooseFacebookProfile(fbId);
    case "FacebookProfileSuccess":
      return FacebookSuccess({ connectedTo: "Profile" });
    case "YoutubeSuccess":
      return YoutubeSuccess();
    default:
      return false;
    // code block
  }
};

export default IntegrationsPopups;
