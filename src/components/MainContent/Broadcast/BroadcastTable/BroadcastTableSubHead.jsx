import React, { useState } from "react";
import Moment from "moment";
import Ripples from "react-ripples";
import { DateTimeFormeterEnd, DateTimeFormeterStart } from "../../../../helper";
import FilterParent, {
  FilterSideMenuWraper,
  FilterSearchWraper,
  FilterButtonWrapper,
  FilterCalenderWrapper,
  findOverFlowActive,
} from "../../TableFilterCommon/FilterParent";
import StartToendPicker from "../../../../common/DatePicker/StartToendPicker";
import { GlobalSearchTable } from "../../../../common";

const BroadcastTableSubHead = (props = {}) => {
  const tempHide = false;
  const {
    onOpenCalendar = () => { }, //click function
    onCalendarHandle = false,
    addMemberInputData = {},
    _onChangeTeamsData = () => { }, //click function
    handleMemberPopupOpen = () => { },
    userRoleId,
    searchTerm,
    tabParent

  } = props;
  const { sDate = null, eDate = null } = addMemberInputData;

  // resize finder for filter
  const [MoreFilter, setMoreFilter] = useState(false);
  const [dropOpenState, setDropOpenState] = useState(true);
  const [enableSearch, setEnableSearch] = useState(false);
  const [EnableSliderFilter, setEnableSliderFilter] = useState(false);
  const [EnableFilterButton, setEnableFilterButton] = useState(false);
  const filterId = "BroadcastTableSubHead";

  console.log(MoreFilter, "MoreFilter");

  const changeDateGroup = ({ startDate = "", endDate = "" }) => {
    const fromDate = DateTimeFormeterStart(startDate);
    const toDate = DateTimeFormeterEnd(endDate);

    if (fromDate && !endDate) {
      _onChangeTeamsData({
        target: {
          name: "sDate",
          value: Moment(fromDate),
          nameEdate: "eDate",
          nameEvalue: null,
        },
      });
    } else if (toDate && !startDate) {
      _onChangeTeamsData({
        target: {
          name: "sDate",
          value: null,
          nameEdate: "eDate",
          nameEvalue: Moment(toDate),
        },
      });
    } else {
      _onChangeTeamsData({
        target: {
          name: "sDate",
          value: Moment(fromDate),
          nameEdate: "eDate",
          nameEvalue: Moment(toDate),
        },
      });
    }
  };

  /**
   * @param  {string} inputFieldName
   * userSelected input box filed name
   */

  const getEnableSliderFilter = (state) => {
    setEnableSliderFilter(state);
  };

  const getDropOpenState = (state = false) => {
    setDropOpenState(state);
  };
  /**
    * @param  {string} inputFieldName
    * userSelected input box filed name
    */
  const teamsInputboxClear = (inputFieldName = "") => {
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

  /**
   * clearBoth "createdatStart" and "createdatEnd",
   * we assign Null both Date value
   **/
  const dateClewr = () => {
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
      setMoreFilter={(e) => setMoreFilter(e)}
      getEnableSliderFilter={getEnableSliderFilter}
    >
      <FilterSearchWraper
        enableSearch={enableSearch}
        setEnableSearch={setEnableSearch}
      >
        <GlobalSearchTable
          type={"text"}
          value={searchTerm}
          name={"searchTerm"}
          placeholder="Search by broadcast title"
          handleSetSearchInput={_onChangeTeamsData}
          handleInputboxClear={() => teamsInputboxClear("searchTerm")}
          parentClass={` tableSearch-absolute ${enableSearch ? " " : " mobileHide"
            }`}
        />
      </FilterSearchWraper>
      {tempHide && (
        <FilterSideMenuWraper
          EnableSliderFilter={EnableSliderFilter}
          EnableFilterButton={EnableFilterButton}
          setEnableFilterButton={setEnableFilterButton}
        >
          <div className="filter-new-style">
            <FilterCalenderWrapper
              filterId={filterId}
              getDropOpenState={getDropOpenState}
              dropOpenState={dropOpenState}
              isDatePickerActive={eDate || sDate}
              onOpenCalendar={onOpenCalendar}
              resetDatePicker={() => dateClewr()}
            >
              <StartToendPicker
                endDate={eDate}
                startDate={sDate}
                onChange={changeDateGroup}
                onOpenCalendar={onOpenCalendar}
                onCalendarHandle={onCalendarHandle}
              />
            </FilterCalenderWrapper>
          </div>
        </FilterSideMenuWraper>
      )}
      <FilterButtonWrapper
        EnableSliderFilter={EnableSliderFilter}
        setEnableFilterButton={setEnableFilterButton}
      >
        {userRoleId !== 3 && tabParent !== "Past" &&(
          <Ripples className="b-r-30">
            <button
              className="b-rounded b-md bt-red cp-btn text-md"
              onClick={() => handleMemberPopupOpen(true)}
            >
              <span>Create</span>
            </button>
          </Ripples>
        )}
      </FilterButtonWrapper>
    </FilterParent>
  );
};
export default React.memo(BroadcastTableSubHead);
