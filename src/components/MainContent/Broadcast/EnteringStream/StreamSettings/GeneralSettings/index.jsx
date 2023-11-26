import React, { useState } from 'react';
import CommonDropDown from '../../../../../Common/CommonDropDown';
import CommonCheckbox from '../../../../../Common/CommonCheckbox';
import { useTranslation } from 'react-i18next';

const BroadcastQualityList = [
    {
        id: 1,
        option: "Full High Defination (1080p)",
    },
    {
        id: 2,
        option: "High Defination (720p)",
    },
];

function GeneralSettings(props) {
    const { t } = useTranslation();
    const [getFormData, setFormData] = useState(
        {
            getBroadcastQuality: '',
            getShiftComments: false,
            getAudioAvatars: false,
            getAddSharedScreens: false,
        }
    );
    const { getBroadcastQuality, getShiftComments, getAudioAvatars, getAddSharedScreens } = getFormData;
    const handleInputChange = (event) => {
        const { name = "", value = "", type = "", checked = false } = event.target || {};

        setFormData({
            ...getFormData,
            [name]: type === 'checbox' ? checked : value
        });
    };
    return (
        <>
            <fieldset>
                <div className="common-input-wrapper mb-0">
                    <div className="lableInfo">
                        <span className="inputLabel ">{t("BROADCAST.SETTINGS.GENERAL_TAB.BROADCAST_QUALITY")}</span>
                    </div>
                    <CommonDropDown
                        autoFocus={true}
                        optionList={BroadcastQualityList}
                        mustFill={false}
                        value={getBroadcastQuality}
                        name={"getBroadcastQuality"}
                        _onBlur={() => { }}
                        _onChange={handleInputChange}
                        className={` ${false ? " dropdown-error " : ""}`}
                    />
                </div>
            </fieldset>
            <fieldset className='checkbox_fieldset'>
                <CommonCheckbox
                    id="check-getShiftComments"
                    name="getShiftComments"
                    checkVal={getShiftComments}
                    onChange={handleInputChange}
                />
                <label htmlFor="check-getShiftComments">{t("BROADCAST.SETTINGS.GENERAL_TAB.SHIFTVIDEOS_UP")}</label>
            </fieldset>
            <fieldset className='checkbox_fieldset'>
                <CommonCheckbox
                    id="check-AudioAvatars"
                    name="getAudioAvatars"
                    checkVal={getAudioAvatars}
                    onChange={handleInputChange}
                />
                <label htmlFor="check-AudioAvatars">{t("BROADCAST.SETTINGS.GENERAL_TAB.AUDIO_AVATARS")}</label>
            </fieldset>
            <fieldset className='checkbox_fieldset'>
                <CommonCheckbox
                    id="check-getAddSharedScreens"
                    name="getAddSharedScreens"
                    checkVal={getAddSharedScreens}
                    onChange={handleInputChange}
                />
                <label htmlFor="check-getAddSharedScreens">{t("BROADCAST.SETTINGS.GENERAL_TAB.AUTOMATICALLY_ADD")}</label>
            </fieldset>
        </>
    );
}

export default React.memo(GeneralSettings);
