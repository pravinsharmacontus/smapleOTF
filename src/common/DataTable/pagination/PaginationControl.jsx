import React from "react";
import propTypes from "prop-types";
import Ripples from "react-ripples";
import { useTranslation } from "react-i18next";
import { IconPageNext, IconPagePrev } from "./assets";
import { convertToLowerCase } from "../../../helper/Validation";

const PaginationControl = (props = {}) => {
  const {
    pager = {},
    bottomDetails = {},
    buttonPress = () => { }, //click
  } = props;
  const { t } = useTranslation();
  const { totalPages = 0 } = bottomDetails;

  console.log(bottomDetails, "boasdttomDetails");

  console.log(bottomDetails, "bottomDetailsas");
  console.log(pager, "asdpagerasda");

  return (
    <ul className="pagination">
      <li
        style={{ display: `${pager.currentPage === 1 ? "none" : ""}` }}
        className={pager.currentPage === 1 ? "pageDisabled" : ""}
      >
        <Ripples onClick={() => buttonPress(pager.currentPage - 1)}>
          <i onClick={() => buttonPress(pager.currentPage - 1)}>
            <IconPagePrev />
          </i>
          <span
            id="jestPreviousButton"
            onClick={() => buttonPress(pager.currentPage - 1)}
          >
            {t("COMMON.PREVIOUS")}
          </span>
        </Ripples>
      </li>
      <li
        style={{ display: `${pager.currentPage === 1 ? "none" : ""}` }}
        className="outOf first"
      ></li>

      {(pager.pages || []).map((page, index) => (
        <li
          onClick={() => buttonPress(page)}
          key={convertToLowerCase(index + "pager-pages-jsdh")}
          className={pager.currentPage === page ? "active" : ""}
        >
          <Ripples onClick={() => buttonPress(page)}>
            <span>{page}</span>
          </Ripples>
        </li>
      ))}

      <li
        style={{
          borderColor: `${pager.currentPage === pager.totalPages ? " transparent " : ""
            }`,
          cursor: "default",
        }}
        className="outOf last"
      >
        <div>
          <span>Out of</span>
          <strong>{totalPages}</strong>
        </div>
      </li>

      <li
        style={{
          display: `${pager.currentPage === pager.totalPages ? " none" : ""}`,
        }}
        onClick={() => buttonPress(pager.currentPage + 1)}
        className={
          pager.currentPage === pager.totalPages ? " pageDisabled " : ""
        }
      >
        <Ripples onClick={() => buttonPress(pager.currentPage + 1)}>
          <span id="jestNextButton">{t("COMMON.NEXT")}</span>
          <i onClick={() => buttonPress(pager.currentPage + 1)}>
            <IconPageNext />
          </i>
        </Ripples>
      </li>
    </ul>
  );
};
PaginationControl.propTypes = {
  pager: propTypes.object,
  buttonPress: propTypes.func, //click
};
export default React.memo(PaginationControl);
