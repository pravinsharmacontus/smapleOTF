import React, { useState } from "react";
import _get from "lodash/get";
import CountryCode from "./CountryCode";

const FormInput = (props = {}) => {
  const {
    id = "",
    type = "",
    name = "", //dynamic name "string"
    value = "", //dynamic value
    error = "", //error msg""string"
    className, //dynamic class name "string"
    caps = false, //first letter upperCse
    readOnly = false, //true false "boolean"
    mustFill = false,
    palceholder = "", //dynamiv placeHolder "string"
    autoFocus = false,
    countryId = "",
    customClass = "",
    countryCode = "IN",
    _maxLength = 100000,
    autoComplete = "off",
    _onBlur = () => {}, //onblurAction
    onInput = () => {}, //onInput press
    _onchange = () => {},
    _onKeyPress = () => {},
    headingPlaceholder = true,
    disabled = false,
    floatingPlaceholder = false,
    onFocus = () => {}, //onFocus press}
    children,
  } = props;

  const [DropDown, setDropDown] = useState(false);

  const _handleSelect = (event = {}) => {
    setDropDown(false); //dropDown close
    _onchange({
      //country Code on change
      preventDefault: function () {
        //cutom pass preventDefault funtion
        Object.defineProperty(this, "defaultPrevented", {
          get: function () {
            return true;
          },
        });
      },
      target: {
        name: "countryCode",
        value: _get(event, "target.dataset.value", ""),
      },
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
  const _palceHolder = (ele = "") => {
    if (!ele) {
      return floatingPlaceholder;
    } else {
      return palceholder;
    }
  };
  return (
    <React.Fragment>
      <div
        className={` grp-input ${readOnly ? "readOnly" : ""} ${
          error ? "error" : ""
        } ${name === "phoneNumber" ? "countryInput" : ""} ${
          className ? className : ""
        } `}
      >
        <CountryCode
          id={countryId ? countryId : name}
          name={name}
          onBlur={_onBlur}
          readOnly={readOnly}
          DropDown={DropDown}
          country={countryCode}
          _handleSelect={_handleSelect}
          _handleDropDown={_handleDropDown}
          _handleOnOutsideClick={_handleOnOutsideClick}
        />
        <div className="relative">
          <input
            onFocus={onFocus}
            name={name}
            type={type}
            disabled={disabled ? "disabled" : ""}
            value={value}
            id={id ? id : name}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            onChange={(e) => _onchange(e)}
            maxLength={_maxLength || 100000}
            onInput={onInput ? onInput : null}
            readOnly={readOnly ? readOnly : null}
            onBlur={_onBlur ? (e) => _onBlur(e) : null}
            onKeyPress={_onKeyPress ? _onKeyPress : null}
            placeholder={_palceHolder(headingPlaceholder)}
            className={`${caps ? "text-uppercase" : ""} ${
              customClass ? customClass : ""
            }`}
            rest
          />
          {floatingPlaceholder && (
            <label htmlFor={id} className=" floatingplaceholder ">
              {palceholder}
              {mustFill === true && (
                <span style={{ marginLeft: "3px", color: "red" }}>{"*"}</span>
              )}
            </label>
          )}
          {children}
        </div>
        {headingPlaceholder && (
          <span className="placeholder">
            {palceholder}
            <span style={{ color: "red" }}>{mustFill === true && "*"}</span>
          </span>
        )}
        {error && <span className="errorMessage">{error}</span>}
      </div>
    </React.Fragment>
  );
};
export default React.memo(FormInput);
