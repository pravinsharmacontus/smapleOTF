import React from 'react';
import { IconTooltipGreenTick, IconTooptipDownArrow } from '../../assets/images';

const PasswordPolicyValidation = (props = {}) => {
    const { passwordPolicy = {} } = props;
    const {
        eightDigitCase = false,
        numberCase = false,
        upperCase = false,
        specialCase = false,
        lowerCase = false,
    } = passwordPolicy;
    return (
        <div className='password-format'>
            <IconTooptipDownArrow />
            <h3>PASSWORD MUST CONTAIN :</h3>
            <ul>
                <li className={eightDigitCase ? 'passed' : ''}>
                    {!eightDigitCase ? <span className='gray_dot'></span> : <IconTooltipGreenTick />}
                    <p>8 or more characters</p>
                </li>
                <li className={numberCase ? 'passed' : ''}>
                    {!numberCase ? <span className='gray_dot'></span> : <IconTooltipGreenTick />}
                    <p>At least 1 number</p>
                </li>
                <li className={(upperCase) ? 'passed' : ''}>
                    {!upperCase ? <span className='gray_dot'></span> : <IconTooltipGreenTick />}
                    <p>At least 1 UPPERCASE</p>
                </li>
                <li className={specialCase ? 'passed' : ''}>
                    {!specialCase ? <span className='gray_dot'></span> : <IconTooltipGreenTick />}
                    <p>At least 1 special character</p>
                </li>
                <li className={(lowerCase) ? 'passed' : ''}>
                    {!lowerCase ? <span className='gray_dot'></span> : <IconTooltipGreenTick />}
                    <p>At least 1 lowercase</p>
                </li>
            </ul>
        </div>
    );
};

export default PasswordPolicyValidation;
