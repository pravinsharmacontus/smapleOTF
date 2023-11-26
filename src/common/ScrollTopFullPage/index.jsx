import React, { Fragment, useState } from 'react';
import './ScrollTopFullPage.scss';
import { useTranslation } from "react-i18next";
import { IconScrollTopCircle } from '../../assets/images';

const ScrollTopFullPage = () => {
  const { t } = useTranslation();
  const [scrollVisible, setScrollVisible] = useState(false);
  const ContentWrapper = '#ContentWrapper';
  const ContentWrapperBody = document.querySelector(ContentWrapper);
  let ContentWrapperposition = 0;
  /**
   * Make scroll To Top
  */
  const scrollToTop = () => {
    document && document.querySelector(ContentWrapper).scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  setTimeout(() => {
    ContentWrapperBody.addEventListener("scroll", function () {
      ContentWrapperposition = ContentWrapperBody.scrollTop;
      ContentWrapperposition > 100 ? setScrollVisible(true) : setScrollVisible(false);
    });
  }, 1000);

  return (
    <Fragment>
      {scrollVisible &&
        <span className="ScrollTopFullPage" title={t("COMMON.SCROLL_TO_TOP")}
          onClick={scrollToTop} >
          <i><IconScrollTopCircle /></i>
        </span>
      }
    </Fragment>
  );
};

export default React.memo(ScrollTopFullPage);
