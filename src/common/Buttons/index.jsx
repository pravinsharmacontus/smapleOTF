import React from 'react';
import { Link } from 'react-router-dom';
import Ripples from 'react-ripples';

const CommonButton = (props = {}) => {
    const {
        to = "/",
        type = "button",
        className = "",
        buttonText = "",
    } = props;

    return (
        <React.Fragment>
            {type === "link" ?
                <Ripples className='b-r-30 header_btn'>
                <Link
                    to={to}
                    className={`${className ? className : ""} cp-btn`}>
                    {buttonText}
                </Link>
                </Ripples>
                :
                <button
                    type={type}
                    className={`${className ? className : ""} cp-btn`}>
                    {buttonText}
                </button>
            }
        </React.Fragment>

    );
};

export default React.memo(CommonButton);
