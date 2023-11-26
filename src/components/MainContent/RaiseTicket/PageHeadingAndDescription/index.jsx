import React from 'react';
import { useTranslation } from 'react-i18next';

const PageHeadingAndDescription = (props = {}) => {
    const {
        parentClass = "",
        pageHead = "",
        additionalInfo = false,
        pageHeadDescription = "",
    } = props;

    const { t } = useTranslation();

    return (
        <React.Fragment>
            <div className={`${parentClass ? parentClass : "grid-3"}`}>
                <div className="leftGrid  mt-0">
                    <span>
                        {pageHead}
                    </span>
                    <p>{pageHeadDescription}</p>
                </div>
                {additionalInfo &&
                    <div
                        className="additional-info"
                    >
                        <p className="desc">
                            {t("SETTING.LICENSE_DETAILS.LICENSE_DESC")}
                        </p>
                    </div>
                }
            </div>
        </React.Fragment>
    );
};
export default React.memo(PageHeadingAndDescription);
