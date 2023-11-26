import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import ReactCropper from "./ReactCropper";
import TrailUserLogoUpdata from "../TrailUserLogoUpdata";
import { getStageData } from "../../../../../aws/awsHelper";
import { mirrorflyDefault } from "../../../../../assets/img";
import { IconClose, ImgLoaderBlue } from "../../../../../assets/images";
import { handleUploadImage } from "../../../../../firebase/firebaseStorageFunctions";
import CommonActiveToggle from "../../../../../common/CommonActiveToggle";
import { updateLogoRight } from "../../../../../firebase/firebaseRealtimeFunctions";
import { currentStageArrn, getCurrentOrgId } from "../../../../../helper/utility";

function BroadcastBrandLogo(props) {
  const { handleResizedImage = () => { }, disableClick = false } = props;
  const [getTrailPopup, setTrailPopup] = useState(false);
  const awsStageReducer = useSelector((state) => state?.awsStageReducer);
  const updatedLogo = useSelector((state) => state?.broadcastLogo);
  const isLogoRight = useSelector((state) => state?.broadcastBranding?.isLogoRight); //store
  const trailOrPaidUser = useSelector(
    (state) => state?.paidTrailLogoUpdateReducer?.paidLogoUpdate
  );
  const _stageArn = currentStageArrn(awsStageReducer);
  const [getlogoUrl, setlogoUrl] = useState("no-image");
  const stageData =
    awsStageReducer.method === "create"
      ? getStageData(awsStageReducer)
      : awsStageReducer;

  const handleRemoveLogo = () => {
    setlogoUrl("no-image");
    handleUploadImage("no-image", stageData, "no-image");
  };

  const handleTrailPopup = (state = false) => {
    setTrailPopup(state);
  };

  useEffect(() => {
    setlogoUrl(updatedLogo);
  }, [updatedLogo]);

  return (
    <Fragment>
      <div className="">
        <form action="" className="">
          <div className="brand_image_list">
            {getlogoUrl !== "no-image" && getlogoUrl !== mirrorflyDefault && (
              <div className="brand_image selected">
                <button onClick={trailOrPaidUser === "BASIC" ? () => handleTrailPopup(true) : () => handleRemoveLogo()}
                  title="Remove"
                  type="button"
                  className="remove_brand_image"
                >
                  <IconClose />
                </button>
                <img
                  id="preview-image"
                  src={getlogoUrl || mirrorflyDefault}
                  alt="logo"
                />
                <div
                  style={{ display: "none" }}
                  className="response_loader_wraper"
                >
                  <img
                    src={ImgLoaderBlue}
                    className="response_loader"
                    alt="response-loader"
                  />
                </div>
              </div>
            )}
            <ReactCropper
              _handleResizedImage={handleResizedImage}
              trailOrPaidUser={trailOrPaidUser}
              disableClick={disableClick}
            />
            <div className="info">(Image should be in jpeg or png format and less than 5MB)</div>
          </div>
          <div style={{ marginTop : "1px" }} className="broadcast_video_banner_action">
            <CommonActiveToggle
              toggleType=" style2 "
              jestId={`Status-1`}
              name="getIsLogoRight"
              onChange={(e) => { console.log(e?.target?.value, "getIsLogoRight");
                updateLogoRight(getCurrentOrgId(), _stageArn, e?.target?.value);
              }}
              id={`getIsLogoRight`}
              status={isLogoRight}
              parentId={"isLogoRight"}
            />
            <label htmlFor="getIsLogoRight" className="info">Display logo on right</label>
          </div>
        </form>
      </div>

      {getTrailPopup ?
        <TrailUserLogoUpdata _handleOnOutsideClick={() => handleTrailPopup(false)} /> : null
      }
    </Fragment>
  );
}

export default BroadcastBrandLogo;
