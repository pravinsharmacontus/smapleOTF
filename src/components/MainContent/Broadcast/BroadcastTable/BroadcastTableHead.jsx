import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Cell } from "react-sticky-table";
import TableCheckHeader from "../../../../common/DataTable/TableCheckHeader";

const BroadcastTableHead = (props = {}) => {
  const {
    tabParent = "",
    allCheckData, //all checkBox click function
    deleteItem = [], //delete item count
    checked = false, // all checkBox boolean
    bulkDeleteCusData, //bulkDelete option click
    userRoleId,
  } = props;

  const { t } = useTranslation();
  return (
    <>
      {tabParent === "Past" ?
        <Row>
          <Cell className="TM resetCell"></Cell>
          {userRoleId !== 3 ?
            <Cell className="TM chkBox">
              <TableCheckHeader
                checked={checked} //allSelect click action
                deleteItem={deleteItem} //deSelected and selected Item
                allCheckData={allCheckData} //allCheck click action
                bulkDeleteCusData={bulkDeleteCusData} //bulk delete button
              />
            </Cell>
            : null}
          <Cell style={{ width: userRoleId === 3 ? "30%" : "25%" }} className="TM ">
            {t("TABLE.Title")}
          </Cell>
          <Cell style={{ width: userRoleId === 3 ? "30%" : "25%" }} className="TM ">
            {t("TABLE.CREATED_ON")}
          </Cell>
          <Cell style={{ width: "20%" }} className="TM ">
            Duration
          </Cell>
          <Cell className="TM resetCell" style={{ width: "10%" }}></Cell>
          {userRoleId !== 3 ? <Cell style={{ width: "25%" }} className="TM text-center Action">
            Action
          </Cell> : null}
          <Cell className="TM resetCell"></Cell>
        </Row>
        :
        <Row>
          <Cell className="TM resetCell"></Cell>
          {userRoleId !== 3 ?
            <Cell className="TM chkBox">
              <TableCheckHeader
                checked={checked} //allSelect click action
                deleteItem={deleteItem} //deSelected and selected Item
                allCheckData={allCheckData} //allCheck click action
                bulkDeleteCusData={bulkDeleteCusData} //bulk delete button
              />
            </Cell>
            : null}
          <Cell style={{ width: userRoleId === 3 ? "40%" : "30%" }} className="TM ">
            {t("TABLE.Title")}
          </Cell>
          {/* <Cell className="TM ">
      {t("TABLE.MEMBERS")}
    </Cell> */}
          <Cell style={{ width: userRoleId === 3 ? "40%" : "30%" }} className="TM ">
            {t("TABLE.CREATED_ON")}
          </Cell>
          { <Cell className="TM ">
            {t("Scheduled On")}
          </Cell>}
          {userRoleId !== 3 ? <Cell style={{ width: "20%" }} className="TM text-center Action">
          </Cell> : null}
          <Cell style={{ width: "20%" }} className="TM text-center Action">
            {userRoleId !== 3 ? t("TABLE.ACTION") : null}
          </Cell>
          <Cell className="TM resetCell"></Cell>
        </Row>
      }
    </>
  );
};
export default React.memo(BroadcastTableHead);
