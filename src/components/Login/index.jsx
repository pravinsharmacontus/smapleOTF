import React, { useEffect, useState } from "react";
import "./Login.scss";
import _get from "lodash/get";
import Loader from "../../common/Loader";
import {
  clearLocalStorage,
  isEmailValidateToken,
  isOffline,
  isvalidToken,
  setCurrentOrg,
} from "../../common/helper";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { doLogin } from "../../store/action/loginAction";
import { leadingAndTrailingspaceAvoid } from "../../helper";
import AccountActiveAlert from "./AccountActiveAlert/index";
import { failToast, serverNotRespond, succToast } from "../../helper/ApiToast";
import {
  errorValidateLoginPage,
  emptyInputErrorMsgThrow,
  findEmptyOrNotLoginInput,
  loginEmailValidate,
} from "./loginPageCommon";
import {
  validateForm,
  EmailValidate,
  passwordValidate,
  passwordEncrypt,
} from "../../helper/Validation";
import LoginInputField from "./LoginInputField";
import { decodeRegistertoken } from "../../helper/Encypt";
import { constantValue } from "../../const/errorTypes";

//Password Show or Hide Function
const passwordEyes = (type = "password") => {
  return type === "password" ? "text" : "password";
};

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { search = "" } = location;
  const globalStore = useSelector((state) => state || {}); //store
  const hostDetails = useSelector((state) => state?.tempReducer.tempToken);
  const str = hostDetails.substring(1);
  const history = useHistory();
  const decodedStringAtoB = isvalidToken(str) && atob(str); //decode the base64 token
  const obj = decodeRegistertoken(decodedStringAtoB);
  const { userEmailId = "", organisationId = "" } = obj;
  const loginDetail = window.localStorage.getItem("userDetails")
    ? JSON.parse(window.localStorage.getItem("userDetails"))
    : {};
  const { data: { email: emailId = "", userRoleId = "" } = {} } = loginDetail;
  const [stateOfLoginPage, setStateOfLoginPage] = useState({
    accontActive: false,
    emailActiveLoader: false,
  });
  console.log("search", search, obj);
  const [ErrorName, setErrorName] = useState(false);
  const [isValidForm, setValidForm] = useState(false);
  const [ErrorPassword, setErrorPassword] = useState(false);
  const [spaceOnlyError, setSpaceOnlyError] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [bypassLogin, setBypassLogin] = useState(false);
  const { loginPage: { isLoading = false } = {} } = globalStore;
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [errinputPass, seterrinputPass] = useState({
    email: false,
    password: false,
    onlySpace: true,
  });
  const [onErrinputPass, setonErrinputPass] = useState({
    email: false,
    password: false,
  });

  /**
   * _onLogin submit is make a Login trigger
   * doLogin create Login sagas action
   */
  const _onLogin = (e = {}) => {
    if (isOffline()) {
      serverNotRespond(constantValue.INTERNET_ERROR);
    }
    e.preventDefault();
    if (isValidForm) {
      setBypassLogin(true);
      const logData = {
        password: passwordEncrypt(inputValue.password),
        email: leadingAndTrailingspaceAvoid(
          userEmailId === "" ? inputValue.email : userEmailId
        ),
      };
      dispatch(doLogin(logData));
      dispatch({ type: "DO_LOADING_LOGIN_PAGE", loading: true });
    } else {
      setonErrinputPass({
        ...onErrinputPass,
        email: emptyInputErrorMsgThrow(
          userEmailId === "" ? inputValue.email : userEmailId
        ),
        password: emptyInputErrorMsgThrow(inputValue.password),
      });
    }
  };

  const onErrorManage = (error = {}) => {
    const { email, password, onlySpace } = error; //on email and password type on field validate
    email && setErrorName(false);
    password && setErrorPassword(false);
    onlySpace && setSpaceOnlyError(false);
  };

  //OnBlur use user enter email or password throw validate
  const errorValidateShow = () => {
    const errors = errinputPass;
    errors.email = EmailValidate(
      userEmailId === "" ? inputValue.email : userEmailId
    );
    setSpaceOnlyError(false);
    if (!inputValue.email) {
      errors.onlySpace = true;
    }
    errors.password = passwordValidate(inputValue.password);
    seterrinputPass(errors);
    setValidForm(validateForm(errors));
    onErrorManage(errors);
    const { email, password, onlySpace } = errors; //on email and password type on field validate
    setErrorName(errorValidateLoginPage(inputValue.email, email));
    setErrorPassword(errorValidateLoginPage(inputValue.password, password));
    setSpaceOnlyError(errorValidateLoginPage(inputValue.email, onlySpace));
  };

  /**
   * Handle user Email and password value
   * @param  {Object} {event} -
   */
  const onChangeHandler = (event = {}) => {
    event.preventDefault();
    const { name = "", value = "" } = _get(event, "target", {});
    const errors = errinputPass;
    switch (name) {
      case "email":
        errors.email = EmailValidate(value);
        break;
      case "password":
        errors.password = passwordValidate(value);
        break;
      default:
        break;
    }
    onErrorManage(errors);
    setInputValue({ ...inputValue, [name]: value });
    setValidForm(validateForm(errors));
    setonErrinputPass({
      ...onErrinputPass,
      email: findEmptyOrNotLoginInput(
        userEmailId === "" ? inputValue.email : userEmailId
      ),
      password: findEmptyOrNotLoginInput(inputValue.password),
    });
  };

  const handleEnterPress = (e = {}) => {
    if (e.code === "Enter") {
      errorValidateShow();
    }
  };

  const passwordEye = () => {
    const passType = passwordEyes(passwordType);
    setPasswordType(passType);
  };

  //active email close
  const handleClose = () => {
    setStateOfLoginPage({
      accontActive: false,
      emailActiveLoader: false,
    });
  };

  /**
   * user api call
   */
  const trailUserValidateCall = async () => {
    if (isOffline()) {
      return;
    }
    if (!isEmailValidateToken(search)) {
      return;
    }
    setStateOfLoginPage({
      accontActive: false,
      emailActiveLoader: true,
    });
    const response = await loginEmailValidate(search);
    const { data: { message = "", status = 0 } = {} } = response || {};
    if (status === 200) {
      setStateOfLoginPage({
        accontActive: true,
        emailActiveLoader: false,
      });
      clearLocalStorage();
      succToast(message);
      window.history.pushState({}, null, "/");
    } else {
      if (isOffline()) {
        return;
      }
      setStateOfLoginPage({
        accontActive: false,
        emailActiveLoader: false,
      });
      failToast(message);
      window.history.pushState({}, null, "/");
    }
  };

  useEffect(() => {
    if (isOffline()) {
      return "";
    }
    if (search) {
      trailUserValidateCall();
    }
  }, [search]);

  /**
   * User login successfully redirect To DashBoard Page or dynamic redirectPage
   */
  if (search && emailId !== userEmailId && userRoleId !== 4) {
    if (!isEmailValidateToken(search)) {
      history.push("/");
    }
  } else if (
    (!search &&
      window.localStorage.getItem("userData") &&
      !isEmailValidateToken(search) &&
      userRoleId !== 4) ||
    (search &&
      emailId === userEmailId &&
      !isEmailValidateToken(search) &&
      userRoleId !== 4) ||
    (bypassLogin && userRoleId !== 4)
  ) {
    if (!isEmailValidateToken(search)) {
      setCurrentOrg(organisationId);
    }
    if (userRoleId !== 4 && userRoleId !== 5) {
      history.push("/broadcast");
    }
    else {
      history.push("/customers");

    }
  } else if (
    (!search &&
      window.localStorage.getItem("userData") &&
      !isEmailValidateToken(search) &&
      userRoleId === 4) ||
    (search &&
      emailId === userEmailId &&
      !isEmailValidateToken(search) &&
      userRoleId === 4) ||
    (bypassLogin && userRoleId === 4)
  ) {
    history.push("/customers");
  }
  return (
    <React.Fragment>
      {(isLoading || stateOfLoginPage.emailActiveLoader) && (
        <Loader imageLoader={false} type={"fixed overlay"} />
      )}

      <div className="LoginWrapper Custom">
        <div className="Container">
          {stateOfLoginPage.accontActive && (
            <AccountActiveAlert handleClose={handleClose} />
          )}
          {/* <LoginBrandInfo/> */}

          <div className="LoginInner grid">
            <div className="formWrapper grid-12">
              <LoginInputField
                _onLogin={_onLogin}
                ErrorName={ErrorName}
                inputValue={inputValue}
                passwordEye={passwordEye}
                passwordType={passwordType}
                ErrorPassword={ErrorPassword}
                spaceOnlyError={spaceOnlyError}
                onErrinputPass={onErrinputPass}
                onChangeHandler={onChangeHandler}
                handleEnterPress={handleEnterPress}
                errorValidateShow={errorValidateShow}
                token={userEmailId === "" ? false : true}
                emailId={userEmailId === "" ? "" : userEmailId}
                search={search}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default React.memo(Login);
