import React, { } from "react";
import './Badge.scss';

const Badge = (Props = {}) => {
    const {
        text = "",
        color = "",
        className = "",
        bgColor = "",
    } = Props;
    return (
        <React.Fragment>
            <div style={{ color: color, background: bgColor }}
                className={`Badge ${className ? className : ""}`}
            >
                <span className="badge-inner">
                    {text}
                </span>
            </div>
        </React.Fragment>
    );

};
export default React.memo(Badge);
