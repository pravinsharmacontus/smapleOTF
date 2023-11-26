import React from 'react';

const TextInputComponent = (_props = {}) => {
    const { labelText = "", value = "" } = _props;
    return (
        <div className='common-input-wrapper'>
            <label class="label_top">{labelText}</label>
            <div className='input_visible'>
                {value}
            </div>
        </div>
    );
};

export default React.memo(TextInputComponent);
