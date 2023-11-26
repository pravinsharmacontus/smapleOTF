import React, { useState } from 'react';
import "./RecordingSettings.scss";
import CommonCheckbox from '../../../../../Common/CommonCheckbox';
import { useTranslation } from 'react-i18next';

function RecordingSettings(_props = {}) {
    const {t} = useTranslation();
    const [getFormData, setFormData] = useState(
        {
            getRecording: false,
        }
    );

    const { getRecording } = getFormData;

    const handleInputChange = (event) => {
        const { name = "", value = "", type = "", checked = false } = event.target || {};

        setFormData({
            ...getFormData,
            [name]: type === 'checbox' ? checked : value
        });
    };
    return (
        <div className='recording_settings_wraper'>
            <div className='recording_settings_inner'>
                <div className='recording_settings_body'>
                    <h3>{t("BROADCAST.SETTINGS.RECORDING_TAB.LOCAL_RECORDING")}</h3>
                    <p>{t("BROADCAST.SETTINGS.RECORDING_TAB.LOCAL_RECORDING_CAPTION")}</p>

                    <fieldset className='checkbox_fieldset'>
                        <CommonCheckbox
                            id="check-getRecording"
                            name="getRecording"
                            checkVal={getRecording}
                            onChange={handleInputChange}
                            label={false}
                        />
                        <label htmlFor="check-getRecording">{t("BROADCAST.SETTINGS.RECORDING_TAB.LOCAL_CHECKBOX_TEXT")}</label>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}

export default RecordingSettings;
