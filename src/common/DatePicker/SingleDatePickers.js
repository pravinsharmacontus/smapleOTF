import React, { useState } from "react";
import moment from 'moment';
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import { constantValue } from "../../const/errorTypes";

const SingleDatePickers = (props = {}) => {
    const {
        date = "",
        onChange
    } = props;

    const [initfocused, setFocused] = useState(false);
    const datePlaceholder = constantValue.CHOOSE_DATE;
    return (
        <SingleDatePicker
            minimumNights={0}
            numberOfMonths={1}
            onDateChange={(fromDate) => onChange(fromDate)}
            onFocusChange={({ focused }) => setFocused(focused)}
            focused={initfocused}
            date={date}
            displayFormat="DD-MM-YYYY"
            isOutsideRange={day => (moment().diff(day) < 0)}
            placeholder={datePlaceholder}
        />
    );
};
export default SingleDatePickers;
