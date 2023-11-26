import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import OutsideClickHandler from "react-outside-click-handler";

const InputTooltips = (Props = {}) => {
    const {
        Show = false,
        ArrowOn = "",
        Message = "",
        AddClass = "",
        TipPosition = "",
        ArrowPosition = "",
    } = Props || {};

    const [ShowTips, setShowTips] = useState(Show);

    const _handleOnOutsideClick = () => {
        setShowTips(false);
    };

    return (
        <React.Fragment>
            <CSSTransition
                in={ShowTips}
                timeout={500}
                classNames="fadeInUp"
                unmountOnExit
            >
                <OutsideClickHandler onOutsideClick={() => { _handleOnOutsideClick(); }}>
                    <div className={`${AddClass === "undefined" ? "" : AddClass} inputTips`}>
                        <div className={`${TipPosition} tipContainer`}>
                            <div className={`${ArrowOn} ${ArrowPosition}`}></div>
                            <p className="message">{Message}</p>
                        </div>
                    </div>
                </OutsideClickHandler>
            </CSSTransition>
        </React.Fragment>
    );

};
export default React.memo(InputTooltips);
