import React from "react";
import { CSSTransition } from "react-transition-group";

const DynamicDropList = (props = {}) => {
  const {
    name = "",
    DropDown = false,
    dropDownData = [],
    valueLoad = "value",
    selectorKey = "optionData",
    _handleSelect = () => { }, //click,
  } = props;

  return (
    <CSSTransition
      in={DropDown}
      timeout={500}
      unmountOnExit
      classNames="fadeInUp"
    >
      <div>
        <ul>
          {(dropDownData).map((item) => {
            return (
              <li
                key={item.id}
                name={name}
                value={item[valueLoad]}
                data-value={item[selectorKey]}
                onClick={(event) => _handleSelect(event)}
              >
                {item[selectorKey]}
              </li>
            );
          })}
        </ul>
      </div>
    </CSSTransition>
  );
};
export default React.memo(DynamicDropList);
