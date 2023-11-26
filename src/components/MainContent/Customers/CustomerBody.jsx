import { Cell, Row } from "react-sticky-table";
import { convertToLowerCase } from "../../../helper/Validation";
import { tableWidthController } from "../../../helper/TableWidthController";
import { useSelector } from "react-redux";
import React, { } from "react";
import Loader from "../../../common/Loader";
import { momentUTCtoISTWithComma } from "../../../helper";
import { Link } from 'react-router-dom';

const CustomerBody = (props = {}) => {
  const { isLoading = false, handleBroadcastCountInDetail = () => { }, loading = false } = props;
  const customerListData = useSelector((state) => state?.customerListReducer?.customerList) || {};
  return (
    <>
      {customerListData.length > 0 && loading ?
        <>
          {customerListData.map((ele, index) => {
            const { organisationName = "", userName = '', userEmail = '', mobileNumber = '', createdAt = '', status = 0, totalBroadcast = 0, countryCode = "" } = ele;
            return (
              <React.Fragment
                key={convertToLowerCase(index + "idMemberAdded-sj")}
              >
                <Row>
                  <Cell className="TM resetCell"></Cell>
                  <Cell style={{ width: "20%" }} className="TM Email">
                    <div className="emailVerify">
                      <div
                        className="ellipsis"
                        style={{ maxWidth: "calc(100%)" }}
                      >
                        <span className="company_name_"> {organisationName}</span>
                      </div>
                    </div>
                  </Cell>
                  <Cell style={{ width: "15%" }} className="TM Email">
                    <div className="emailVerify">
                      <div
                        className="ellipsis"
                        style={{ maxWidth: "calc(100%)" }}
                      >
                        <span> {userName}</span>
                      </div>
                    </div>
                  </Cell>
                  <Cell style={{ width: "15%" }} className="TM Email">
                    <div className="emailVerify">
                      <div
                        className="ellipsis"
                        style={{ maxWidth: "calc(100%)" }}
                      >
                        <span>{userEmail}</span>
                      </div>
                    </div>
                  </Cell>
                  <Cell style={{ width: "15%" }} className="TM phone">
                    <div className="layout_container">
                      <span>{'+' + countryCode} {mobileNumber}</span>
                      {/* <span>{mobileNumber}</span> */}
                    </div>
                  </Cell>
                  <Cell style={{ width: "10%" }} className="TM">
                    <Link className="link2" to={`/no-of-broadcasts?id=${ele.orgId}`} onClick={() => handleBroadcastCountInDetail(ele)}>{totalBroadcast}</Link>
                  </Cell>
                  <Cell style={{ width: "10%" }} className="TM created_on">
                    <div className="layout_container">
                      <span>{momentUTCtoISTWithComma(createdAt)}</span>
                    </div>
                  </Cell>
                  <Cell style={{ width: "10%" }} className="TM status">
                    <div className="layout_container">
                      {status === 1 ? <span className="active">Active</span>
                        : <span className="inactive">Inactive</span>}
                    </div>
                  </Cell>
                  <Cell className="TM resetCell"></Cell>
                </Row>
              </React.Fragment>
            );
          })
          }
        </>
        : <>
          {loading ? <div className="absolute-center">
            {"No Customer Found"}
          </div> : null
          }
        </>
    }
      {tableWidthController("memberTable")}
      {isLoading ? <Loader type={"fixed overlay"} /> : null}
    </>
  );
};
export default React.memo(CustomerBody);
