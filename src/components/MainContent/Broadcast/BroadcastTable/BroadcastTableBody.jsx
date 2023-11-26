import React from "react";
import Lottie from "lottie-react";
import Badge from "../../../../common/Badge";
import { useTranslation } from "react-i18next";
import { Cell, Row } from "react-sticky-table";
import {
  convertToLowerCase,
  replaceSpacesWithNonbreakSpace,
} from "../../../../helper/Validation";
import { IconDeleteType4, IconEditType4 } from "../../../../assets/images";
import { IconAdduser, IconShare, LottieCallendar, LottiePlus } from "../../../../assets/img";
import { tableWidthController } from "../../../../helper/TableWidthController";
import { momentUTCtoISTWithComma } from "../../../../helper";
import Bubbles from "../../../../common/Bubbles";
import { convertMilliSecToHrandSec, dateStampToDate, isAllowJoin } from "../../../../helper/utility";
import { Link } from 'react-router-dom';

const BroadcastTableBody = (props = {}) => {
  const tempHide = false;
  const {
    loading = false,
    tabParent = "",
    handleDelete = () => { },
    handleMemberEdit = () => { },
    handleJoinMeeting = () => { },
    sessionInfo = [],
    handleSingleCheckboxChange = () => { }, //Handle single user select and unSelect
    userRoleId,
  } = props;
  const { t } = useTranslation();
  const handleTabSize = (tabParentType = "") => {
    if (tabParentType === "Past") {
      return "30%";
    } else {
      return "40%";
    }
  };
  return (
    <>
      {sessionInfo.length > 0 && loading ? (
        <>
          {sessionInfo?.map((ele, index) => {
            const schedule = !isAllowJoin(ele?.scheduledTime) && ele?.callStatus !== "ended" && ele?.callStatus !== "timeout";
            return (
              <React.Fragment
                key={convertToLowerCase(index + "idMemberAdded-sj")}
              >
                <Row>
                  <Cell className="TM resetCell"></Cell>
                  {userRoleId !== 3 ? (<Cell className="TM">
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
                        checked={
                          ele?.callStatus === "on-live"
                            ? false
                            : ele.isCheck === true
                        }
                        onChange={() => {
                          ele?.callStatus !== "on-live" &&
                            handleSingleCheckboxChange(index);
                        }}
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
                  ) : null}
                  <Cell style={{ width: userRoleId === 3 ? handleTabSize(tabParent) : "25%" }} className="TM">
                    <div className="flex item-center onlive_wraper">
                      {ele?.callStatus === "on-live" && (
                        <Lottie
                          style={{
                            width: "40px",
                            height: "40px",
                          }}
                          className="icon_animate"
                          animationData={LottiePlus}
                          loop={true}
                        />
                      )}
                      {schedule && (
                        <Lottie
                          style={{
                            width: "26px",
                            height: "26px",
                          }}
                          className="icon_animate LottieCallendar"
                          animationData={LottieCallendar}
                          loop={true}
                        />
                      )}
                      <div
                        title={ele?.sessionName}
                        className="onlive_action overflow_200px"
                      >
                        {replaceSpacesWithNonbreakSpace(ele?.sessionName)}
                      </div>
                      {console.log(ele?.callStatus, "callStatus")}
                      {!isAllowJoin(ele?.scheduledTime) && ele?.callStatus !== "ended" &&
                        ele?.callStatus !== "timeout" && (
                          <Badge
                            text={
                              ele?.callStatus === ""
                                ? "Scheduled"
                                : ele?.callStatus
                            }
                            color={ele?.callStatus === "" ? "#7E8299" : "#FF0935"}
                            className={"badge_onlive badge_medium rounded "}
                            bgColor={ele?.callStatus === "" ? "#f5f5f5" : "rgba(255, 9, 53, .12)"}
                          />
                        )}
                      {ele?.callStatus === "on-live" && (
                        <Badge
                          text={
                            "on-live"
                          }
                          color={"#FF0935"}
                          className={"badge_onlive badge_medium rounded "}
                          bgColor={"rgba(255, 9, 53, .12)"}
                        />
                      )}
                    </div>
                  </Cell>
                  {tempHide && (
                    <Cell className="TM date">
                      <Bubbles />
                    </Cell>
                  )}
                  <Cell className="TM date">
                    {momentUTCtoISTWithComma(ele?.createdAt)}
                  </Cell>
                  {tabParent !== "Past" && <Cell className="TM date">
                    {ele?.scheduledTime ? momentUTCtoISTWithComma(dateStampToDate(ele?.scheduledTime)) : "-"}
                  </Cell>}

                  {tabParent === "Past" ?
                    <>
                      <Cell style={{ width: "20%" }} className="TM date">
                        {ele.duration === "" || ele.duration === "0" ? "0m" : convertMilliSecToHrandSec(ele.duration)}
                      </Cell>
                      <Cell className="TM date">
                        {ele.recordingPath !== null ?
                          <Link to={`/videos?orgId=${ele?.orgId}&channleArn=${ele?.channelDetails?.channelArn}`}
                            className={`action_join`}
                          >
                            Recording
                          </Link>
                          : <div
                            className={`action_join disable`}
                          >
                            Recording
                          </div>}
                      </Cell>
                    </>
                    :
                    <Cell style={{ width: "20%" }} className="TM Action">
                      <div className="btn-grp">
                        <button
                          className={`action_join ${!isAllowJoin(ele?.scheduledTime) ? " disable " : "  "
                            }`}
                          type="button"
                          // className="cp-btn-icon blue rounded"
                          // title={t("Share")}
                          // data-jest-id={"jesteditCusAction"}
                          onClick={
                            !isAllowJoin(ele?.scheduledTime)
                              ? () => { }
                              : () => handleJoinMeeting(ele)
                          }
                        >
                          {" "}
                          {ele?.callStatus === "completed"
                            ? "Completed"
                            : "Join"}
                        </button>
                      </div>
                    </Cell>
                  }
                  {userRoleId !== 3 ? (
                    <Cell className="TM Action">
                      <div className="btn-grp">
                        {(
                          <>
                            {tempHide && <button
                              type="button"
                              className="cp-btn-icon blue rounded"
                              title={t("Share")}
                              data-jest-id={"jesteditCusAction"}
                              onClick={() => handleMemberEdit(ele)}
                            >
                              <i>
                                <IconShare />
                              </i>
                            </button>}
                            {tabParent !== "Past" &&
                              <button
                                type="button"
                                className={`${ele?.scheduledTime && ele?.hostId === 0 ? "cp-btn-icon blue rounded" : "cp-btn-icon rounded cursor-default disabled"}`}
                                title={t("COMMON.EDIT")}
                                data-jest-id={"jesteditCusAction"}
                                onClick={() => ele?.scheduledTime && ele?.hostId === 0 && handleMemberEdit(ele)}
                              >
                                <i>
                                  <IconEditType4 />
                                </i>
                              </button>
                            }
                            {tempHide && (
                              <button
                                type="button"
                                className="cp-btn-icon blue rounded"
                                title={t("COMMON.EDIT")}
                                data-jest-id={"jesteditCusAction"}
                                onClick={() => handleMemberEdit(ele)}
                              >
                                <i>
                                  <IconAdduser />
                                </i>
                              </button>
                            )}
                          </>
                        )}
                        <button
                          type="button"
                          style={{
                            opacity: ele?.callStatus === "on-live" ? 0.6 : 1,
                          }}
                          className={` ${ele?.callStatus === "on-live"
                            ? " _disabled_btn "
                            : " "
                            }  cp-btn-icon red rounded`}
                          title={t("COMMON.DELETE")}
                          data-jest-id={"jestcusDelete"}
                          onClick={() => {
                            ele?.callStatus !== "on-live" &&
                              handleDelete(ele, "singleDelete");
                          }}
                        >
                          <i>
                            <IconDeleteType4 />
                          </i>
                        </button>
                      </div>
                    </Cell>
                  ) : null}
                  <Cell className="TM resetCell"></Cell>
                </Row>
              </React.Fragment>
            );
          })}
        </>
      ) : null
      }
      {tableWidthController("memberTable")}
    </>
  );
};
export default React.memo(BroadcastTableBody);
