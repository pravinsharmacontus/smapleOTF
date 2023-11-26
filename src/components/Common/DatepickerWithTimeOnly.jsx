import React, { forwardRef, useEffect, useState, memo } from 'react';
import DatePicker from 'react-datepicker';
import "./DatepickerWithYearRange.scss";
import { IconDropdownDark } from '../../assets/images';
import moment from 'moment/moment';

function DatepickerWithTimeOnly(_props = {}) {
    const { _startDate = null, _getSelectedDate = null,
        _handleGetSelectedTime = () => { }, _handleTimeError = () => { }, readOnly = false, _getTimezone = "", isUpdatePopup = null, isOtherPopupOpenClose = () => { } } = _props;
    const [startDate, setStartDate] = useState(null);
    const [newStartDate, setNewStartDate] = useState(null);
    const [getCurrentDate, setCurrentDate] = useState(new Date());
    const [getDropState, setDropState] = useState(false);

    const handleEnableCalendar = (state) => {
        isOtherPopupOpenClose(state);
        setDropState(state);
    };

    const filterPassedTime = (time) => {
        console.log(startDate, getCurrentDate, time, _getSelectedDate, "filterPassedTime--1")
        if (_getSelectedDate) {
            const currentDate = new Date();
            const getCurrentTime = new Date(moment.tz(moment.utc(currentDate), _getTimezone));
            const parentSelectedTime = new Date(moment.tz(moment.utc(_getSelectedDate), _getTimezone));
            if (parentSelectedTime.getDate() - getCurrentTime.getDate()) {
                return true
            }
        }
        const today = new Date();
        const getCurrentTime = moment.tz(moment.utc(today), _getTimezone);
        const formateed = moment.tz(moment.utc(today), _getTimezone)
        const hoursSet = new Date(getCurrentTime).setHours(formateed.hours())
        const minutesSet = new Date(hoursSet).setMinutes(formateed.minutes())
        const tranmittedSet = new Date(minutesSet)
        const selectedDate = new Date(time);
        const getSelectedTime = new Date(moment.tz(moment.utc(selectedDate), _getTimezone));
        tranmittedSet?.setTime(tranmittedSet?.getTime() + (30 * 60 * 1000));
        console.log(tranmittedSet?.getTime(), getSelectedTime?.getTime(), "filterPassedTime--2")
        return tranmittedSet?.getTime() < getSelectedTime?.getTime();
    };

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <button type='button' className={` ${readOnly ? " readOnly " : ""} custom_date_input`} onClick={readOnly ? () => { } : onClick} ref={ref}>
            <div className='select_date'><span>{!value ? "Select Time" : value} </span>
                <i className={`dropIcon ${getDropState ? " active " : " "}`}> <IconDropdownDark /></i></div>
        </button>
    ));
    const handleGetSelectedTime = (value = null) => {
        console.log(value, "handleGetSelectedTime--213");
        setStartDate(value);
        if (value) {
            _handleGetSelectedTime(value);
            _handleTimeError(false);
        }
        else {
            _handleTimeError(true);
        }
    };

    const handleGetSelectedTime2 = (value = null) => {
        console.log("handleGetSelectedTime2")
        const seletedTime = moment(value);
        const hoursSet = new Date(newStartDate).setHours(seletedTime.hours())
        !isUpdatePopup && setNewStartDate(new Date(hoursSet).setMinutes(seletedTime.minutes()))
    };

    useEffect(() => {
        _handleGetSelectedTime(newStartDate)
    }, [newStartDate])
    const handleisUpdate = (value) => {
        console.log(new Date(value.toString().substring(0, 19)), "valuevaluevaluevaluevaluevalue")
        setNewStartDate(new Date(value.toString().substring(0, 19)))

        // const seletedTime = moment(new Date(value.toString().substring(0, 19)));
        // const hoursSet = new Date(newStartDate).setHours(seletedTime.hours())
        // console.log(seletedTime, hoursSet, "valuevaluevalue")
        // setNewStartDate(new Date(hoursSet).setMinutes(seletedTime.minutes()))
    }

    useEffect(() => {
        if (!isUpdatePopup) {
            console.log("isUpdatePopup00--1")
            handleGetSelectedTime(_startDate);
            setCurrentDate(_getSelectedDate);
        } else {
            handleisUpdate(_startDate)
        }
    }, []);

    function _getTime(_getTimezonelocal) {
        const today = new Date();
        const getCurrentTime = moment.tz(moment.utc(today), _getTimezonelocal);
        console.log(moment.tz(moment.utc(today), _getTimezonelocal).hours(), "getCurrentTimegetCurrentTimegetCurrentTime")
        const formateed = moment.tz(moment.utc(today), _getTimezonelocal)
        console.log(new Date(formateed.toDate()), "moment---utc")
        const hoursSet = new Date(getCurrentTime).setHours(formateed.hours())
        !isUpdatePopup && setNewStartDate(new Date(hoursSet).setMinutes(formateed.minutes()))
    };

    useEffect(() => {
        _getTime(_getTimezone)
    }, [_getTimezone]);
    useEffect(() => {
        if (_getSelectedDate) {
            const currentDate = new Date();
            const getCurrentTime = new Date(moment.tz(moment.utc(currentDate), _getTimezone));
            const parentSelectedTime = new Date(moment.tz(moment.utc(_getSelectedDate), _getTimezone));
            if (parentSelectedTime.getDate() - getCurrentTime.getDate()) {
                const today = new Date();
                const getCurrentTimelocal = moment.tz(moment.utc(today), _getTimezone);
                const hoursSet = new Date(getCurrentTimelocal).setHours(0)
                !isUpdatePopup && setNewStartDate(new Date(hoursSet).setMinutes(0))
            } else {
                _getTime(_getTimezone)
            }
        }
    }, [_getSelectedDate]);
    console.log(newStartDate, "newStartDatenewStartDatenewStartDate")
    if (newStartDate) {
        return (
            <div style={{ minWidth: "121px" }}>
                <DatePicker
                    className='time_picker'
                    popperPlacement="top-end"
                    selected={new Date(newStartDate)}
                    onChange={(date) => handleGetSelectedTime2(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    filterTime={filterPassedTime}
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    customInput={<CustomInput />}
                    onCalendarOpen={() => handleEnableCalendar(true)}
                    onCalendarClose={() => handleEnableCalendar(false)}
                />
            </div>
        );
    } else {
        return <></>
    }

}

export default memo(DatepickerWithTimeOnly);
