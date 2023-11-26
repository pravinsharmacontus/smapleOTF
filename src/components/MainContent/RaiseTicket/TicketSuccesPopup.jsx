import React from 'react';
import './TicketSuccesPopup.scss';
import { IconGreenTick } from './assets';

const TicketSuccesPopup = (props = {}) => {

    return (
        <div className='successPopupWrapper'>
            <div className='successPopup'>
                <i className='iconTick'><IconGreenTick /></i>
                <strong className='successMsg'>Your ticket was successfully submitted.</strong>
                <small className='successInfo'>Our team will get back to you as soon as possible.</small>
            </div>
        </div>
    );
};

export default TicketSuccesPopup;
