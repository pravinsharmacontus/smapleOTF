import React from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";

const DayToYearDropDownListdatas = (props = {}) => {
  const cusDate = "Custom date";
  const defaultDate = "Last 30 days";
  const {
    DropDown = false,
    SelectedValue = "",
    enableMonthPicker = false,
    _handleSelect = () => { }, //click,
  } = props;
  const { t } = useTranslation();
  const location = document.location && document.location.pathname; //get current location path

  return (
    <CSSTransition
      in={DropDown}
      timeout={500}
      classNames="fadeInUp"
      unmountOnExit
    >
      <div>
        {enableMonthPicker ?
          <ul>
            <li
              value="1"
              id={"JestDropValuePick"}
              className={` ${SelectedValue === "This month" ? " active " : " "}`}
              data-value="This month"
              onClick={(event) => _handleSelect(event)}
            >
              {t("This month")}
            </li>
            <li
              value="2"
              id={"JestDropValuePick"}
              className={` ${SelectedValue === "Last month" ? " active " : " "}`}
              data-value="Last month"
              onClick={(event) => _handleSelect(event)}
            >
              {t("Last month")}
            </li>
            <li
              value="3"
              data-value={cusDate}
              id={"JestDropValuePick"}
              onClick={(event) => _handleSelect(event)}
            >
              {t("TABLE.CUSTOM_DAY")}
            </li>
          </ul>
          :
          <ul>
            <li
              value="0"
              className={` ${SelectedValue === "Today" ? " active " : " "}`}
              data-value="Today"
              id={"JestDropValuePick"}
              onClick={(event) => _handleSelect(event)}
            >
              Today
          </li>
            {location === "/payments" ? (
              <li
                value="1"
                id={"JestDropValuePick"}
                className={` ${SelectedValue === "Last 7 days" ? " active " : " "}`}
                data-value="Last 7 days"
                onClick={(event) => _handleSelect(event)}
                style={{ display: "none" }}
              >
                {t("TABLE.SEVEN_DAY")}
              </li>
            ) : (
                <li
                  value="1"
                  id={"JestDropValuePick"}
                  className={` ${SelectedValue === "Last 7 days" ? " active " : " "}`}
                  data-value="Last 7 days"
                  onClick={(event) => _handleSelect(event)}
                >
                  {t("TABLE.SEVEN_DAY")}
                </li>
              )}

            {location === "/payments" && (
              <li
                value="3"
                id={"JestDropValuePick"}
                className={` ${SelectedValue === "This month" ? " active " : " "}`}
                data-value="This month"
                onClick={(event) => _handleSelect(event)}
              >
                {t("This month")}
              </li>
            )}

            <li
              value="2"
              id={"JestDropValuePick"}
              data-value={defaultDate}
              onClick={(event) => _handleSelect(event)}
            >
              {t("TABLE.THIRTY_DAY")}
            </li>
            <li
              value="3"
              id={"JestDropValuePick"}
              className={` ${SelectedValue === "Last 90 days" ? " active " : " "}`}
              data-value="Last 90 days"
              onClick={(event) => _handleSelect(event)}
            >
              {t("TABLE.NINETY_DAY")}
            </li>

            <li
              value="4"
              data-value={cusDate}
              id={"JestDropValuePick"}
              onClick={(event) => _handleSelect(event)}
            >
              {t("TABLE.CUSTOM_DAY")}
            </li>
          </ul>
        }
      </div>
    </CSSTransition>
  );
};
export default React.memo(DayToYearDropDownListdatas);
