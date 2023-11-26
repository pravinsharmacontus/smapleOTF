import React from "react";
import { Row } from "react-sticky-table";
import { useTranslation } from "react-i18next";
import TableCell from "../../../../common/DataTable/TableCell";
import TableCheckHeader from "../../../../common/DataTable/TableCheckHeader";

const TeamsHead = (props = {}) => {
  const { checked = false,
    deleteItem = [], //delete item count
    allCheckData, //all checkBox click function
    bulkDeleteCusData
  } = props;

  const loginDetail = window.localStorage.getItem("userDetails")
    ? JSON.parse(window.localStorage.getItem("userDetails"))
    : {};
  const { data: { userRoleId = "" } = {} } = loginDetail;
  const { t } = useTranslation();
  const tempHide = false;
  return (
    <>
      {
        (userRoleId !== 4 && userRoleId !== 5) ? (
          <Row>
            <TableCell className="TM resetCell"></TableCell>
            <TableCell width="40%" className="TM ">
              {t("TABLE.MEMBER")}
            </TableCell>
            <TableCell width="40%" className="TM ">
              {t("TABLE.EMAIL")}
            </TableCell>
            <TableCell width="20%" className="TM ">
              {t("TABLE.ROLE")}
            </TableCell>
            <TableCell className="TM resetCell"></TableCell>
          </Row>
        ) : (
          <Row>
            <TableCell className="TM resetCell"></TableCell>
            {tempHide && <TableCell className="TM chkBox">
              <TableCheckHeader
                checked={checked} //allSelect click action
                deleteItem={deleteItem} //deSelected and selected Item
                allCheckData={allCheckData} //allCheck click action
                bulkDeleteCusData={bulkDeleteCusData} //bulk delete button
              />
            </TableCell>}
            <TableCell width="20%" className="TM ">
              {t("TABLE.MEMBER")}
            </TableCell>
            <TableCell width="20%" className="TM ">
              {t("TABLE.EMAIL")}
            </TableCell>
            <TableCell width="20%" className="TM ">
              {t("TABLE.PHONE")}
            </TableCell>
            <TableCell width="15%" className="TM ">
              {t("TABLE.ROLE")}
            </TableCell>
            <TableCell width="10%" className="TM ">
              {t("TABLE.STATUS")}
            </TableCell>
            <TableCell width="10%" className="TM ">
              {t("TABLE.CREATED_DATE")}
            </TableCell>
            {tempHide && <TableCell className="TM text-center Action">Action</TableCell>}
            <TableCell className="TM resetCell"></TableCell>
          </Row>)
      }
    </>);
};
export default React.memo(TeamsHead);
