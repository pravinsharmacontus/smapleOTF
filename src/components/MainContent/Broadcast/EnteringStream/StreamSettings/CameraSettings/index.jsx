import React, { useEffect, useState } from "react";
import "./CameraSettings.scss";
import CommonDropDown from "../../../../../Common/CommonDropDown";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getCamera, verifyDeviceAdded } from "../../../../../../helper/AwsDeviceAccess";
import store from "../../../../../../store";
import { tempVideoStream } from "../../../../../../store/action/awsActions";
import { IconVideoInActive } from "../../../../../../assets/img";
import { failToast } from "../../../../../../helper/ApiToast";

function CameraSettings(_props = {}) {
  const { t } = useTranslation();
  const tempHide = false;
  const { cameraDeviceStream = () => { }, isVideoMute, _handleOnOutsideClick = () => { } } = _props;
  const deviceList = useSelector(
    (state) => state?.localDeviceLists?.videoDevices
  );
  const tempVideo = useSelector(
    (state) => state?.tempStreams?.video
  );
  const localDeviceListsStore = useSelector((state) => state?.localDeviceLists); //store

  const localStreams = useSelector((state) => state?.localStreams); //store
  const [selectedStream, setSelectedStream] = useState();
  const [getFormData, setFormData] = useState({
    getCameraLabel: "",
    getResolution: "",
  });
  const setStream = async (videoDevices) => {
    const testVideo = document.getElementById("preview-camera");
    testVideo.srcObject = new MediaStream();
    const localcamera = new MediaStream(videoDevices);
    testVideo.srcObject = localcamera;
  };

  useEffect(() => {
    if (selectedStream) {
      setTimeout(() => {
        setStream(selectedStream);
      }, [500]);
    } else {
      tempVideo?.selectCamera?.active && setStream(tempVideo?.selectCamera);
    }
  }, [localStreams, selectedStream]);
  useEffect(
    () => {
      async function getStreamAsync(temp = {}) {
        const deviceData = temp?.deviceData || localStreams?.DeviceIds?.video || deviceList[0]?.deviceId;
        console.log(temp, "<<getStreamAsync>>")
        if (temp?.selectCamera?.active) {
          console.log(temp?.selectCamera, "temp?.selectCamera?.active")
          setSelectedStream(temp?.selectCamera);
        } else {
          const selectCamera = !isVideoMute && await getCamera(deviceData);
          store.dispatch(tempVideoStream({ selectCamera, deviceData: deviceData }));
          setSelectedStream(selectCamera);
          cameraDeviceStream(deviceList.filter((ele) => ele.deviceId === deviceData));
        }
        setFormData({
          ...getFormData,
          getCameraLabel: deviceList.filter(ele => ele?.deviceId ===
            deviceData
          )[0]?.label,
        });
      }
      getStreamAsync(tempVideo);

    },
    []
  );

  useEffect(() => {
    const updatedId = verifyDeviceAdded(localStreams?.DeviceIds?.video, "video")
    if (updatedId !== localStreams?.DeviceIds?.video) {
      const selectCamera = undefined;
      store.dispatch(tempVideoStream({ selectCamera, deviceData: updatedId }));
      setFormData({
        ...getFormData,
        getCameraLabel: deviceList.filter(ele => ele?.deviceId ===
          updatedId
        )[0]?.label,
      });
      console.log("selectCamera---1")
      setSelectedStream(selectCamera);
      cameraDeviceStream(deviceList.filter((ele) => ele.deviceId === updatedId));
    }
    const isSelectedStreamNotPresent = deviceList?.findIndex(ele => ele?.deviceId === tempVideo?.deviceData)
    console.log(isSelectedStreamNotPresent, "isSelectedStreamNotPresent")
    if (tempVideo?.deviceData && isSelectedStreamNotPresent < 0) {
      _handleOnOutsideClick();
      failToast("Selected Camera Device Not Found");
    }
  }, [localDeviceListsStore])
  const CameraList = deviceList.map((ele) => {
    return {
      id: ele.deviceId,
      option: ele.label,
    };
  });

  const ResolutionList = [
    {
      id: 1,
      option: "Full High Defination (1080p)",
    },
    {
      id: 2,
      option: "High Defination (720p)",
    },
    {
      id: 3,
      option: "Low Defination (480p)",
    },
  ];

  const { getCameraLabel, getResolution } = getFormData;

  const handleInputChange = async (event) => {
    if (selectedStream?.active) {
      const videoTracks = selectedStream?.getTracks();
      videoTracks.forEach((track) => {
        track?.stop();
      });
    }
    const tempVideoStreamUpdated = store.getState()?.tempStreams?.video;
    if (tempVideoStreamUpdated?.active) {
      const videoTracks = tempVideoStreamUpdated?.getTracks();
      videoTracks.forEach((track) => {
        track?.stop();
      });
    }

    const { name = "", value = "" } = event.target || {};
    setFormData({
      ...getFormData,
      [name + "Label"]: value,
    });
    const deviceData = deviceList.filter((ele) => ele.label === value)[0]?.deviceId;
    const selectCamera = !isVideoMute && await getCamera(
      deviceList.filter((ele) => ele.label === value)[0]?.deviceId
    );
    store.dispatch(tempVideoStream({ selectCamera, deviceData: deviceData }));
    setSelectedStream(selectCamera);
    cameraDeviceStream(deviceList.filter((ele) => ele.label === value));
  };
  return (
    <div className="camera_settings_wraper">
      <div className="camera_settings_inner">
        <div className="camera_settings_video">
          {!isVideoMute ?
            <video className="video_mirror" id="preview-camera" autoPlay></video>
            : <IconVideoInActive />
          }
        </div>
        <fieldset>
          <div className="common-input-wrapper mb-0">
            <div className="lableInfo">
              <span className="inputLabel ">
                {t("BROADCAST.SETTINGS.CAMERA")}
              </span>
            </div>
            <CommonDropDown
              optionList={CameraList}
              mustFill={true}
              value={getCameraLabel}
              name={"getCamera"}
              _onBlur={() => { }}
              _onChange={handleInputChange}
              className={` ${false ? " dropdown-error " : ""}`}
            />
          </div>
        </fieldset>
        {tempHide && (
          <fieldset>
            <div className="common-input-wrapper mb-0">
              <div className="lableInfo">
                <span className="inputLabel ">
                  {t("BROADCAST.SETTINGS.CAMERA_TAB.CAMERA_RESOLUTION")}
                </span>
              </div>
              <CommonDropDown
                optionList={ResolutionList}
                mustFill={false}
                value={getResolution}
                name={"getResolution"}
                _onBlur={() => { }}
                _onChange={handleInputChange}
                className={` ${false ? " dropdown-error " : ""}`}
              />
            </div>
          </fieldset>
        )}
      </div>
    </div>
  );
}

export default CameraSettings;
