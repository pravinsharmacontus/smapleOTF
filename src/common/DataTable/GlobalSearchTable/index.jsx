import React from 'react';
import _get from "lodash/get";
import { IconSearch, IconClose } from './assets';

const GlobalSearchTable = (props = {}) => {
    const {
        value = "",
        id = "",
        type = "",
        name = "",
        _class = "",
        _onKeyPress,
        parentClass = "",
        placeholder = "",
        _maxLength = 1000,
        _onBlur = () => { },//click function
        onInput = () => { },//click function
        handleInputboxClear = () => { },//click function
        handleSetSearchInput = () => { },//click function
    } = props;

    const removeMultipleSpaces = (str = "") => {
        return str.replace(/\s+/g, ' ').trimStart();
    };

    /**
    * @param  {object} {event} -
    * Teams and customer page all search input fields Handle Here
    **/
    const handleSetSearchInputField = (event = {}) => {
        const { name: inputName, value: inputValue } = _get(event, "target", {});
        const eventValue = {
            target: {
                name: inputName,
                value: removeMultipleSpaces(inputValue),
            }
        };
        handleSetSearchInput(eventValue);
    };

    // space restricted from begining
    const handleRestrictSpace = (e) => {
        if (e.which === 32 && !e.target.value.length)
            e.preventDefault();
    };

    return (
        <React.Fragment>
            <div className={`${parentClass ? parentClass : ""} tableSearch-global-wrapper`}>
                <input className={`tableSearch-global ${_class === undefined ? "" : _class} ${value ? "active" : ""}`}
                    type={type} //input Type
                    name={name} //name
                    value={value} //value
                    id={id ? id : name} //when id is come appen otherwise name append
                    autoComplete={"off"}
                    maxLength={_maxLength || 1000} //maxLength is missing will append 1000 char
                    onBlur={_onBlur ? _onBlur : null} //onblur call
                    onInput={onInput ? onInput : null}
                    onKeyPress={_onKeyPress ? (e) => { _onKeyPress(e); handleRestrictSpace(); } : handleRestrictSpace}
                    onChange={(e) => handleSetSearchInputField(e)}
                    placeholder={placeholder}
                />
                {value !== "" ?
                    <i id="#jestTeamnameReset" className="iconClose"
                        onClick={handleInputboxClear}
                    >
                        <IconClose />
                    </i>
                    :
                    <i className='iconSearch'><IconSearch /></i>
                }
            </div>
        </React.Fragment>
    );
};
export default React.memo(GlobalSearchTable);
