import React from 'react';
import Ripples from 'react-ripples';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { _userLogout } from '../../../helper/Validation';
import OutsideClickHandler from 'react-outside-click-handler';

const LogOutPopUp = (props = {}) => {
    const {
        stateManage = {},
        setpopupAnimate = () => { },
        _handleOnOutsideClick = () => { },
        currentOrgList = {},
        ownerUserId = {},
        _awsStageReducer = {}
    } = props;

    const { t } = useTranslation();

    return (
        <React.Fragment>
            <CSSTransition
                timeout={300}
                unmountOnExit
                classNames="show"
                in={stateManage.ProfileOption}
                onEnter={() => setpopupAnimate(true)}
                onExited={() => setpopupAnimate(false)}
            >
                <div className="PopupWrapper fixed xs">
                    <CSSTransition
                        timeout={300}
                        unmountOnExit
                        classNames="alert"
                        in={stateManage.popupAnimate}
                        onExited={() => _handleOnOutsideClick(false)}
                    >
                        <div className="PopupInner ActionPopup">
                            <div className='outside_wraper'>
                                <OutsideClickHandler
                                    onOutsideClick={() => { _handleOnOutsideClick(); }}
                                >
                                    <div className="ActionPopupInner logout">
                                        <p>
                                            {`Are you sure you want to logout?`}
                                        </p>
                                        <div className="group-btn">
                                        <Ripples className="li">
                                                <button
                                                    type='button'
                                                    className="btn-Blue sm red"
                                                    onClick={() => _userLogout(currentOrgList, ownerUserId,_awsStageReducer)}
                                                >
                                                    {t("NAVBAR.LOGOUT")}
                                                </button>
                                            </Ripples>
                                            <Ripples className="li">
                                                <button
                                                    type='button'
                                                    className="btn-outline sm"
                                                    onClick={() => _handleOnOutsideClick(false)}
                                                >
                                                    {t("COMMON.CANCEL")}
                                                </button>
                                            </Ripples>
                                        </div>
                                    </div>
                                </OutsideClickHandler>
                            </div>
                        </div>
                    </CSSTransition>
                </div>
            </CSSTransition>
        </React.Fragment >
    );
};

export default React.memo(LogOutPopUp);
