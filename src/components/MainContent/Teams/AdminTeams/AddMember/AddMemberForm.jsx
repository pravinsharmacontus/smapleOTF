import React, { useEffect, useState } from 'react';
import _get from "lodash/get";
import { useTranslation } from 'react-i18next';
import RoleOptionCheck from "./RoleOptionCheck";
import {
    imageSize,
    emptyCheck,
    nameValidate,
    EmailValidate,
    imageValidate,
    checkWhiteSpaces,
    PhoneNumValidate,
} from '../../../../../helper/Validation';
import { IconEdit, ImgCustomerPlaceholer } from '../../../../../assets/images';
import { FormFile } from '../../../../../common';
import {
    roleDefined, TeamsPageProfile, editandViewMode, errorValidateTeamsPage, userRoleIdDefine
} from './addMemberCommon';

const AddMemberForm = (props = {}) => {

    const {
        role = "",
        userID = "",
        CusPage = {},
        emailId = "",
        fullName = "",
        isActive = true,
        countryCode = "",
        phoneNumber = "",
        profileImage = "",
        editManage = false,
        _editInputValue = {},
        _getEditMember = false,
        handleInput = () => { },//click funtion
        editDisableHandle = () => { },
    } = props;

    const { t } = useTranslation();
    const adminRole = roleDefined() || [];
    const { customerDtls = {} } = CusPage;
    const { isActive: stateIsActive = false } = customerDtls;

    const [ErrorPnum, SetErrorPnum] = useState(false);
    const [ErrorFname, SetErrorFname] = useState(false);
    const [ErrorEmail, SetErrorEmail] = useState(false);
    const [ErrorEmailLenght, setErrorEmailLenght] = useState(false);
    const [ErrorEmailEmptyCheck, setErrorEmailEmptyCheck] = useState(false);
    const [ErrorImage, SetProErrorImage] = useState(false);
    const [emptyFieldError, setEmptyFieldError] = useState(false);
    const [ErrorImageSize, SetProErrorImageSize] = useState(false);
    const [errConInfo, setErrConInfo] = useState({
        status: true,
        isBlank: false,
        emailErr: false,
        emailLenght: false,
        emailEmptyCheck: false,
        userRole: true,
        ImgfileErr: true,
        fullnameErr: false,
        phonenumErr: false,
        ImgfileErrSizeErr: true,
    });
    const hideProfileImage = false;

    const swFieldValidation = (name = "", value = "") => {
        const errors = errConInfo;
        switch (name) {
            case 'profileImage':
                errors.ImgfileErr = true;
                break;
            case 'fullName':
                errors.fullnameErr = nameValidate(value);
                errors.isBlank = checkWhiteSpaces(value);
                break;
            case 'emailId':
                errors.emailErr = EmailValidate(value);
                errors.emailLenght = nameValidate(value);
                errors.emailEmptyCheck = checkWhiteSpaces(value);
                break;
            case 'phoneNumber':
                errors.phonenumErr = PhoneNumValidate(value, countryCode);
                break;
            case 'countryCode':
                errors.phonenumErr = PhoneNumValidate(_getEditMember ? _editInputValue?.phoneNumber : phoneNumber, value);
                break;
            case 'role':
                errors.userRole = emptyCheck(value);
                break;
            case 'isActive':
                errors.status = emptyCheck(value);
                break;
            default:
                break;
        }
        setErrConInfo(errors);
        const { fullnameErr = false, emailErr = false, phonenumErr = false,
            ImgfileErr = true, isBlank = false, ImgfileErrSizeErr = true, emailLenght = false, emailEmptyCheck = false } = errors;
        emailErr && SetErrorEmail(false);//email format error
        emailLenght && setErrorEmailLenght(false);
        emailEmptyCheck && setErrorEmailEmptyCheck(false);
        phonenumErr && SetErrorPnum(false);//phone num error
        fullnameErr && SetErrorFname(false);//full name length error
        isBlank && setEmptyFieldError(false);//full name white space error
        ImgfileErr && SetProErrorImage(false);//formatError handle
        ImgfileErrSizeErr && SetProErrorImageSize(false);//image format error false hide image error
        handleInput({
            target: {
                name: name,
                value: value
            }
        }, errors);
    };

    const imagePicker = (event = {}) => {
        if (_get(event, "target.files", []).length > 0) {
            const file = _get(event, "target.files[0]", {});
            const errors = errConInfo;
            const { name = '', size = 0 } = file;
            errors.ImgfileErr = imageValidate(name);
            errors.ImgfileErrSizeErr = imageSize(size);
            SetProErrorImage(!imageValidate(name));
            SetProErrorImageSize(!imageSize(size));
            setErrConInfo(errors);
            handleInput({
                target: {
                    name: _get(event, "target.name", ""),
                    value: imageValidate(name) &&
                        imageSize(size) ?
                        URL.createObjectURL(file) : ImgCustomerPlaceholer,
                    imgProfileName: file,
                }
            }, errors);
        }
    };

    const handleInputbox = (event = {}) => {
        const { name = "", value = "" } = _get(event, "target", {});
        swFieldValidation(name, value);
    };

    const errValidate = () => {
        const { fullnameErr, emailErr, phonenumErr, ImgfileErr, isBlank, emailLenght, emailEmptyCheck } = errConInfo;
        SetErrorEmail(errorValidateTeamsPage(emailId, emailErr));
        setErrorEmailLenght(errorValidateTeamsPage(emailId, emailLenght));
        setErrorEmailEmptyCheck(errorValidateTeamsPage(emailId, emailEmptyCheck));
        SetErrorFname(errorValidateTeamsPage(fullName, fullnameErr));
        setEmptyFieldError(errorValidateTeamsPage(fullName, isBlank));
        SetErrorPnum(errorValidateTeamsPage(phoneNumber, phonenumErr));
        SetProErrorImage(errorValidateTeamsPage(profileImage, ImgfileErr));
    };

    const handleStatusToggle = () => {
        editDisableHandle();
        const errors = errConInfo;
        errors.status = emptyCheck(isActive);
        handleInput({
            target: {
                name: "isActive",
                value: !isActive,
            }
        }, errors);
    };
    useEffect(() => {
        if (_getEditMember) {
            handleInputbox({ target: { name: "emailId", value: _editInputValue?.emailId } });
            handleInputbox({ target: { name: "fullName", value: _editInputValue?.fullName } });
            handleInputbox({ target: { name: "isActive", value: _editInputValue?.isActive } });
            handleInputbox({ target: { name: "phoneNumber", value: _editInputValue?.phoneNumber } });
            handleInputbox({ target: { name: "countryCode", value: _editInputValue?.countryCodeShort } });
            handleInputbox({ target: { name: "profileImage", value: _editInputValue?.profileImage } });
            handleInputbox({ target: { name: "imgProfileName", value: _editInputValue?.imgProfileName } });
            handleInputbox({ target: { name: "role", value: userRoleIdDefine(_editInputValue?.userRoleId) } });
        }
    }, [_editInputValue, _getEditMember]);

    return (
        <React.Fragment>
            <div
                className={`PopupFormBody ${editandViewMode(editManage)}`}
            >
                <form action="" method="post">
                    <div className="grid">
                        {hideProfileImage &&
                            <div className="ImgUpload">
                                <div className="grp-image">
                                    <img
                                        alt="profileImage"
                                        src={TeamsPageProfile(profileImage)}
                                    />
                                    <label title="Edit" htmlFor="ImgProfile">
                                        <i><IconEdit /></i>
                                        <FormFile
                                            type="file"
                                            id="ImgProfile"
                                            onBlur={errValidate}
                                            readOnly={editManage}
                                            name={"profileImage"}
                                            accept={"image/x-png,image/jpeg"}
                                            _onchange={(event) => imagePicker(event)}
                                        />
                                    </label>
                                </div>
                                {ErrorImage &&
                                    <span
                                        className="errorMessage"
                                    >
                                        {t("ERROR.IMAGE")}
                                    </span>}
                                {ErrorImageSize &&
                                    <span
                                        className="errorMessage block"
                                    >
                                        {t("ERROR.IMAGE_1MB_SIZE")}
                                    </span>}
                                <span
                                    className="note"
                                >
                                    {t("ERROR.IMAGE_ALLOW_SIZE_FULL")}
                                </span>
                            </div>
                        }
                        <RoleOptionCheck
                            role={role}
                            userID={userID}
                            _getEditMember={_getEditMember}
                            emailId={emailId}
                            isActive={isActive}
                            fullName={fullName}
                            ErrorPnum={ErrorPnum}
                            adminRole={adminRole}
                            ErrorEmail={ErrorEmail}
                            ErrorEmailLenght={ErrorEmailLenght}
                            ErrorEmailEmptyCheck={ErrorEmailEmptyCheck}
                            ErrorFname={ErrorFname}
                            editManage={editManage}
                            countryCode={countryCode}
                            phoneNumber={phoneNumber}
                            errValidate={errValidate}
                            stateIsActive={stateIsActive}
                            handleInputbox={handleInputbox}
                            emptyFieldError={emptyFieldError}
                            handleStatusToggle={handleStatusToggle}
                        />
                    </div>
                </form>
            </div>
        </React.Fragment>);
};
export default React.memo(AddMemberForm);
