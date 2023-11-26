import React, { useEffect } from "react";
import PropsTypes from "prop-types";
import Ripples from "react-ripples";
import { onPaste } from "../../helper";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  PassIcon,
  EmailIcon,
  IconPasswordViewnewicon,
  IconPasswordHidenewicon,
  IconLogo,
} from "../../assets/images";
import store from "../../store";
import { tempAction } from "../../store/action/tempAction";
import { useSelector } from "react-redux";
import SSOLogin from "./SSOLogin";
import { ssoGmailClientId } from "../../helper/ApiUrl";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { isEmailValidateToken } from "../../common/helper";

const LoginInputField = (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const {
    inputValue = {},
    ErrorName = false,
    onErrinputPass = {},
    ErrorPassword = false,
    spaceOnlyError = false,
    _onLogin = () => { }, //click
    passwordEye = () => { }, //click
    passwordType = () => { }, //click
    onChangeHandler = () => { }, //click
    handleEnterPress = () => { }, //click
    errorValidateShow = () => { }, //click
    token = false,
    emailId = "",
    search = "",
  } = props;
  const { t } = useTranslation();
  const hostDetails = useSelector((state) => state?.tempReducer.tempToken);
  console.log(hostDetails, pathname, "hostDetails");
  useEffect(() => {
    if(!isEmailValidateToken(search)){
    search.length > 0 && store.dispatch(tempAction(search));
    }
  }, []);

  return (
    <React.Fragment>
      <form onSubmit={_onLogin}>
        <div className="Header mobileLogo">
          <a
            href="/"
            rel="noopener noreferrer"
            className="logo"
          >
            <IconLogo />
          </a>
        </div>
        <div className="LoginForm FormContainer">
          <h2>{t("LOGIN.HELLO")}</h2>
          <h3>{t("LOGIN.PLEASE")}</h3>
          {!token?(
          <div>
          <GoogleOAuthProvider clientId={ssoGmailClientId}>
            <SSOLogin dividerOnTop={true} fromPage={"logIn"} />
          </GoogleOAuthProvider>
          </div>) : null}
          <div
            className={`grp-input ${(token) ? " readonly " : " "}`}
          >
            <div
              className={
                ErrorName || spaceOnlyError || onErrinputPass.email
                  ? "input error"
                  : "input"
              }
            >
              <input
                autoFocus
                type="text"
                id="Email"
                name="email"
                label={"email"}
                value={(token) ? emailId : inputValue.email}
                onBlur={errorValidateShow}
                onChange={onChangeHandler}
                onKeyDown={handleEnterPress}
                autoComplete={"new-password"}
                className="outline"
                placeholder={t("LOGIN.EMAIL_PLACE_HOLDER")}
                readOnly={(token)}
              />
              <EmailIcon className="Icon" />
              {onErrinputPass.email ? (
                <>
                  {onErrinputPass.email && (
                    <span className="errorMessage">
                      {t("LOGIN.EMAIL_ERR_EMPTY")}
                    </span>
                  )}
                </>
              ) : (
                <>
                  {(ErrorName || spaceOnlyError) && (
                    <span className="errorMessage">{t("LOGIN.EMAIL_ERR")}</span>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="grp-input password">
            <div
              className={
                ErrorPassword || onErrinputPass.password
                  ? "input error"
                  : " input "
              }
            >
              <div className="relative">
                <input
                  id="Password"
                  onCut={onPaste}
                  onCopy={onPaste}
                  onPaste={onPaste}
                  name={"password"}
                  label={"password"}
                  type={passwordType}
                  className=" password outline "
                  onBlur={errorValidateShow}
                  onChange={onChangeHandler}
                  value={inputValue.password}
                  autoComplete={"new-password"}
                  onKeyDown={handleEnterPress}
                  placeholder={t("LOGIN.PASSWORD_PLACE_HOLDER")}
                />
                <PassIcon className="Icon" />
                <span className="hideView active" onClick={passwordEye}>
                  {passwordType !== "password" ? (
                    <i className="IconPasswordView">
                      <IconPasswordViewnewicon />
                    </i>
                  ) : (
                    <i className="IconPasswordHide">
                      <IconPasswordHidenewicon />
                    </i>
                  )}
                </span>
              </div>
              {onErrinputPass.password ? (
                <>
                  {onErrinputPass.password && (
                    <span className="errorMessage">
                      {t("LOGIN.PASS_ERR_EMPTY")}
                    </span>
                  )}
                </>
              ) : (
                <>
                  {ErrorPassword && (
                    <span className="errorMessage">
                      {t("LOGIN.LOGIN_PASS_ERR")}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="text-right">
            <Link
              to="/forgetpassword"
              className="Fpassword"
              data-auto-id="Fpassword"
            >
              {t("LOGIN.FORGOT_PASSWORD")}
            </Link>
          </div>

          <button type="submit" className={`Btn-lg`} onClick={_onLogin}>
            <Ripples>{t("LOGIN.SIGN_IN")}</Ripples>
          </button>
          {(pathname === "/" || pathname === "/login")  && !token?(
            <span className="signinInfo">
              Don't have an account?
              <Link to="/register">Sign Up</Link>
            </span>
          ) : null}
        </div>
      </form>
    </React.Fragment>
  );
};
LoginInputField.PropsTypes = {
  _onLogin: PropsTypes.func, //click
  ErrorName: PropsTypes.bool,
  passwordEye: PropsTypes.func, //click
  passwordType: PropsTypes.func, //click
  inputValue: PropsTypes.object,
  ErrorPassword: PropsTypes.bool,
  spaceOnlyError: PropsTypes.bool,
  onChangeHandler: PropsTypes.func, //click
  handleEnterPress: PropsTypes.func, //click
  onErrinputPass: PropsTypes.object,
  errorValidateShow: PropsTypes.func, //click
};
export default React.memo(LoginInputField);
