import React, { useEffect, useState } from 'react';
import _get from "lodash/get";
import CommonInputTag from '../CommonInputTag';
import { CSSTransition } from 'react-transition-group';
import { leadingAndTrailingspaceAvoid } from '../../helper';
import { convertToLowerCase } from '../../helper/Validation';
import OutsideClickHandler from 'react-outside-click-handler';
import { IconClose, IconDropdownDark } from '../../assets/images';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import { removeMultipleAndStartSpaces } from '../../helper/utility';

const CountryCode = (props = {}) => {
    const defaultIdName = "#searchCountry";
    const {
        id = "",
        name = "",
        country = "IN",
        DropDown = false,
        readOnly = false,
        _handleSelect = () => { },//click function call
        _handleDropDown = () => { },//click function call
        _handleOnOutsideClick = () => { },//click function call
    } = props;

    const [searchValue, setSearchValue] = useState("");
    /**
     * @param  {string} countryCode=""
     * value convert to number
     * country code only support string
     * isNaN check
    */
    const countryCodeRender = (countryCode = "") => {
        if (isNaN(Number(countryCode))) {
            return (
                <React.Fragment>
                    +{getCountryCallingCode(countryCode ? countryCode : "IN")}
                </React.Fragment>
            );
        } return "";
    };

    const searchCountry = (e = {}) => {
        const { value = "" } = _get(e, "target", {});
        setSearchValue(removeMultipleAndStartSpaces(value));
        const search = value.toLowerCase();
        const CountryList = document.querySelectorAll("li.countryCode");
        for (const i of CountryList) {
            const item = i.innerHTML.toLowerCase();
            if (item.indexOf(leadingAndTrailingspaceAvoid(search)) === -1) {
                i.style.display = "none";
            } else {
                i.style.display = "block";
            }
        }
    };

    const searchCountryEmpty = () => {//searched Data clear
        setSearchValue("");
        document.querySelector(defaultIdName) &&
            document.querySelector(defaultIdName).blur();
        const CountryList = document.querySelectorAll("li.countryCode");
        for (const i of CountryList) {
            i.style.display = "block";
        }
    };

    useEffect(() => {
        setSearchValue("");
        setTimeout(() => {
            document.querySelector(defaultIdName) &&
                document.querySelector(defaultIdName).focus();
        }, 100);
    }, [DropDown]);

    return (
        <React.Fragment>
            <OutsideClickHandler
                onOutsideClick={() => { _handleOnOutsideClick(); }}
            >
                {(convertToLowerCase(name) === convertToLowerCase("phoneNumber")
                    || convertToLowerCase(name) === convertToLowerCase("phoneNum")) &&
                    <React.Fragment>
                        <label
                            htmlFor={id ? id : name}
                            className={`custom-dropdown table-dropdown size-xsm countryDrop ${readOnly ? "default readOnly" : ""}`}
                        >
                            <span
                                className="SelectedValue"
                                onClick={_handleDropDown}
                            >
                                {countryCodeRender(country)}
                            </span>
                            <input
                                type="checkbox"
                                id={id ? id : name}
                                onChange={() => { }}
                                disabled={readOnly ? true : false}
                            />
                            <i
                                onClick={_handleDropDown}
                                className={`dropIcon ${DropDown ? "open" : ""}`}
                            >
                                <IconDropdownDark />
                            </i>
                        </label>
                        <CSSTransition
                            in={DropDown}
                            timeout={500}
                            classNames="fadeInUp"
                            unmountOnExit
                        >
                            <ul>
                                <div className="searchFeild">
                                    <div>
                                        <CommonInputTag
                                            value={searchValue}
                                            id={'searchCountry'}
                                            name={'searchCountry'}
                                            autoFocus={DropDown ? true : false}
                                            onChange={(e) => searchCountry(e)}
                                        />
                                        {searchValue &&
                                            <i
                                                className="close_search"
                                                onClick={searchCountryEmpty}
                                                data-jest-id={"jestsearchCountryEmpty"}
                                            >
                                                <IconClose />
                                            </i>
                                        }
                                    </div>
                                </div>
                                {getCountries().map((element, index) => {
                                    return (
                                        <li
                                            value={element}
                                            data-value={element}
                                            className="countryCode"
                                            onClick={(event) => _handleSelect(event)}
                                            key={convertToLowerCase(index + "getCountries-jsdsdh")}
                                        >
                                            {element} +{getCountryCallingCode(element)}
                                        </li>
                                    );
                                })}
                            </ul>
                        </CSSTransition>
                    </React.Fragment>}
            </OutsideClickHandler>
        </React.Fragment>
    );
};
export default React.memo(CountryCode);
