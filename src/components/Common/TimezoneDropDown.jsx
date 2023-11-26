import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { IconClose, IconDropdownDark } from "../../assets/images";
import OutsideClickHandler from "react-outside-click-handler";
import { IconClock } from "../../assets/img";
import _get from 'lodash/get';
import CommonInputTag from "../../common/CommonInputTag";
import { leadingAndTrailingspaceAvoid } from "../../helper";

const TimezoneDropDown = (props = {}) => {
    const defaultIdName = "#searchItem";
    const {
        name = "",
        value = "",
        placeholder = "",
        error = "",
        readOnly = false,
        className = "",
        autoFocus = false,
        _onChange = () => { },
        optionList = [],
        listClassname = '',
        closeByOther
    } = props;
    const [stateManage, setStateManage] = useState({
        DropDown: false,
    });
    const { DropDown = false } = stateManage;
    const [searchValue, setSearchValue] = useState("");

    const _handleSelect = (val = {}) => {
        setStateManage({
            ...stateManage,
            DropDown: false
        });
        _onChange(val);
    };

    const _handleDropDown = () => {
        setStateManage({
            ...stateManage,
            DropDown: !stateManage.DropDown
        });
    };

    const _handleOnOutsideClick = () => {
        setStateManage({
            ...stateManage,
            DropDown: false
        });
    };

    const handleSearchItem = (e = {}) => {
        const { value: val = "" } = _get(e, "target", {});
        setSearchValue(val);
        const search = val.toLowerCase();
        const CountryList = document.querySelectorAll("li.items");
        for (const i of CountryList) {
            const item = i.innerHTML.toLowerCase();
            if (item.indexOf(leadingAndTrailingspaceAvoid(search)) === -1) {
                i.style.display = "none";
            } else {
                i.style.display = "block";
            }
        }
    };
    const handleSearchEmpty = () => {//searched Data clear
        setSearchValue("");
        document.querySelector(defaultIdName) &&
            document.querySelector(defaultIdName).blur();
        const CountryList = document.querySelectorAll("li.items");
        for (const i of CountryList) {
            i.style.display = "block";
        }
    };

    useEffect(() => {
        if (!DropDown) {
            handleSearchEmpty();
        }
    }, [DropDown]);
    useEffect(() => {
        if (closeByOther) {
            _handleOnOutsideClick();
        }
    }, [closeByOther])
    return (
        <React.Fragment>
            <OutsideClickHandler
                onOutsideClick={() => { _handleOnOutsideClick(); }}
            >
                <button
                    autoFocus={autoFocus}
                    type="button"
                    onClick={readOnly ? null : _handleDropDown}
                    className={`custom-dropdown TimezoneDropDown table-dropdown commonDropDown ${error ? " error " : ""} ${readOnly ? " readOnly " : ""} ${className}`}
                >
                    <i className="icon_clock"><IconClock /></i>
                    <span
                        title={`${value ? value : ""}`}
                        className={`SelectedValue ${value ? "hasValue" : " default_value"}`}>
                        {value ? value : placeholder}
                    </span>
                    {!readOnly &&
                        <i
                            className={`dropIcon ${stateManage.DropDown ? " active " : ""}`}
                        >
                            <IconDropdownDark />
                        </i>
                    }
                </button>
                {stateManage.DropDown ?
                    <CSSTransition
                        timeout={500}
                        unmountOnExit
                        classNames="fadeInUp"
                        in={stateManage.DropDown}
                    >
                        <div>
                            <div className="scroll">
                                <ul className="customDrop">
                                    {optionList.map((ele) => {
                                        return (
                                            <React.Fragment
                                                key={ele.countryCode}
                                            >
                                                <li
                                                    data-value={ele.timeZone}
                                                    title={ele.timeZone}
                                                    className={`${listClassname} items`}>
                                                    <button
                                                        name={name}
                                                        type="button"
                                                        value={ele.timeZone}
                                                        onClick={() => _handleSelect(ele)}
                                                        className={value === `UTC ${ele.offset} (${ele.timeZone})` ? " active " : ""}
                                                    >
                                                        UTC {ele.offset}{" "}({ele.timeZone})
                                                    </button>
                                                </li>
                                            </React.Fragment>
                                        );
                                    })}

                                </ul>
                            </div>
                            <div className="searchFeild">
                                <div>
                                    <CommonInputTag
                                        value={searchValue}
                                        id={'searchItem'}
                                        name={'searchItem'}
                                        autoFocus={stateManage.DropDown ? true : false}
                                        onChange={(e) => handleSearchItem(e)}
                                    />
                                    {searchValue &&
                                        <i
                                            className="close_search"
                                            onClick={handleSearchEmpty}
                                            data-jest-id={"jestsearchEmpty"}
                                        >
                                            <IconClose />
                                        </i>
                                    }
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                    :
                    null
                }
            </OutsideClickHandler>
            <>
                {error &&
                    <span className="errorMessage">
                        {error}
                    </span>
                }
            </>
        </React.Fragment>
    );

};
export default React.memo(TimezoneDropDown);
