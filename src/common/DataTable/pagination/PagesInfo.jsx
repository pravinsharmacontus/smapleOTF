import React from 'react';
import './PagesInfo.scss';

const PagesInfo = (props = {}) => {
    const {
        bottomDetails = {},
    } = props;
    const { page = 1, totalRecords = 0, size = 10 } = bottomDetails;
    const pageTotal = page * size;
    const findNegative = totalRecords - pageTotal;//
    const finalValue = findNegative > 0 ? pageTotal : totalRecords;
    const pageInitail = page === 1 ? 1 : ((page - 1) * size) + 1;
    return (
        <span
            className='info'>
            Showing{" "}{pageInitail}{" "}-{" "}{finalValue}{" "}of{" "}{totalRecords}{" "}results
        </span>
    );
};

export default React.memo(PagesInfo);
