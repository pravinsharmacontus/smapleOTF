import React from 'react';

const GlobalSearchComponent = (props = {}) => {
    const {
        value = "",
        id = "",
        type = "",
        name = "",
        _class = "",
        _onKeyPress,
        _maxLength = 1000,
        _onBlur = () => { },//click function
        onInput = () => { },//click function
        handleSetSearchInput = () => { },//click function
    } = props;

    return (
        <React.Fragment>
            <input className={`tableSearch ${_class === undefined ? "" : _class} ${value ? "active" : ""}`}
                type={type} //input Type
                name={name} //name
                value={value} //value
                id={id ? id : name} //when id is come appen otherwise name append
                autoComplete={"off"}
                maxLength={_maxLength || 1000} //maxLength is missing will append 1000 char
                onBlur={_onBlur ? _onBlur : null} //onblur call
                onInput={onInput ? onInput : null}
                keydown={_onKeyPress ? _onKeyPress : null}
                onChange={(e) => handleSetSearchInput(e)}
            />
        </React.Fragment>
    );
};
export default React.memo(GlobalSearchComponent);
