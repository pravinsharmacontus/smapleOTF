import React, { useState } from "react";
import _get from "lodash/get";
import { pagesizeData } from "../MonckDataJson";
import { IconDropdownCc } from "../../assets/images";
import OutsideClickHandler from "react-outside-click-handler";

const PageSize = (props = {}) => {
  const {
    pageSize = 10,
    onChange = () => { }, //click function
  } = props;
  const [dropOpen, setDropOpen] = useState(false);

  /**
   * @param  {object} event
   * per Page Data showing row render count
   * Default RowCount is 10
   */
  const _handleSelect = (event = {}) => {
    const { value = 10 } = _get(event, "target", {});
    if (pageSize !== value) {
      onChange({
        target: {
          name: "size",
          value: value,
        },
      });
    }
  };
  const _handleOnOutside = () => {
    setDropOpen(false);
  };

  const openSizedropwn = () => {
    setDropOpen(true);
  };
  return (
    <React.Fragment>
      <label className={` custom-dropdown PageSize ${dropOpen ? "open" : ""} `} onClick={dropOpen ? () => _handleOnOutside() : () => openSizedropwn()}>
        <span className="custom-select">{pageSize}</span>
        <OutsideClickHandler
          onOutsideClick={dropOpen ? () => _handleOnOutside() : () => { }}
        >
          <ul>
            {pagesizeData.map((element, ind) => (
              <li
                value={element.size}
                key={element.size}
                onClick={(e) => _handleSelect(e)}
              >
                {element.size}
              </li>
            ))}
          </ul>
        </OutsideClickHandler>
        <i style={{ transform: dropOpen ? "rotate(180deg)" : "" }} className="dropIcon">
          <IconDropdownCc />
        </i>
      </label>
    </React.Fragment>
  );
};
export default React.memo(PageSize);
