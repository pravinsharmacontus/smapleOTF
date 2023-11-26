import React, { Fragment, useEffect, useState } from 'react';
import "./FeedbackForm.scss";
import Ripples from 'react-ripples';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import OutsideClickHandler from 'react-outside-click-handler';
import { IconDeletePopupnewicon } from '../../../assets/images';
import CommonFormInput from '../../../common/CommonFormInput';
import { FormTextArea } from '../../../common';

const FeedbackForm = (props = {}) => {
    const { t } = useTranslation();
    const {
        inputlabel = "",
        reasonLabel = "",
        reasonPlaceholder = "",
        actionHeading = "",
        onExited,
        handleActionText = "",
        customIcon = <IconDeletePopupnewicon />,
        handleDeleteClose = () => { },
        handleInput = () => { },
        handleSubmit = () => { },
        formData = {
            userName: "",
            comment: "",
            userId: 0
        },
        error = false,
        inputCount = 250
    } = props;

    const [popupAnimate, setPopupAnimate] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setPopupAnimate(true);
        }, 100);
        return setPopupAnimate(false);
    }, []);

    return (
        <Fragment>
            <div className="PopupWrapper fixed xs">
                <div className="PopupInner ActionPopup fedback_form">
                    <OutsideClickHandler
                        onOutsideClick={() => { handleDeleteClose(false); }}>
                        <CSSTransition
                            in={popupAnimate}
                            timeout={300}
                            classNames="alert"
                            unmountOnExit
                            onExited={() => onExited(false)}
                        >
                            <div className="action_popup_inner">
                                <div className='action_header'>
                                    <i className="delete">
                                        {customIcon}
                                    </i>
                                    <strong className='action_heading'>{actionHeading}</strong>
                                </div>
                                <CommonFormInput
                                    className="w-full username_input"
                                    mustFill={true}
                                    error={""}
                                    type="text"
                                    name={"userName"}
                                    value={formData.userName}
                                    palceholder={inputlabel}
                                    _maxLength={50}
                                    _onchange={(event) => handleInput(event)}
                                    _onBlur={handleInput}
                                />
                                <div className='action_reason_input'>
                                    <FormTextArea
                                        textAreaType2={true}
                                        type="textarea"
                                        mustFill={true}
                                        className={"mb-0"}
                                        value={formData.comment}
                                        name={"comment"}
                                        id='action_reason'
                                        customClass={`commonTextarea`}
                                        _onchange={(event) => handleInput(event)}
                                        error={""}
                                        palceholder={reasonLabel}
                                        placeholder={reasonPlaceholder}
                                        _maxLength={250}
                                        _onBlur={handleInput}
                                    ></FormTextArea>
                                    <p className='max_text_count'>Max Characters: <span className=''>{inputCount}</span></p>
                                </div>
                                <div className="group-btn">
                                    <Ripples data-auto="actionButton"
                                        className={`Btn outline delete ${error ? 'disabled' : ''} `}
                                        data-jest-id={"jestProceedDelete"}
                                        onClick={(e) => { handleSubmit(); e.target.blur(); }}
                                    > {handleActionText}
                                    </Ripples>
                                    <Ripples data-auto="actionCancel"
                                        className="Btn outline"
                                        data-jest-id={"jestCancelDelete"}
                                        onClick={(e) => { handleDeleteClose(false); e.target.blur(); }}
                                    >
                                        {t("COMMON.CANCEL")}
                                    </Ripples>
                                </div>
                            </div>
                        </CSSTransition>
                    </OutsideClickHandler>
                </div>
            </div>
        </Fragment>
    );
};
export default React.memo(FeedbackForm);
