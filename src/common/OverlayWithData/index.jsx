import React from "react";
import './OverlayWithData.scss';

const OverlayWithData = (props = {}) => {
    const {
        position,
        text,
        align,
    } = props;
    return (
        <React.Fragment>
            {/* options
            align -> top , left, bottom, right, center
            position -> absolute, fixed
            */}
            <div className={`${align ? align : 'center'} ${position ? position : 'absolute'} OverlayWithData`}>
                <span className="txt">{text ? text : ''}</span>
            </div>
        </React.Fragment>
    );
};
export default React.memo(OverlayWithData);
