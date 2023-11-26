import React from 'react';
import { useTranslation } from 'react-i18next';

function ComponentTabContainer(props) {
    const {t} = useTranslation();
    const { children = '', handleAction = () => { } } = props;
    return (<>
        <div className='stream_setting_tab'>
            <div className='stream_setting_tab_form'>
                {children}
            </div>
            <div className='action_tab_list'>
                <button onClick={handleAction} type='button' className='action_tab'>{t("COMMON.DONE")}</button>
            </div>
        </div>
    </>);
}

export default React.memo(ComponentTabContainer);
