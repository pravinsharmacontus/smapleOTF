import React, { useState } from "react";
import { GlobalSearchTable } from "../../../common";
import FilterParent, {
  findOverFlowActive,
  FilterSideMenuWraper,
  FilterSearchWraper,
  FilterCalenderWrapper,
} from "../TableFilterCommon/FilterParent";
import StartToendPicker from "../../../common/DatePicker/StartToendPicker";

const TeamsSubHead = (props = {}) => {
  const {
    _searchTerm = "",
    onOpenCalendar = () => { }, //click function
    onCalendarHandle = false,
    addMemberInputData = {},
    _onChangeTeamsData = () => { }, //click function
  } = props;
  const { sDate = null, eDate = null } = addMemberInputData;
  const temHide = false;
  const [dropOpenState, setDropOpenState] = useState(true);
  const [enableSearch, setEnableSearch] = useState(false);
  const [EnableSliderFilter, setEnableSliderFilter] = useState(false);
  const [EnableFilterButton, setEnableFilterButton] = useState(false);
  const filterId = "TeamsSubHead";

  /**
   * @param  {string} inputFieldName
   * userSelected input box filed name
   */
  const teamsInputboxClear1 = (inputFieldName = "") => {
    setTimeout(() => {
      findOverFlowActive(filterId);
    }, 100);
    _onChangeTeamsData({
      target: {
        name: inputFieldName,
        value: "",
      },
    });
  };

  const getEnableSliderFilter1 = (state) => {
    setEnableSliderFilter(state);
  };

  const getDropOpenState1 = (state = false) => {
    setDropOpenState(state);
  };

  /**
   * clearBoth "createdatStart" and "createdatEnd",
   * we assign Null both Date value
   **/
  const dateClewr1 = () => {
    setDropOpenState(true);
    _onChangeTeamsData({
      target: {
        name: "sDate",
        value: null,
        nameEdate: "eDate",
        nameEvalue: null,
      },
    });
  };

  return (
    <FilterParent
      filterId={filterId}
      parentClass={"cus_top"}
      getEnableSliderFilter={getEnableSliderFilter1}
    >
      <>
        <FilterSearchWraper
          enableSearch={enableSearch}
          setEnableSearch={setEnableSearch}
        >
          <GlobalSearchTable
            type={"text"}
            value={_searchTerm}
            name={"searchTerm"}
            placeholder="Search by organisation, user, email, phone"
            handleSetSearchInput={_onChangeTeamsData}
            handleInputboxClear={() => teamsInputboxClear1("searchTerm")}
            parentClass={` tableSearch-absolute ${enableSearch ? " " : " mobileHide"
              }`}
          />
        </FilterSearchWraper>
        {temHide && <FilterSideMenuWraper
          EnableSliderFilter={EnableSliderFilter}
          EnableFilterButton={EnableFilterButton}
          setEnableFilterButton={setEnableFilterButton}
        >
          <div className="filter-new-style">
            <FilterCalenderWrapper
              filterId={filterId}
              getDropOpenState={getDropOpenState1}
              dropOpenState={dropOpenState}
              isDatePickerActive={eDate || sDate}
              onOpenCalendar={onOpenCalendar}
              resetDatePicker={() => dateClewr1()}
            >
              <StartToendPicker
                endDate={eDate}
                startDate={sDate}
                onOpenCalendar={onOpenCalendar}
                onCalendarHandle={onCalendarHandle}
              />
            </FilterCalenderWrapper>
          </div>
        </FilterSideMenuWraper>}
      </>
    </FilterParent>
  );
};
export default React.memo(TeamsSubHead);
