import React, { useState } from 'react';
import _get from "lodash/get";
import { IconCopy } from '../../assets/images';
import { copyToast } from '../../helper/ApiToast';
import CountryCode from '../FormInput/CountryCode';

const CommonFormInput = (props = {}) => {
    const {
        id = "",
        type = "",
        name = "",//dynamic name "string"
        value = "",//dynamic value
        error = "",//error msg""string"
        className = "",//dynamic class name "string"
        customLabel = "", //can add custom label component
        autoFocus = false,
        caps = false,//first letter upperCse
        readOnly = false,//true false "boolean"
        palceholder = "", //dynamiv placeHolder "string"
        palceholderOnly = "", //dynamiv placeHolder "string"
        customClass = "",
        enableError = true,
        enableCustomLabel = true,
        disabled = false,
        countryCode = "IN",
        _maxLength = 100000,
        _onBlur = () => { },//onblurAction
        onInput = () => { },//onInput press
        _onchange = () => { },
        _onKeyPress = () => { },
        _onFocus = () => { },
        mustFill = false,
        enableCopyIcon = false, //enable copy icon
        headingPlaceholder = true,
        _onKeyDown = () => { },
    } = props;
    const toastId = id;
    const [DropDown, setDropDown] = useState(false);
    const _handleSelect = (event = {}) => {
        setDropDown(false); //dropDown close
        _onchange({ //country Code on change
            preventDefault: function () { //cutom pass preventDefault funtion
                Object.defineProperty(this, "defaultPrevented", { get: function () { return true; } });
            },
            target: {
                name: "countryCode",
                value: _get(event, "target.dataset.value", ""),
            }
        });
    };

    /**
     * country code dropDown open/close manage
    */
    const _handleDropDown = () => {
        setDropDown(!DropDown);
    };

    /**
     * outside click close dropDown
    */
    const _handleOnOutsideClick = () => {
        setDropDown(false);
    };

    const _handleCopy = (valueEle = "") => {
        navigator.clipboard.writeText(valueEle);
        copyToast("Copied", toastId);//toast
    };
    const _palceHolder = (ele = "") => {
        if (!ele) {
          return palceholder;
        } else {
          return palceholderOnly;
        }
      };

    return (
        <React.Fragment>
            <div
                className={`common-input-wrapper
                ${readOnly ? " readOnly " : ""} ${error ? " error " : ""} ${name === "phoneNumber" ? " countryInput " : ""} ${className ? className : ""} `}
            >
                {enableCustomLabel  ? <label htmlFor={id ? id : name} className="placeholder"> {palceholder} <span style={{ color: "red" }}> {mustFill === true && "*"}</span>
                    {customLabel}
                </label> : null }
                <CountryCode
                    name={name}
                    onBlur={_onBlur}
                    readOnly={readOnly}
                    DropDown={DropDown}
                    country={countryCode}
                    _handleSelect={_handleSelect}
                    _handleDropDown={_handleDropDown}
                    _handleOnOutsideClick={_handleOnOutsideClick}
                />
                <div className={` relative ${(enableCopyIcon && value) ? "copy_icon_hover" : ""} `}>
                    <input
                        name={name}
                        type={type}
                        value={value}
                        disabled={disabled}
                        id={id ? id : name}
                        autoComplete={"off"}
                        onChange={(e) => _onchange(e)}
                        maxLength={_maxLength || 100000}
                        onFocus={_onFocus}
                        onInput={onInput ? onInput : null}
                        readOnly={readOnly ? readOnly : null}
                        autoFocus={autoFocus}
                        onBlur={_onBlur ? (e) => _onBlur(e) : null}
                        onKeyPress={_onKeyPress ? _onKeyPress : null}
                        placeholder={_palceHolder(!headingPlaceholder)}
                        className={`${caps ? 'text-uppercase' : ""} ${customClass ? customClass : ""}`}
                        onKeyDown={_onKeyDown }
                    />
                    {(enableCopyIcon && value) &&
                        <button
                            type="button"
                            className="copy_icon"
                            onClick={() => _handleCopy(value)}
                        >
                            <IconCopy />
                        </button>
                    }
                </div>
                {error && enableError &&
                    <span
                        className="errorMessage"
                    >
                        {error}
                    </span>
                }
            </div>
            {props.children}
        </React.Fragment>
    );
};
export default React.memo(CommonFormInput);
