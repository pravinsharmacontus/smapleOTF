import React, { useEffect, useState } from 'react';
import { IconClose } from '../../assets/images';
import { CSSTransition } from 'react-transition-group';

const SliderMenu = (props = {}) => {
    const [popupAnimate, setpopupAnimate] = useState(false);
    const {
        handlePopupClose = () => { },//click fun
        setShow = false,
        children = "",
    } = props;

    const DropDownActiveCall = (value = false) => {
        setpopupAnimate(value);
    };

    useEffect(() => {
        if (setShow === true) {
            setTimeout(() => {
                setpopupAnimate(setShow);
            }, 500);
        }
    }, []);

    return (
        <React.Fragment>
            <CSSTransition
                in={setShow}
                timeout={300}
                classNames="show"
                unmountOnExit
                onEnter={() => DropDownActiveCall(true)}
                onExited={() => DropDownActiveCall(false)}
            >
                <div className="PopupWrapper fixed ">
                    <CSSTransition
                        in={popupAnimate}
                        timeout={300}
                        classNames="sideMenu"
                        unmountOnExit
                        onExited={() => handlePopupClose(false)}
                    >
                        <div className="PopupInner custom">
                            <div className="PopupInnerLeft" onClick={() => { handlePopupClose(false); }}></div>
                            <div className="PopupForm heightFull">
                                <div className='filterHeader'><span>Filter</span>
                                    <button className=''
                                        onClick={() => handlePopupClose(false)}
                                        type='button'>
                                        <IconClose /></button>
                                </div>
                                <div className='filter-new-wraper'>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                </div>
            </CSSTransition>
        </React.Fragment>
    );
};
export default React.memo(SliderMenu);
