import React, { useEffect, useState } from "react";
import "./StreamSettings.scss";
import AudioSettings from "./AudioSettings";
import CameraSettings from "./CameraSettings";
import Modal from "../../../../../common/Modal";
import { useTranslation } from "react-i18next";
import GeneralSettings from "./GeneralSettings";
import { IconSetting } from "../../../../../assets/img";
import ComponentTabContainer from "./ComponentTabContainer";
import AnimatePopup from "../../../../../common/AnimatePopup";
import RecordingSettings from "./RecordingSettings/index";
import store from "../../../../../store";
import { localDeviceLists, localStreamUpdate, tempInitials } from "../../../../../store/action/awsActions";
import { getDevices, verifyDeviceAdded } from "../../../../../helper/AwsDeviceAccess";
import AutoFocusUtility from "../../../../../helper/AutoFocusUtility";

const StreamSettings = (_props = {}) => {
  const tempHide = false;
  const { t } = useTranslation();
  const {
    _handleOnOutsideClick = () => { },
    handleDone = () => { },
    type = "",
    isAudioMute,
    isVideoMute
  } = _props;

  const [getActivetab, setActivetab] = useState("Camera");
  const handleTabs = (selectedtab = "") => {
    setActivetab(selectedtab);
  };
  const [settings, setSettings] = useState({
    videoStream: [],
    audioStream: [],
    speakerOutput: [],
    isOpen: false,
  });
  const clickDone = () => {
    _handleOnOutsideClick();
    handleDone(settings);
  };
  useEffect(() => {
    async function getDevicesListDispatch() {
      const devices = await getDevices();
      store.dispatch(localDeviceLists(devices));
    }
    getDevicesListDispatch();
    const localStream = store.getState()?.localStreams;
    const videoId = verifyDeviceAdded(localStream?.DeviceIds?.video, "video");
    const audioId = verifyDeviceAdded(localStream?.DeviceIds?.audio, "audio");
    const speakerId = verifyDeviceAdded(localStream?.DeviceIds?.speaker, "speaker")
    store.dispatch(
      localStreamUpdate({
        ...localStream,
        DeviceIds: {
          ...localStream.DeviceIds,
          video: videoId,
          audio: audioId,
          speaker: speakerId
        },
      })
    );
    return () => {
      const tempVideoStream = store.getState()?.tempStreams?.video?.selectCamera;
      if (tempVideoStream?.active) {
        const videoTracks = tempVideoStream?.getTracks();
        videoTracks.forEach((track) => {
          track?.stop();
        });
      }
      const tempAudioStream = store.getState()?.tempStreams?.audio?.selectMic;
      if (tempAudioStream?.active) {
        const videoTracks = tempAudioStream?.getTracks();
        videoTracks.forEach((track) => {
          track?.stop();
        });
      }
      store.dispatch(tempInitials({}));
    };
  }, [])
  return (
    <>
      <Modal>
        <AnimatePopup
          setShow={true}
          _handleOnOutsideClick={_handleOnOutsideClick}
        >
          <div className="stream_settings_wraper">
            <div className="stream_settings_inner">
              <div className="stream_settings_head">
                <i className="icon_setting">
                  <IconSetting />
                </i>
                <h3>{t("NAVBAR.SETTING")}</h3>
              </div>
              <div className="stream_settings_body">
                <div className="stream_settings_options">
                  <AutoFocusUtility />
                  <div className="stream_settings_options_list">
                    {tempHide && (
                      <button
                        onClick={() => handleTabs("General")}
                        className={`stream_settings_option ${getActivetab === "General" ? " active " : " "
                          }`}
                        type="button"
                      >
                        {t("BROADCAST.SETTINGS.GENERAL")}
                      </button>
                    )}
                    {(
                      <button
                        onClick={() => handleTabs("Camera")}
                        className={`stream_settings_option ${getActivetab === "Camera" ? " active " : " "
                          }`}
                        type="button"
                      >
                        {t("BROADCAST.SETTINGS.CAMERA")}
                      </button>
                    )}
                    <button
                      onClick={() => handleTabs("Audio")}
                      className={`stream_settings_option ${getActivetab === "Audio" ? " active " : " "
                        }`}
                      type="button"
                    >
                      {t("BROADCAST.SETTINGS.AUDIO")}
                    </button>
                    {tempHide && (
                      <button
                        onClick={() => handleTabs("Recording")}
                        className={`stream_settings_option ${getActivetab === "Recording" ? " active " : " "
                          }`}
                        type="button"
                      >
                        {t("BROADCAST.SETTINGS.RECORDING")}
                      </button>
                    )}
                  </div>
                </div>
                <div className="stream_settings_types">
                  {getActivetab === "General" && tempHide ? (
                    <>
                      <ComponentTabContainer
                        handleAction={_handleOnOutsideClick}
                      >
                        <GeneralSettings />
                      </ComponentTabContainer>
                    </>
                  ) : null}

                  {getActivetab === "Camera" ? (
                    <>
                      <ComponentTabContainer handleAction={clickDone}>
                        <CameraSettings
                          cameraDeviceStream={(e) =>
                            setSettings({
                              ...settings,
                              videoStream: e,
                            })
                          }
                          isVideoMute={isVideoMute}
                          _handleOnOutsideClick={_handleOnOutsideClick}
                        />
                      </ComponentTabContainer>
                    </>
                  ) : null}
                  {getActivetab === "Audio" ? (
                    <>
                      <ComponentTabContainer handleAction={clickDone}>
                        <AudioSettings
                          isAudioMute={isAudioMute}
                          _handleOnOutsideClick={_handleOnOutsideClick}
                          micDeviceStream={(e) => {
                            setSettings({
                              ...settings,
                              audioStream: e,
                            })
                          }
                          }
                          speakerDeviceStream={(e) =>
                            setSettings({
                              ...settings,
                              speakerOutput: e,
                            })
                          }
                          initials={(e, i) =>
                            setSettings({
                              ...settings,
                              audioStream: e,
                              speakerOutput: i,
                            })}
                          settingstype={type}
                        />
                      </ComponentTabContainer>
                    </>
                  ) : null}
                  {getActivetab === "Recording" && tempHide ? (
                    <>
                      <ComponentTabContainer
                        handleAction={_handleOnOutsideClick}
                      >
                        <RecordingSettings />
                      </ComponentTabContainer>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </AnimatePopup>
      </Modal>
    </>
  );
};

export default React.memo(StreamSettings);
