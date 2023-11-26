import React from "react";
import { useTranslation } from "react-i18next";
import {
  IconBroadcasts,
  IconTeams,
  IconVideos,
  IconIntegration,
  IconCustomers,
} from "./../../assets/img";
import MenuListComponent from "./MenuListComponent";

const NavBar = (props = {}) => {
  const { location = "", _handlePaneltoggle = () => { } } = props || {};
  const loginDetail = window.localStorage.getItem("userDetails")
    ? JSON.parse(window.localStorage.getItem("userDetails"))
    : {};
  const { data: { userRoleId = "" } = {} } = loginDetail;

  const { t } = useTranslation();
  console.log("loginDetail", userRoleId, loginDetail);

  /**
   * userDetails is when user is logged || null
   * condition Based NavBar Show and Hide
   */

  return (
    <React.Fragment>
      <nav className="slidingNov">
        <ul className="nav-internal">
          {(userRoleId !== 4 && userRoleId !== 5) ? (
            <>
              <MenuListComponent
                _location={location}
                _handlePaneltoggle={_handlePaneltoggle}
                _pathName={"/broadcast"}
                _MenuName={t("NAVBAR.BROADCAST")}
                _icon={<IconBroadcasts />}
              />
              <MenuListComponent
                _location={location}
                _handlePaneltoggle={_handlePaneltoggle}
                _pathName={"/teams"}
                _MenuName={t("NAVBAR.TEAMS")}
                _icon={<IconTeams />}
              />

              <MenuListComponent
                _location={location}
                _handlePaneltoggle={_handlePaneltoggle}
                _pathName={"/videos"}
                _MenuName={t("Videos")}
                _icon={<IconVideos />}
              />
              {(
                <>
                <MenuListComponent
                _location={location}
                _handlePaneltoggle={_handlePaneltoggle}
                _pathName={"/integration"}
                _MenuName={t("Integration")}
                _icon={<IconIntegration />}
              />
                </>
              )}
            </>
          ) : (
            <div>
              <MenuListComponent
                _location={location}
                _handlePaneltoggle={_handlePaneltoggle}
                _pathName={"/customers"}
                _MenuName={t("NAVBAR.CUSTOMERS")}
                _icon={<IconCustomers />}
              />
              <MenuListComponent
                _location={location}
                _handlePaneltoggle={_handlePaneltoggle}
                _pathName={"/teams"}
                _MenuName={t("NAVBAR.TEAMS")}
                _icon={<IconTeams />}
              />
            </div>
          )}
        </ul>
      </nav>
    </React.Fragment>
  );
};
export default React.memo(NavBar);
