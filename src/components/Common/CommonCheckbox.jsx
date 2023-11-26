import React, { Fragment } from 'react';
import "./CommonCheckbox.scss";

const CommonCheckbox = (props = {}) => {
    const {
        id = "",
        name = "",
        onChange,
        onClick = () => {},
        label = true,
        labelText = "",
        parentClass = "",
        checkVal = false,
        disabled = false,
    } = props;

    return (
        <Fragment>
            <div className={`form-check ${parentClass ? parentClass : ""} ${disabled ? "disabledCheck" : ""}`}>
                <input
                    type="checkbox"
                    checked={checkVal}
                    value={checkVal}
                    id={`${id}`}
                    onChange={onChange}
                    onClick={onClick}
                    className="form-check-input"
                    disabled={disabled}
                    name={name}
                />

                {label &&
                    <label
                        htmlFor={disabled ? "" : `check-${id}`}
                        className={`${disabled ? "cursor-default " : "cursor-pointer"} form-check-label`}
                    >
                        {labelText}
                    </label>
                }
            </div>
        </Fragment>);
};

export default React.memo(CommonCheckbox);
