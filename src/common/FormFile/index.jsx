import React from 'react';

const FormFile = (props = {}) => {

    const {
        id = "",
        name = "",
        type = "",
        accept = "",
        palceholder = "",
        readOnly = false,
        onBlur = () => { },//click function
        _onchange = () => { },//click function
    } = props;
    return (
        <React.Fragment>
            <input
                type={type}
                name={name}
                id={id ? id : name}
                onChange={(e) => _onchange(e)}
                accept={accept ? accept : null}
                disabled={readOnly ? true : false}
                onBlur={onBlur ? () => onBlur() : null}
            />
            {
                palceholder &&
                <span className="placeholder">
                    {palceholder}
                    <sub className="mustFill">*</sub>
                </span>
            }

        </React.Fragment>
    );
};
export default React.memo(FormFile);
