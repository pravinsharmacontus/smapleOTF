import React, { useEffect } from "react";
import "../../assets/scss/main.scss";
import { useSelector } from "react-redux";
import TopHeader from "../MainContent/TopHeader/index";
import { userDetailsLocal, userRolePermission } from "../../helper/RoleConfig";
import { Route, Redirect } from "react-router-dom";
import EmailVerifyOverlay from "../../common/EmailVerifyOverlay/index";
import Loader from "../../common/Loader";

const SideMenu = React.lazy(() => import("../SideMenu"));

const PrivatePage = ({ component: Component, allowedRoles, ...rest }) => {
  const globalData = useSelector((state) => state) || {};
  const { CusPage = {}, loader: { isLoading = false } = {} } = globalData;
  const { customerDtls: { emailVerified = null } = {} } = CusPage;
  const userDetails = userDetailsLocal() || {}; //logged userDetails
  const { data: { userRoleId = 0 } = {} } = userDetails;
  const broadcastScreenStatus = useSelector((state) => state?.BroadcastScreenReducer?.broadcastScreenStatus); //store
  useEffect(() => {

    // To prevent Tab key navigation for unverified Email Account
    const handlePreventKey = (event = {}) => {
      const code = event.keyCode || event.which;
      if (code === 9) {
        event.preventDefault();
      }
    };

    if (emailVerified === 0) {
      window.addEventListener("keydown", handlePreventKey, false);
    }
    return () => {
      window.removeEventListener("keydown", handlePreventKey);
    };
  }, [emailVerified]);

  return (
    <>
      <Route
        {...rest}
        render={(props = {}) =>
          window.localStorage.getItem("userData") &&
            userRolePermission(allowedRoles) ? (
            <React.Fragment>
              {/* email verify overlay */}
              {emailVerified === 0 ? (
                <>
                  <EmailVerifyOverlay globalData={globalData} />

                  {!broadcastScreenStatus ? <SideMenu /> : null}
                  <main className="mainWraper" style={{ paddingLeft: broadcastScreenStatus ? "0px" : "" }}>
                    <TopHeader />
                    <Component {...props} />
                  </main>
                  {(userRoleId !== 4 && userRoleId !== 5) ? (
                    <Redirect
                      to={{
                        pathname: "/broadcast",
                      }}
                    />
                  ) : (
                    <Redirect
                      to={{
                        pathname: "/customers",
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  {!broadcastScreenStatus ? <SideMenu /> : null}
                  <main className="mainWraper" style={{ paddingLeft: broadcastScreenStatus ? "0px" : "" }}>
                    <TopHeader />
                    <Component {...props} />
                  </main>
                </>
              )}
            </React.Fragment>
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }
      />
      {isLoading ? <Loader type={"fixed overlay"} /> : null}
    </>
  );
};
export default React.memo(PrivatePage);
