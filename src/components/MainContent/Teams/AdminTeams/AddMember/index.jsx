import React, { useState, useEffect } from 'react';
import _get from "lodash/get";
import AddMemberForm from './AddMemberForm';
import AddMemberHeading from './AddMemberHeading';
import AddMemberButtonManage from "./AddMemberButtonManage";
import { userRoleIdDefine } from './addMemberCommon';

const AddMember = (props = {}) => {
    const {
        CusPage = {},
        _getEditMember = false,
        userID = {},//edit userId
        onMemberPageClose,//add member top close icon click
        searchData = {},
        _editInputValue = {}
    } = props;
    const portalRoleDefine = userRoleIdDefine() || "";//if userRole 1 means superAdmin portal
    const [isValidForm, setValidForm] = useState({});//add or update button enable when user complete form
    const [inputValue, setInputValue] = useState({
        emailId: "",
        fullName: "",
        isActive: true,
        phoneNumber: "",
        profileImage: "",
        countryCode: "IN",
        imgProfileName: "",
        role: portalRoleDefine
    });

    //enter input value append to state
    const handleInput = (event = {}, errors = {}) => {
        const { name = "", value = "", imgProfileName = "" } = _get(event, "target", {});
        if (imgProfileName) {
            setInputValue({ ...inputValue, [name]: value, "imgProfileName": imgProfileName });
        } else {
            setInputValue({ ...inputValue, [name]: value });
        }
        setValidForm(errors);
    };

    useEffect(() => {
        if (_getEditMember) {
            setInputValue({
                emailId: _editInputValue.emailId,
                fullName: _editInputValue.fullName,
                isActive: _editInputValue.isActive,
                phoneNumber: _editInputValue.phoneNumber,
                countryCode: _editInputValue.countryCodeShort,
                profileImage: _editInputValue.profileImage,
                imgProfileName: _editInputValue.imgProfileName,
                role: userRoleIdDefine(_editInputValue.userRoleId)
            });
        }

    }, [_editInputValue, _getEditMember]);

    return (
        <React.Fragment>

            <AddMemberHeading
                imageLoad={false}
                memberState={_getEditMember}
                onMemberPageClose={onMemberPageClose}
            />
            <AddMemberForm
                _getEditMember={_getEditMember}
                _editInputValue={_editInputValue}
                CusPage={CusPage}
                role={inputValue.role}//userRole
                handleInput={handleInput}
                emailId={inputValue.emailId}//userEmail
                fullName={inputValue.fullName}//userName
                isActive={inputValue.isActive}//user Active status
                userID={_get(userID, "id", "")}//userRole id when userClick edit button
                countryCode={inputValue.countryCode}
                profileImage={inputValue.profileImage}//user profile pic
                imgProfileName={inputValue.imgProfileName}
                phoneNumber={inputValue.phoneNumber}//user Phone number
            />

            <AddMemberButtonManage
                inputValue={inputValue}
                isValidForm={isValidForm}
                memberState={_getEditMember}
                onMemberPageClose={onMemberPageClose}
                searchData={searchData}
                _editInputValue={_editInputValue}
            />
        </React.Fragment>);
};
export default AddMember;
