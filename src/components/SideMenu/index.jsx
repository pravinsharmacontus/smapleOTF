import NavBar from "./NavBar";
import React, { useState } from "react";
import { ImgLogoHeader } from "../../assets/images";
import { useLocation, Link } from "react-router-dom";

const SideMenu = () => {
  const location = useLocation() || {};
  const [stateManage, setStateManage] = useState({
    openPanel: false,
    popupAnimate: false,
    ProfileOption: false,
    ProfileWidget: false,
  });
  const loginDetail = window.localStorage.getItem("userDetails")
    ? JSON.parse(window.localStorage.getItem("userDetails"))
    : {};
  const { data: { userRoleId = "" } = {} } = loginDetail;
  const handleHamburgerMenuClose = () => {
    document &&
      document.getElementById("SideMenuWrapper") &&
      document.getElementById("SideMenuWrapper").classList.remove("show");
    document &&
      document.getElementById("menuButton") &&
      document.getElementById("menuButton").classList.remove("active");
  };

  const _handlePaneltoggle = () => {
    setStateManage({
      ...stateManage,
      openPanel: !stateManage.openPanel,
    });
    handleHamburgerMenuClose();
  };

  // Navigation Bar Open notification open close
  // const _handleNotification = () => {
  //    setopenNotification(!openNotification);
  // };

  return (
    <React.Fragment>
      <div id="SideMenuWrapper" className="SideMenuWrapper">
        <nav className="main-menu">
          {(userRoleId !== 4 && userRoleId !== 5) ? (
            <div>
              <Link className="logo_link" to={"/broadcast"}>
                <img
                  alt="MirrorFly"
                  className="logo white"
                  src={ImgLogoHeader}
                />
              </Link>
            </div>
          ) : (
            <div>
              <Link className="logo_link" to={"/customers"}>
                <img
                  alt="MirrorFly"
                  className="logo white"
                  src={ImgLogoHeader}
                />
              </Link>
            </div>
          )}
          <div className="nav_menu_link scrollbar" id="style-1">
            <NavBar
              location={location.pathname}
              _handlePaneltoggle={_handlePaneltoggle}
            />
          </div>
        </nav>
        <div
          className="outsideClick"
          id="outsideClick"
          onClick={handleHamburgerMenuClose}
          data-jest-id={"jestHandleHamburgerMenuClose"}
        ></div>
      </div>
    </React.Fragment>
  );
};
export default React.memo(SideMenu);
