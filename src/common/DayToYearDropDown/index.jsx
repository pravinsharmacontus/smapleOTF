import React, { useState, useEffect } from "react";
import Moment from 'moment';
import _get from "lodash/get";
import DynamicDropList from "./DynamicDropList";
import MonthPicker from '../DatePicker/MonthPicker';
import { IconCalendar } from "../DatePicker/assets";
import StartToEndPicker from "../DatePicker/StartToendPicker";
import OutsideClickHandler from "react-outside-click-handler";
import { IconDropdownCc, IconClose } from '../../assets/images';
import DayToYearDropDownListdatas from "./DayToYearDropDownListdatas";
import { DateTimeFormeterEnd, DateTimeFormeterStart } from "../../helper";

const DayToYearDropDown = (props = {}) => {

    const {
        name = "",
        classValue = "",
        dropDownData = [],
        parentClass = "",
        stateManageOrg = {},
        dashBordMonth = false,
        selectedDate = () => { },//click fun
        dynamicOptiondata = false,
        enableMonthPicker = false,
        onChangeHandle = () => { },//click function
        onChangeDropDown = () => { },
        DefaultDate = (enableMonthPicker || dynamicOptiondata) ? "This Month" : "Last 30 days",
    } = props;

    const cusDate = "Custom date";
    const defaultDate = DefaultDate ? DefaultDate : "";
    const [focusedInputData, setfocusedInputData] = useState(null);
    const [DropDown, setDropDown] = useState(false);
    const [CustomDate, setCustomDate] = useState(false);
    const [SelectedDefault, setSelectedDefault] = useState(defaultDate);
    const [calendarActive, setCalenderActive] = useState(false);
    const [selectedValue, setSelectedValue] = useState(false);

    /**
    * @param  {object} {startDate} -moment object - convert into DateTimeFormeterStart
    * @param  {object} {endDate} - moment object - convert into DateTimeFormeterEnd
    **/
    const changeDateGroup = ({ startDate = "", endDate = "" }) => {
        const fromDate = DateTimeFormeterStart(startDate);
        const toDate = DateTimeFormeterEnd(endDate);
        if (fromDate && !endDate) {//if start date choose first end date is null
            onChangeHandle({
                startDate: Moment(fromDate),
                endDate: null
            });
        } else if (toDate && !startDate) {//if end date choose first start date is null
            onChangeHandle({
                startDate: null,
                endDate: Moment(toDate)
            });
        } else {
            onChangeHandle({
                startDate: Moment(fromDate),
                endDate: Moment(toDate)
            });
        }
    };

    const callCusTomSearch = () => {
        if (props.endDate || props.startDate) {
            onChangeHandle({//userSelect otherThen custom date option showing old seleted Data
                startDate: props.startDate,
                endDate: props.endDate
            });
        }
        setCustomDate(true);
    };
    /**custom date clear **/
    const dateClewr = () => {//
        onChangeHandle({
            startDate: null,
            endDate: null,
        });
    };

    /**
     * @param  {object} {val} - Get selected dropDown value
    **/
    const _handleSelect = (event = {}) => {
        dateClewr();
        const val = _get(event, "target.dataset.value", "");
        setDropDown(false);
        setSelectedDefault(val);
        setSelectedValue(val);
        if (!enableMonthPicker) {
            selectedDate(val);
            (val === cusDate) ? callCusTomSearch() : setCustomDate(false);
        }
        else {
            (val === cusDate) ? setCustomDate(true) : setCustomDate(false);
        }
    };

    const _handleDropDown = (event = {}) => {
        event.preventDefault();
        setDropDown(!DropDown);
    };

    const _handleOnOutsideClick = () => {
        setDropDown(false);
    };
    const dateClearPlac = () => {
        return (
            <React.Fragment>
                {props.endDate || props.startDate ?
                    <i id="#jestIconReset"
                        className="IconReset" onClick={dateClewr}>
                        <IconClose />
                    </i> : null
                }
            </React.Fragment>
        );
    };

    const dropDownDynamicHandle = (event = {}) => {
        const { target = {} } = event;
        const nameOption = target.name || target.getAttribute("name");
        const valueOption = target.value || target.getAttribute("value");
        const displayValue = target.getAttribute("data-value");
        setDropDown(false);
        setSelectedDefault(displayValue);
        onChangeDropDown({
            target: {
                name: nameOption,
                value: valueOption
            }
        });
    };

    const changeDropIcon = () => {
        if (DropDown) {
            return "open";
        } return "";
    };
    useEffect(() => {
        if (props.startDate) {
            setfocusedInputData('endDate');
        }
        if (props.endDate && props.startDate) {
            setfocusedInputData(null);
            setTimeout(() => {
                const findDropEle = document.querySelector('.CalendarDay__selected_end');
                findDropEle && findDropEle.click();
            }, 500);
        }
    }, [props.startDate, props.endDate]);

    useEffect(() => {
        if (CustomDate) {
            setfocusedInputData('startDate');
        }
        return (() => {
            setfocusedInputData(null);
        });

    }, [CustomDate]);

    useEffect(() => {
        setSelectedDefault(defaultDate);
    }, [_get(stateManageOrg, "organisationId", "")]);

    const DropActive = (value) => setCalenderActive(value === true ? true : false);
    return (
        <div data-calendar="daytoyearDrop" className={`${parentClass ? parentClass : " "} daytoyearDrop`}>
            <OutsideClickHandler
                onOutsideClick={() => { _handleOnOutsideClick(); }}
            >
                <label
                    htmlFor={classValue}
                    onClick={SelectedDefault !== cusDate ? (event) => _handleDropDown(event) : null}
                    className={`custom-dropdown custom-dropdown-2 ${SelectedDefault !== defaultDate ? " active " : ""}
                    ${SelectedDefault === cusDate ? " dateActive " : ""} `}
                >
                    <i>
                        <IconCalendar />
                    </i>
                    {CustomDate ?
                        <React.Fragment>
                            <span className={`datepicker   ${calendarActive ? " active" : ""}`}>
                                {enableMonthPicker ?
                                    <MonthPicker
                                        DropActive={(e) => DropActive(e)}
                                    />
                                    :
                                    <StartToEndPicker
                                        endDate={props.endDate}
                                        onChange={changeDateGroup}
                                        focusedInput={focusedInputData}
                                        startDate={props.startDate}
                                        dashBordMonth={dashBordMonth}
                                        onCalendarHandle={true}
                                    />
                                }
                            </span>
                            {dateClearPlac()}
                        </React.Fragment>
                        :
                        <span>
                            {SelectedDefault}
                        </span>
                    }
                    <input
                        className=""
                        id={classValue}
                        type="checkbox"
                        onChange={() => { }}
                    />
                    <i
                        className={`dropIcon ${changeDropIcon()}`}
                        onClick={SelectedDefault === cusDate ? (event) => _handleDropDown(event) : null}
                    >
                        <IconDropdownCc />
                    </i>
                </label>

                {/* dropDown values */}
                {dynamicOptiondata ?
                    <DynamicDropList
                        name={name}
                        DropDown={DropDown}
                        dropDownData={dropDownData}
                        _handleSelect={dropDownDynamicHandle}
                    />
                    :
                    <DayToYearDropDownListdatas
                        SelectedValue={selectedValue}
                        DropDown={DropDown}
                        _handleSelect={_handleSelect}
                        enableMonthPicker={enableMonthPicker}
                    />
                }
            </OutsideClickHandler>
        </div>
    );

};
export default React.memo(DayToYearDropDown);
