import React, { Fragment, useEffect } from 'react';
import { IconDelete } from '../../assets/images';
import { CSSTransition } from 'react-transition-group';
import OutsideClickHandler from 'react-outside-click-handler';
import AutoFocusUtility from '../../helper/AutoFocusUtility';

const ActionPopup = (props = {}) => {
    const {
        title = "",//popup title
        iconComponent,
        iconComponentCustom,
        description = "",
        setActive = false,
        iconComponentClass = "",
        onExited = () => { }, //function call
        actionButtonText = "",
        cancelButtonText = "",
        handleClose = () => { }, //handle yes and cancel button,
        handleAction = () => { },
    } = props;

    const escFunction = (event) => {
        if (event.key === "Escape") {
            handleClose(false);
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return (() => {
            document.removeEventListener("keydown", escFunction, false);
        });
    });

    return (
        <Fragment>
            <div className="PopupWrapper fixed xs">
                <CSSTransition
                    in={setActive}
                    timeout={300}
                    classNames="alert"
                    unmountOnExit
                    onExited={() => onExited(false)}
                >
                    <div className="PopupInner ActionPopup">
                        <div className='outside_wraper'>
                            <OutsideClickHandler onOutsideClick={() => handleClose(false)}>
                                <div className="ActionPopupInner">
                                    <AutoFocusUtility />
                                    <div className="action_head">
                                        {iconComponentCustom ? iconComponentCustom : <i className={` delete ${iconComponentClass}`} >
                                            {iconComponent ? iconComponent : <IconDelete />}
                                        </i>}
                                        <strong>{title}</strong>
                                    </div>
                                    <p className="desc">
                                        {description}
                                    </p>
                                    <div className="group-btn">
                                        {actionButtonText &&
                                            <button
                                                type='button'
                                                data-auto="afterPayserverConfigOk"
                                                className="Btn outline delete"
                                                onClick={() => handleAction(true)}
                                            >
                                                {actionButtonText}
                                            </button>
                                        }
                                        {cancelButtonText &&
                                            <button
                                                className="Btn outline"
                                                onClick={() => handleClose(false)}
                                            >
                                                {cancelButtonText}
                                            </button>
                                        }
                                    </div>
                                </div>
                            </OutsideClickHandler>
                        </div>
                    </div>
                </CSSTransition>
            </div >
        </Fragment >
    );
};
export default React.memo(ActionPopup);
