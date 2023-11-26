import React, { useState } from "react";
import Moment from "moment";
import { Link } from 'react-router-dom';
import { GlobalSearchTable } from "../../../common";
import FilterParent, {
  findOverFlowActive,
  FilterSideMenuWraper, FilterSearchWraper, FilterCalenderWrapper
} from "../TableFilterCommon/FilterParent";
import StartToendPicker from "../../../common/DatePicker/StartToendPicker";
import { DateTimeFormeterEnd, DateTimeFormeterStart } from "../../../helper";
import { IconLeftArrow } from "../../../assets/images";

const NoOfBroadcastsSubHead = (props = {}) => {
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
  const filterId = "NoOfBroadcastsSubHead";
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
    } else
      _onChangeTeamsData({
        target: {
          name: "sDate",
          value: Moment(fromDate),
          nameEdate: "eDate",
          nameEvalue: Moment(toDate),
        },
      });
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

  const getEnableSliderFilter = (state) => {
    setEnableSliderFilter(state);
  };

  const getDropOpenState = (state = false) => {
    setDropOpenState(state);
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
      getEnableSliderFilter={getEnableSliderFilter}
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
            placeholder="Search by Host Name"
            handleSetSearchInput={_onChangeTeamsData}
            handleInputboxClear={() => teamsInputboxClear("searchTerm")}
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
        </FilterSideMenuWraper>}
      </>
      <Link className="back_arrow_btn" to="/"><IconLeftArrow /> Back</Link>
    </FilterParent>
  );
};
export default React.memo(NoOfBroadcastsSubHead);
