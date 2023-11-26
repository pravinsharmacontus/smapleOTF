import React, { useEffect } from "react";
import "../../assets/scss/main.scss";
import { useSelector } from "react-redux";
import { userDetailsLocal, userRolePermission } from "../../helper/RoleConfig";
import { Route, Redirect } from "react-router-dom";

const PrivateFullPage = ({ component: Component, allowedRoles, ...rest }) => {
    const globalDatas = useSelector((state) => state) || {};
    const { CusPage = {} } = globalDatas;
    const { customerDtls: { emailVerified = null } = {} } = CusPage;
    const privateUserDetails = userDetailsLocal() || {}; //logged userDetails
    const { data: { userRoleId = 0 } = {} } = privateUserDetails;
    useEffect(() => {
        // To prevent Tab key navigation for unverified Email Account
        const handlePreventKeyListener = (event = {}) => {
            const code = event.keyCode || event.which;
            if (code === 9) {
                event.preventDefault();
            }
        };
        if (emailVerified === 0) {
            window.addEventListener("keydown", handlePreventKeyListener, false);
        }
        return () => {
            window.removeEventListener("keydown", handlePreventKeyListener);
        };
    }, [emailVerified]);

    return (
        <Route
            {...rest}
            render={(props = {}) =>
                window.localStorage.getItem("userData") &&
                    userRolePermission(allowedRoles) ? (
                    <React.Fragment>
                        {/* email verify overlay */}
                        {emailVerified === 0 ? (
                            <>
                                <Component {...props} />
                                {userRoleId !== 4 ? (
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
                                <Component {...props} />
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
    );
};
export default React.memo(PrivateFullPage);
