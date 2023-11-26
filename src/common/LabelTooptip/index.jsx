import React from 'react';
import { IconLabelInfo, IconQuestionOutline } from '../../assets/images';

const LabelTooptip = (props = {}) => {
    const { labelText = "", tooltipTitle = "", tooltipDesc = '', toolTipClass = "",
        minHeight = "110px", iconType = "info", tooltipIcon = <IconLabelInfo />, mustFill = false } = props;
    return (<>
        <div className='info_lable_tooltip'>
            {labelText ? <span>{labelText} <span style={{ color: "red" }}> {mustFill === true && "*"}</span></span> : null}
            <div className='icon'>
                {iconType === "custom" ? tooltipIcon : null}
                {iconType === "info" ? <IconLabelInfo /> : null}
                {iconType === "question" ? <IconQuestionOutline /> : null}
                <div style={{ minHeight: minHeight }}
                    className={` ${toolTipClass} label_tooltip_wraper`}>{tooltipTitle ? <h4 className='label_tooltip_title'>{tooltipTitle}</h4> : null}
                    <p className='label_tooltip_desc'>{tooltipDesc}</p>
                </div>
            </div>
        </div>
    </>);
};

export default LabelTooptip;
