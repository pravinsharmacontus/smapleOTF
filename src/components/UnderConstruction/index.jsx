import React from "react";
import "./UnderConstruction.scss";
import { useTranslation } from "react-i18next";
import { ImgUnderConstruction } from "../../../src/assets/images";

const UnderConstruction = () => {
    const { t } = useTranslation();
    return (
        <div className="PageUnderConstruction">
            <div className="UnderConstruction">
                <div className="img-block placeHolderBg">
                    <img
                        width="618px"
                        height="427px"
                        alt="Under Construction"
                        src={ImgUnderConstruction}
                    />
                </div>
                <div className="content">
                    <h1>
                        {t("COMMON.CONSTRACTION")}
                    </h1>
                    <span>
                        {t("COMMON.CONSTRACTION_DESC")}
                    </span>
                </div>
            </div>
        </div>
    );
};
export default React.memo(UnderConstruction);
