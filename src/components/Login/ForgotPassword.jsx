import React, { useState } from "react";
import "./Login.scss";
import _get from "lodash/get";
import Loader from "../../common/Loader";
import { useTranslation } from "react-i18next";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImgLogo, EmailIcon } from "../../assets/images";
import { leadingAndTrailingspaceAvoid } from "../../helper";
import { doForgetAction } from "../../store/action/forgetPassAction";
import { EmailValidate, validateForm } from "../../helper/Validation";
import {
  emptyInputErrorMsgThrow,
  findEmptyOrNotLoginInput,
  userLogRoleId,
} from "./loginPageCommon";
import Ripples from "react-ripples";
import { decodeRegistertoken } from "../../helper/Encypt";
import { isvalidToken } from "../../common/helper";

const errorManage = (emailError = false, validateError = false) => {
  return emailError || validateError ? true : false;
};

const errorMsg = (emailError = false, validateError = false) => {
  if (emailError) {
    return "LOGIN.EMAIL_ERR_EMPTY";
  } else if (validateError) {
    return "LOGIN.EMAIL_ERR";
  }
  return "";
};

const ForgotPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [Erroremail, setErrorEmail] = useState(false);
  const [isValidForm, setValidForms] = useState(false);
  const globalStore = useSelector((state) => state || {}); //store
  const { loginPage: { isLoading = false } = {} } = globalStore; //store
  const hostDetails = useSelector((state) => state?.tempReducer.tempToken);
  const str = hostDetails.substring(1);
  const decodedStringAtoB = isvalidToken(str) && atob(str); //decode the base64 token
  const obj = decodeRegistertoken(decodedStringAtoB);
  const { userEmailId = "" } = obj;

  const [inputValue, setInputValues] = useState({
    email: "",
  });

  const [errinputPass, seterrinputValu] = useState({
    email: false,
  });
  const [onErrinputPass, setonErrinputPass] = useState({
    email: false,
  });
  const onChangeHandler = (event = {}) => {
    event.preventDefault();
    const { name = "", value = "" } = _get(event, "target", {});
    const errors = errinputPass;
    if (name === "email") {
      errors.email = EmailValidate(userEmailId === "" ? value : userEmailId);
    }
    setInputValues({ ...inputValue, [name]: value });
    seterrinputValu(errors);
    setValidForms(validateForm(errors));
    const { email = false } = errors; //on email type on field validate
    email && setErrorEmail(false);
    setonErrinputPass({
      ...onErrinputPass,
      email: findEmptyOrNotLoginInput(
        userEmailId === "" ? inputValue.email : userEmailId
      ),
    });
  };

  /**
   *onSubmit
   */
  const _onSubmit = (e = {}) => {
    e.preventDefault();
    const forgetParams = {
      email: leadingAndTrailingspaceAvoid(
        userEmailId === "" ? inputValue.email : userEmailId
      ),
    };
    if (isValidForm) {
      //email format is validation done,call dispatch method
      dispatch(doForgetAction(forgetParams));
      dispatch({ type: "DO_LOADING_LOGIN_PAGE", loading: true });
    } else {
      setonErrinputPass({
        ...onErrinputPass,
        email: emptyInputErrorMsgThrow(
          userEmailId === "" ? inputValue.email : userEmailId
        ),
      });
    }
  };

  const errorValidateShow = () => {
    const { email = false } = errinputPass;
    setErrorEmail(inputValue.email ? !email : false);
  };

  const handleEnterPress = (e = {}) => {
    if (e.code === "Enter") {
      errorValidateShow();
      _onSubmit(e);
    }
  };

  if (window.localStorage.getItem("userData")) {
    const userRoleId = userLogRoleId();
    const defaultPathName = userRoleId >= 4 ? "/broadcasts" : "/analytics";
    return <Redirect to={defaultPathName} />;
  }

  return (
    <React.Fragment>
      {isLoading && <Loader type={"fixed overlay"} />}
      <div className="LoginWrapper Custom">
        <div className="LoginInner grid">
          <div className="formWrapper FPasswordWrapper grid-12">
            <form onSubmit={_onSubmit}>
              <div className="FPasswordForm FormContainer">
                <div className="Header">
                  <i className="logo">
                    <img src={ImgLogo} alt="logo" />
                  </i>
                </div>
                <h2>Forgot Password</h2>
                <div
                  className={`grp-input ${
                    userEmailId === "" ? " readonly " : " "
                  }`}
                >
                  <div
                    className={
                      onErrinputPass.email || Erroremail
                        ? "input error"
                        : " input "
                    }
                  >
                    <input
                      id="Email"
                      type="email"
                      name={"email"}
                      autoComplete={"off"}
                      onBlur={errorValidateShow}
                      onKeyDown={handleEnterPress}
                      autoFocus
                      value={
                        userEmailId === "" ? inputValue.email : userEmailId
                      }
                      className="outline"
                      placeholder={t("LOGIN.EMAIL_PLACE_HOLDER")}
                      onChange={(event) => onChangeHandler(event)}
                      readOnly={(userEmailId === "" ? false : true )}
                    />
                    <EmailIcon className="Icon" />
                    {errorManage(onErrinputPass.email, Erroremail) ? (
                      <span className="errorMessage">
                        {t(errorMsg(onErrinputPass.email, Erroremail))}
                      </span>
                    ) : null}
                  </div>
                </div>
                <Ripples
                  type="submit"
                  className={`Btn-lg`}
                  onClick={(e) => _onSubmit(e)}
                >
                  {t("LOGIN.SUBMIT")}
                </Ripples>
                <div className="signinInfo">
                  {t("LOGIN.ALREADY_ACCOUNT")}{" "}
                  <Link data-auto-id="signinInfo" to="/" className="link">
                    <span>{t("LOGIN.SIGN_IN")}</span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default React.memo(ForgotPassword);
