import { Cell, Row } from "react-sticky-table";
import { convertToLowerCase } from "../../../helper/Validation";
import { tableWidthController } from "../../../helper/TableWidthController";
import React, { } from "react";
import Loader from "../../../common/Loader";
import { momentUTCtoISTWithComma } from "../../../helper";
import { ConvertMillsecToMin } from "../../../helper/utility";

const NoOfBroadcastsBody = (props = {}) => {
  const { isLoading = false, broadcastCountListData = [] } = props;
  const handleRoleId = (userRoleId) => {
    if (userRoleId === 1) {
      return "Owner";
    } else if (userRoleId === 2) {
      return "Admin";
    } else if (userRoleId === 3) {
      return "Cohost";
    } else if (userRoleId === 4) {
      return "Super Admin";
    } else if (userRoleId === 5) {
      return "Admin";
    } else {
      return "";
    }
  };
  return (
    <>
      {broadcastCountListData.length > 0 ?
        <>
          {broadcastCountListData.map((ele, index) => {
            const { userName = '', createAt = '', status = '', userRoleId = 0, totalParticipants = 0, duration = "0m" } = ele;
            return (
              <React.Fragment
                key={convertToLowerCase(index + "idMemberAdded-sj")}
              >
                <Row>
                  <Cell className="TM resetCell"></Cell>
                  <Cell className="TM Email">
                    <div className="emailVerify">
                      <div
                        className="ellipsis"
                        style={{ maxWidth: "calc(100%)" }}
                      >
                        <span> {userName}</span>
                      </div>
                    </div>
                  </Cell>
                  <Cell className="TM created_on">
                    <div className="layout_container">
                      <span>{handleRoleId(userRoleId)}</span>
                    </div>
                  </Cell>
                  <Cell className="TM created_on">
                    <div className="layout_container">
                      <span>{momentUTCtoISTWithComma(createAt)}</span>
                    </div>
                  </Cell>
                  <Cell className="TM created_on">
                    <div className="layout_container">
                      <span>{(duration === "") ? "0 Mins" : `${ConvertMillsecToMin(duration)} Mins`}</span>
                    </div>
                  </Cell>
                  <Cell className="TM created_on">
                    <div className="layout_container">
                      <span>{totalParticipants}</span>
                    </div>
                  </Cell>
                  <Cell className="TM status">
                    <div className="layout_container">
                      {status === 1 ? <span className="active">Yes</span>
                        : <span className="inactive">No</span>}
                    </div>
                  </Cell>
                  <Cell className="TM resetCell"></Cell>
                </Row>
              </React.Fragment>
            );
          })
          }
        </>
        :
        <div className="absolute-center">
          {"No Broadcast Found"}
        </div>
      }
      {tableWidthController("memberTable")}
      {isLoading ? <Loader type={"fixed overlay"} /> : null}
    </>
  );
};
export default React.memo(NoOfBroadcastsBody);
