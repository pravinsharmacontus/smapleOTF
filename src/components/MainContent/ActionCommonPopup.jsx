import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import OutsideClickHandler from "react-outside-click-handler";

const ActionCommonPopup = (props = {}) => {
  const { t } = useTranslation();
  const {
    onExited, //function call
    handleClose, //handle yes and cancel button,
    handleAction,
    btnBlue = false,
    children = "",
    textActionButton = t("COMMON.DELETE"),
    textCancelButton = t("COMMON.CANCEL"),
    enableActionButton = true,
    enableCancelButton = true,
    parentClass = "lg",
    minWidth = "",
    enableScreenHeight = false,
    // popupAction = "",
    customActionComponent = "",
  } = props;

	const [popupAnimate, setPopupAnimate] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setPopupAnimate(true);
		}, 100);
		return setPopupAnimate(false);
	}, []);

  useEffect(() => {
    setTimeout(() => {
      setPopupAnimate(true);
    }, 100);
    return setPopupAnimate(false);
  }, []);

  const escFunction = (event) => {
    if (event.key === "Escape") {
        handleClose(false);
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
        <div className={`PopupInner ActionPopup  ${parentClass} `}>
          <div className="outside_wraper">
            <OutsideClickHandler
              onOutsideClick={() => {
                handleClose(false);
              }}
            >
              <CSSTransition
                in={popupAnimate}
                timeout={300}
                classNames="alert"
                unmountOnExit
                onExited={() => onExited(false)}
              >
                <div style={{minWidth : minWidth}} className={`ActionPopupInner ${enableScreenHeight ? " fixedheight " : " "}`}>
                  {children}
                  <div className="group-btn">
                    {enableActionButton && (
                      <>
                        {!customActionComponent ? (
                          <button
                            type="button"
                            data-auto="action_button"
                            className={` Btn outline  ${
                              btnBlue ? " blue " : " delete "
                            } `}
                            data-jest-id={"jestProceedDelete"}
                            onClick={(e) => {
                              e.target.blur();
                              handleAction();
                            }}
                          >
                            {textActionButton}
                          </button>
                        ) : (
                          customActionComponent
                        )}
                      </>
                    )}
                    {enableCancelButton && (
                      <button
                        className="Btn outline"
                        data-jest-id={"jestCancelDelete"}
                        onClick={(e) => {
                          e.target.blur();
                          handleClose(false);
                        }}
                      >
                        {textCancelButton}
                      </button>
                    )}
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
export default React.memo(ActionCommonPopup);
