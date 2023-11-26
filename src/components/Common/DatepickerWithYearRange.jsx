import React, { forwardRef, useEffect, useState, memo } from 'react';
import DatePicker from 'react-datepicker';
import { addMonths, subMonths } from 'date-fns';
import "./DatepickerWithYearRange.scss";
import { IconCalendarNew, IconDropdownDark } from '../../assets/images';
import moment from 'moment';

function DatepickerWithYearRange(_props = {}) {
    const { _startDate = null, _handleGetSelectedDate = () => { },
        readOnly = false, _handleDateError = () => { }, _getTimezone = '', isUpdatePopup, isOtherPopupOpenClose } = _props;
    const [startDate, setStartDate] = useState(null);
    const [getUpdateDate, setUpdateDate] = useState(subMonths(new Date(), 0));
    const [getDropState, setDropState] = useState(false);
    const handleEnableCalendar = (state) => {
        console.log(state, "handleEnableCalendar")
        isOtherPopupOpenClose(state);
        setDropState(state);
    };
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    };
    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <button type='button' className={`${readOnly ? " readOnly " : ""} custom_date_input`} onClick={readOnly ? () => { } : onClick} ref={ref}>
            <div className='select_date'><i className='calendar_icon'>
                <IconCalendarNew /></i> <span>{!value ? "Select Date" : value} </span> <i
                    className={`dropIcon ${getDropState ? " active " : " "}`}
                >
                    <IconDropdownDark />
                </i></div>
        </button>
    ));
    const handleGetSelectedDate = (value = null) => {
        if (!isUpdatePopup) {
            const currentDate = new Date();
            setStartDate(value);
            if (value) {
                _handleGetSelectedDate(value);
                _handleDateError(false);
            }
            else {
                _handleDateError(true);
            }
        }
    };

    const handleisUpdate = (value) => {
        setStartDate(new Date(value.toString().substring(0, 19)))

    }
    useEffect(() => {
        console.log(_startDate, "isUpdatePopup---ch")
        !isUpdatePopup ? handleGetSelectedDate(_startDate) : handleisUpdate(_startDate);
    }, []);

    useEffect(() => {
        const today = new Date();
        const _date = moment.tz(moment.utc(today), _getTimezone).format('MMMM DD, YYYY hh:mm:ss');
        const newDate = new Date(_date);
        setUpdateDate(subMonths(newDate, 0));
        handleGetSelectedDate(newDate);
    }, [_getTimezone]);

    return (
        <>
            <DatePicker
                popperPlacement="top-end"
                selected={startDate}
                onChange={(date) => handleGetSelectedDate(date)}
                showMonthYearDropdown
                filterTime={filterPassedTime}
                dateFormat="MMM d, yyyy"
                minDate={getUpdateDate}
                maxDate={addMonths(new Date(), 12)}
                dateFormatCalendar={"MMM yyyy"}
                customInput={<CustomInput />}
                onCalendarOpen={() => handleEnableCalendar(true)}
                onCalendarClose={() => handleEnableCalendar(false)}
            />
        </>
    );
}

export default memo(DatepickerWithYearRange);
