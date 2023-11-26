import React, { useEffect } from "react";
import ScreenRouter from "./ScreenRouter";
import { fetchLocalLocation } from "./helper";
import { isMobile } from "react-device-detect";
import { Feature, FixedHeader, FixedTablesHeight } from "./const/Feature";
import { internetStatusEncrypt } from "./helper/Encypt";
import { localforageConfig } from "./helper/CreateIndexedDB";
import Loader from "./common/Loader";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";

const App = () => {
  const {
    EnableSideMenu = true,
    EnableFixedHeader = true,
    EnableFixedTablesHeight = true,
  } = Feature;
  const globalData = useSelector((state) => state) || {};
  const { globalLoader = false } = globalData;
  useEffect(() => {
    fetchLocalLocation(); /**location */
    localforageConfig(); // indexeddb configure
    internetStatusEncrypt(true); //online status true
  }, []);
  useEffect(() => {
    const mobileStyle = {
      mobile: {
        "--ismobile": "0",
      },
      browser: {
        "--isbrowser": "0px",
      },
    };
    if (isMobile === true) {
      const mobileStyleFinal = document?.documentElement?.style.setProperty(
        "--ismobile",
        mobileStyle.mobile["--ismobile"]
      );
      return mobileStyleFinal;
    } else {
      const mobileStyleFinal = document?.documentElement?.style.setProperty(
        "--ismobile",
        mobileStyle.browser["--isbrowser"]
      );
      return mobileStyleFinal;
    }
  }, [isMobile]);

  /**
   * process reload issue fix -
   */
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  return (
    <>
      <div
        className={`App AppContainer ${
          EnableSideMenu ? " activeSideMenu " : " "
        }${FixedHeader(EnableFixedHeader)}${FixedTablesHeight(
          EnableFixedTablesHeight
        )}`}
        style={{ height: `${isMobile ? " 100% " : "100vh"}` }}
      >
        <ScreenRouter />
        <ReactTooltip place="top" type="dark" effect="solid" />
      </div>
      {globalLoader ? <Loader /> : null}
    </>
  );
};

export default React.memo(App);
