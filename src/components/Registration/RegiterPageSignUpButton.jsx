import React, { useState } from "react";
import { Link } from "react-router-dom";
import TermsAndPolicy from "../TermsAndPolicy";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { enableReCaptchaValidation, enableServerReCaptchaValidation, recaptchaKey, recaptchaServerKey, ssoGmailClientId } from "../../helper/ApiUrl";
import SSOLogin from "../Login/SSOLogin";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const RegiterPageSignUpButton = (props = {}) => {
  const {
    ssoresponse = false,
    isDisabled = true,
    handleSubmit = () => { },
    onChange = () => { },
    chatCheckBox = false,
    inviteUser = false,
  } = props || {};

  const [getVerifyCapcha, setVerifyCapcha] = useState('');
  const onChangeRecapcha = async (value) => {
    if (enableServerReCaptchaValidation === 'true') {
      try {
        const finalvalue = await axios.get(
          `https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(recaptchaServerKey)}&response=${encodeURIComponent(value)}`,
        );
        console.log("capcha Status:", finalvalue);
        setVerifyCapcha(finalvalue.data.success);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log('Response data:', error?.response?.data);
        setVerifyCapcha(false);
      }
    }
    else {
      setVerifyCapcha(value);
    }
  };

  function onExpired() {
    setVerifyCapcha(false);
  }
  const capchaControler = () => {
    if (enableReCaptchaValidation === 'true') {
      return (getVerifyCapcha === false || getVerifyCapcha === '');
    }
    else {
      return false;
    }
  };

  return (
    <React.Fragment>
      {<TermsAndPolicy chatCheckBox={chatCheckBox} onChange={onChange} />}
      {enableReCaptchaValidation === 'true' && <div className="ReCAPTCHA"> <ReCAPTCHA
        sitekey={recaptchaKey}
        onChange={onChangeRecapcha}
        onExpired={onExpired}
      />
        {(getVerifyCapcha === false) && <span class="errorMessage">Please verify capcha</span>}
      </div>}
      <button
        type="submit"
        onClick={capchaControler() ? () => { } : (e) => handleSubmit(e)}
        id={"registerHome"}
        disabled={isDisabled || capchaControler() ? true : false}
        className={` ${isDisabled || (capchaControler()) ? " disabled " : " "} submit btn blue`}
      >
        Create Account
      </button>
      {!ssoresponse && !inviteUser &&
        <>
          <GoogleOAuthProvider clientId={ssoGmailClientId}>
            <SSOLogin
              dividerOnTop={false}
              fromPage={"logIn"}
            />
          </GoogleOAuthProvider>
          {!inviteUser ? (
            <span className="signinInfo" style={{ marginTop: "10px" }}>
              Already have an account?
              <Link to="/">Sign In</Link>
            </span>
          ) : null}
        </>
      }
    </React.Fragment>
  );
};
export default React.memo(RegiterPageSignUpButton);
