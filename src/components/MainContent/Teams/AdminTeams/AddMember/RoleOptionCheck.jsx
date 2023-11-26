import React from "react";
import { useTranslation } from "react-i18next";
import { convertToLowerCase } from "../../../../../helper/Validation";
import CommonFormInput from "../../../../../common/CommonFormInput";
import { subjectErrorMsg } from '../../../../../const/errorHandle';
import { numOnlyAllow, processInput } from "../../../../../helper";
import { translate } from "../TeamsValidatios";

const RoleOptionCheck = (props = {}) => {
    const {
        role        = "",
        emailId     = "",
        fullName    = "",
        adminRole   = [],
        isActive    = true,
        phoneNumber = "",
        ErrorPnum   = false,
        countryCode = "IN",
        ErrorEmail  = false,
        editManage  = false,
        ErrorFname  = false,
        _getEditMember = false,
        emptyFieldError    = false,
        ErrorEmailEmptyCheck = false,
        ErrorEmailLenght   = false,
        errValidate        = () => { },
        handleInputbox     = () => { },
        handleStatusToggle = () => { },
    } = props;

    const removeMultipleSpaces = (str = "") => {
        return str.replace(/\s+/g, ' ').trimStart();
    };

    const { t } = useTranslation();
    const errorValidation = (emailError = false, emailLenght = false, emailEmpty = false) => {
        if (emailError) {
            return translate("LOGIN.EMAIL_ERR");
        } else if (emailLenght) {
            return translate("ERROR.NAME");
        } else if (emailEmpty) {
            return "Please enter the email address";
        } else {
            return "";
        }
    };

    return (
        <React.Fragment>
            <CommonFormInput
                type="text"
                mustFill={true}
                autoFocus={true}
                value={removeMultipleSpaces(fullName)}
                name={"fullName"}
                _onBlur={errValidate}
                readOnly={editManage}
                palceholder={"Full Name"}
                _onchange={(event) => handleInputbox(event)}
                error={subjectErrorMsg(ErrorFname, emptyFieldError, fullName)}
            />

            <CommonFormInput
                type="text"
                mustFill={true}
                value={removeMultipleSpaces(emailId)}
                name={"emailId"}
                _onBlur={errValidate}
                readOnly={_getEditMember}
                palceholder={"Email id"}
                _onchange={(event) => handleInputbox(event)}
                error={errorValidation(ErrorEmail, ErrorEmailLenght, ErrorEmailEmptyCheck)}
            />

            <CommonFormInput
                type="text"
                _maxLength={14}
                value={phoneNumber}
                name={"phoneNumber"}
                _onBlur={errValidate}
                countryCode={countryCode}
                onInput={(e) => processInput(e)}
                mustFill={true} readOnly={editManage}
                palceholder={"Phone Number"}
                _onchange={(event) => handleInputbox(event)}
                _onKeyPress={(event) => numOnlyAllow(event)}
                error={ErrorPnum && t("TEAMS.ADD_MEMBER.PHONE_NUMBER_VALIDATION_ERROR")}
            />

            <span className="label ">
                {"Role"}
                <sub className="mustFill">*</sub>
            </span>

            <div className="common-input-wrapper mb-0 add-member-role">
                {adminRole.map((ele, index) => {
                    return (
                        <span
                            key={convertToLowerCase(index + "adminRole-jset")}
                            className={`${ele.value === role ? "active" : "unchecked"}`}
                        >
                            <div className={`radio-custom`}>
                                <label className="radio" htmlFor={ele.value}>
                                    <input
                                        type="radio"
                                        name={"role"}
                                        id={ele.value}
                                        value={ele.value}
                                        disabled={editManage}
                                        onChange={handleInputbox}
                                        checked={ele.value === role}
                                    />
                                    <label>

                                    </label>
                                </label>

                                <label
                                    className="TxtLabel"
                                    htmlFor={ele.value}
                                >
                                    {ele.planName}
                                </label>
                            </div>
                            <span className="label sm">
                                {ele.desc}
                            </span>
                        </span>
                    );
                })}
            </div>
            <span className="label labelAdjust" style={{ marginTop: "10px" }}>
                {"Status"}
            </span>
            <div className="common-input-wrapper mb-40 status-custom">
                {isActive ?
                    <>
                        {/* <label className={`labelHeading ${isActive ? "text-light inactive" : " "} `} >
                            {t("TEAMS.ADD_MEMBER.INACTIVE_USER")}
                        </label> */}
                        <label className={`labelHeading ${isActive ? "" : "text-light inactive"} `} >
                            User accesses will be active status in the portal
                        </label>
                    </> :
                    <>
                        <label className={`labelHeading ${isActive ? "text-light inactive" : " "} `} >
                            User accesses will be inactive status in the portal
                        </label>
                    </>
                }
                <label htmlFor="Staus" className="switch customize">
                    <input
                        id="Staus"
                        type="checkbox"
                        name="isActive"
                        value={isActive}
                        onChange={handleStatusToggle}
                        checked={isActive}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </React.Fragment>
    );
};
export default React.memo(RoleOptionCheck);
