import React, { useEffect, useState } from "react";
import "./BannerTheme.scss";
import CommonActiveToggle from "../../../../../common/CommonActiveToggle";
import {
  currentStageArrn,
  getCurrentOrgId,
} from "../../../../../helper/utility";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { updateBannerStyle } from "../../../../../firebase/firebaseRealtimeFunctions";

function BannerTheme(props = {}) {
  const tempHide = false;
  const { t } = useTranslation();
  const [getBannerStyle, setBannerStyle] = useState(0);
  const awsStageReducer = useSelector((state) => state?.awsStageReducer); //store
  const _stageArn = currentStageArrn(awsStageReducer);
  const {
    _handleInput = () => { },
    bannerStatus = true,
    bannerText = "Hello",
  } = props;

  const broadcastBranding = useSelector((state) => state?.broadcastBranding); //store
  const fbBannerBgColor = broadcastBranding?.bannerBgColor || "";
  const fbBannerStyle = broadcastBranding?.bannerStyle || "";
  const FbBannerTextColor = broadcastBranding?.bannerTextColor || "";

  const handleInput = (ele = {}) => {
    _handleInput(ele);
  };

  const handleBannerStyle = (bannerStyle = 0) => {
    console.log(fbBannerStyle,bannerStyle, "fbBannerBgColor");

    updateBannerStyle(getCurrentOrgId(), _stageArn, bannerStyle);
    setBannerStyle(bannerStyle);
  };

  useEffect(() => {
    setBannerStyle(fbBannerStyle);
  }, [fbBannerStyle]);

  return (
    <div className="banner_theme_wraper">
      <div className="banner_theme_list">
        <button
          onClick={() => handleBannerStyle(0)}
          type="buton"
          className={`banner_theme ${getBannerStyle === "" || getBannerStyle === 0 ? "selected" : " "}`}
        >
          <div
            style={{
              color: "#fff",
              backgroundImage: `linear-gradient(to right, ${fbBannerBgColor} 15px, #000 15px)`,
            }}
            className="theme_style theme_style_1 "
          >
            {bannerText}
          </div>
        </button>
        <button
          onClick={() => handleBannerStyle(1)}
          type="buton"
          className={`banner_theme ${getBannerStyle === 1 ? "selected" : " "}`}
        >
          <div
            style={{
              color: fbBannerBgColor && FbBannerTextColor ? "#fff" : "#000",
              backgroundColor: fbBannerBgColor
            }}
            className="theme_style theme_style_2"
          >
            {bannerText}
          </div>
        </button>
        <button
          onClick={() => handleBannerStyle(2)}
          type="buton"
          className={`banner_theme ${getBannerStyle === 2 ? "selected" : " "}`}
        >
          <div
            style={{
              color: fbBannerBgColor !== "" && FbBannerTextColor ? "#fff" : "#000",
              backgroundColor: fbBannerBgColor
            }}
            className="theme_style theme_style_3"
          >
            {bannerText}
          </div>
        </button>
      </div>
      {tempHide && (
        <div className="broadcast_video_banner_action">
          <CommonActiveToggle
            toggleType=" style2 "
            toggleAnimate={true}
            jestId={`Status-1`}
            name="getBannerStatus"
            onChange={(e) => {
              handleInput(e);
            }}
            id={`videoBannerAction`}
            status={bannerStatus}
            parentId={"broadcast_video_banner"}
          />
          <label htmlFor="videoBannerAction" className="info">
            {t("BROADCAST.LAYOUT_OPTIONS.ENABLE_THE_BANNER")}
          </label>
        </div>
      )}
    </div>
  );
}

export default BannerTheme;
