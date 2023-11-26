import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import OutsideClickHandler from "react-outside-click-handler";
import { convertToLowerCase } from "../../../../helper/Validation";
import { IconDropdownDark } from "../../../../assets/images";

const CommonFormDropDown = (props = {}) => {
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

    const [dropOpenFlag, setDropOpenFlag] = useState(false);
    const [SelectedDefaultData, setSelectedDefaultData] = useState("");

    /**
     * Get Event value
     * Bind Name && value ->send to Parent
     * @param  {Object} {event} -
     */
    const handleMultiSelect = (event = {}) => {
        const eventValue = {
            target: {
                name: event.target.getAttribute("name"),
                value: event.target.getAttribute("value"),
                planValue: event.target.getAttribute("data-value"),
            }
        };
        if (!checkbox) {
            setDropOpenFlag(false);
        }
        _onChange(eventValue);
    };

    //dropdown open and closes
    const _handleDropOpen = (event = {}) => {
        event.preventDefault();
        setDropOpenFlag(!dropOpenFlag);
    };

    //outside close
    const handleOnOutsideClick = () => {
        setDropOpenFlag(false);
    };

    const onChangeIndex = (event = {}) => {
        _onChange(event);
    };

    const checkBoxCheck = () => {
        if (checkbox) {
            return (planValue).some((ele) => ele.isCheck === false) ? "-Select Options-" : "";
        }
        return SelectedDefaultData;
    };
    //mandatory Class Function

    /**
     * PlanType Id will come from customers Page
     * find object And get selected planName
     */
    useEffect(() => {
        if (planType && !getDataValue) {
            const planName = planValue.find((ele, i) => Number(ele.id) === Number(planType));
            setSelectedDefaultData(planName ? planName.planName : "");
        }
        if (planType && getDataValue) {
            const planName = planValue.find((ele, i) => Number(ele.value) === Number(planType));
            setSelectedDefaultData(planName ? planName.planName : "");
        }
    }, [planType]);

    return (
        <React.Fragment>
            <div className="common-input-wrapper">

                <label
                    htmlFor='' className="placeholder"
                >
                    {labelName}
                    <span
                        style={{ color: "red" }}
                    >
                        {mustFill === true && "*"}
                    </span>
                </label>

                <OutsideClickHandler
                    onOutsideClick={() => { handleOnOutsideClick(); }}
                >
                    {planValue && (
                        <React.Fragment>
                            <label
                                htmlFor={name}
                                className={`common-input-wrapper DropSelect CommonDrop 
                                ${dropOpenFlag ? "open" : ""} ${checkbox ? "withCheckbox" : ""} ${readOnly ? "default readOnly" : ""}`}
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
                                <i
                                    className={`dropIcon ${readOnly ? "d-none" : ""}`}
                                >
                                    <IconDropdownDark />
                                </i>
                            </label>

                            <CSSTransition
                                in={dropOpenFlag}
                                timeout={500}
                                classNames="fadeInUp"
                                unmountOnExit
                            >
                                <div>
                                    <ul className={dropOpenFlag ? "DropOpen" : ""}>
                                        {(planValue).map((element, index) => {
                                            return (
                                                <li
                                                    name={name}
                                                    value={getDataValue ? element.value : element.id}
                                                    data-value={element.planName}
                                                    className={checkbox ? "checkOption" : ""}
                                                    key={convertToLowerCase(index + "planValu-1wase")}
                                                    onClick={(event) =>
                                                        !checkbox && handleMultiSelect(event)
                                                    }
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
                                                                                onChange={(event) => onChangeIndex(event)}
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
            </div>
        </React.Fragment>
    );
};
export default React.memo(CommonFormDropDown);
