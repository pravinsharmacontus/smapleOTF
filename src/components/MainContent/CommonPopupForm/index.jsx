import React from 'react';
import "./CommonPopupForm.scss";
import { IconAdduser } from '../../../assets/img';
import { translate } from '../../../helper/utility';
import LabelTooptip from '../../../common/LabelTooptip';

function CommonPopupForm(props = {}) {
    const { heading = "", handleClose = () => { }, handleAction = () => { }, children = '',
    tooltipDesc="Inviting cohost so they can make changes to the live stream settings if needed.",
} = props;
    return (
        <div className="team_wraper">
            <div className="team_header">
                <i className="icon">
                    <IconAdduser color="#ff0935" />
                </i>
                <strong>{heading}</strong>
                <LabelTooptip
                    minHeight={"50px"}
                    iconType="question"
                    tooltipDesc={tooltipDesc}
                />
            </div>
            <div className='form'>
                {children}
                <div className="group-btn">
                    <button
                        type="button"
                        data-auto="action_button"
                        className="Btn outline delete"
                        data-jest-id={"jestProceed"}
                        onClick={(e) => { e.target.blur(); handleAction(e); }}
                    >
                        {translate("Submit")}
                    </button>
                    <button
                        type="button"
                        className="Btn outline"
                        data-jest-id={"jestCancel"}
                        onClick={(e) => { e.target.blur(); handleClose(false); }}
                    >
                        {translate("COMMON.CANCEL")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CommonPopupForm;
