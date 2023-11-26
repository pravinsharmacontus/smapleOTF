import React, { useEffect, useState } from "react";
import "./Registration.scss";
import _get from "lodash/get";
import ContactFrom from "./ContactFrom";
import { useSelector } from "react-redux";
import History from "../../common/History";
import { handleMixpanelTrack, isOffline } from "../../common/helper";
import FeatureHighlights from "./FeatureHighlights";
import { Redirect, useHistory } from "react-router-dom";
import RegisterSucessPopup from "./RegisterSucessPopup";
import { onsubmitRegister } from "./registerValidate";
import { IconLoader, ImgLogoNew } from "../../assets/images";
import { emptyInputErrorMsgThrow } from "../../components/Login/loginPageCommon";
import {
  getCookieByName,
  validateForm,
  nullToObject,
  convertToLowerCase,
} from "../../helper/Validation";
import { decodeRegistertoken } from "../../helper/Encypt";
import store from "../../store";
import { doLogin } from "../../store/action/loginAction";

const Registration = (props = {}) => {
  const {
    match: { params: { token = "" } = {} } = {},
    location: { search = "" } = {},
  } = props;
  const decodedStringAtoB = atob(token); //decode the base64 token
  const obj = decodeRegistertoken(decodedStringAtoB);
  const loginDetail = window.localStorage.getItem("userDetails")
    ? JSON.parse(window.localStorage.getItem("userDetails"))
    : {};
  console.log(loginDetail, "loginDetailloginDetail");
  const decrptyUserDetail = JSON.parse(
    window.localStorage.getItem("encryptuserDetail")
  );
  const { data: { email = "", organisationId: orgId = "" ,userRoleId:userId = 0} = {} } = loginDetail;
  const {
    userRoleId = "",
    userEmailId = "",
    organisationName = "",
    organisationId = "",
  } = obj;
  const globalStore = useSelector((states) => states) || {};
  const history = useHistory();
  const { location: { pathname = "", state = {} } = {} } = history;
  const { loginPage: { registerLoad = false } = {} } = globalStore || {};

  const { commonData = {} } = globalStore;
  const { ssoResponseDetails = {} } = nullToObject(commonData);
  const { ssoresponse = false, type = "", unique = "" } = ssoResponseDetails;
  const [getEmail, setEmail] = useState('');
  // const findIsTrails = plantype === "easy" ? false : true;
  // const findIsTrails = convertToLowerCase(search) === convertToLowerCase("?freemium") ? false : true;
  //   const [localIp, setLoaclIp] = useState("");
  const hupspotId = getCookieByName("hubspotutk");
  const [locationKeys, setLocationKeys] = useState([]);
  const [stateManage, setStateManage] = useState({
    formValidate: false,
    errData: {},
  });
  const [getLoader, setLoader] = useState(true);
  const [successRegisterPopUp, setSuccessRegisterPopUp] = useState(false);
  const [name, setname] = useState("");
  const [emailID, setemailID] = useState("");
  const [country, setcountry] = useState("");
  const [phoneNum, setphoneNum] = useState("");
  const [password, setpassword] = useState("");
  const [chatCheckBox, setChatCheckBox] = useState(false);
  const [countryCode, setcountryCode] = useState("IN");
  const [organisationNames, setorganisationNames] = useState("");
  const inputHandle = {
    // role: role,
    name: name,
    emailID: userEmailId == "" ? emailID : userEmailId,
    country: country,
    // appType: appType,
    // appStatus: appStatus,
    // techStack: techStack.replaceAll(",", ";"),
    // userLookingModule: userLookingModule.replaceAll(",", ";"),
    phoneNum: phoneNum,
    password: password,
    // userCount: userCount,
    countryCode: countryCode,
    // applicationName: applicationName,
    organisationNames:
      organisationName == "" ? organisationNames : organisationName,
    chatCheckBox: chatCheckBox,
  };

  const [inputHandleEmpty, setInputHandleEmpty] = useState({
    // role: false,
    name: false,
    emailID: false,
    // appType: false,
    // country: false,
    phoneNum: false,
    // techStack: false,
    // appStatus: false,
    // userCount: false,
    // userLookingModule: false,
    // applicationName: false,
    organisationNames: false,
    chatCheckBox: false,
  });

  /**
   * api service handle
   */
  const handleSuccess = async () => {
    setLoader(true);
    if (isOffline()) {
      return;
    }
    const { errData, ...restData } = stateManage;
    if (validateForm(restData) || ssoresponse) {

      const newObj = {
        // make new obj
        ...inputHandle,
        type: type,
        unique: unique,
        // localIp: ipAddress,
        hupspotId: hupspotId,
        ssoresponse: ssoresponse,
        // trailCustomer: findIsTrails,
        userRoleId: userRoleId,
        organisationId: organisationId,
      };
      onsubmitRegister({ ...newObj, captchaToken: "webportaltest" });
      handleMixpanelTrack("Signup_Register", {
        otfEmail: newObj.emailID,
        ...newObj,
        password: "",
      });
    } else {
      // empty validate off
      // setInputHandleEmpty({
      //     ...inputHandleEmpty,
      //     role: emptyInputErrorMsgThrow(inputHandle.role),
      //     appType: emptyInputErrorMsgThrow(inputHandle.appType),
      //     userCount: emptyInputErrorMsgThrow(inputHandle.userCount),
      //     applicationName: emptyInputErrorMsgThrow(inputHandle.applicationName),
      // });
    }
  };
  /**
   * Input box Handle
   */
  const handleInputValue = (event = {}, err = {}) => {
    const { name: eventName = "", value = "" } = _get(event, "target", {});
    switch (eventName) {
      case "name":
        setname(value);
        break;
      case "emailID":
        setemailID(userEmailId === "" ? value : userEmailId);
        break;
      case "country":
        setcountry(value);
        break;
      case "phoneNum":
        setphoneNum(value);
        break;
      case "password":
        setpassword(value);
        break;
      case "chatCheckBox":
        setChatCheckBox(value);
        break;
      case "countryCode":
        setcountryCode(value);
        break;
      case "organisationNames":
        setorganisationNames(
          organisationName === "" ? value : organisationName
        );
        break;
      default:
        break;
    }
    setStateManage({
      ...stateManage,
      errData: err,
      formValidate: validateForm(err),
    });
    setInputHandleEmpty({
      ...inputHandleEmpty,
      [name]: emptyInputErrorMsgThrow(value), //error hide
      applicationName: false,
    });
  };

  const moveToRegPage = () => {
    //afetr click sign in button trigget heere
    History.push({ pathname: "/" }); //navigate to login page
  };

  useEffect(() => {
    if (pathname === "/thank-you") {
      //after success register enablePopUp
      setSuccessRegisterPopUp(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (email === userEmailId && organisationId === orgId) {
      console.log("userdetail");
      store.dispatch(doLogin(decrptyUserDetail)); //loader when editing customerdetails
      if (window.localStorage.getItem("userData")) {
        return <Redirect to={"/broadcast"} />;
      }
    }
  }, []);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);
          History.push({ pathname: "/" }); //navigate to login page
        }
      }
    });
  }, [locationKeys]);

  useEffect(() => {
    const _email = convertToLowerCase(search).replace("?email=", '');

    try {
      setEmail(decodeURIComponent(_email));
    } catch (error) {
      history.push("/register");
    }
  }, [search]);

  useEffect(() => {
    setLoader(registerLoad);
  }, [registerLoad]);

  /**
   * User login successfully redirect To DashBoard Page or dynamic redirectPage
   */
  if (token && email !== userEmailId) {
    console.log("check Query Params");
  } else if (
    (!token && window.localStorage.getItem("userData") && userId !== 4) ||
    (token && email === userEmailId && userId !== 4)
  ) {
    console.log("registercheck--")
    return <Redirect to={"/broadcast"} />;
  }else if (
    (!token && window.localStorage.getItem("userData") && userId === 4) ||
    (token && email === userEmailId && userId === 4)
  ) {
    console.log("customer--")
    return <Redirect to={"/customers"} />;
  }
  return (
    <React.Fragment>
      {registerLoad || getLoader ? (
        <div className={`pageLoader fixed overlay ss`}>
          {" "}
          <i>
            <IconLoader />
          </i>
        </div>
      ) : null}
      <div
        id="RegistrationWraper"
        className={`RegistrationWraper RegistrationPage Custom`}
      >
        <div className="header_sticky">
          <div className="header_sticky_container">
            <div className="header_sticky_inner">
              <a
                className="logo_link"
                href="/"
              >
                <img
                  src={ImgLogoNew}
                  alt="mirrorfly logo"
                  width="157px"
                />
              </a>
            </div>
          </div>
        </div>
        <div
          className="Container_lg"
          style={{ background: ssoresponse ? "transparent" : "" }}
        >
          {/* <LoginBrandInfo /> */}
          <div id="Registration_wraper" className={`Registration_wraper `}>
            <div id="RegistrationForm" className="RegistrationForm">
              {!successRegisterPopUp ? (
                <ContactFrom
                  search={search}
                  errData={stateManage.errData}
                  inputHandle={inputHandle}
                  globalStore={globalStore}
                  handleSuccess={handleSuccess}
                  inputHandleEmpty={inputHandleEmpty}
                  handleInputValue={handleInputValue}
                  formValidate={stateManage.formValidate}
                  token={token === "" ? false : true}
                  _getEmail={getEmail}
                />
              ) : (
                <>
                  {/* Reistration popup start */}
                  <RegisterSucessPopup
                    state={state}
                    moveToRegPage={moveToRegPage}
                    successRegisterPopUp={successRegisterPopUp}
                  />
                  {/* Reistration popup end */}
                </>
              )}
            </div>
            <FeatureHighlights ssoresponse={ssoresponse} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default React.memo(Registration);
