import React, { Fragment } from 'react';
import { IconCopy } from '../../assets/images';
import { copyToast } from '../../helper/ApiToast';
import "./common-text-wrapper.scss";

const FormTextArea = (props = {}) => {
    const {
        id = "",
        type = "",
        name = "",//dynamic name "string"
        caps,//first letter upperCse
        value = "",//dynamic value
        error = "",//error msg""string"
        mustFill,//mandatory filed "string"
        children,
        className = "",//dynamic class name "string"
        customClass = "",//dynamic class name "string"
        palceholder = "", //dynamiv placeHolder "string"
        placeholder = "",
        _onClick = () => { },
        readOnly = false,//true false "boolean"
        autoFocus = false,
        disabled = false,
        onInput = () => { },//onInput press
        _maxLength = 100000,
        _onBlur = () => { },//onblurAction
        _onchange = () => { },//function
        _onKeyPress = () => { },
        textAreaType2 = false,
        enableCopyIcon = false, //enable copy icon
    } = props || {};
    const toastId = id;

    const _handleCopy = (valueEle = "") => {
        navigator.clipboard.writeText(valueEle);
        copyToast("Copied", toastId); // toast
    };

    return (
        <React.Fragment>
            <div
                className={` ${!textAreaType2 ? " grp-input " : " common-input-wrapper "}${readOnly ?
                    " readOnly" : ""} ${error ? " error" : ""}${name === "phoneNumber" ?
                        "countryInput" : ""}
                 ${className ? className : ""} `}>
                {textAreaType2 &&
                    <label htmlFor='' className="placeholder"> {palceholder} <span style={{ color: "red" }}> {mustFill === true && "*"}</span></label>
                }
                {children}
                <Fragment>
                    <div className='relative copy_icon_hover'>
                        <textarea
                            name={name}
                            type={type}
                            value={value}
                            id={id ? id : name}
                            autoComplete={"off"}
                            autoFocus={autoFocus}
                            onChange={(e) => _onchange(e)}
                            onInput={onInput ? onInput : null}
                            maxLength={_maxLength || 10000000}
                            readOnly={readOnly ? readOnly : null}
                            onBlur={_onBlur}
                            onClick={_onClick}
                            disabled={disabled}
                            onKeyPress={_onKeyPress ? _onKeyPress : null}
                            className={`${customClass ? customClass : " textarea "} ${caps ? 'text-uppercase' : null}`}
                            placeholder={placeholder ? placeholder : ""}
                        />
                        {enableCopyIcon && value !== "" &&
                            <button onClick={() => _handleCopy(value)}
                                type="button" className="copy_icon"><IconCopy /></button>
                        }
                    </div>
                </Fragment>
                {!textAreaType2 &&
                    <>
                        {palceholder &&
                            <span className="placeholder">{palceholder} {mustFill ? <sub className="mustFill">*</sub> : ""} </span>}
                    </>
                }
                {error &&
                    <span
                        className="errorMessage">
                        {error}
                    </span>
                }
            </div>
        </React.Fragment>
    );
};
export default React.memo(FormTextArea);
