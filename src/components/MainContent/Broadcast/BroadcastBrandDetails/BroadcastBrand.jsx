import React, { useEffect, useState } from "react";
import BroadcastLayouts from "./BroadcastLayouts";
import BroadcastBrandLogo from "./BroadcastBrandLogo";
import ColorPicker from "../../../../common/ColorPicker";
import CommonFormInput from "../../../../common/CommonFormInput";
import { FormTextArea, ToastService } from "../../../../common";
import CommonActiveToggle from "../../../../common/CommonActiveToggle";
import "./BroadcastBrand.scss";
import { IconDownload } from "../../../../assets/img";
import { useTranslation } from "react-i18next";
import { updateBannerText, updateEnableBanner } from "../../../../firebase/firebaseRealtimeFunctions";
import { useSelector } from "react-redux";
import { HexColorRegex, currentStageArrn, getCurrentOrgId, removeMultipleSpaces } from "../../../../helper/utility";
import { updateBannerTextBC } from "../../../../aws/broadcastFunction";
import { checkWhiteSpaces } from "../../../../helper/Validation";
import { warnToast } from "../../../../helper/ApiToast";
import BannerTheme from "./BannerTheme";
import BannerBackgroundTheme from "./BannerBackgroundTheme";
import { isOffline } from "../../../../common/helper";
import BannerOverlayTheme from "./BannerOverlayTheme";

const BroadcastBrand = (_props = {}) => {
  const { t } = useTranslation();
  const { handleLayoutViewType = () => { }, disableClick = false, _handleInput = () => { }, getBannerText: getInput = "", handleResizedImage = () => { } } = _props;
  const tempHide = false;
  const { getColor = "" } = getInput;
  const [getDisplayColorPicker, setDisplayColorPicker] = useState(false);
  const [getColorCodeError, setColorCodeError] = useState(false);
  const [getColorCode, setColorCode] = useState(getColor);
  const [getBannerName, setBannerName] = useState("");
  const awsStageReducer = useSelector((state) => state?.awsStageReducer); //store
  const _stageArn = currentStageArrn(awsStageReducer);

  const handleColorPallete = () => {
    setDisplayColorPicker(!getDisplayColorPicker);
  };
  const handleColorPalleteClose = () => {
 const sessionpopStatus = window.sessionStorage.getItem("EndSessionPopStatus");
    if(!sessionpopStatus){
      setDisplayColorPicker(false);
    }
  };

  const handleKeyDown = (ele) => {
    if (ele.ctrlKey && ele.key === 'z') {
      // Prevent the default behavior of Ctrl + Z
      ele.preventDefault();
    }
  };
  const handleInput = (ele = {}) => {
    _handleInput(ele);
    if (ele.target.name === "getColor") {
      setColorCode(ele.target.value);
      setColorCodeError(!HexColorRegex.test(ele.target.value));
      if (ele.target.value.length === 0) {
        const val = "#FF0935";
        const elem = { target: { name: 'getColor', value: val } };
        _handleInput(elem);
        setColorCodeError(!HexColorRegex.test(val));
      }
    }
  };
  const handleColorCode = (ele = {}) => {
    const elem = { target: { name: 'getColor', value: ele } };
    _handleInput(elem);
  };

  const handleChangeColor = (ele = {}) => {
   setColorCode(ele.hex);
  };

  const handleInputBanner = (ele = {}) => {
    const { value = "" } = ele.target || {};
    setBannerName(value);
  };

  const fbBannerText = useSelector((state) => state?.broadcastBranding?.bannerText); //store
  const bannerStatus = useSelector((state) => state?.broadcastBranding?.bannerStatus); //store
  useEffect(() => {
    setBannerName(removeMultipleSpaces(fbBannerText));
  }, [fbBannerText]);

useEffect(() => {
  setColorCodeError(!HexColorRegex.test(getColor));
},[getColor]);
  const handleUpdateBanner = () => {
    if (!isOffline()) {
      if (checkWhiteSpaces(getBannerName)) {
        setBannerName(removeMultipleSpaces(getBannerName));
        updateBannerText(getCurrentOrgId(), _stageArn, removeMultipleSpaces(getBannerName));
        updateBannerTextBC(removeMultipleSpaces(getBannerName), _stageArn, bannerStatus);
        ToastService.successToast("Banner updated successfully.");
      } else {
        warnToast("You Cannot Update Empty Banner");
        setBannerName(removeMultipleSpaces(fbBannerText));
      }
    }
  };

  const handleRestoreBannerText = () => {
    setBannerName(removeMultipleSpaces(fbBannerText));
  };

  console.log(getColorCodeError, "getColorCodeError");

  return (
    <>
      <div className="broadcast_video_brand_color">
        <h5 className="broadcast_title">
          {t("BROADCAST.LAYOUT_OPTIONS.BRAND_COLOR")}
        </h5>
        <p className="broadcast_info">
          {t("BROADCAST.LAYOUT_OPTIONS.BRANCH_CAPTIONS")}
        </p>
        <div className="color_pallete">
          <button
            type="button"
            onClick={handleColorPallete}
            style={{ background: getColorCode || getColor }}
            className="color_pallete_circle"
          ></button>
          {getDisplayColorPicker ? (
            <ColorPicker
              _handleOnOutsideClick={handleColorPalleteClose}
              _getColor={getColor}
              handleGetcolorCode={handleColorCode}
              handleChangeColor={handleChangeColor}
            />
          ) : null}
          <CommonFormInput
            enableCustomLabel={false}
            className="w-full mb-0"
            mustFill={false}
            error={getColorCodeError}
            type="text"
            name={"getColor"}
            value={getColorCode || getColor}
            palceholder={""}
            _maxLength={7}
            _onchange={handleInput}
            _onKeyDown={handleKeyDown}
            _onBlur={() => { }}
          />
        </div>
      </div>
      <div className="broadcast_video_brand_logo top_space_even">
        <h5 className="broadcast_title">
          {t("BROADCAST.LAYOUT_OPTIONS.LOGO")}
        </h5>
        <p className="broadcast_info">
          {t("BROADCAST.LAYOUT_OPTIONS.LOGO_CAPTIONS")}
        </p>
        <BroadcastBrandLogo disableClick={disableClick} handleResizedImage={handleResizedImage} />
      </div>
      <div className="broadcast_video_brand_logo top_space_even">
        <h5 className="broadcast_title">
          Theme
        </h5>
        <p className="broadcast_info">
          Choose the style to fit your brand. This will be displayed in the live screen
        </p>
        <BannerTheme />
      </div>
      {tempHide && (
        <div className="broadcast_video_layouts top_space_even">
          <h5 className="broadcast_title">
            {t("BROADCAST.LAYOUT_OPTIONS.LAYOUTS")}
          </h5>
          <p className="broadcast_info">
            {t("BROADCAST.LAYOUT_OPTIONS.LAYOUT_CAPTIONS")}
          </p>
          <BroadcastLayouts
            handleLayoutViewType={(e) => handleLayoutViewType(e)}
          />
        </div>
      )}
      <div className="broadcast_video_banner top_space_even">
        <h5 className="broadcast_title">
          {t("BROADCAST.LAYOUT_OPTIONS.BANNER")}
        </h5>
        <p className="broadcast_info">
          {t("BROADCAST.LAYOUT_OPTIONS.BANNER_CAPTION")}
        </p>
        <FormTextArea
          textAreaType2={false}
          type="textarea"
          mustFill={true}
          className={"mb-0"}
          value={getBannerName}
          name={"getCaption"}
          id="action_reason"
          customClass={`commonTextarea`}
          _onchange={handleInputBanner}
          error={""}
          palceholder={""}
          placeholder={""}
          _maxLength={200}
          _onBlur={() => { }}
        ></FormTextArea>
        <div>
          <p className="broadcast_info">
            {t("BROADCAST.LAYOUT_OPTIONS.BANNER_TEXT_LIMIT")}
          </p>
        </div>

        <div className="broadcast_video_banner_action_wraper">
          <div className="broadcast_video_banner_action">
            <CommonActiveToggle
              toggleType=" style2 "
              toggleAnimate={true}
              jestId={`Status-1`}
              name="getBannerStatus"
              onChange={(e) => {
                handleInput(e);
                updateEnableBanner(getCurrentOrgId(), _stageArn, e?.target?.value);
              }}
              id={`videoBannerAction`}
              status={bannerStatus}
              parentId={"broadcast_video_banner"}
            />
            <label htmlFor="videoBannerAction" className="info">
              {t("BROADCAST.LAYOUT_OPTIONS.ENABLE_THE_BANNER")}
            </label>
          </div>
          <div className="update_group">
            {fbBannerText !== getBannerName &&
              <button
                name="getUpdateBanner"
                style={{ paddingTop: '14px', marginRight: `16px` }}
                onClick={handleRestoreBannerText}
                className={"update_action"}
                type="button">Restore
              </button>
            }
            <button
              name="getUpdateBanner"
              style={{ paddingTop: '14px' }}
              onClick={handleUpdateBanner}
              className={checkWhiteSpaces(getBannerName) ? "update_action" : "update_action_deactive"}
              type="button">Update
            </button>
          </div>
        </div>
      </div >
      {
        tempHide && (
          <div className="broadcast_download_link copy_icon_hover top_space_even">
            <span class="heading">
              {" "}
              {t("BROADCAST.LAYOUT_OPTIONS.DOWNLOAD_VIDEO")}
            </span>
            <a
              className=""
              href="https://joy1.videvo.net/videvo_files/video/free/video0481/large_watermarked/_import_629c396148b403.32129247_preview.mp4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Recording_12-5-23.mp4</span>{" "}
              <i className="copy_icon">
                <IconDownload />
              </i>
            </a>
          </div>
        )
      }
      <div className="broadcast_video_brand_logo top_space_even">
        <h5 className="broadcast_title">
          Backgrounds
        </h5>
        <p className="broadcast_info">
          Choose a background to fit your brand. This will be displayed in the live screen
        </p>
        <BannerBackgroundTheme />
      </div>

       <div className="broadcast_video_brand_logo top_space_even">
        <h5 className="broadcast_title">
          Overlay
        </h5>
        <p className="broadcast_info">
        Overlays are customised visuals that appear on top of your screen
       </p>
        <BannerOverlayTheme />
      </div>

    </>
  );
};

export default BroadcastBrand;
