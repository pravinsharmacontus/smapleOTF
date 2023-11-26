import React, { memo } from 'react';
import CommonCheckbox from '../Common/CommonCheckbox';

const CheckComponent = (props = {}) => {
    const { label = "", name = "", onChange = () => { }, checkVal = false, disabled = false, CheckComponentClass = "" } = props;
    return (
        <label htmlFor={name} className={`${disabled ? "disabled_check" : ""} ${CheckComponentClass} check_with_label `}>
            <CommonCheckbox
                disabled={disabled}
                label={false}
                id={name}
                name={name}
                checkVal={checkVal}
                onChange={onChange}
            />
            <span>{label}</span>
        </label>
    );
};

export default memo(CheckComponent);
