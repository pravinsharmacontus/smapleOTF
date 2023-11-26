import React, { useEffect, useState } from 'react';
import './RaiseTicker.scss';
import { Link } from 'react-router-dom';
import { IconLeftArrow } from './assets';
import '../SettingsProfile.scss';
import { useSelector } from 'react-redux';
import { FormTextArea } from '../../../common';
import { useTranslation } from "react-i18next";
import RaiseTicketLoader from './RaiseTicketLoader';
import TicketSuccesPopup from './TicketSuccesPopup';
import { Post } from '../../../common/httpRestServices';
import { encodeGetParams } from '../../../helper/Encypt';
import { apiUrl, createTicket } from '../../../helper/ApiUrl';
import { userDetailsLocal } from '../../../helper/RoleConfig';
import CommonFormInput from '../../../common/CommonFormInput';
import { failToast, succToast } from '../../../helper/ApiToast';
import { ticketDiscriptionError, subjectTickeErrorMsg } from '../../../const/errorHandle';
import { checkWhiteSpaces, ticketDiscription, ticketSubject, validateForm } from '../../../helper/Validation';
import PageHeadingAndDescription from './PageHeadingAndDescription';
import { callCusDetails } from '../Setting/settingPageCommon';
import { InBroadcastScreenAction } from '../../../store/action/tempAction';
import store from '../../../store';

const defaultState = {
    subject: "",
    platform: "Web",
    description: "",
};

const RaiseTicket = (props = {}) => {
    const { t } = useTranslation();
    const userDetails = userDetailsLocal() || {};//logged userDetails
    const { data: { userId = "" } = {} } = userDetails;

    const globalStore = useSelector((state) => state) || {};
    const [success, setSuccess] = useState(false);

    const [ticketSubmitLoader, setTicketSubmitLoader] = useState(false);

    const [errorMsgSubject, SetErrorMsgSubject] = useState(false);
    const [errorMsgSubjectSpace, SetErrorMsgSubjectSpace] = useState(false);

    const [errorMsgDesSpace, SetErrorMsgDesSpace] = useState(false);
    const [errorMsgDescription, SetErrorMsgDescription] = useState(false);

    const [formData, setFormData] = useState({
        subject: "",
        platform: "Web",
        description: "",
    });

    const [errConInfo, setErrConInfo] = useState({
        subjectErr: false,
        subjectSpace: false,

        descriptionErr: false,
        descriptionSpace: false,

        platFormError: true,
    });

    const errValidateCommon = (stateValue = false, defaultValue = false) => {
        return stateValue ? !defaultValue : false;
    };

    const errValidateOnchange = (error = {}) => {
        const {
            subjectErr, subjectSpace,
            descriptionErr, descriptionSpace,
        } = error;
        subjectErr && SetErrorMsgSubject(false); //subject 50 length
        subjectSpace && SetErrorMsgSubjectSpace(false); //subject white space

        descriptionSpace && SetErrorMsgDesSpace(false); //subject white space
        descriptionErr && SetErrorMsgDescription(false); //subject 50 length
    };

    const swFieldValidation = (name = "", value = "") => {
        const errors = errConInfo;
        switch (name) {
            case "subject":
                errors.subjectErr = ticketSubject(value);
                errors.subjectSpace = checkWhiteSpaces(value);
                break;
            case "description":
                errors.descriptionErr = ticketDiscription(value);
                errors.descriptionSpace = checkWhiteSpaces(value);
                break;
            case "Platform":
                errors.platFormError = true;
                break;
            default:
                break;
        }
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrConInfo(errors);
        errValidateOnchange(errors);
    };

    const _onChange = (event = {}) => {
        event.preventDefault && event.preventDefault();
        const { target: { name = "", value = "" } } = event;
        swFieldValidation(name, value);
    };

    const blurErrValidate = () => {
        const {
            subjectErr, subjectSpace,
            descriptionErr, descriptionSpace,
        } = errConInfo;

        SetErrorMsgSubject(errValidateCommon(formData.subject, subjectErr)); //if false error msg true otherwise true
        SetErrorMsgSubjectSpace(errValidateCommon(formData.subject, subjectSpace)); //if false error msg true otherwise true
        SetErrorMsgDesSpace(errValidateCommon(formData.description, descriptionSpace)); //if false error msg true otherwise true
        SetErrorMsgDescription(errValidateCommon(formData.description, descriptionErr)); //if false error msg true otherwise true

    };

    /**
     * raise ticket api call
     */
    const raiseTicketApiCall = async () => {
        const { subject = "", description = "", platform = "Web", } = formData;
        if (validateForm(errConInfo)) {
            setTicketSubmitLoader(true);//loader on
            //fine priority
            // const finPlatForm = ticketPriority.find((ele) => "" + ele.id === "" + platform);
            const apiObj = {
                issueSummary: `OTF-${subject}`,
                issueDetail: description,
                // Platform: _get(finPlatForm, "planName", ""),
                Platform: platform,
            };
            const queryString = encodeGetParams(apiObj);
            const apiResponse = await Post(`${apiUrl}${createTicket.createTicket}${queryString}`, {}, true);
            setTicketSubmitLoader(false);//loader
            const { data: { status = 0, message = "" } = {} } = apiResponse || {};
            if (status === 200) {
                setSuccess(true);
                succToast(message);
                setFormData(defaultState);//clear input
            } else {
                failToast(message);
            }
        } else {
            failToast("Please fill all mandatory fields/Clear the error");
        }
    };

    useEffect(() => {
        callCusDetails(userId);//get userDetails customer details
        store.dispatch(InBroadcastScreenAction(false));
    }, []);

    return (
        <React.Fragment>
            <div className="MainWrapper">
                <RaiseTicketLoader
                    globalStore={{ ...globalStore, ticketSubmitLoader: ticketSubmitLoader }}
                />
                <div className="ContentWrapperraise">
                    <div className="customersWrapper raiseticket">
                        <div className="PopupFormBody setting raiseticket">
                            <div className={`${success ? " success " : " "} raiseticketInner wrapper`}>
                                {!success ?
                                    <form className='RaiseTicketForm'>
                                        <div className="grid">
                                            <div className='gridCustomWidth'>
                                                <PageHeadingAndDescription
                                                    parentClass={"leftSec"}
                                                    pageHead={t("RAISE_TICKET.INFO")}
                                                    pageHeadDescription={t("RAISE_TICKET.DESC")}
                                                />
                                            </div>
                                            <div className='grid-9'>
                                                <div className="rightSec">
                                                    <CommonFormInput
                                                        type="text"
                                                        mustFill={true}
                                                        readOnly={false}
                                                        name={"subject"}
                                                        _onchange={_onChange}
                                                        value={formData.subject}
                                                        _onBlur={blurErrValidate}
                                                        palceholder={'Issue Summary'}
                                                        headingPlaceholder={false}
                                                        error={formData.subject && subjectTickeErrorMsg(errorMsgSubject, errorMsgSubjectSpace)}
                                                    />
                                                    <FormTextArea
                                                        textAreaType2={true}
                                                        type="textarea"
                                                        mustFill={true}
                                                        _maxLength={10000}
                                                        name={"description"}
                                                        _onchange={_onChange}
                                                        _onBlur={blurErrValidate}
                                                        value={formData.description}
                                                        palceholder={"Issue in Detail"}
                                                        error={formData.description && ticketDiscriptionError(errorMsgDescription, errorMsgDesSpace)}

                                                    />
                                                    <CommonFormInput
                                                        type="text"
                                                        mustFill={false}
                                                        readOnly={true}
                                                        name={"Priority"}
                                                        _onchange={_onChange}
                                                        value={"Web"}
                                                        _onBlur={blurErrValidate}
                                                        palceholder={'Platform'}
                                                        disabled={true}
                                                        headingPlaceholder={false}
                                                    />

                                                    <div className="gap-20"></div>
                                                    <div>
                                                        <button
                                                            type="button"
                                                            class="cp-btn-custom"
                                                            onClick={() => raiseTicketApiCall()}
                                                            data-jest-id={"jestRaiseTicketApiCall"}
                                                        >
                                                            {t("LOGIN.SUBMIT")}
                                                        </button>
                                                    </div>
                                                    <div className='gap-20'></div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    :
                                    <React.Fragment>
                                        <Link to='/'>
                                            <span
                                                className='backButton'
                                            >
                                                <IconLeftArrow />
                                            </span>
                                        </Link>
                                        <TicketSuccesPopup />
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default React.memo(RaiseTicket);
