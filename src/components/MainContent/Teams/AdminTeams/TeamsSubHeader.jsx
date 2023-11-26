import React from "react";
import SubTitle from "../../SubTitle";
import { useTranslation } from "react-i18next";

const TeamsSubHeader = (props = {}) => {
  const { memberPopupOpen = () => { }, children = "" } = props;
  const { t } = useTranslation();
  return (
    <React.Fragment>
        <SubTitle
          icon={"Teams"}
          actionIcon2={"IconAddUser"}
          actionButton2={"Add Member"}
          title={t("PAGE_HEADING.TEAMS")}
          _actionButton2={() => memberPopupOpen(true)}
        >
          {children}
        </SubTitle>
        {/* : <SubTitle
          icon={"Teams"}
          title={t("PAGE_HEADING.TEAMS")}
        > {children}
        </SubTitle> */}

    </React.Fragment>
  );
};
export default React.memo(TeamsSubHeader);
