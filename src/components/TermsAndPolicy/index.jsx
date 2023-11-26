import React, { memo } from 'react';
import CommonCheckbox from '../Common/CommonCheckbox';
import './TermsAndPolicy.scss';

const TermsAndPolicy = (props = {}) => {
    const { onChange = () => { }, chatCheckBox = false } = props;
    return (
        <div className='Policy_container'>
            <CommonCheckbox
                id="agree_terms"
                name="chatCheckBox"
                checkVal={chatCheckBox}
                onChange={onChange}
            />
            <p className='Policy'>
                By continuing, you're agreeing to OnTheFly's
                <a href="https://www.onthefly.stream/terms-and-conditions" target="_blank" rel="noopener noreferrer"> Terms of service </a> and
                <a href="https://www.onthefly.stream/privacy-policy" target="_blank" rel="noopener noreferrer"> Privacy policy. </a>
                Consent includes receiving marketing information from OnTheFly.
            </p>
        </div>
    );
};

export default memo(TermsAndPolicy);
