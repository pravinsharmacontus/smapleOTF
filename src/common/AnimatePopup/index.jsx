import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import OutsideClickHandler from 'react-outside-click-handler';
import AutoFocusUtility from '../../helper/AutoFocusUtility';

const AnimatePopup = (props = {}) => {
    const {
        children = "",
        parentClass = "",
        setShow = true,
        _handleOnOutsideClick = () => { },
    } = props;

    const [popupAnimate, setPopupAnimate] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setPopupAnimate(true);
        }, 200);
        return (() => {
            setPopupAnimate(false);
        });
    }, []);

    const escFunction = (event) => {
        if (event.key === "Escape") {
            _handleOnOutsideClick(false);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return (() => {
            document.removeEventListener("keydown", escFunction, false);
        });
    });

    return (
        <React.Fragment>
            <CSSTransition
                timeout={300}
                unmountOnExit
                classNames="show"
                in={setShow}
                onEnter={() => setPopupAnimate(true)}
                onExited={() => setPopupAnimate(false)}
            >
                <div className={`PopupWrapper fixed xs `}>
                    <div className={` PopupInner ActionPopup  ${parentClass}`}>
                        <div className='outside_wraper'>
                            <OutsideClickHandler
                                onOutsideClick={_handleOnOutsideClick}>
                                <CSSTransition
                                    timeout={300}
                                    unmountOnExit
                                    classNames="alert"
                                    in={popupAnimate}
                                    onExited={() => _handleOnOutsideClick(false)}
                                >
                                    <div className=''>
                                        <AutoFocusUtility />
                                        {children}
                                    </div>
                                </CSSTransition>
                            </OutsideClickHandler>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </React.Fragment >
    );
};

export default React.memo(AnimatePopup);
