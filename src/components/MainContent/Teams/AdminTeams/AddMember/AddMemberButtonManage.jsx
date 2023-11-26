import React from 'react';
import Ripples from 'react-ripples';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getCountryCallingCode } from 'react-phone-number-input/input';
import { createTeamButtonStyle, valueCheckisEmpty, } from './addMemberCommon';
import { leadingAndTrailingspaceAvoid, nullCheckString } from '../../../../../helper';
import { validateForm } from '../../../../../helper/Validation';
import { addMember, updateMember } from '../../../../../store/action/teamsAction';

const AddMemberButtonManage = (props = {}) => {
    const {
        inputValue = {},
        memberState = {},
        onMemberPageClose,//add member top close icon click
        isValidForm = {},
        searchData = {},
        _editInputValue = {},
    } = props;

    const { status, ...rest } = isValidForm;
    const isFormValidateCheck = Object.keys(rest).length ? validateForm(rest) : false;
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleUpdate = () => {
        const payload = {
            "userId": _editInputValue.userId,
            "userRole": inputValue.role,
            "isActive": inputValue.isActive,
            "phoneNumber": inputValue.phoneNumber,
            "countryCodeShort": inputValue.countryCode,
            "countryCode": getCountryCallingCode(nullCheckString(inputValue.countryCode)),
            "fullName": leadingAndTrailingspaceAvoid(inputValue.fullName),
            "emailId": inputValue.emailId,
        };
        const formData = new FormData();
        formData.append("profileImage", valueCheckisEmpty(inputValue.imgProfileName));
        dispatch(updateMember({ payload, formData, searchData }));
        onMemberPageClose();
    };

    const handleSubmit = () => {
        const payload = {
            "userRole": inputValue.role,
            "isActive": inputValue.isActive,
            "phoneNumber": inputValue.phoneNumber,
            "countryCodeShort": inputValue.countryCode,
            "countryCode": getCountryCallingCode(nullCheckString(inputValue.countryCode)),
            "fullName": leadingAndTrailingspaceAvoid(inputValue.fullName),
            "emailId": inputValue.emailId,
        };
        const formData = new FormData();
        formData.append("profileImage", valueCheckisEmpty(inputValue.imgProfileName));
        dispatch(addMember({ payload, formData, searchData }));
        onMemberPageClose();
    };

    return (
        <React.Fragment>
            <div className="FloatinigButton">
                <Ripples className='m-r-7'><span
                    id={"jestCancel2"}
                    className="Btn outline sm"
                    onClick={onMemberPageClose}
                >
                    {t("TEAMS.ADD_MEMBER.CANCEL_BUTTON")}
                </span>
                </Ripples>

                <Ripples className='m-r-7'>
                    <button
                        type="button"
                        id={"jestSave2"}
                        disabled={!isFormValidateCheck}
                        onClick={memberState ? () => handleUpdate() : () => handleSubmit()}
                        className={createTeamButtonStyle(isFormValidateCheck)}
                    >
                        {memberState ? t("TEAMS.ADD_MEMBER.UPDATE") : t("TEAMS.ADD_MEMBER.CREATE_BUTTON")}
                    </button>
                </Ripples>
            </div>
        </React.Fragment>);
};
export default React.memo(AddMemberButtonManage);
