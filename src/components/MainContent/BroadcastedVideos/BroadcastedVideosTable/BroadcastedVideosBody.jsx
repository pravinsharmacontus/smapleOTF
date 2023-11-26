import React, { useEffect } from "react";
import { Cell, Row } from "react-sticky-table";
import { useTranslation } from "react-i18next";
import { convertToLowerCase } from "../../../../helper/Validation";
import { IconDeleteType4, IconEditType4, ImgNoImgPlaceholderLg } from "../../../../assets/images";
import { tableWidthController } from "../../../../helper/TableWidthController";
import { IconDownloadLite, IconShare } from "../../../../assets/img";
import { momentUTCtoISTWithComma } from "../../../../helper";
import Image from "../../../../common/Image";
import { validateUnderscore } from "../../../../common/helper";
import store from "../../../../store";
import { Link } from 'react-router-dom';

const BroadcastedVideosBody = (_props) => {
  const tempHide = false;
  const { t } = useTranslation();
  const { handleVideoEdit = () => { }, handleVideoShare = () => { },
    handleVideoDownload = () => { }, handleVideoDelete = () => { }, loading = false } = _props;
  const videoList = store.getState()?.videoTableListReducer?.videoTable?.data?.recordedChannels;
  const currentOrgId = window.localStorage.getItem("currntOrgid")
    ? JSON.parse(window.localStorage.getItem("currntOrgid"))
    : {};

  useEffect(() => {
    // Perform other actions with the filtered `getTeams` array if needed
  }, [currentOrgId]);

  return (
    <>
      {videoList?.length > 0 && loading &&
        videoList.map((ele, index) => {
          return (
            <React.Fragment
              key={convertToLowerCase(index + "idMemberAdded-sj")}
            >
              <Row>
                <Cell className="TM resetCell"></Cell>
                <Cell style={{ width: "70%" }} className="TM">
                  <div className="video_info">
                    <div className="video_info_vdo">
                      <Image
                        style={{ width: '76px', height: "46px" }} src={ele?.thumbnail || ImgNoImgPlaceholderLg} width='76px' height="46px" alt={ele.channelName} />
                      {ele.videosCount > 0 ? <span className="video_count">{ele?.videosCount}</span> : null}
                    </div>
                    <div className="video_info_data">
                      <Link to={`/videos?orgId=${ele?.orgId}&channleArn=${ele?.channleArn}`}
                        title={validateUnderscore(ele?.channelName)} className="link2" >{validateUnderscore(ele?.channelName)}</Link>
                      {ele.videosCount > 0 ? <span className="video_list">{`${ele?.videosCount} ${ele.videosCount > 1 ? "Videos" : "Video"}`}</span> : null}
                    </div>
                  </div></Cell>
                <Cell  style={{ width: "30%" }} className="TM date">{momentUTCtoISTWithComma(ele.createdAt)}</Cell>
                {tempHide && (<Cell className="TM Action">
                  <div className="btn-grp">
                    <button
                      type="button"
                      className="cp-btn-icon blue rounded"
                      title={t("COMMON.SHARE")}
                      data-jest-id={"jesteditCusAction"}
                      onClick={() => handleVideoShare(ele)}
                    >
                      <i>
                        <IconShare />
                      </i>
                    </button>
                    <button
                      type="button"
                      className="cp-btn-icon blue rounded"
                      title={t("COMMON.DOWNLOAD")}
                      data-jest-id={"jesteditCusAction"}
                      onClick={() => handleVideoDownload(ele)}
                    >
                      <i>
                        <IconDownloadLite style={{ width: "18px", height: "18px" }} />
                      </i>
                    </button>
                    {tempHide && <button
                      type="button"
                      className="cp-btn-icon blue rounded"
                      title={t("COMMON.EDIT")}
                      data-jest-id={"jesteditCusAction"}
                      onClick={() => handleVideoEdit(ele)}
                    >
                      <i>
                        <IconEditType4 />
                      </i>
                    </button>}
                    <button
                      type="button"
                      className="cp-btn-icon red rounded"
                      title={t("COMMON.DELETE")}
                      data-jest-id={"jestcusDelete"}
                      onClick={() => handleVideoDelete(ele)}
                    >
                      <i>
                        <IconDeleteType4 />
                      </i>
                    </button>
                  </div>
                </Cell>)}
                <Cell className="TM resetCell"></Cell>
              </Row>
            </React.Fragment>
          );
        })}
      {tableWidthController("memberTable")}
    </>
  );
};
export default React.memo(BroadcastedVideosBody);
