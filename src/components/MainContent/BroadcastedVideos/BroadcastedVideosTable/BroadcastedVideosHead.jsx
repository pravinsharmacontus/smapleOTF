import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Cell } from "react-sticky-table";

const BroadcastedVideosHead = () => {

  const { t } = useTranslation();

  return (
    <Row>
      <Cell className="TM resetCell"></Cell>
      <Cell style={{ width: "70%" }} className="TM ">
        {t("TABLE.TITLE")}
      </Cell>
      <Cell style={{ width: "30%" }} className="TM ">
        {t("TABLE.CREATED_ON")}
      </Cell>
      {/* <Cell className="TM text-center Action">
        {t("TABLE.ACTION")}
      </Cell> */}
      <Cell className="TM resetCell"></Cell>
    </Row>
  );
};
export default React.memo(BroadcastedVideosHead);
