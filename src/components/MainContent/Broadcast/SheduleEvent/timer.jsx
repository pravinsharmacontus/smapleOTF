import { useEffect, useState } from "react";
import { nullCheckString, validateNullCheck } from "../../../../helper";
import moment from "moment";
import { timezoneJSON } from "../../../Common/Timezone";

const Timer = (props) => {
    const [getCurrentUTCTime, setCurrentUTCTime] = useState('');

    const getTimezone = props?.timeZone
    console.log(getTimezone, "getTimezone")
    function _getTime(_getTimezone) {
        const today = new Date();
        const getZoneObj = timezoneJSON.filter((obj) => obj?.timeZone === _getTimezone);
        const getCurrentTime = `${moment.tz(moment.utc(today), getTimezone).format('MMM DD YYYY hh:mm:ss A')}
        UTC (${getZoneObj[0]?.offset}) ${getZoneObj[0]?.countryName}`
        setCurrentUTCTime(getCurrentTime);
        console.log(getZoneObj, getCurrentTime, "_getTime")
    };

    useEffect(() => {
        const interval = setInterval(() => _getTime(getTimezone), 1000);
        return () => clearInterval(interval);
    }, [getTimezone]);
    useEffect(() => {
        _getTime(getTimezone)
    }, []);

    return (
        <div className='current_date_time'>
            <span>*Current date and time:</span>
            {nullCheckString(validateNullCheck(getCurrentUTCTime)) ? <strong>{getCurrentUTCTime}</strong> : null}
        </div>
    );

}

export default Timer;
