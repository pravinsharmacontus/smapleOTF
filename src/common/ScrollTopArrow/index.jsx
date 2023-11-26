import React from 'react';
import './ScrollTopArrow.scss';
import { useTranslation } from "react-i18next";
import { IconScrollTop } from '../../assets/images';

const ScrollTopArrow = (props = {}) => {
  const {
    isVisible = false
  } = props;

  const { t } = useTranslation();
  const ContentWrapper = '#ContentWrapper';

  /**
   * Make scroll To Top
  */
  const scrollToTop = () => {
    document &&
      document.querySelector(ContentWrapper) &&
      document.querySelector(ContentWrapper).scrollTo &&
      document.querySelector(ContentWrapper).scrollTo({
        top: 0,
        behavior: "smooth"
      });
  };

  return (
    <span className="srollToTop"
      onClick={scrollToTop}
    >
      {isVisible && <React.Fragment>
        <i><IconScrollTop /></i>
        <span>
          {t("COMMON.SCROLL_TO_TOP")}
        </span>
      </React.Fragment>
      }
    </span>
  );
};

export default React.memo(ScrollTopArrow);
