import React, { useState, useEffect } from "react";
import "./Registration.scss";
import _get from "lodash/get";
import { FormInput } from "../../common";
import { useTranslation } from "react-i18next";
import { isHTML, isOffline } from "../../common/helper";
import { serverNotRespond } from "../../helper/ApiToast";
import { numOnlyAllow, processInput } from "../../helper";
import RegiterPageSignUpButton from "./RegiterPageSignUpButton";
import PasswordPolicyValidation from "./PasswordPolicyValidation";
import {
  continueButtonHidden,
  continueButtonhideHandle,
  nameValidate,
  orgValidate,
  passwordPolicyUpdate,
  restrictEmojiValidation,
} from "./registerValidate";
import {
  IconPasswordViewnewicon,
  IconPasswordHidenewicon,
  ImgLogo,
  IconLoader,
} from "../../assets/images";
import {
  checkWhiteSpaces,
  EmailValidate,
  nullToObject,
  passwordValidate,
  PhoneNumValidate,
} from "../../helper/Validation";
import { constantValue } from "../../const/errorTypes";

const ContactFrom = (props = {}) => {
  const {
    // errData = {},
    globalStore = {},
    inputHandle = {},
    inputHandleEmpty = {},
    // resetSso = false,
    handleSuccess = () => {},
    handleInputValue = () => {}, //click function
    token = false,
    _getEmail = ''
  } = props || {};
  const { t } = useTranslation();
  const {
    name: nameEmpty = false,
    emailID: emailIDEmpty = false,
    password: passwordEmpty = false,
    phoneNum: phoneNumEmpty = false,
    organisationNames: organisationNameEmpty = false,
  } = inputHandleEmpty;

  const { commonData = {}, loginPage: { registerLoad = false } = {} } =
    globalStore;
  const { ssoResponseDetails = {} } = commonData;
  const {
    name: ssoUserName = "",
    ssoresponse = false,
    email: ssoEmail = "",
  } = ssoResponseDetails;

  const [getEmailReadOnly, setEmailReadOnly] = useState(false);
  const [getSsoLoginLoader, setSsoLoginLoader] = useState(false);
  const [getSsoresponse, setSsoresponse] = useState(false);
  const [orgError, setOrgError] = useState(false);
  const [emailErr, serEmailError] = useState(false);
  const [ErrorPnum, SetErrorPnum] = useState(false);
  const [ErrorFname, SetErrorFname] = useState(false);
  const [passwordType, SetPasswordType] = useState(false);
  const [passwordHint, setPasswordHint] = useState(false);
  const [chatCheckBox, setChatCheckBox] = useState(false);
  const [ErrorPassword, SetErrorPassword] = useState(false);
  const [phoneNumFiled, SetphoneNumFiled] = useState(inputHandle.phoneNum);
  const [bussinessAddressError, setBussinessAddressError] = useState(false);

  const [passwordPolicy, setPasswordPolicy] = useState({
    lowerCase: false,
    upperCase: false,
    specialCase: false,
    numberCase: false,
    eightDigitCase: false,
  });
  const [stateManage, setStateManage] = useState({
    emailLength: false, //emil
    orgEmptySpace: false, //org
    orgEmojiRestrict: false,
    nameEmptySpace: false, //name
    emailEmptySpace: false, //emil
    countryEmptySpace: false, //coutry
    passwordWhiteSpace: false, //password
    applicationNameEmptySpace: false, //application,
    bussinessAddressEmptySpace: false,
    nameHtmlError: false,
    nameEmojiRestrict: false,
  });

  const [errConInfo, setErrConInfo] = useState({
    nameError: false, //full name
    emailError: inputHandle.emailID === " " ? false : true, //email
    emailLenErr: inputHandle.emailID === " " ? false : true, //email
    countryError: true,
    orgNameError: inputHandle.organisationNames === " " ? false : true, //bussiness name
    orgwhitespace: inputHandle.organisationNames === " " ? false : true, //bussiness name
    orgEmojiRestrict: inputHandle.organisationNames === " " ? false : true,
    phoneNumError: false, //phone number
    passwordError: false, //phone number
    namewhitespace: false, //full name
    emailWhiteSpace: inputHandle.emailID === " " ? false : true, //email
    countryWhiteSpace: true,
    passwordWhiteSpace: false, //password
    applicationNameError: true,
    bussinessWhiteuEmptySpace: true,
    applicationNameEmptySpace: true,
    termsAndConditionsCheckbox: true,
    bussinessAddresslengthError: true,

    nameHtmlError: false,
    nameEmojiRestrict: false,
    bussinessNameHtmlError:
      inputHandle.organisationNames === " " ? false : true,
    termsAndConditionsError: false,
    applicationNameHtmlError: true,
  });

  /**
   * onType value
   * validsation
   */
  const swFieldValidation = (name = "", value = "", optionValue = "") => {
    const errors = errConInfo;
    switch (name) {
      case "name":
        errors.namewhitespace = checkWhiteSpaces(value);
        errors.nameError = nameValidate(value);
        errors.nameHtmlError = !isHTML(value);
        errors.nameEmojiRestrict = restrictEmojiValidation(value);
        break;
      case "password":
        setPasswordPolicy(passwordPolicyUpdate(value));
        errors.passwordError = passwordValidate(value);
        errors.passwordWhiteSpace = checkWhiteSpaces(value);
        break;
      case "chatCheckBox":
        setChatCheckBox(!chatCheckBox);
        errors.termsAndConditionsError = value === "false";
        break;
      case "organisationNames":
        errors.orgNameError = orgValidate(value);
        errors.orgwhitespace = checkWhiteSpaces(value);
        errors.orgEmojiRestrict = restrictEmojiValidation(value);
        errors.bussinessNameHtmlError = !isHTML(value);
        break;
      case "emailID":
        errors.emailWhiteSpace = checkWhiteSpaces(value);
        errors.emailLenErr = nameValidate(value);
        errors.emailError = EmailValidate(value);
        break;
      case "phoneNum":
        errors.phoneNumError = PhoneNumValidate(
          value ? value : optionValue,
          inputHandle.countryCode
        );
        break;
      case "countryCode":
        errors.phoneNumError = PhoneNumValidate(
          optionValue ? optionValue : phoneNumFiled,
          value
        );
        break;
      case "country":
        errors.countryWhiteSpace = checkWhiteSpaces(value);
        errors.countryError = nameValidate(value);
        break;
      default:
        break;
    }
    setErrConInfo(errors);
    const {
      nameError = false,
      roleError = false,
      phoneNumError = false,
      emailError = false,
      orgNameError = false,
      emailLenErr = false,
      orgwhitespace = false,
      orgEmojiRestrict = false,
      techStackError = false,
      namewhitespace = false,
      countryWhiteSpace = false,
      emailWhiteSpace = false,
      bussinessWhiteuEmptySpace = false,
      bussinessAddresslengthError = false,
      userLookingModuleError = false,
      passwordError = false,
      passwordWhiteSpace = false,
      applicationNameEmptySpace = false,
      // html error handle
      nameHtmlError = false,
      nameEmojiRestrict = false,
      bussinessNameHtmlError = false,
      applicationNameHtmlError = false,
    } = errConInfo;

    phoneNumError && SetErrorPnum(false); //phone num error
    nameError && SetErrorFname(false); //full name length error
    orgNameError && setOrgError(false); //full name white space error
    bussinessWhiteuEmptySpace && setBussinessAddressError(false); //BussinessAddressError
    bussinessAddressError && setBussinessAddressError(false);
    emailError && serEmailError(false); //email
    passwordError && SetErrorPassword(false); //password

    bussinessAddresslengthError &&
      setStateManage({
        ...stateManage,
        bussinessAddressEmptySpace: false,
      });

    //role
    roleError &&
      setStateManage({
        ...stateManage,
        roleError: false,
      });

    emailLenErr &&
      setStateManage({
        ...stateManage,
        emailLength: false,
      });

    // name html
    nameHtmlError &&
      setStateManage({
        ...stateManage,
        nameHtmlError: false,
      });
    //name Emoji restrict
    nameEmojiRestrict &&
      setStateManage({
        ...stateManage,
        nameEmojiRestrict: false,
      });
    // bussiness name html
    bussinessNameHtmlError &&
      setStateManage({
        ...stateManage,
        bussinessNameHtmlError: false,
      });
    //application name html
    applicationNameHtmlError &&
      setStateManage({
        ...stateManage,
        applicationNameHtmlError: false,
      });

    orgwhitespace &&
      setStateManage({
        ...stateManage,
        orgEmptySpace: false,
      });

    orgEmojiRestrict &&
      setStateManage({
        ...stateManage,
        orgEmojiRestrict: false,
      });

    applicationNameEmptySpace &&
      setStateManage({
        ...stateManage,
        applicationNameEmptySpace: false,
      });

    namewhitespace &&
      setStateManage({
        ...stateManage,
        nameEmptySpace: false,
      });

    passwordWhiteSpace &&
      setStateManage({
        ...stateManage,
        passwordWhiteSpace: false,
      });

    countryWhiteSpace &&
      setStateManage({
        ...stateManage,
        countryEmptySpace: false,
      });

    userLookingModuleError &&
      setStateManage({
        ...stateManage,
        userLookingModuleError: false,
      });
    techStackError &&
      setStateManage({
        ...stateManage,
        techStackError: false,
      });
    emailWhiteSpace &&
      setStateManage({
        ...stateManage,
        emailEmptySpace: false,
      });

    handleInputValue(
      {
        target: {
          name: name,
          value: value,
        },
      },
      errors
    );
  };

  /**
   * sign in button validate
   */

  const isDisabled = () => {
    if (
      errConInfo.nameError &&
      errConInfo.passwordError &&
      errConInfo.orgNameError &&
      errConInfo.phoneNumError &&
      errConInfo.emailError &&
      errConInfo.termsAndConditionsCheckbox
    ) {
      return false;
    }
  };

  /**
   * @param  {object} event=""
   * append value
   */
  const handleInputValueChange = (event = {}) => {
    const { name = "", value = "" } = _get(event, "target", {});
    swFieldValidation(name, value, "");
    isDisabled();
  };

  /**
   * onBlur validate
   */
  const errValidate = (event = {}) => {
    const {
      nameError = false,
      emailError = false,
      emailLenErr = false,
      orgNameError = false,
      orgwhitespace = false,
      orgEmojiRestrict = false,
      phoneNumError = false,
      namewhitespace = false,
      emailWhiteSpace = false,
      countryWhiteSpace = false,

      passwordError = false,
      passwordWhiteSpace = false,
      applicationNameEmptySpace = false,
      bussinessWhiteuEmptySpace = false,
      bussinessAddresslengthError = false,
      // html error handle
      nameHtmlError = false,
      nameEmojiRestrict = false,
      bussinessNameHtmlError = false,
      applicationNameHtmlError = false,
    } = errConInfo;
    setBussinessAddressError(
      inputHandle.bussinessAddress ? !bussinessAddresslengthError : false
    ); //country error
    SetErrorFname(inputHandle.name ? !nameError : false); //full name length error
    serEmailError(inputHandle.emailID ? !emailError : false); //orgNameError length error
    SetErrorPassword(inputHandle.password ? !passwordError : false); //password validate

    setOrgError(inputHandle.organisationNames ? !orgNameError : false); //organisationName error
    SetErrorPnum(inputHandle.phoneNum ? !phoneNumError : false); //phoneNum error
    const newObj = {
      ...stateManage,
      emailLength: inputHandle.emailID ? !emailLenErr : false,
      nameHtmlError: inputHandle.name ? !nameHtmlError : false,
      nameEmojiRestrict: inputHandle.name ? !nameEmojiRestrict : false,
      bussinessNameHtmlError: inputHandle.organisationNames
        ? !bussinessNameHtmlError
        : false,
      applicationNameHtmlError: inputHandle.applicationName
        ? !applicationNameHtmlError
        : false,
      nameEmptySpace: inputHandle.name ? !namewhitespace : false,
      emailEmptySpace: inputHandle.emailID ? !emailWhiteSpace : false, //email
      countryEmptySpace: inputHandle.country ? !countryWhiteSpace : false,
      orgEmptySpace: inputHandle.organisationNames ? !orgwhitespace : false,
      orgEmojiRestrict: inputHandle.organisationNames
        ? !orgEmojiRestrict
        : false,
      applicationNameEmptySpace: inputHandle.applicationName
        ? !applicationNameEmptySpace
        : false,
      passwordWhiteSpace: inputHandle.password ? !passwordWhiteSpace : false, //password
      bussinessAddressEmptySpace: inputHandle.bussinessAddress
        ? !bussinessWhiteuEmptySpace
        : false,
    };
    setStateManage(newObj);
    // indCodeFunction(inputHandle.countryCode === "IN" ? true : false, name, inputHandle.phoneNum,);//phone num validate
  };

  const handleSubmit = (event = {}) => {
    event.preventDefault();
    if (isOffline()) {
      serverNotRespond(constantValue.INTERNET_ERROR);
      return;
    }
    handleSuccess();
  };

  useEffect(() => {
    if (Object.keys(nullToObject(ssoResponseDetails)).length > 0) {
      if (ssoresponse) {
        //sso login success
        ssoEmail && swFieldValidation("emailID", ssoEmail);
        ssoUserName && swFieldValidation("name", ssoUserName);
      }
    }
  }, [ssoResponseDetails]);

  useEffect(() => {
    if (_getEmail) {
      swFieldValidation("emailID", _getEmail, "");
      if (errConInfo.emailError && errConInfo.emailLenErr && errConInfo.emailWhiteSpace) {
        setEmailReadOnly(true);
      }
      else {
        setEmailReadOnly(false);
      }
    };
  }, [_getEmail]);

  useEffect(() => {
    setSsoLoginLoader(registerLoad);
  }, [registerLoad]);

  useEffect(() => {
    SetphoneNumFiled(inputHandle.phoneNum ? inputHandle.phoneNum : "");
  }, [inputHandle.phoneNum]);

  useEffect(() => {
    setSsoresponse(ssoresponse);
  }, [ssoresponse]);

  React.useEffect(() => {
    document &&
      document.querySelector("#Registration_wraper") &&
      document.querySelector("#Registration_wraper").scrollTo &&
      document.querySelector("#Registration_wraper").scrollTo({
        top: 0,
      });
  });
  return (
    <React.Fragment>
      {registerLoad || getSsoLoginLoader ? (
        <div className={`pageLoader fixed overlay`}>
          {" "}
          <i>
            <IconLoader />
          </i>
        </div>
      ) : null}
      <div style={{ paddingBottom: " 44px " }} className={`right-side`}>
        <form action={(e) => handleSubmit(e)}>
          <div className="heading-info">
            <>
              <h2>Create Your Account</h2>
              <div className="mobile_show heading_contents">
                <img src={ImgLogo} alt="logo" className="logo" />
                <p className="heading_content_highlight">
                  {" "}
                  Bringing You the World in <br />
                  <strong> Real Time Live Streaming</strong>
                </p>
              </div>
            </>
          </div>
          <div style={{ display: "" }}>
            <div
              className={`form-group name-row left ${
                ErrorFname ||
                stateManage.nameHtmlError ||
                stateManage.nameEmptySpace ||
                stateManage.nameEmojiRestrict ||
                nameEmpty
                  ? "error"
                  : ""
              }`}
            >
              <FormInput
                id={"name"}
                name={"name"}
                required={false}
                autoFocus={true}
                _onBlur={errValidate}
                readOnly={ssoresponse}
                value={inputHandle.name}
                palceholder={"Full Name"}
                headingPlaceholder={false}
                floatingPlaceholder={true}
                customClass=" outline "
                _onchange={handleInputValueChange}
                error={
                  nameEmpty
                    ? t("ERROR.FIRST_NAME_ERR_EMPTY")
                    : stateManage.nameEmptySpace
                    ? t("ERROR.BLANKSPACE_ERROR")
                    : ErrorFname
                    ? t("ERROR.NAME")
                    : stateManage.nameHtmlError
                    ? t("ERROR.HTML_ERROR")
                    : stateManage.nameEmojiRestrict
                    ? t("ERROR.EMOJI_ERROR")
                    : ""
                }
              />
            </div>

            {/* role */}

            <div
              className={`form-group ${token ? " readonly " : " "} ${
                inputHandle.organisationNames === ""
                  ? ""
                  : organisationNameEmpty ||
                    stateManage.bussinessNameHtmlError ||
                    stateManage.orgEmptySpace ||
                    stateManage.orgEmojiRestrict ||
                    orgError
                  ? "error"
                  : ""
              }`}
            >
              <FormInput
                readOnly={token}
                required={false}
                _onBlur={errValidate}
                id={"organisationNames"}
                name={"organisationNames"}
                headingPlaceholder={false}
                floatingPlaceholder={true}
                label={"Organisation Name"}
                palceholder={"Business Name"}
                customClass=" outline "
                value={inputHandle.organisationNames}
                _onchange={handleInputValueChange}
                error={
                  inputHandle.organisationNames === ""
                    ? ""
                    : organisationNameEmpty
                    ? t("ERROR.ORG_NEME_ERR_EMPTY")
                    : stateManage.orgEmptySpace
                    ? t("ERROR.BLANKSPACE_ERROR")
                    : stateManage.orgEmojiRestrict
                    ? t("ERROR.EMOJI_ERROR")
                    : orgError
                    ? t("ERROR.B_ADDRESS")
                    : stateManage.bussinessNameHtmlError
                    ? t("ERROR.HTML_ERROR")
                    : ""
                }
              />
            </div>

            <div
              className={`form-group ${token || getEmailReadOnly ? " readonly " : " "} ${
                inputHandle.emailID === ""
                  ? ""
                  : emailErr ||
                    emailIDEmpty ||
                    stateManage.emailEmptySpace ||
                    stateManage.emailLength
                  ? //|| emailPublic
                    "error"
                  : ""
              }`}
            >
              <FormInput
                required={false}
                id={"emailID"}
                name={"emailID"}
                readOnly={ssoresponse || token || getEmailReadOnly}
                label={"Business id"}
                _onBlur={errValidate}
                palceholder={"Work Email"}
                headingPlaceholder={false}
                floatingPlaceholder={true}
                customClass=" outline "
                value={inputHandle.emailID}
                _onchange={handleInputValueChange}
                error={
                  inputHandle.emailID === ""
                    ? ""
                    : emailIDEmpty
                    ? t("ERROR.PUBLIC_EMAIL_ERROR")
                    : stateManage.emailEmptySpace
                    ? t("ERROR.BLANKSPACE_ERROR")
                    : emailErr
                    ? t("LOGIN.EMAIL_ERR")
                    : //emailPublic? t("ERROR.PUBLIC_EMAIL_ERROR") :
                    stateManage.emailLength
                    ? t("ERROR.NAME")
                    : ""
                }
              />
            </div>
            <div
              className={`form-group Mobile  ${
                ErrorPnum || phoneNumEmpty ? " error " : "selectedval"
              }`}
            >
              <FormInput
                type="text"
                id={"phoneNum"}
                required={false}
                name={"phoneNum"}
                _onBlur={errValidate}
                countryDropDown={true}
                label={"Phone Number"}
                countryId={"countryDrop"}
                headingPlaceholder={false}
                floatingPlaceholder={true}
                value={inputHandle.phoneNum}
                palceholder={"Phone Number"}
                customClass=" outline "
                countryCode={inputHandle.countryCode}
                _maxLength={inputHandle.countryCode !== "IN" ? 14 : 10}
                onInput={(e) => processInput(e)}
                _onchange={(event) => handleInputValueChange(event)}
                _onKeyPress={(event) => numOnlyAllow(event)}
                error={
                  phoneNumEmpty
                    ? t("ERROR.PHONE_NUMBER_ERR_EMPTY")
                    : ErrorPnum
                    ? t("ERROR.NUMBER")
                    : ""
                }
              />
            </div>

            {/* sso login */}
            {!ssoresponse && (
              <div
                className={`form-group password ${passwordHint ? " focus " : ""}
                            ${
                              passwordEmpty ||
                              stateManage.passwordWhiteSpace ||
                              ErrorPassword
                                ? " error "
                                : ""
                            }`}
              >
                <FormInput
                  required={false}
                  name={"password"}
                  id={"password"}
                  palceholder={"Password"}
                  customClass={" password outline "}
                  headingPlaceholder={false}
                  floatingPlaceholder={true}
                  value={inputHandle.password}
                  autoComplete={"new-password"}
                  onFocus={() => setPasswordHint(true)}
                  type={!passwordType ? "password" : "text"}
                  _onchange={(event) => handleInputValueChange(event)}
                  _onBlur={() => {
                    errValidate();
                    setPasswordHint(false);
                  }}
                  error={
                    passwordEmpty
                      ? t("LOGIN.PASS_ERR_EMPTY")
                      : stateManage.passwordWhiteSpace
                      ? t("ERROR.BLANKSPACE_ERROR")
                      : ErrorPassword
                      ? t("LOGIN.PASS_ERR")
                      : ""
                  }
                >
                  <PasswordPolicyValidation passwordPolicy={passwordPolicy} />
                </FormInput>
                <span className="hideView active">
                  <i className="IconPasswordView">
                    {passwordType ? (
                      <span
                        onClick={() => {
                          SetPasswordType(false);
                        }}
                      >
                        <IconPasswordViewnewicon />
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          SetPasswordType(true);
                        }}
                      >
                        <IconPasswordHidenewicon />
                      </span>
                    )}
                  </i>
                </span>
              </div>
            )}
          </div>
          <RegiterPageSignUpButton
            chatCheckBox={chatCheckBox}
            ssoresponse={getSsoresponse}
            onChange={handleInputValueChange}
            handleSubmit={handleSubmit}
            isDisabled={
              !token
                ? !continueButtonhideHandle(errConInfo, ssoresponse)
                : !continueButtonHidden(errConInfo, ssoresponse)
            }
            inviteUser={token}
          />
        </form>
      </div>
    </React.Fragment>
  );
};
export default React.memo(ContactFrom);
