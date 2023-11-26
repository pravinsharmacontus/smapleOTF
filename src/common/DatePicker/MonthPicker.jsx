import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MonthPicker = (props = {}) => {
    const { DropActive } = props;
    const [startDate, setStartDate] = useState();

    const onChange = (date) => {
        setStartDate(date);
    };

    return (
        <DatePicker
            showMonthYearPicker
            selected={startDate}
            dateFormat="MMM yyyy"
            onChange={onChange}
            placeholderText="Select Month"
            showFourColumnMonthYearPicker
            onCalendarOpen={() => DropActive(true)}
            onCalendarClose={() => DropActive(false)}
        />
    );
};
export default MonthPicker;
