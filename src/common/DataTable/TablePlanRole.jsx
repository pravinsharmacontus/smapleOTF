import React, { } from "react";

// from customer and tems page
const TablePlanRole = (props = {}) => {
    const {
        planType,//user plan Type id or role id;
        dataArray = []//user plan Type Array or role Array;
    } = props;
    return (
        <React.Fragment>
            {dataArray.length !== 0 ?
                (dataArray || []).map((element) => {
                    return +element.id === planType ? element.planName : "";// id and element id both are same value print otherwise empty print
                }) : ""}
        </React.Fragment>
    );
};
export default React.memo(TablePlanRole);
