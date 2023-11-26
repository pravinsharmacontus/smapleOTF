import React, { useState } from 'react';
import { GlobalSearchTable } from "../../../../common";
import FilterParent, { findOverFlowActive, FilterSearchWraper } from '../../TableFilterCommon/FilterParent';

const BroadcastedVideosSubHead = (props = {}) => {
    const {
        searchTerm = '',
        _onChangeData = () => { },//click function
    } = props;

    const [enableSearch, setEnableSearch] = useState(false);
    const filterId = "TeamsSubHead";

    /**
    * @param  {string} inputFieldName
    * userSelected input box filed name
    */
    const teamsInputboxClear = (inputFieldName = "") => {
        setTimeout(() => {
            findOverFlowActive(filterId);
        }, 100);
        _onChangeData({
            target: {
                name: inputFieldName,
                value: "",
            },
        });
    };

    return (
        <FilterParent
            filterId={filterId}
            parentClass={"cus_top"}
        >
            <><FilterSearchWraper
                enableSearch={enableSearch}
                setEnableSearch={setEnableSearch}
            >
                <GlobalSearchTable
                    type={"text"}
                    value={searchTerm}
                    name={"searchTerm"}
                    placeholder="Search by video title"
                    handleSetSearchInput={_onChangeData}
                    handleInputboxClear={() => teamsInputboxClear("searchTerm")}
                    parentClass={` tableSearch-absolute ${enableSearch ? " " : " mobileHide"}`}
                />
            </FilterSearchWraper>
            </>
        </FilterParent>
    );
};
export default React.memo(BroadcastedVideosSubHead);
