import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OutsideClickHandler from 'react-outside-click-handler';
import Ripples from 'react-ripples';
import {
    IconCalendarNew, IconClose, IconDropdownCc, IconFilter,
    IconMoreFilter, IconSearch, IconSortReset
} from '../../../assets/images';
import SliderMenu from '../../../common/SliderMenu';
import { CSSTransition } from "react-transition-group";
import { isOverFlowActiveFinder } from '../../../helper/TableFilerWidthAdjuster';
import { convertToLowerCase } from '../../../helper/Validation';

const temphide = false;

export const isOverFlowActive = (filterId, enabled = true, reset = false) => {
    setTimeout(() => {
        if (window.innerWidth > 1365) {
            isOverFlowActiveFinder(filterId, enabled, reset);
        }
        else {
            isOverFlowActiveFinder(filterId, false, reset);
        }
    }, 100);
};

export const findOverFlowActive = (filterId) => {
    if (window.innerWidth > 1365) {
        isOverFlowActive(filterId);
    }
};

const FilterParent = (props = {}) => {
    let isResizeDone = "";
    const { filterId = "", children = "",
        parentClass = "", setMoreFilter = () => { },
        getEnableSliderFilter = () => { } } = props;
    const resizedw = () => {
        isOverFlowActive(filterId);
    };
    useEffect(() => {
        isOverFlowActive(filterId);
        getEnableSliderFilter(window.innerWidth <= 1365 ? true : false);
        return () => {
            isOverFlowActiveFinder(filterId, false);
            setMoreFilter(false);
        };
    }, []);

    window.onresize = () => {
        clearTimeout(isResizeDone);
        isResizeDone = setTimeout(() => {
            getEnableSliderFilter(window.innerWidth <= 1365 ? true : false);
            resizedw();
        }, 100);
    };
    return (
        <React.Fragment>
            <div id={filterId} className={`${parentClass ? parentClass : ""} tableSortWraper2 custom`}>
                {children}
            </div>
        </React.Fragment>
    );
};

export default FilterParent;

export const FilterSearchWraper = (props = {}) => {
    const { children = "", setEnableSearch = () => { }, enableSearch } = props;
    return (
        <React.Fragment>
            <div className="inputWrapper">
                <Ripples style={{ display : "none"}}
                    className="b-rounded b-auto bt-default cp-btn bt-outline mobileShow"
                    onClick={() => setEnableSearch(!enableSearch)}
                >
                    <IconSearch style={{ width: "16px", height: "16px" }} />
                </Ripples>
                <OutsideClickHandler
                    onOutsideClick={() => setEnableSearch(false)}
                >
                    {children}
                </OutsideClickHandler>
            </div>
        </React.Fragment >
    );
};

export const FilterSideMenuWraper = (props = {}) => {
    const {
        children = "",
        EnableSliderFilter = false,
        EnableFilterButton = false,
        setEnableFilterButton = () => { }
    } = props;
    return (
        <React.Fragment>
            {(EnableSliderFilter) ?
                <SliderMenu
                    setShow={EnableFilterButton}
                    _outsideCustomer={() => setEnableFilterButton(false)}
                    handlePopupClose={() => setEnableFilterButton(false)}
                >
                    {children}
                </SliderMenu>
                :
                <>
                    {children}
                </>
            }
        </React.Fragment >
    );
};

export const FilterButtonWrapper = (props = {}) => {
    const {
        children = "",
        EnableSliderFilter = false,
        setEnableFilterButton = () => { },
    } = props;
    return (
        <React.Fragment>
            <div className="group-btn">
                {(EnableSliderFilter) && temphide &&
                    <Ripples
                        style={{ display : "none"}}
                        className="b-rounded b-auto bt-default cp-btn bt-outline"
                        onClick={() => setEnableFilterButton(true)}
                    >
                        <IconFilter style={{ width: "16px", height: "16px" }} />
                    </Ripples>
                }
                {children}
            </div>
        </React.Fragment>
    );
};

export const FilterMoreDropWrapper = (props = {}) => {

    const [moreFilter, setMoreFilter] = useState(false);

    const {
        children = "",
        parentClass = "",
        filterValue = 0,
        getMoreFilter = () => { }
    } = props;

    const handleMoreFilter = () => {
        setMoreFilter(!moreFilter);
    };

    useEffect(() => {
        getMoreFilter(moreFilter);
    }, [moreFilter]);

    return (
        <React.Fragment>
            <div className={` ${parentClass} filter-more-wraper `}>
                <div
                    onClick={() => handleMoreFilter()}
                    className={`
                        ${filterValue !== 0 ? " filtered " : "  "} custom-dropdown-sort dropFilter moreFilter`}
                >
                    <i className="IconFilter">
                        <IconMoreFilter />
                    </i>
                    <div>
                        <label htmlFor="" className='custom-dropdown simple table-dropdown datePicker'>
                            <span className="SelectedValue">More Filters {filterValue ? `(${filterValue})` : null}</span>
                        </label>
                    </div>

                    <i className="dropIcon">
                        <IconDropdownCc />
                    </i>
                </div>

                <div className={`${moreFilter ? " open " : " close "} filter-more-group`}>
                    <OutsideClickHandler
                        onOutsideClick={() => setMoreFilter(false)}
                    >
                        {children}
                    </OutsideClickHandler>
                </div>
            </div>
        </React.Fragment>
    );
};

export const FilterCalenderWrapper = (props = {}) => {

    const {
        customClass = "",
        filterId = "",
        dropOpenState = true,
        isDatePickerActive = false,
        children = "",
        onOpenCalendar = () => { },
        resetDatePicker = () => { },
        getDropOpenState = () => { },

    } = props;

    const handleDateDrop = () => {
        findOverFlowActive(filterId);
        getDropOpenState(!dropOpenState);
        setTimeout(() => {
            if (dropOpenState === true ? document.getElementById("user_start_date_id").focus() : '');
        }, 100);
    };

    const handleDropDate = (ele = "") => {
        const dropDate = ele && ele?.target?.querySelector(".datepickerDefault");
        return dropDate?.click();
    };
    const handleDropIcon = (ele = "") => {
        const dropIcon = ele && ele?.target?.closest(".customDateFilter");
        return dropIcon?.click();
    };

    return (
        <React.Fragment>
            <div className={`${(isDatePickerActive) ? " filtered " : " "} ${(customClass)}
             custom-dropdown-sort custom-picker customDateFilter `} onClick={(e) => { handleDropDate(e); }} >
                <label htmlFor="reports1"
                    className={`custom-dropdown datePicker ${isDatePickerActive ?
                        "selected" : ""}`}>
                    <i onClick={(e) => { handleDropIcon(e); }} className="IconCalendar">
                        <IconCalendarNew />
                    </i>
                    <span className="datepicker">
                        {(dropOpenState && !isDatePickerActive) ?
                            <div
                                onClick={() => handleDateDrop()}
                                className='datepickerDefault'
                            >
                                <span
                                    onClick={() => onOpenCalendar(true)}
                                >
                                    Created On
                                </span>
                                <i
                                    onClick={() => onOpenCalendar(true)}
                                    className="dropIcon"
                                >
                                    <IconDropdownCc />
                                </i>
                            </div>
                            :
                            children
                        }
                    </span>

                    {isDatePickerActive ?
                        <i
                            id="#jestIconReset"
                            className="IconReset"
                            onClick={() => {
                                resetDatePicker();
                            }}
                        >
                            <IconClose />
                        </i> : null
                    }
                </label>
            </div>
        </React.Fragment>
    );
};

export const FilterMultiCalenderWrapper = (props = {}) => {

    const {
        filterId = "",
        dataValue: valueData = [],
        _onChange = () => { },
        selectorName = "planName",
        dropOpenState = false,
        isDatePickerActive = false,
        children = "",
        valueselect = "",
        setDropOpenState = () => { },
        resetDatePicker = () => { },
        dataValue = [],
        name = "filterBy"

    } = props;
    const _handleOnOutsideClick = () => {
        setDropOpenState(false);
    };

    const handleSelect = (event = {}, index = 0) => {
        findOverFlowActive(filterId);
        const { target = {} } = event;
        if (target.getAttribute('data-value') !== valueselect) {
            const eventValue = {
                target: {
                    name: target.getAttribute("name"),
                    value: target.getAttribute('data-value'),
                    selectedElement: valueData[index]
                }
            };
            _handleOnOutsideClick();
            _onChange(eventValue);
        }
    };

    const handleDropOpen = () => {
        setDropOpenState(!dropOpenState);
    };

    return (
        <React.Fragment>
            <div className={`${valueselect !== "Date Type" ? " filtered " : " "}
             custom-dropdown-sort custom-picker customDateFilter `}>
                <label htmlFor="reports1"
                    className={`custom-dropdown datePicker ${valueselect !== "Date Type" ?
                        "selected" : ""}`}>
                    <i className="IconCalendar">
                        <IconCalendarNew />
                    </i>
                    <span className="datepicker multi">
                        <div className='datepickerDefault' onClick={() => { handleDropOpen(); }}>
                            <span
                            >
                                {valueselect}
                            </span>
                            <i
                                className="dropIcon"
                            >
                                <IconDropdownCc />
                            </i>
                        </div>
                        <OutsideClickHandler
                            onOutsideClick={() => _handleOnOutsideClick()}
                        >
                            <CSSTransition
                                in={dropOpenState}
                                timeout={500}
                                classNames={dropOpenState ? "fadeInUp" : "hidden"}
                                unmountOnExit
                            >
                                <div id="drop_down_custom" className='drop_down_custom'>
                                    <ul className="customDrop">
                                        {(dataValue || []).map((element, index) => {
                                            return (<>
                                                <li
                                                    key={convertToLowerCase(index + "valueData-ssfab")}
                                                    className={""}>
                                                    <button
                                                        name={name}
                                                        data-value={element.id}
                                                        onClick={(event) => handleSelect(event, index)}
                                                        className="button"
                                                        type="button">
                                                        {element[selectorName]}
                                                    </button>
                                                </li>
                                            </>
                                            );
                                        }
                                        )}
                                    </ul>
                                </div>
                            </CSSTransition>
                        </OutsideClickHandler>
                        {valueselect !== "Date Type" ? children : null}
                    </span>

                    {isDatePickerActive ?
                        <i
                            id="#jestIconReset"
                            className="IconReset"
                            onClick={() => {
                                resetDatePicker();
                            }}
                        >
                            <IconClose />
                        </i> : null
                    }
                </label>
            </div>
        </React.Fragment>
    );
};

export const FilterResetOption = (props = {}) => {
    const {
        filterId = "",
        isActiveReset = false,
        setdropOpen = () => { },
        resetAllfiled = () => { },
    } = props;
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <div onClick={() => {
                resetAllfiled();
                setdropOpen(false);
                isOverFlowActive(filterId, true, true);
            }}
                className={`${isActiveReset ? " filtered " : "  "} resetFilter`}>
                <div title={t("COMMON.RESET_FILTER")}
                    className="resetAll"
                >
                    <span><IconSortReset /></span>
                    <strong className='resetText'>Reset</strong>
                </div>
            </div>
        </React.Fragment>
    );
};
