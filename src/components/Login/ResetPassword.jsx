import React, { useEffect, useState } from 'react';
import './Login.scss';
import _get from "lodash/get";
import Loader from "../../common/Loader";
import { useTranslation } from "react-i18next";
import { failToast } from "../../helper/ApiToast";
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    ImgLogo,
    IconPasswordHidenewicon,
    IconPasswordViewnewicon,
    PassIcon,
} from '../../assets/images';
import {
    validateForm,
    passwordValidate,
    passwordMatchCheck,
    passwordEncrypt
} from '../../helper/Validation';
import {
    doCreatePassword,
    doResetPassAction,
} from '../../store/action/resetPassAction';
import {
    errMsg,
    buttonName,
    pageHeading,
    pathChenage,
    errMsgDesignClass,
    passwordTypeChange,
    emptyInputErrorMsgThrow,
    findEmptyOrNotLoginInput,
    resetPasswortErrorValiDate,
    userLogRoleId,
} from './loginPageCommon';
import Ripples from 'react-ripples';
import { passwordPolicyUpdate } from '../Registration/registerValidate';
import PasswordPolicyValidation from '../Registration/PasswordPolicyValidation';

const errorMsgAllow = (emptyError = false, validationErr = false) => {
    return emptyError || validationErr ? true : false;
};

const ResetPassword = (props = {}) => {
    const { match: { params: { token: Retoken = "" } = {}, path = "" } = {} } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const pathType = path;
    const _customId = "ResetPassword";
    const [errNewpass, setErrNewpass] = useState(false);
    const [errConpass, setErrConpass] = useState(false);
    const [passwordType, setPasswordType] = useState(true);//reset Password->true ,create Password ->false
    const [isValidForm, setpassValidForm] = useState(false);
    const [PasswordPolicy, setPasswordPolicy] = useState(true);
    const [conpasswordType, setConPasswordType] = useState("password");
    const [newpasswordType, setNewPasswordType] = useState("password");
    const globalStore = useSelector((state) => state || {});//store
    const { loginPage: { isLoading = false } = {} } = globalStore;//store
    const tempHide = false;

    const [newPasswordPolicy, setNewPasswordPolicy] = useState({
        lowerCase: false,
        upperCase: false,
        numberCase: false,
        specialCase: false,
        eightDigitCase: false,
    });

    const [passwordValue, setpasswordValue] = useState({
        newPassword: "",
        conpassword: "",
    });
    const [errpasswordValue, seterrpasswordValue] = useState({
        newPassword: false,
        conpassword: false,
    });
    const [onErrinputPass, setonErrinputPass] = useState({
        email: false,
        confirmEmail: false,
    });

    const newPasswordEye = () => {
        setNewPasswordType(passwordTypeChange(newpasswordType));
    };

    const conPasswordEye = () => {
        setConPasswordType(passwordTypeChange(conpasswordType));
    };

    const onChangeHandler = (event = {}) => {
        event.preventDefault();
        const { name = "", value = "" } = _get(event, "target", {});
        const errors = errpasswordValue;
        switch (name) {
            case 'newPassword':
                setNewPasswordPolicy(passwordPolicyUpdate(value));
                errors.newPassword = passwordValidate(value); //validation fron password policy
                break;
            case 'conpassword':
                errors.conpassword = passwordValidate(value); //validation fron password policy
                break;
            default:
                break;
        }
        setpasswordValue({ ...passwordValue, [name]: value });
        seterrpasswordValue(errors);
        setpassValidForm(validateForm(errors));
        const { newPassword, conpassword } = errors;  //on email and password type on field validate
        newPassword && setErrNewpass(false); //password policy is crct hide error msg
        conpassword && setErrConpass(false); //password policy is crct hide error msg
        setonErrinputPass({
            ...onErrinputPass,
            email: findEmptyOrNotLoginInput(passwordValue.newPassword),
            confirmEmail: findEmptyOrNotLoginInput(passwordValue.conpassword),
        });
    };

    /**
     * @param  {object} event
     * passwordType is true means this page load from reset password
     * passwordType is false means this page from create password page
     */
    const _onPasswordChange = (event = {}) => {
        event.preventDefault();
        if (isValidForm) {
            const validate = passwordMatchCheck(passwordValue); //check newpassword and confirm password are same
            if (validate) {
                if (passwordType) {
                    dispatch(doResetPassAction({ "token": Retoken, "password": passwordEncrypt(passwordValue.newPassword) }));
                } else {
                    dispatch(doCreatePassword({ "token": Retoken, "password": passwordEncrypt(passwordValue.newPassword) }));
                }
                dispatch({ type: "DO_LOADING_LOGIN_PAGE", loading: true });
            } else {
                failToast(t("LOGIN.PASS_MISS"), _customId); //password missMatch trigger this else call
            }
        } else {
            setonErrinputPass({
                ...onErrinputPass,
                email: emptyInputErrorMsgThrow(passwordValue.newPassword),
                confirmEmail: emptyInputErrorMsgThrow(passwordValue.conpassword),
            });
        }
    };

    const errorValidateShow = () => {
        const { newPassword = false, conpassword = false } = errpasswordValue;
        setErrNewpass(resetPasswortErrorValiDate(passwordValue.newPassword, newPassword));
        setErrConpass(resetPasswortErrorValiDate(passwordValue.conpassword, conpassword));
        setPasswordPolicy(false);
    };

    const handleOnClick = () => {
        setPasswordPolicy(true);
    };

    //from reset condition true
    useEffect(() => {
        setPasswordType(pathChenage(pathType)); //from reset condition true
    }, [path]); //path means,reset or creat password

    if (window.localStorage.getItem("userData")) { //if user logedIn not allowed This Page
        const userRoleId = userLogRoleId();
        const defaultPathName = userRoleId >= 4 ? "/broadcasts" : "/analytics";
        return <Redirect to={defaultPathName} />; //return to dashBoard
    }

    return (
        <React.Fragment>
            {isLoading && <Loader type={"fixed overlay"} />}
            <div className="LoginWrapper Custom">
                <div className="LoginInner grid">
                    <div className="formWrapper FPasswordWrapper grid-12">
                        <form onSubmit={_onPasswordChange}>
                            <div className="FPasswordForm FormContainer resetpass">
                                <div className="Header">
                                    <i className="logo">
                                        <img src={ImgLogo} alt="logo" />
                                    </i>
                                </div>
                                <h2>{t(pageHeading(passwordType))}</h2>
                                <div className="grp-input password">
                                    <div
                                        className={errMsgDesignClass(onErrinputPass.email, errNewpass)}>
                                        <div className={`relative ${PasswordPolicy ? " focus " : ""}`}>
                                            <input
                                                autoFocus
                                                id="Password"
                                                className="password outline"
                                                name={"newPassword"}
                                                type={newpasswordType}
                                                onClick={handleOnClick}
                                                onChange={onChangeHandler}
                                                onBlur={errorValidateShow}
                                                placeholder={t("LOGIN.NEW_PASS")}
                                                value={passwordValue.newPassword}
                                            />
                                            {/* temp hide */}
                                            {tempHide && <PassIcon className='Icon' />}
                                            <span
                                                onClick={newPasswordEye}
                                                className="hideView active"
                                            >
                                                {
                                                    (newpasswordType !== "password") ?
                                                        <i className="IconPasswordView">
                                                            <IconPasswordViewnewicon />
                                                        </i>
                                                        :
                                                        <i className="IconPasswordHide">
                                                            <IconPasswordHidenewicon />
                                                        </i>
                                                }
                                            </span>
                                            <PasswordPolicyValidation
                                                passwordPolicy={newPasswordPolicy}
                                            />
                                        </div>
                                        {errorMsgAllow(errNewpass, onErrinputPass.email) ?
                                            <span className="errorMessage">
                                                {t(errMsg(onErrinputPass.email, errNewpass))}
                                            </span> : null
                                        }

                                    </div>
                                    {/* <span className={`${errorMsgAllow(errNewpass, onErrinputPass.email) ? "error" : ""} password-info`}>{t("ALERTS.PASSWORDPOLICY")}</span> */}
                                </div>
                                <div className="grp-input mt-0">
                                    <div className={errMsgDesignClass(onErrinputPass.confirmEmail, errConpass)}>
                                        <div className='relative'>
                                            <input
                                                id="Password"
                                                className="password outline"
                                                name={"conpassword"}
                                                type={conpasswordType}
                                                onChange={onChangeHandler}
                                                onBlur={errorValidateShow}
                                                placeholder={t("LOGIN.CON_PASS")}
                                                value={passwordValue.conpassword}
                                            />
                                            {/* temp hide */}
                                            {tempHide && <PassIcon className='Icon' />}
                                            <span className="hideView active" onClick={conPasswordEye}>
                                                {
                                                    (conpasswordType !== "password") ?
                                                        <i className="IconPasswordView">
                                                            <IconPasswordViewnewicon />
                                                        </i>
                                                        :
                                                        <i className="IconPasswordHide">
                                                            <IconPasswordHidenewicon />
                                                        </i>
                                                }
                                            </span>
                                        </div>
                                        {errorMsgAllow(onErrinputPass.confirmEmail, errConpass) ?
                                            <span className="errorMessage">
                                                {t(errMsg(onErrinputPass.confirmEmail, errConpass))}
                                            </span> : null
                                        }
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    onClick={_onPasswordChange}
                                    className={`Btn-lg`}
                                >
                                    <Ripples>
                                        <span>
                                            {t(buttonName(passwordType))}
                                        </span>
                                    </Ripples>
                                </button>
                                <div className="signinInfo">
                                    {t("LOGIN.ALREADY_ACCOUNT")} {" "}
                                    <Link
                                        to='/'
                                        className="link"
                                    >
                                        {t("LOGIN.SIGN_IN")}
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
};
export default React.memo(ResetPassword);
