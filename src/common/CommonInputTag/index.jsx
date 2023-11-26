import React from 'react';
import propTypes from "prop-types";

const CommonInputTag = (props = {}) => {
    const {
        id = "",
        name = "",
        value = "",
        errMsg = "",
        type = "text",
        className = "",
        placeholder = "", //dynamiv placeHolder "string"
        readOnly = false,
        required = false,
        autoFocus = false,
        onBlur = () => { },//click
        onChange = () => { },//click
        onKeyDown = () => { },//click
    } = props || {};
    return (
        <React.Fragment>
            <input
                formNoValidate
                id={id ? id : ""}
                autoComplete="off"
                onChange={onChange}
                name={name ? name : ""}
                value={value ? value : ""}
                type={type ? type : "text"}
                onBlur={onBlur ? onBlur : null}
                required={required ? required : ""}
                readOnly={readOnly ? readOnly : false}
                onKeyDown={onKeyDown ? onKeyDown : null}
                className={className ? className : ""}
                placeholder={placeholder ? placeholder : ""}
                autoFocus={autoFocus}
            />
            <span className="error">{errMsg ? errMsg : null}</span>
        </React.Fragment>
    );
};
CommonInputTag.propTypes = {
    id: propTypes.string,
    onBlur: propTypes.func,
    name: propTypes.string,
    type: propTypes.string,
    value: propTypes.string,
    onChange: propTypes.func,
    readOnly: propTypes.bool,
    required: propTypes.bool,
    autoFocus: propTypes.bool,
    onKeyDown: propTypes.func,
    className: propTypes.string,
    placeholder: propTypes.string,
};

export default React.memo(CommonInputTag);
