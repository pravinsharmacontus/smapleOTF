import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { IconDropdownDark } from "../../assets/images";
import OutsideClickHandler from "react-outside-click-handler";

const CommonDropDown = (props = {}) => {
    const {
        name = "",
        value = "",
        versionId = 0,
        placeholder = "",
        error = "",
        readOnly = false,
        className = "",
        autoFocus = false,
        _onChange = () => { },
        onClickFunc = () => { },
        optionList = [],
        listClassname = ''
    } = props;
    const [stateManage, setStateManage] = useState({
        DropDown: false,
    });

    const _handleSelect = (event = {}) => {
        setStateManage({
            ...stateManage,
            DropDown: false
        });
        _onChange({ target: { name: name, value: event.target.getAttribute("value") } });
    };

    const _handleDropDown = () => {
        onClickFunc && onClickFunc();
        setStateManage({
            ...stateManage,
            DropDown: !stateManage.DropDown
        });
    };

    const _handleOnOutsideClick = () => {
        setStateManage({
            ...stateManage,
            DropDown: false
        });
    };

    return (
        <React.Fragment>
            <OutsideClickHandler
                onOutsideClick={() => { _handleOnOutsideClick(); }}
            >
                <button
                    autoFocus={autoFocus}
                    type="button"
                    onClick={readOnly ? null : _handleDropDown}
                    className={`custom-dropdown table-dropdown commonDropDown ${error ? " error " : ""} ${readOnly ? " readOnly " : ""} ${className}`}
                >
                    <span
                        className={`SelectedValue ${value ? "hasValue" : " default_value"}`}>
                        {value ? value : placeholder}
                    </span>
                    {!readOnly &&
                        <i
                            className={`dropIcon ${stateManage.DropDown ? " active " : ""}`}
                        >
                            <IconDropdownDark />
                        </i>
                    }
                </button>
                {stateManage.DropDown ?
                    <CSSTransition
                        timeout={500}
                        unmountOnExit
                        classNames="fadeInUp"
                        in={stateManage.DropDown}
                    >
                        <div>
                            <ul className="customDrop">
                                {optionList.map((ele) => {
                                    return (
                                        <React.Fragment
                                            key={ele.id}
                                        >
                                            <li className={`${listClassname} p-0`}>
                                                <button
                                                    title={ele.option}
                                                    name={name}
                                                    type="button"
                                                    id={versionId}
                                                    value={ele.option}
                                                    onClick={(e) => _handleSelect(e)}
                                                    className={`${value === ele.option ? " active " : ""}`}
                                                >
                                                    {ele.option}
                                                </button>
                                            </li>
                                        </React.Fragment>
                                    );
                                })}

                            </ul>
                        </div>
                    </CSSTransition>
                    :
                    null
                }
            </OutsideClickHandler>
            <>
                {error &&
                    <span className="errorMessage">
                        {error}
                    </span>
                }
            </>
        </React.Fragment>
    );

};
export default React.memo(CommonDropDown);
