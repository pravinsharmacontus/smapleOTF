import React, { Component, Fragment } from 'react';
import moment from 'moment';
import _get from "lodash/get";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {
    DateRangePicker,
    isInclusivelyAfterDay,
    isInclusivelyBeforeDay,
} from 'react-dates';

class StartToEndPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            error: false,
            showClearDates: false,
            disableRightArrow: false
        };
    }

    /**
    * @param  {boolean} {focusedInput} - corrent page number
    **/
    focusChange = focusedInput => {
        const { onOpenCalendar = () => { }, onCalendarHandle = false } = this.props || {};
        this.setState({ focusedInput }, () => {
            if (this.state.focusedInput == null) {
                onCalendarHandle && onOpenCalendar(false);
                this.setState({ error: true });
            } else {
                onCalendarHandle && onOpenCalendar(true);
                this.setState({ error: false });
            }
        });
    };

    renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
        let i;
        const years = [];
        for (i = moment().year(); i >= moment().year() - 100; i--) {
            years.push(<option value={i} key={`year-${i}`}>{i}</option>);
        }
        return (
            <div className="MultiDate">
                <select className="month" value={month.month()} onChange={e => onMonthSelect(month, _get(e, "target.value", ""))}>
                    {moment.months().map((label, value) => (
                        <option value={value} key={value.id} >{label.substring(0, 3)}</option>
                    ))}
                </select>
                <select className="year" value={month.year()} onChange={e => onYearSelect(month, _get(e, "target.value", ""))}>
                    {years}
                </select>
            </div>
        );
    }
    handleRightArrow = (e) => {
        this.setState({ disableRightArrow: moment().year() <= moment(e).year() && moment(e).month() === 11 });
    };
    handleLeftArrow = (e) => {
        this.setState({
            disableRightArrow: moment().year() < moment(e).year()
        });
    };

    render() {
        const {
            onChange = () => { }, startDate = null,
            endDate = null, dashBordMonth = false,

        } = this.props || {};
        return (
            <Fragment>
                <DateRangePicker
                    readOnly={true}
                    minimumNights={0}
                    numberOfMonths={1}
                    navNext={this.state.disableRightArrow}
                    onNextMonthClick={(e) => this.handleRightArrow(e)}
                    onPrevMonthClick={(e) => this.handleLeftArrow(e)}
                    endDateId="user_end_date_id"
                    startDateId="user_start_date_id"
                    onFocusChange={this.focusChange}
                    endDate={endDate ? endDate : null}
                    displayFormat={() => 'MMM DD,YYYY'}
                    endDatePlaceholderText={"MM/DD/YYYY"}
                    focusedInput={this.props.focusedInput ? this.props.focusedInput : this.state.focusedInput}
                    startDatePlaceholderText={"MM/DD/YYYY"}
                    startDate={startDate ? startDate : null}
                    showClearDates={this.state.showClearDates}
                    renderMonthElement={this.renderMonthElement}
                    onDatesChange={(fromDate) => onChange(fromDate)}
                    isOutsideRange={day => {
                        if (dashBordMonth) {
                            if (startDate) {
                                return !isInclusivelyAfterDay(day, startDate) ||
                                    isInclusivelyAfterDay(day, moment(startDate).add(90, 'days'))
                                    || !isInclusivelyBeforeDay(day, moment());
                            } else if (endDate) {
                                return !isInclusivelyBeforeDay(day, endDate) ||
                                    isInclusivelyBeforeDay(day, moment(endDate).subtract(90, 'days'))
                                    || !isInclusivelyBeforeDay(day, moment());
                            }
                        } return !isInclusivelyBeforeDay(day, moment());
                    }}
                />
            </Fragment >
        );
    }
}
export default React.memo(StartToEndPicker);
