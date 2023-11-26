import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import { IconDelete } from "../../assets/images";
import OutsideClickHandler from "react-outside-click-handler";
import AutoFocusUtility from "../../helper/AutoFocusUtility";

const DeletePopup = (props = {}) => {
  const {
    onExited, //function call
    maxWidth = "",
    minWidth = "",
    heading = "",
    handleDeleteClose, //handle yes and cancel button
    pageName = "",
    _bulkContent = <span> Are you sure? You're about to <strong>{"bulk delete"}</strong>{" "} selected events {pageName} </span>
  } = props;

  const { t } = useTranslation();
  const [popupAnimate, setPopupAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPopupAnimate(true);
    }, 100);
    return setPopupAnimate(false);
  }, []);

  const escFunction = (event) => {
    if (event.key === "Escape") {
      handleDeleteClose(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return (() => {
      document.removeEventListener("keydown", escFunction, false);
    });
  });

  return (
    <Fragment>
      <div className="PopupWrapper fixed xs">
        <div className="PopupInner ActionPopup delete">
          <div className='outside_wraper'>
            <OutsideClickHandler
              onOutsideClick={() => {
                handleDeleteClose(false);
              }}
            >
              <CSSTransition
                in={popupAnimate}
                timeout={300}
                classNames="alert"
                unmountOnExit
                onExited={() => onExited(false)}
              >
                <div
                  style={{
                    maxWidth: maxWidth ? maxWidth : "100%",
                    minWidth: minWidth,
                  }}
                  className="ActionPopupInner"
                >
                  <AutoFocusUtility />
                  <div className="action_head">
                    <i className="delete">
                      <IconDelete />
                    </i>
                    <strong>{heading}</strong>
                  </div>
                  <p className="desc">
                    {_bulkContent}
                  </p>
                  <div className="group-btn">
                    <button
                      type="button"
                      data-auto="action_button"
                      className="Btn outline delete"
                      data-jest-id={"jestProceedDelete"}
                      onClick={(e) => {
                        handleDeleteClose(true);
                        e.target.blur();
                      }}
                    >
                      {t("COMMON.DELETE")}
                    </button>
                    <button
                      className="Btn outline"
                      data-jest-id={"jestCancelDelete"}
                      onClick={(e) => {
                        handleDeleteClose(false);
                        e.target.blur();
                      }}
                    >
                      {t("COMMON.CANCEL")}
                    </button>
                  </div>
                </div>
              </CSSTransition>
            </OutsideClickHandler>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default React.memo(DeletePopup);
