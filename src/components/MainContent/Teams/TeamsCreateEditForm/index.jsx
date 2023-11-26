import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import OutsideClickHandler from 'react-outside-click-handler';
import './TeamsCreateEditForm.scss';

function TeamsCreateEditForm(props) {
    const {
        parentClassName = "",
        onExited, //function call
        handleClose = () => { }, //handle yes and cancel button
        children,
    } = props;

    const [_getPopupAnimate, _setPopupAnimate] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            _setPopupAnimate(true);
        }, 100);
        return _setPopupAnimate(false);
    }, []);

    const _escFunction = (event) => {
        if (event.key === "Escape") {
            handleClose(false);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", _escFunction, false);
        return (() => {
            document.removeEventListener("keydown", _escFunction, false);
        });
    });

    return (
        <>
            <div className="PopupWrapper fixed xs">
                <div className={`PopupInner ActionPopup ${parentClassName}`}>
                    <div className='outside_wraper'>
                        <OutsideClickHandler
                            onOutsideClick={() => { handleClose(false); }}>
                            <CSSTransition
                                in={_getPopupAnimate}
                                timeout={300}
                                classNames="alert"
                                unmountOnExit
                                onExited={() => onExited(false)}
                            >
                                <div className="ActionPopupInner">
                                    {children}
                                </div>
                            </CSSTransition>
                        </OutsideClickHandler>
                    </div>
                </div>
            </div>
        </>

    );
}

export default TeamsCreateEditForm;
