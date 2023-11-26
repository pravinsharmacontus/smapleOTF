import React, { useEffect } from 'react';
import "./AccountActiveAlert.scss";
import { IconCloseAlert, IconTickCircleWhiteBg } from '../../../assets/images';
import { userDetailsLocal } from '../../../helper/RoleConfig';
import { handleMixpanelTrack } from '../../../common/helper';

const AccountActiveAlert = (props = {}) => {
    const { handleClose = () => { } } = props;
    useEffect(() => {
        const userDetails = userDetailsLocal() || {};//logged userDetails
        const { data: { firstName = "", email = "" } = {} } = userDetails;//logged userDetails
        handleMixpanelTrack("Account_Activated", {
            otfName: firstName,
            otfEmail: email
        });
    }, []);
    return (
        <React.Fragment>
            <div className='acc_active'>
                <div className='acc_active_success'>
                    <IconTickCircleWhiteBg />
                    <p>Your account has been activated successfully! Please sign-in to continue</p>
                    <button
                        type='button'
                        className='close_alert'
                        onClick={() => handleClose()}
                        data-jest-id={"close_alert_AccountActiveAlert"}
                    >
                        <IconCloseAlert />
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default React.memo(AccountActiveAlert);
