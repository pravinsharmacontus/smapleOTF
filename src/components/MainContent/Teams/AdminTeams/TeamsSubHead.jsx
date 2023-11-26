import React, { useState } from 'react';
import Ripples from 'react-ripples';
import {
    GlobalSearchTable,
} from "../../../../common";
import FilterParent, { FilterButtonWrapper, FilterSearchWraper, findOverFlowActive } from '../../TableFilterCommon/FilterParent';

const TeamsSubHead = (props = {}) => {
    const {
        searchTerm = '',
        _onChangeData = () => { },//click function
        handleMemberPopupOpen = () => { },//click function
        userRoleId = "",
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
                    placeholder="Search by name, email, phone"
                    handleSetSearchInput={_onChangeData}
                    handleInputboxClear={() => teamsInputboxClear("searchTerm")}
                    parentClass={` tableSearch-absolute ${enableSearch ? " " : " mobileHide"}`}
                />
            </FilterSearchWraper>
            </>
            <FilterButtonWrapper
            >
                {(userRoleId !== 3 && userRoleId !== 5) && <Ripples className="b-r-30">
                    <button
                        className="b-rounded b-md bt-red cp-btn text-md"
                        onClick={() => handleMemberPopupOpen(true)}
                    >
                        <span>
                            Add Member
                        </span>
                    </button>
                </Ripples>
                }
            </FilterButtonWrapper>
        </FilterParent>
    );
};
export default React.memo(TeamsSubHead);
