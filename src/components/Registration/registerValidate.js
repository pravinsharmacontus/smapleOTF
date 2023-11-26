import store from "../../store";
import { Post } from "../../common/httpRestServices";
import { leadingAndTrailingspaceAvoid, nullCheckString } from "../../helper";
import { getCountryCallingCode } from "react-phone-number-input";
import { apiUrl, registerApiUrl } from "../../helper/ApiUrl";
import { doRegisterNewUserAction } from "../../store/action/loginAction";
import {
  convertToLowerCase,
  convertToUpperCase,
  passwordEncrypt,
  validateForm,
} from "../../helper/Validation";

//customer page and memberPage  name validate
export const nameValidate = (value = "") => {
  return value.length <= 50 && value.length >= 1;
};

/**
 * @param  {string} value=""
 * @returns boolean
 * validate 100 char
 */
export const orgValidate = (value = "") => {
  return value.length <= 100 && value.length >= 1;
};
//emoji validation
export const restrictEmojiValidation = (value = "") => {
  const pattern = /^[-@\/#&$%^<>:"{}'?|,.;*()!=+\w\s]*$/
  return value.match(pattern) ? true : false
}
/**
 * @param  {object} data={}
 * onSubmit api call
 */
export const onsubmitRegister = (data = {}) => {
  const {
    ssoresponse = false,
    type = "",
    unique = "",
    organisationNames = "",
    name = "",
    emailID = "",
    password = "",
    country = "",
    phoneNum = "",
    countryCode = "IN",
    userRoleId = "",
    organisationId = ""
  } = data;
  const passwordConvert = ssoresponse ? unique : passwordEncrypt(password);
  const logValue = {
    ...(ssoresponse && {
      ssoId: leadingAndTrailingspaceAvoid(nullCheckString(unique)),
    }),
    ...(ssoresponse && {
      ssoType: leadingAndTrailingspaceAvoid(nullCheckString(type)),
    }),
    phoneNumber: phoneNum,
    countryCodeShort: countryCode,
    firstName: leadingAndTrailingspaceAvoid(name),
    emailId: leadingAndTrailingspaceAvoid(emailID),
    country: leadingAndTrailingspaceAvoid(country),
    countryCode: getCountryCallingCode(countryCode),
    password: leadingAndTrailingspaceAvoid(passwordConvert),
    organisationName: leadingAndTrailingspaceAvoid(organisationNames),
    userRoleId: userRoleId,
    organisationId: organisationId
  };
  store.dispatch(doRegisterNewUserAction(logValue)); //loader when editing customerdetails
  store.dispatch({ type: "REGISTER_USER_LOADER", loading: true }); //loader when editing customerdetails
};

/**
 * success register popUp to default
 */
export const registerPopUpDefaultState = (data = {}) => {
  store.dispatch({
    type: "ENABLE_REGISTER_SUCCESS_POP_UP",
    registerPopUp: null,
  }); //loader when editing customerdetails
};

export const hubSpotApiImplement = async (inputDetails = {}) => {
  const {
    organisationNames = "",
    ipAddressValidate = 0,
    name = "",
    emailID = "",
    localIp = "",
    hupspotId = "",
    country = "",
    phoneNum = "",
    countryCode = "IN",
  } = inputDetails;
  const newObj = {
    country: country,
    emailId: emailID,
    firstName: name,
    ipAddress: localIp,
    hubspotutk: hupspotId,
    phoneNumber: phoneNum,
    countryCodeShort: countryCode,
    organisationNames: organisationNames,
    ipAddressValidate: ipAddressValidate,
    countryCode: getCountryCallingCode(countryCode),
  };
  const response = await Post(
    `${apiUrl}${registerApiUrl.signupStepOne}`,
    newObj,
    true
  );
  // window.sessionStorage.setItem("userData", {userId : 856, name : 'asdasd'})
  console.log(response, "response"); //don't remove console,
};

const containsNumber = (str = "") => {
  const reg = /\d+/;
  return reg.test(str);
};

/**
 * check contain have spl char added
 * @param {string} string
 */
export const containsSpecialCharCheck = (string = "") => {
  const reg = /^((?=.*\W)|(?=.*_))/;
  return reg.test(string) ? true : false;
};

/**
 * one num
 * one lowerCase
 * one upperCase
 * one spl char
 * eight digit
 * @param {string} string
 */
export const passwordPolicyUpdate = (string = "") => {
  const numberCase = containsNumber(string);
  const specialCase = containsSpecialCharCheck(string);
  const lowerCase = convertToUpperCase(string) !== string ? true : false;
  const upperCase = convertToLowerCase(string) !== string ? true : false;
  const eightDigitCase = convertToLowerCase(string).length >= 8 ? true : false;
  return {
    upperCase,
    lowerCase,
    numberCase,
    specialCase,
    eightDigitCase,
  };
};

/**
 * check all key value are true
 * @param {object} errorHandleObj
 */
export const continueButtonhideHandle = (
  errorHandleObj = {},
  ssoresponse = false
) => {
  const {
    nameError = false, //full name
    emailError = false, //email
    emailLenErr = false, //email
    orgNameError = false, //bussiness name
    orgwhitespace = false, //bussiness name
    orgEmojiRestrict = false,
    nameHtmlError = false,
    nameEmojiRestrict = false,
    phoneNumError = false, //phone number
    passwordError = false, //phone number
    namewhitespace = false, //full name
    emailWhiteSpace = false, //email
    passwordWhiteSpace = false, //password
    bussinessNameHtmlError = false,
    termsAndConditionsError = false,
  } = errorHandleObj;
  const newObj = {
    nameError,
    emailError,
    emailLenErr,
    termsAndConditionsError,
    orgEmojiRestrict,
    nameEmojiRestrict,
    orgNameError,
    orgwhitespace,
    phoneNumError,
    ...(!ssoresponse && { passwordError: passwordError }), //false only validate
    ...(!ssoresponse && { passwordWhiteSpace: passwordWhiteSpace }), //false only validate
    nameHtmlError,
    namewhitespace,
    emailWhiteSpace,
    bussinessNameHtmlError,
  };
  return validateForm(newObj);
};

export const continueButtonHidden =(errorHandleObj = {},  ssoresponse = false
  ) => {
  const {
    nameError = false, //full name
    nameHtmlError = false,
    phoneNumError = false, //phone number
    passwordError = false, //phone number
    namewhitespace = false, //full name
    nameEmojiRestrict = false,
    passwordWhiteSpace = false, //password
    termsAndConditionsError = false,
  } = errorHandleObj;
  const newObj = {
    nameError,
    nameEmojiRestrict,
    termsAndConditionsError,
    phoneNumError,
    ...(!ssoresponse && { passwordError: passwordError }), //false only validate
    ...(!ssoresponse && { passwordWhiteSpace: passwordWhiteSpace }), //false only validate
    nameHtmlError,
    namewhitespace,
  };
  return validateForm(newObj);
}
