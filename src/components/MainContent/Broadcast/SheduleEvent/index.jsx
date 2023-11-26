import React, { useEffect, useState } from 'react';
import "./SheduleEvent.scss";
import TimezoneDropDown from '../../../Common/TimezoneDropDown';
import DatepickerWithYearRange from '../../../Common/DatepickerWithYearRange';
import moment from 'moment-timezone';
import { timezoneJSON } from '../../../Common/Timezone';
import DatepickerWithTimeOnly from '../../../Common/DatepickerWithTimeOnly';
import { nullCheckString } from '../../../../helper';
import Timer from './timer';
import { isAllowJoin } from '../../../../helper/utility';

function SheduleEvent(_props = {}) {
    const today = new Date();
    const [getTimezone, setTimezone] = useState('');
    const [getSelectedTimezone, setSelectedTimezone] = useState('');
    const [getDateError, setDateError] = useState(false);
    const [getSelectedDate, setSelectedDate] = useState(null);
    const [getSelectedTime, setSelectedTime] = useState(null);
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [isTimeOpen, setIsTimeOpen] = useState(false);
    const [getSelectedDateTimeInMs, setSelectedDateTimeInMs] = useState("empty");
    console.log(getDateError, getSelectedDateTimeInMs)
    const { _getScheduleTimeError = false, _handleGetEnableState = () => { }, _handleErrorMsg = () => { }, _getScheduleError = false,
        getScheduledTime = () => { }, isUpdatePopup = false, readOnly = false, updatedTimeZone, updatedScheduledTime } = _props;
    const [getEnableState, setEnableState] = useState(isUpdatePopup);
    const handleStatusToggle = () => {
        setEnableState(!getEnableState);
        _handleGetEnableState(!getEnableState);
    };

    const onChangeTimezone = (ele = '') => {
        const { timeZone = "" } = ele;
        setTimezone(timeZone);
        setSelectedTimezone(`UTC ${ele.offset} (${ele.timeZone})`);
    };

    useEffect(() => {
        const defaultSelected = moment?.tz?.guess(true);
        const gettime = timezoneJSON.filter((obj) => obj?.timeZone === defaultSelected);
        setTimezone(defaultSelected);
        if (gettime.length > 0) {
            setSelectedTimezone(`UTC ${gettime[0]?.offset} (${gettime[0]?.timeZone})`);
        }
        else {
            setSelectedTimezone(`UTC ${defaultSelected})`);
        }
    }, [getEnableState]);

    const handleGetSelectedDate = (selectedDate = "empty") => {
        setSelectedDate(selectedDate);
    };

    useEffect(() => {
        if (getSelectedDate) {
            setSelectedDateTimeInMs(moment.utc((getSelectedDate)).valueOf());
        }
    }, [getSelectedDate]);

    const handleDateError = (errorState = false) => {
        setDateError(errorState);
    };

    const handleGetSelectedTime = (selectedDate = "empty") => {
        setSelectedTime(selectedDate);
    };

    useEffect(() => {
        if (nullCheckString(getSelectedDate) !== "" && nullCheckString(getSelectedTime) !== "") {
            const date = new Date(getSelectedDate);
            const time = new Date(getSelectedTime);
            date.setHours(time.getHours());
            date.setMinutes(time.getMinutes());
            const dateString = moment.tz(moment(date).format().substring(0, 19), getTimezone).format();
            const scheduledTimeStamp1 = moment.utc(dateString).valueOf();
            console.log(isAllowJoin(scheduledTimeStamp1), "isAllowJoin")
            getScheduledTime({
                scheduledTime: scheduledTimeStamp1,
                hostScheduledTime: `${moment(date).format("MMM DD YYYY")} at ${moment(date).format("h:mm A")
                    + " " + moment.tz(getTimezone).zoneAbbr()
                    } `,
                scheduledTimeZone: getTimezone
            });
            _handleErrorMsg(date);
        }
    }, [getSelectedTime, getSelectedDate, getTimezone]);
    console.log(isDateOpen, isTimeOpen, "isUpdatePopup---isTimeOpen")
    return (
        <>
            <div className="shedule_event_wraper mb-0">
                <div className={`shedule_event_status ${readOnly ? " cursor-default cursor-default-child " : ""} `}>
                    {!readOnly && <label htmlFor="sheduleStaus" className={` switch customize style2  ${readOnly ? " disabled_switch " : ""} `}>
                        <input
                            id="sheduleStaus"
                            type="checkbox"
                            name="isActive"
                            value={"getEnableState"}
                            onChange={readOnly ? () => { } : () => handleStatusToggle()}
                            checked={getEnableState}
                        />
                        <span className="slider round"></span>
                    </label>}
                    <label htmlFor="sheduleStaus" className='schedule_label'>Schedule Event</label>
                </div>
                {getEnableState ? <>
                    <fieldset className='mb-12 mt-12' >
                        <div style={{ maxWidth: "340px" }} className="common-input-wrapper li-p0 mb-0">
                            <div
                                className={`input mb-12`}
                            >
                                <TimezoneDropDown
                                    readOnly={readOnly}
                                    optionList={timezoneJSON}
                                    mustFill={false}
                                    value={isUpdatePopup ? updatedTimeZone : getSelectedTimezone}
                                    name={"role"}
                                    listClassname={"p-0"}
                                    placeholder={"Choose Time Zone"}
                                    _onChange={onChangeTimezone}
                                    closeByOther={isDateOpen || isTimeOpen}
                                />
                            </div>
                            <div className='date_picker_wraper'>
                                <DatepickerWithYearRange
                                    readOnly={readOnly}
                                    _getTimezone={getTimezone}
                                    _startDate={isUpdatePopup ? moment.tz(moment.unix(updatedScheduledTime / 1000).utc(), updatedTimeZone).format() : today}
                                    _handleDateError={handleDateError}
                                    _handleGetSelectedDate={handleGetSelectedDate}
                                    isUpdatePopup={isUpdatePopup}
                                    isOtherPopupOpenClose={(e) => setIsDateOpen(e)}
                                />
                                <DatepickerWithTimeOnly
                                    readOnly={readOnly}
                                    _startDate={isUpdatePopup ? moment.tz(moment.unix(updatedScheduledTime / 1000).utc(), updatedTimeZone).format() : today}
                                    _getSelectedDate={getSelectedDate}
                                    _handleGetSelectedTime={handleGetSelectedTime}
                                    _getTimezone={getTimezone}
                                    isUpdatePopup={isUpdatePopup}
                                    isOtherPopupOpenClose={(e) => setIsTimeOpen(e)}
                                />
                            </div>
                            {_getScheduleError || _getScheduleTimeError ? <span className='errMsg'>Please select future date/time</span> : null}
                        </div >
                    </fieldset >
                    <Timer timeZone={isUpdatePopup ? updatedTimeZone : getTimezone} />
                </>
                    : null
                }
            </div >
        </>
    );
}

export default SheduleEvent;
