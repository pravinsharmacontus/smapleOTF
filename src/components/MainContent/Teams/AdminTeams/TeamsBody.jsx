import React from "react";
import { Cell, Row } from "react-sticky-table";
import { momentUTCtoIST, titleToast } from "../../../../helper";
import { convertToLowerCase } from "../../../../helper/Validation";
import { tableWidthController } from "../../../../helper/TableWidthController";
import { DefaultValueDeclaration } from "../../../../const/DefaultValueDeclaration";
import { useTranslation } from "react-i18next";
import { IconDeleteType4, IconEditType4 } from "../../../../assets/images";

const TeamsBody = (props = {}) => {
  const { getTeams = [], getTeamsShow = false, _handleMemberEdit = () => { },
    handleSingleCheckboxChangeTeams = () => { }, //Handle single user select and unSelect
    _handleMemberDelete = () => { }, animateShow = false
  } = props;

  const handleRoleId = (ele) => {
    if (ele?.userRoleId === 1) {
      return "Owner";
    } else if (ele?.userRoleId === 2) {
      return "Admin";
    } else if (ele?.userRoleId === 3) {
      return "Cohost";
    } else if (ele?.userRoleId === 4) {
      return "Super Admin";
    } else if (ele?.userRoleId === 5) {
      return "Admin";
    } else {
      return "";
    }
  };

  const loginDetail = window.localStorage.getItem("userDetails")
    ? JSON.parse(window.localStorage.getItem("userDetails"))
    : {};
  const { data: { userRoleId = "" } = {} } = loginDetail;
  const { t } = useTranslation();
  const temphide = false;

  return (
    <>{getTeams.length > 0 ?
      <>
        {getTeamsShow && animateShow &&
          getTeams.map((ele, index) => {
            return (
              <React.Fragment
                key={convertToLowerCase(index + "idMemberAdded-sj")}
              >
                {(userRoleId !== 4 && userRoleId !== 5) ? (
                  <Row>
                    <Cell className="TM resetCell"></Cell>
                    <Cell style={{ width: "40%" }} className="TM">
                      <div className="layout_container">
                        <span title={ele?.fullName === ""
                          ? ele.emailId.split("@")[0]
                          : ele?.fullName} className="overflow_200px">
                          {ele?.fullName === ""
                            ? ele.emailId.split("@")[0]
                            : ele?.fullName}
                        </span>
                        <span className="invited_info ">
                          {ele?.isActive === 0 ? "Invited" : ""}
                        </span>
                      </div>
                    </Cell>
                    <Cell style={{ width: "40%" }} className="CT Email">
                      <div className="emailVerify">
                        <div className="ellipsisCustom">
                          <div
                            className="ellipsis"
                            style={{ maxWidth: "calc(100%)" }}
                          >
                            {titleToast(
                              ele?.emailId,
                              DefaultValueDeclaration.EmailLength
                            )}
                          </div>
                        </div>
                      </div>
                    </Cell>
                    <Cell style={{ width: "20%" }} className="TM role">
                      {handleRoleId(ele)}
                    </Cell>
                    <Cell className="TM resetCell"></Cell>
                  </Row>
                ) : (
                  <>
                    {
                      (<Row>
                        <Cell className="TM resetCell" ></Cell>
                        {temphide && (
                        <Cell className="TM">
                          <div
                            style={{
                              opacity: ele?.callStatus === "on-live" ? 0.5 : 1,
                              cursor: "default",
                            }}
                            className="checkbox-custom new"
                          >
                            <input
                              type="checkbox"
                              id={`savecard-${index}`}
                              defaultValue={false}
                              checked={ele.isCheck === true}
                              onChange={() => { handleSingleCheckboxChangeTeams(index); }}
                            />
                            <label
                              style={{
                                opacity: ele?.callStatus === "on-live" ? 0.5 : 1,
                                cursor: "default",
                              }}
                              htmlFor={`savecard-${index}`}
                            ></label>
                          </div>
                        </Cell>
                        )}
                        <Cell style={{ width: "20%" }} className="TM" >
                          <div className="layout_container">
                            <div title={ele.fullName} className="overflow_200px">
                              {ele.fullName}
                            </div>
                          </div>
                        </Cell>
                        <Cell style={{ width: "20%" }} className="CT Email">
                          <div className="emailVerify">
                            <div className="ellipsisCustom">
                              <div
                                className="ellipsis"
                                style={{ maxWidth: "calc(100%)" }}
                              >
                                <div title={ele?.emailId} className="overflow_200px">
                                  {titleToast(
                                    ele?.emailId,
                                    DefaultValueDeclaration.EmailLength
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Cell>
                        <Cell style={{ width: "20%" }} className="TM Mobile">
                          +{ele.countryCode} {ele.phoneNumber}
                        </Cell>
                        <Cell style={{ width: "15%" }} className="TM Role">
                          {handleRoleId(ele)}
                        </Cell>
                        <Cell style={{ width: "10%" }} className="TM Status">
                          {ele.isActive === 1 ?
                            <span className="positive">
                              {t("TABLE.ACTIVE")}
                            </span> :
                            <span className="negative">
                              {t("TABLE.INACTIVE")}
                            </span>
                          }
                        </Cell>
                        <Cell style={{ width: "10%" }} className="TM">
                          {momentUTCtoIST(ele.createdAt)}
                        </Cell>
                        {temphide && (
                          <Cell className="TM Action">
                            <div className="btn-grp">
                              <button
                                type="button"
                                className="cp-btn-icon blue rounded"
                                title={t("COMMON.EDIT")}
                                data-jest-id={"jesteditCusAction"}
                                onClick={() => _handleMemberEdit(ele)}
                              >
                                <i>
                                  <IconEditType4 />
                                </i>
                              </button>
                              <button
                                type="button"
                                className={`cp-btn-icon red rounded`}
                                title={t("COMMON.DELETE")}
                                data-jest-id={"jestcusDelete"}
                                onClick={() => _handleMemberDelete(ele, "singleDelete")}
                              >
                                <i>
                                  <IconDeleteType4 />
                                </i>
                              </button>
                            </div>
                          </Cell>
                         )}
                        <Cell className="TM resetCell"></Cell>
                      </Row>)
                    }
                  </>
                )}
              </React.Fragment>
            );
          })}
      </> : <>
        {animateShow && <div className="absolute-center">
          {"No Member Found"}
        </div>}
      </>
    }
      {tableWidthController("memberTable")}
    </>
  );
};
export default React.memo(TeamsBody);
