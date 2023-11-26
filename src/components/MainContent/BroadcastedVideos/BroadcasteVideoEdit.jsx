import './BroadcasteVideoEdit.scss';
import React, { useEffect, useState } from 'react';
import { IconEdit2 } from '../../../assets/images';
import ActionCommonPopup from '../ActionCommonPopup';
import CommonFormInput from '../../../common/CommonFormInput';

function BroadcasteVideoEdit(_props = {}) {
    const { _handleAction = () => { }, _handleClose = () => { }, title = '' } = _props;
    const [getTitle, setTitle] = useState();

    const handleInputChange = (event) => {
        const { value = "" } = event.target || {};
        setTitle(value);
    };

    useEffect(() => {
        setTitle(title);
    }, [title]);
    useEffect(() => {
        setTitle(title);
    }, []);

    return (
        <ActionCommonPopup
            handleAction={_handleAction}
            handleClose={_handleClose}
            onExited={() => _handleClose(false)}
            textActionButton={"save"}
        >
            <div className="action_head">
                <i className="delete">
                    <IconEdit2 />
                </i>
                <strong>Edit Title</strong>
            </div>
            <div className='broadcaste_video_edit_wraper'>
                <fieldset>
                    <CommonFormInput
                        enableCopyIcon={false}
                        type="text"
                        caps={false}
                        mustFill={false}
                        value={getTitle}
                        name={"Title"}
                        palceholder={"Title"}
                        _onBlur={() => { }}
                        _onchange={handleInputChange}
                        customClass={""}
                        error={false}
                        className={" mb-0 "}
                    />
                </fieldset>
            </div>
        </ActionCommonPopup>
    );
}

export default BroadcasteVideoEdit;
