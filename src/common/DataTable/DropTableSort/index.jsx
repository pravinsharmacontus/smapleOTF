import propTypes from "prop-types";
import _uniqBy from "lodash/uniqBy";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { IconDropdownCc } from "../../../assets/images";
import OutsideClickHandler from "react-outside-click-handler";
import { convertToLowerCase } from "../../../helper/Validation";

const DropTableSort = (props = {}) => {
    const {
        name = "",
        Size = "",
        valueselect = "",
        listHeading = "",
        getDataId = false,
        valueSelectValue = "",
        enableCheckbox = false,
        enableListAlone = false,
        defaultFilterby = "More Filters",
        dataValue: valueData = [],
        selectorName = "planName",
        enableDefaultFilterby = false,
        _onChange = () => { },//click
    } = props;
    const [DropDown, setDropDownFlag] = useState(false);
    const [allCheckButtonActive, setallCheckButtonActive] = useState(false);
    const [getCheckValue, setCheckValue] = useState([]);
    const [DropDownActive, setDropDownActiveFlag] = useState(false);
    _uniqBy(valueData, 'id');

    /**
    * Get Event value
    * Bind Name && value ->send to Parent
    * @param  {Object} {event} -
    */
    const handleSelect = (event = {}, index = 0) => {
        const { target = {} } = event;
        if (target.getAttribute('data-value') !== valueselect) {
            const eventValue = {
                target: {
                    name: target.getAttribute("name"),
                    value: target.getAttribute('data-value'),
                    selectedElement: valueData[index]
                }
            };
            setDropDownFlag(false);
            setDropDownActiveFlag(false);
            _onChange(eventValue);
        }
    };
    const handleSelectItems = (index, itemName = '') => {
        if (getCheckValue[index].isChecked === true) {
            getCheckValue[index].isChecked = false;
            setallCheckButtonActive(false);
            getCheckValue[0].isChecked = false;
        }
        else {
            getCheckValue[index].isChecked = true;
        }
        setCheckValue([...getCheckValue]);
        let selectedPlanIds = '';
        const getCheckedList = getCheckValue.filter((obj) => obj.isChecked === true);
        const getCheckedPlanIds = getCheckValue.filter((obj) => obj.isChecked === true);
        setallCheckButtonActive(getCheckedPlanIds.length === getCheckValue.length - 1);
        getCheckValue[0].isChecked = (getCheckedPlanIds.length === getCheckValue.length - 1);
        getCheckValue.filter((obj) => {
            if (obj.isChecked === true && obj.id !== "") {
                selectedPlanIds += getCheckedList.length > 1 && getCheckedList[getCheckedList.length - 1].id !== obj.id ? obj.id + "," : obj.id;
                return selectedPlanIds;
            }
        });

        const eventValue = {
            target: {
                name: itemName,
                value: selectedPlanIds,
                selectedElement: valueData[index]
            }
        };
        _onChange(eventValue);

    };

    const handleAllCheck = (state = true) => {
        const tempArray = valueData.map((obj) => Object.assign(obj, { isChecked: state }));
        setCheckValue([...tempArray]);
        const eventValue = {
            target: {
                name: name,
                value: '',
                selectedElement: ''
            }
        };
        _onChange(eventValue);
        setallCheckButtonActive(state);
    };

    const getOffset = (el) => {
        const rect = el?.getBoundingClientRect();
        const leftSide = rect.left + window.scrollX;
        const rightSide = rect.top + window.scrollY;
        if (leftSide < 0) {
            el.style.right = `${leftSide - 33}px`;
        }
        if (rightSide < 0) {
            el.style.right = 0;
        }
        return `${leftSide}px`;
    };

    //open drop down
    const _handleDropDown = (event = {}) => {
        event.preventDefault();
        setTimeout(() => {
            const dropDownCustom = document?.querySelector('#drop_down_custom');
            getOffset(dropDownCustom);
        }, 0);
    };

    const _handleOnOutsideClick = () => {
        setDropDownFlag(false);
        setDropDownActiveFlag(false);
    };

    const defaultSelectClass = (selectValue = "") => {
        const defaultNale = ["All", "USD ($)", "Plan Type"];
        return !defaultNale.some((ele) => convertToLowerCase(ele) === convertToLowerCase(selectValue));
    };

    const handleActiveClass = (valueselectVal = "", selectorNameVal = "") => {
        if (valueselect && selectorName) {
            return convertToLowerCase(valueselectVal) === convertToLowerCase(selectorNameVal);
        }
    };

    React.useEffect(() => {
        if (valueSelectValue.length === 1 || valueSelectValue.includes(",") || valueSelectValue === "All" || valueSelectValue === "") {
            if (valueSelectValue.includes(",")) {
                const selectedIds = valueSelectValue.split(',');
                setallCheckButtonActive(selectedIds.length === valueData.length - 1);
                let tempIdArray = [];
                valueData.map((array) => selectedIds.filter((id) => {
                    if (id.toString() === array.id.toString()) {
                        tempIdArray = [...tempIdArray, array];
                        return tempIdArray;
                    }
                }));
                const tempArray = valueData.map((obj) => Object.assign(obj, { isChecked: false }));
                tempIdArray.forEach((obj) => Object.assign(obj, { isChecked: true }));
                if (tempArray[0]) { tempArray[0].isChecked = (selectedIds.length === valueData.length - 1); }
                setCheckValue([...tempArray]);

            }
            else if (valueSelectValue.length === 1) {
                const tempArray = valueData.map((obj) => Object.assign(obj, { isChecked: (obj.id).toString() === valueSelectValue.toString() ? true : false }));
                setCheckValue([...tempArray]);
                setallCheckButtonActive(false);
            }
            else {
                const tempArray = valueData.map((obj) => Object.assign(obj, { isChecked: true }));
                setCheckValue([...tempArray]);
            }
        }
        else {
            const tempArray = valueData.map((obj) => Object.assign(obj, { isChecked: obj.planName === valueSelectValue ? true : false }));
            setCheckValue([...tempArray]);
        }
    }, [valueData, valueSelectValue]);

    React.useEffect(() => {
        if (valueSelectValue === "All" || valueSelectValue === "" || (valueSelectValue.length === 8 && valueSelectValue.includes(","))) {
            setallCheckButtonActive(true);
        }
    }, []);

    return (
        <>
            {!enableListAlone ? <>
                <OutsideClickHandler
                    onOutsideClick={() => _handleOnOutsideClick()}
                >
                    {valueData &&

                        <label
                            htmlFor={name}
                            onClick={(e) => { _handleDropDown(e); }}
                            className={`custom-dropdown simple table-dropdown datePicker ${Size === "" ? "" : Size}
                    ${DropDownActive ? "active" : ""} ${defaultSelectClass(valueselect) ? "selected" : ""}`}
                        >
                            {enableDefaultFilterby ?
                                <span onClick={() => { setDropDownFlag(!DropDown); }}
                                    className="SelectedValue"
                                >   {defaultFilterby}
                                </span>
                                :
                                <span onClick={() => { setDropDownFlag(!DropDown); }}
                                    className="SelectedValue"
                                >   {defaultSelectClass(valueselect) ? valueselect : defaultFilterby}
                                </span>
                            }
                            <input
                                id={name}
                                type="checkbox"
                                onChange={() => { }}
                                checked={DropDownActive}
                            />
                            <CSSTransition
                                in={DropDown}
                                timeout={500}
                                classNames={DropDown ? "fadeInUp" : "hidden"}
                                onEnter={() => setDropDownActiveFlag(true)}
                                unmountOnExit
                            >
                                <div id="drop_down_custom" className="drop_down_custom">
                                    <ul className="customDrop with_check_option">

                                        {listHeading &&
                                            <li className="list_heading">{listHeading}</li>
                                        }

                                        {(getCheckValue || []).map((element, index) => {
                                            return (<>
                                                <li
                                                    key={convertToLowerCase(index + "valueData-sfab")}
                                                    className={`${!enableCheckbox && handleActiveClass(valueselect, element[selectorName]) ? "active" : ""} `}
                                                >
                                                    {enableCheckbox ? (
                                                        <button
                                                            name={name}
                                                            value={element.id}
                                                            data-value={getDataId ? element.id : element[selectorName]}
                                                            onClick={() => {
                                                                setDropDownFlag(enableCheckbox ? enableCheckbox : !DropDown);
                                                                if (element[selectorName] === "All") {
                                                                    handleSelectItems(index, name);
                                                                    handleAllCheck(!getCheckValue[0].isChecked);
                                                                }
                                                                else if (element[selectorName] !== "All") {
                                                                    handleSelectItems(index, name);
                                                                }
                                                            }}
                                                            type="button"
                                                            className={` checkbox_wraper ${(element[selectorName] === "All" && allCheckButtonActive) ? ' ' : ''}`} >
                                                            <div className="checkbox-custom">
                                                                <input
                                                                    readOnly
                                                                    type="checkbox"
                                                                    name={name}
                                                                    value={element.id}
                                                                    checked={(element[selectorName] === "All" && allCheckButtonActive) ?
                                                                        allCheckButtonActive : element.isChecked}
                                                                />
                                                                <div className="label_border"></div>
                                                            </div>
                                                            {element[selectorName]}
                                                        </button>
                                                    ) : <button
                                                        name={name}
                                                        value={element.id}
                                                        data-value={getDataId ? element.id : element[selectorName]}
                                                        onClick={(event) => handleSelect(event, index)}
                                                        className="button"
                                                        type="button">
                                                        {element[selectorName]}
                                                    </button>
                                                    }
                                                </li>
                                            </>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </CSSTransition>
                            <i onClick={() => { setDropDownFlag(!DropDown); }} className="dropIcon"><IconDropdownCc /></i>
                        </label>
                    }
                </OutsideClickHandler>
            </>
                :
                <>
                    <ul className="customDrop_list">
                        {(getCheckValue || []).map((element, index) => (
                            <li
                                key={convertToLowerCase(index + "valueData-sfab")}
                                className={`${!enableCheckbox && handleActiveClass(valueselect, element[selectorName]) ? "active" : ""} `}
                            >
                                <button
                                    name={name}
                                    value={element.id}
                                    data-value={getDataId ? element.id : element[selectorName]}
                                    onClick={(event) => handleSelect(event, index)}
                                    className="button"
                                    type="button">
                                    {element[selectorName]}
                                </button>
                            </li>))}
                    </ul>
                </>
            }
        </>
    );
};
DropTableSort.propTypes = {
    name: propTypes.string,
    Size: propTypes.string,
    _onChange: propTypes.func,//click
    dataValue: propTypes.array,
    valueselect: propTypes.string,
};
export default React.memo(DropTableSort);
