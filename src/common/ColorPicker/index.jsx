import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import OutsideClickHandler from 'react-outside-click-handler';
import { IconX } from '../../assets/img';

const ColorPicker = (_props = {}) => {

    const { handleChangeColor = () => { }, handleGetcolorCode = () => { }, _handleOnOutsideClick = () => { }, _getColor = "" } = _props;

    const [getColor, setColor] = useState('');
    const handleChange = (color = {}) => {
        console.log(color, "color");
        setColor(color.hex);
        handleGetcolorCode(color.hex);
    };

    useEffect(() => {
        setColor(_getColor);
    }, []);

    return (
        <OutsideClickHandler class="asd" className="as" onOutsideClick={() => _handleOnOutsideClick()}>
            <div className='color_pallete_box'>
                <button title='close' onClick={() => _handleOnOutsideClick()} type='button' className='close'><IconX /></button>
                <ChromePicker
                    color={getColor}
                    onChange={handleChangeColor}
                    onChangeComplete={handleChange}
                    disableAlpha={true}
                    body={"display:none"}

                />
            </div>
        </OutsideClickHandler >
    );
};

export default ColorPicker;
