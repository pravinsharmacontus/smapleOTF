import React from "react";
import SubTitle from "../SubTitle";

const TeamsSubHeader = (props = {}) => {
  const { memberPopupOpen = () => { }, children = "" } = props;
  return (
    <React.Fragment>
        <SubTitle
          icon={"Teams"}
          title={"Customers"}
          _actionButton2={() => memberPopupOpen(true)}
        >
          {children}
        </SubTitle>
    </React.Fragment>
  );
};
export default React.memo(TeamsSubHeader);
