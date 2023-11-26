import React from 'react';
import './NotFound.scss';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
    const { t } = useTranslation();
    return (
        <div className="NotFound">
            <div className="MainWrapper">
                <div class="lamp">
                    <div class="cable"></div>
                    <div class="cover"></div>
                    <div class="in-cover">
                        <div class="bulb"></div>
                    </div>
                    <div class="light"></div>
                </div>
                <div class="error">
                    <div class="error__content">
                        <div class="error__message message">
                            <h1 class="message__title">
                                {t("COMMON.NOT_FOUND")}
                            </h1>
                            <p class="message__text">
                                {t("COMMON.NOT_FOUND_DESC")}
                            </p>
                        </div>
                        <div class="error__nav e-nav">
                            <a href="/"
                                class="e-nav__link">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
export default React.memo(NotFoundPage);
