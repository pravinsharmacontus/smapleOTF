import React, { useEffect, useState } from "react";
import "./SSOLogin.scss";
import Ripples from "react-ripples";
import LoginLoader from "../LoginLoader";
import { useHistory, useLocation } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { nullToObject } from "../../../helper/Validation";
import { linkedInClientId } from "../../../helper/ApiUrl";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { ReactComponent as IconGoogle } from "./img/google.svg";
import { ReactComponent as IconLinkedin } from "./img/linkedin.svg";
import {
    Encrypt,
    EncryptLogInDetails,
    decodeRegistertoken,
    userDetailsSet,
} from "../../../helper/Encypt";
import {
    getGoogleUserDetails,
    getLinketInUserDetails,
    storeSSOLoginResponseDetails,
} from "./helperSSO";
import { useSelector } from "react-redux";
import { refreshPage } from "../../../helper";
import { handleMixpanelTrack, isvalidToken } from "../../../common/helper";

const SSOLogin = (props = {}) => {
    const { fromPage = "Register", dividerOnTop = false } = props;
    const history = useHistory();

    const [code, setCode] = useState("");
    const [loadering, setLoadering] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const loginDetail = window.localStorage.getItem("userDetails")
        ? JSON.parse(window.localStorage.getItem("userDetails"))
        : {};
    const { data: { email: emailId = "" } = {} } = loginDetail;

    const hostDetails = useSelector((state) => state?.tempReducer.tempToken);
    const str = hostDetails.substring(1);
    const decodedStringAtoB = isvalidToken(str) && atob(str); //decode the base64 token
    const obj = decodeRegistertoken(decodedStringAtoB);
    const { userEmailId = "" } = obj;

    const location = useLocation();
    const { search = "" } = location;

    const navigateToLandingPage = async (responseData = {}, uniqueId = "") => {
        const {
            data = {},
            type = "",
            email = "",
            googleId = "",
        } = responseData || {};
        const { userData = {} } = data;
        const newObj1 = {
            data: {
                ...userData,
            },
        };
        const newObj = {
            ssoType: type,
            password: googleId,
            email: email,
        };
        Encrypt(newObj);
        EncryptLogInDetails(nullToObject(newObj1));
        userDetailsSet(nullToObject(newObj1));
        history.push("/");
    };

    //google
    const onSuccess = async (response) => {
        const { profileObj = {} } = nullToObject(response);
        const {
            email = "",
            type = "",
            givenName = "",
            googleId = "",
            data = {},
        } = profileObj;
        const { userData = null } = data;
        const newObj = {
            ...response,
            sso: true,
            email: email,
            type: type,
            name: givenName,
            unique: googleId,
            ssoresponse: true,
        };
        storeSSOLoginResponseDetails(newObj);
        if (!userData) {
            if (fromPage === "logIn") {
                history.push("/register");
            }
            handleMixpanelTrack(`${fromPage} -> SSO ${type} new account signup`);
        } else {
            navigateToLandingPage(profileObj, googleId);
            handleMixpanelTrack(`${fromPage} -> SSO ${type} login success`);
            // const firstName = userData.firstName + userData.userId;
            // const firstName = userData.email;
            // const loginUserName = firstName.replace(/[^A-Z0-9]/ig, "").toLowerCase();
            // InitializeChat(loginUserName);
            // initializeMFSDK(loginUserName);
        }
        setLoadering(false);
    };

    const onFailure = (response = {}, type = "") => {
        const newObj = {
            ...response,
            name: "",
            email: "",
            sso: true,
            unique: "",
            type: type,
            ssoresponse: false,
        };
        storeSSOLoginResponseDetails(newObj);
        handleMixpanelTrack(
            `${fromPage} -> SSO ${type} login fail (Res) -> ${JSON.stringify(
                newObj
            )}`
        );
        setLoadering(false);
    };

    const handleLoader = (state = false) => {
        setLoadering(state);
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const { access_token: accToken = "" } = nullToObject(tokenResponse);
            handleLoader(true);
            const response = await getGoogleUserDetails(accToken);
            handleLoader(false);
            const { data: { data = {}, status = 0 } = {} } = nullToObject(response);
            if (status === 200) {
                const newObj = {
                    profileObj: {
                        email: data.email,
                        googleId: data.ssoid,
                        givenName: data.name,
                        type: "google",
                        data: data,
                    },
                };
                onSuccess(newObj);
            } else {
                onFailure(data, "google");
            }
        },
        scope: "profile email",
        redirect_uri: `${window.location.origin}`,
        ux_mode: "redirect",
        onError: (errorResponse) => {
            onFailure(errorResponse, "google");
        },
    });

    const { linkedInLogin } = useLinkedIn({
        clientId: linkedInClientId,
        redirectUri: `${window.location.origin}/linkedin`,
        onSuccess: async (codes) => {
            setLoadering(true);
            const response = await getLinketInUserDetails(codes);
            setLoadering(false);
            const { data: { data = {}, status = 0 } = {} } = nullToObject(response);
            if (status === 200) {
                const newObj = {
                    profileObj: {
                        email: data.email,
                        googleId: data.ssoid,
                        givenName: data.name,
                        type: "linkedin",
                        data: data,
                    },
                };
                onSuccess(newObj);
            } else {
                onFailure(data, "linkedin");
            }
            setCode(codes);
            setErrorMessage("");
        },
        scope: "r_emailaddress r_liteprofile",
        onError: (error) => {
            onFailure(error, "linkedin");
            setCode("");
            setErrorMessage(error.errorMessage);
        },
    });

    useEffect(() => {
        console.log(code, errorMessage);
    }, []);
    return (
        <React.Fragment>
            <LoginLoader loadering={loadering} />
            <div className="sso_login_wrapper">
                {!dividerOnTop ? (
                    <div className="line_divider">
                        <span> Or</span>
                    </div>
                ) : null}
                <div className="button_wraper">
                    <button data-autoid="googleSSo" className="btn_sso" type="button">
                        <Ripples
                            onClick={() => {
                                if (
                                    (!search && window.localStorage.getItem("userData")) ||
                                    (search && emailId === userEmailId)
                                ) {
                                    refreshPage();
                                } else {
                                    googleLogin();
                                    handleMixpanelTrack(`${fromPage} -> Click SSO Google`);
                                    handleLoader(false);
                                }
                            }}
                            color="#105ef126"
                            className="btn_sso_ripple"
                        >
                            <i>
                                <IconGoogle />
                            </i>
                            <span>Google</span>
                        </Ripples>
                    </button>

                    <button data-autoid="LinkedinSSo" className="btn_sso" type="button">
                        <Ripples
                            onClick={() => {
                                if (
                                    (!search && window.localStorage.getItem("userData")) ||
                                    (search && emailId === userEmailId)
                                ) {
                                    refreshPage();
                                } else {
                                    linkedInLogin();
                                    handleMixpanelTrack(`${fromPage} -> Click SSO Linkedin`);
                                }
                            }}
                            className="btn_sso_ripple"
                        >
                            <i>
                                <IconLinkedin />
                            </i>
                            <span>Linkedin</span>
                        </Ripples>
                    </button>
                </div>
                {dividerOnTop ? (
                    <div className="line_divider">
                        <span> Or</span>
                    </div>
                ) : null}
            </div>
        </React.Fragment>
    );
};

export default React.memo(SSOLogin);
