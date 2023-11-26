import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { IconDropdownDark } from "../../assets/images";
import OutsideClickHandler from "react-outside-click-handler";
import { convertToLowerCase } from "../../helper/Validation";

const DropCustomerPlan = (props = {}) => {
  const {
    name = "",
    planType = "",
    labelName = "",
    planValue = [],
    mustFill = false,
    checkbox = false,
    readOnly = false,
    getDataValue = false,
    _onChange = () => { },//click
  } = props;
  const [DropOpen, setDropOpen] = useState(false);
  const [SelectedDefault, setSelectedDefault] = useState("");

  /**
   * Get Event value
   * Bind Name && value ->send to Parent
   * @param  {Object} {event} -
   */
  const _handleMultiSelect = (event = {}) => {
    const eventValue = {
      target: {
        name: event.target.getAttribute("name"),
        value: event.target.getAttribute("value"),
        planValue: event.target.getAttribute("data-value"),
      }
    };
    if (!checkbox) {
      setDropOpen(false);
    }
    _onChange(eventValue);
  };

  //dropdown open and closes
  const _handleDropOpen = (event = {}) => {
    event.preventDefault();
    setDropOpen(!DropOpen);
  };

  //outside close
  const _handleOnOutsideClick = () => {
    setDropOpen(false);
  };

  const _onChangeIndex = (event = {}) => {
    _onChange(event);
  };

  const checkBoxCheck = () => {
    if (checkbox) {
      return (planValue).some((ele) => ele.isCheck === false) ? "Select Options" : "";
    }
    if (!SelectedDefault) {
      const planName = planValue.find((ele, i) => Number(ele.id) === Number(planType));
      if (planName) {
        return planName.planName;
      }
    }
    return SelectedDefault;
  };
  //mandatory Class Function
  const mustFillClass = () => <sub className={`mustFill ${readOnly ? "d-none" : ""}`}>*</sub>;

  /**
   * PlanType Id will come from customers Page
   * find object And get selected planName
   */
  useEffect(() => {

    if (planType && !getDataValue) {
      const planName = planValue.find((ele, i) => Number(ele.id) === Number(planType));
      setSelectedDefault(planName ? planName.planName : "");
    }

    if (planType && getDataValue) {
      const planName = planValue.find((ele, i) => Number(ele.value) === Number(planType));
      setSelectedDefault(planName ? planName.planName : "");
    }

  }, [planType]);

  return (
    <React.Fragment>
      <OutsideClickHandler onOutsideClick={() => { _handleOnOutsideClick(); }}>

        {planValue && (
          <React.Fragment>
            <span className="placeholder">
              {!labelName ? "Plan Type" : labelName}{" "}
              {mustFill ? mustFillClass() : ""}
            </span>
            <label
              htmlFor={name}
              className={`DropSelect ${DropOpen ? "open" : ""} ${checkbox ? "withCheckbox" : ""} ${readOnly ? "default readOnly" : ""}`}
              onClick={readOnly ? null : (e) => _handleDropOpen(e)}
            >
              <span className="inputTxt">
                {/* checkbox true is only from app version added page */}
                {/* "planValue||[]).some" is help to show some defult value in dropDown*/}
                {checkBoxCheck()}
              </span>
              <input
                id={name}
                type="checkbox"
                onChange={() => { }}
              />
              <i className={`dropIcon ${readOnly ? "d-none" : ""}`}>
                <IconDropdownDark />
              </i>
            </label>

            <CSSTransition
              in={DropOpen}
              timeout={500}
              classNames="fadeInUp"
              unmountOnExit
            >
              <div>
                <ul className={DropOpen ? "DropOpen" : ""}>
                  {(planValue).map((element, index) => {
                    return (
                      <li
                        name={name}
                        data-value={element.planName}
                        className={checkbox ? "checkOption" : ""}
                        key={convertToLowerCase(index + "planValue-sudt")}
                        value={getDataValue ? element.value : element.id}
                        onClick={(event) => !checkbox && _handleMultiSelect(event)}
                      >
                        {checkbox ? (
                          <React.Fragment>
                            {element.isCheck === false && (
                              <React.Fragment>
                                <label htmlFor={`check-${index}`}>
                                  <div className="checkbox-custom">
                                    <input
                                      type="checkbox"
                                      name={element.value}
                                      value={element.value}
                                      id={`check-${index}`}
                                      checked={element.isCheck}
                                      onChange={(event) => _onChangeIndex(event)}
                                    />
                                    <label htmlFor={`check-${index}`}></label>
                                  </div>
                                  <label htmlFor={`check-${index}`}>
                                    {element.planName}
                                  </label>
                                </label>
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        ) : (
                            <>{element.planName}</>
                          )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </CSSTransition>
          </React.Fragment>
        )}
      </OutsideClickHandler>
    </React.Fragment >
  );
};
export default React.memo(DropCustomerPlan);
