import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Cell } from "react-sticky-table";

const CustomerHead = () => {

  const { t } = useTranslation();

  return (
    <Row>
      <Cell className="TM resetCell"></Cell>
      <Cell style={{ width: "20%" }} className="TM">
        {t("TABLE.ORGANISATION_NAME_ONE")}
      </Cell>
      <Cell style={{ width: "15%" }} className="TM">
        {t("TABLE.User_NAME")}
      </Cell>
      <Cell style={{ width: "15%" }} className="TM">
        {t("TABLE.EMAIL")}
      </Cell>
      <Cell style={{ width: "15%" }} className="TM">
        {t("TABLE.PHONE")}
      </Cell>
      <Cell style={{ width: "10%" }} className="TM">
        No. of Broadcast
      </Cell>
      <Cell style={{ width: "15%" }} className="TM">
        {t("TABLE.CREATED_ON")}
      </Cell>
      {<Cell style={{ width: "10%" }} className="TM">
        {t("TABLE.STATUS")}
      </Cell>}
      <Cell className="TM resetCell"></Cell>
    </Row>
  );
};
export default React.memo(CustomerHead);
