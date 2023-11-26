import React, { useState } from "react";
import propTypes from "prop-types";
import _uniqBy from "lodash/uniqBy";
import { CSSTransition } from "react-transition-group";
import { IconDropdownDark } from "../../assets/images";
import OutsideClickHandler from "react-outside-click-handler";
import { convertToLowerCase } from "../../helper/Validation";

const DropTable = (props = {}) => {
    const {
        name = "",
        Size = "",
        dataValue = [],
        valueselect = "",
        _onChange = () => { },//click
    } = props;
    const [DropDown, setDropDown] = useState(false);
    const [DropDownActive, setDropDownActive] = useState(false);
    _uniqBy(dataValue, 'id');
    /**
    * Get Event value
    * Bind Name && value ->send to Parent
    * @param  {Object} {event} -
    */
    const _handleSelect = (event = {}) => {
        const { target = {} } = event;
        if (target.getAttribute('data-value') !== valueselect) {
            const eventValue = {
                target: {
                    name: target.getAttribute("name"),
                    value: target.getAttribute('data-value'),
                }
            };
            setDropDown(false);
            setDropDownActive(false);
            _onChange(eventValue);
        }
    };

    //open drop down
    const _handleDropDown = (event = {}) => {
        event.preventDefault();
        setDropDown(!DropDown);
    };

    const _handleOnOutsideClick = () => {
        setDropDown(false);
        setDropDownActive(false);
    };

    const DropDownActiveCall = (value = false) => {
        setDropDownActive(value);
    };

    return (
        <OutsideClickHandler
            onOutsideClick={() => { _handleOnOutsideClick(); }}
        >
            {dataValue &&
                <label
                    htmlFor={name}
                    onClick={(e) => _handleDropDown(e)}
                    className={`custom-dropdown table-dropdown ${Size === "" ? "" : Size}
                ${DropDownActive ? "active" : ""} ${valueselect !== "All" ? "selected" : ""}`}
                >
                    <span
                        className="SelectedValue"
                    >
                        {valueselect}
                    </span>
                    <input
                        id={name}
                        type="checkbox"
                        onChange={() => { }}
                        checked={DropDownActive}
                    />
                    <CSSTransition
                        in={DropDown}
                        timeout={500}
                        classNames="fadeInUp"
                        onEnter={() => DropDownActiveCall(true)}
                        unmountOnExit
                    >
                        <div>
                            <ul>
                                {(dataValue || []).map((element, index) => {
                                    return (
                                        <li
                                            name={name}
                                            value={element.id}
                                            data-value={element.planName}
                                            onClick={(event) => _handleSelect(event)}
                                            key={convertToLowerCase(index + "dataValue-ab")}
                                        >
                                            {element.planName}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </CSSTransition>
                    <i className="dropIcon"><IconDropdownDark /></i>
                </label>
            }
        </OutsideClickHandler>
    );
};
DropTable.propTypes = {
    name: propTypes.string,
    Size: propTypes.string,
    _onChange: propTypes.func,//click
    dataValue: propTypes.array,
    valueselect: propTypes.string,
};
export default React.memo(DropTable);
