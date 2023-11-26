import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconDeletePopupnewicon } from '../../assets/images';
import { CSSTransition } from 'react-transition-group';
import OutsideClickHandler from 'react-outside-click-handler';

const PermanentDeletePopup = (props = {}) => {
    const {
        onExited = () => { }, //function call
        handleDeleteClose = () => { }, //handle yes and cancel button
    } = props;

    const { t } = useTranslation();
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
                <div className="PopupInner ActionPopup">
                    <OutsideClickHandler
                        onOutsideClick={() => { handleDeleteClose(false); }}>
                        <CSSTransition
                            in={popupAnimate}
                            timeout={300}
                            classNames="alert"
                            unmountOnExit
                            onExited={() => onExited(false)}
                        >
                            <div className="ActionPopupInner">
                                <i className="delete">
                                    <IconDeletePopupnewicon /> <strong>Delete?</strong>
                                </i>
                                <p className="desc">
                                    Are you sure? You're about to delete "Mirrorfly account" Permanently, You will no longer have access to your account data.
                                </p>
                                <div className="group-btn">
                                    <button
                                        type='button'
                                        className="Btn outline delete"
                                        data-jest-id={"jestProceedDelete"}
                                        onClick={(e) => { e.target.blur(); handleDeleteClose(true); }}
                                    >
                                        {t("COMMON.DELETE")}
                                    </button>
                                    <button
                                        type='button'
                                        className="Btn outline"
                                        data-jest-id={"jestCancelDelete"}
                                        onClick={(e) => { e.target.blur(); handleDeleteClose(false); }}

                                    >
                                        {t("COMMON.CANCEL")}
                                    </button>
                                </div>
                            </div>
                        </CSSTransition>
                    </OutsideClickHandler>
                </div>
            </div>
        </Fragment>
    );
};
export default React.memo(PermanentDeletePopup);
