import React, { useEffect, useState } from "react";
import CommonDropDown from "../../../../../Common/CommonDropDown";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IconMicActive, IconMicAnimation, IconMicInActive, IconSpeaker } from "../../../../../../assets/img";
import { startMeterSetting } from "../../../../../../volumeMeter/main";
import AudioFile from "./../../../../../../assets/audio/morning-garden-acoustic-chill-15013.mp3";
import { getMic, verifyDeviceAdded } from "../../../../../../helper/AwsDeviceAccess";
import { tempAudioOutputAction, tempAudioStream } from "../../../../../../store/action/awsActions";
import store from "../../../../../../store";
import { failToast } from "../../../../../../helper/ApiToast";

function AudioSettings(_props = {}) {
  const [getIsPlaying, setIsPlaying] = useState(false);
  const [selectedStream, setSelectedStream] = useState();
  const [selectedAudio, setSelectedAudio] = useState();
  const localDeviceListsStore = useSelector((state) => state?.localDeviceLists); //store

  const { t } = useTranslation();
  const {
    micDeviceStream = () => { },
    speakerDeviceStream = () => { },
    initials = () => { },
    isAudioMute,
    _handleOnOutsideClick = () => { }
  } = _props;
  const deviceList = useSelector(
    (state) => state?.localDeviceLists?.audioDevices
  );
  const speakerDevicesList = useSelector(
    (state) => state?.localDeviceLists?.audioOutputDevices
  );
  const localStreams = useSelector((state) => state?.localStreams); //store
  const tempAudio = useSelector(
    (state) => state?.tempStreams?.audio
  );
  const tempAudioOutput = useSelector(
    (state) => state?.tempStreams?.speaker
  );
  const [getFormData, setFormData] = useState({
    getMicLabel: "",
    getSpeakerLabel: "",
    getAdjustMic: false,
    getEchoCancellation: false,
    getStereoAudio: false,
    getShiftComments: false,
  });
  useEffect(
    () => {

      async function getStreamAsync(newTempAudio, newTempAudioOutput) {
        const deviceData = newTempAudio?.deviceData || localStreams?.DeviceIds?.audio || deviceList[0]?.deviceId;
        const speakerOutId = newTempAudioOutput?.deviceData || localStreams?.DeviceIds?.speaker || speakerDevicesList[0]?.deviceId;
        const speakerOut = speakerDevicesList.filter((ele) => ele.deviceId === speakerOutId)[0];
        if (newTempAudio?.selectMic?.active) {
          setSelectedStream(newTempAudio?.selectMic);
          startMeterSetting(newTempAudio?.selectMic);
        } else {
          const selectMic = !isAudioMute ? await getMic(deviceData) : {};
          !isAudioMute && setSelectedStream(selectMic);
          !isAudioMute && startMeterSetting(selectMic);
          store.dispatch(tempAudioStream({ selectMic, deviceData: deviceData }));
        }
        if (newTempAudioOutput?.deviceData) {
          setSelectedAudio(newTempAudioOutput?.speakerOut);
        } else {
          setSelectedAudio(speakerOut);
          store.dispatch(tempAudioOutputAction({ speakerOut, deviceData: speakerOut?.deviceId }));
        }
        if (!newTempAudio?.selectMic?.active && !newTempAudioOutput?.deviceData) {
          initials(deviceList.filter((ele) => ele.deviceId === deviceData), speakerDevicesList.filter((ele) => ele.deviceId === speakerOut?.deviceId));
        }
        setFormData({
          ...getFormData,
          getMicLabel: deviceList.filter(
            (ele) => ele.deviceId === deviceData
          )[0]?.label,
          getSpeakerLabel: speakerDevicesList.filter(
            (ele) => ele.deviceId === speakerOutId
          )[0]?.label,
        });
      }
      getStreamAsync(tempAudio, tempAudioOutput);
    },
    []
  );
  useEffect(() => {
    const updatedId = verifyDeviceAdded(localStreams?.DeviceIds?.audio, "audio");
    let tempMic = "";
    if (updatedId !== localStreams?.DeviceIds?.audio) {
      const selectMic = undefined;
      store.dispatch(tempAudioStream({ selectMic, deviceData: updatedId }));
      tempMic = deviceList.filter(ele => ele?.deviceId ===
        updatedId
      )[0]?.label;
      setFormData({
        ...getFormData,
        getMicLabel: deviceList.filter(ele => ele?.deviceId ===
          updatedId
        )[0]?.label,
      });
      console.log("selectCamera---1")
      setSelectedStream(selectMic);
      micDeviceStream(deviceList.filter((ele) => ele.deviceId === updatedId));
    }
    const isSelectedStreamNotPresent = deviceList?.findIndex(ele => ele?.deviceId === tempAudio?.deviceData)
    if (tempAudio?.deviceData && isSelectedStreamNotPresent < 0) {
      _handleOnOutsideClick();
      failToast("Selected Mic Device Not Found");
    }
    const updatedIdOutput = verifyDeviceAdded(localStreams?.DeviceIds?.speaker, "speaker");

    if (updatedIdOutput !== localStreams?.DeviceIds?.speaker) {
      if (!tempMic) {
        setFormData({
          ...getFormData,
          getSpeakerLabel: speakerDevicesList.filter((ele) => ele.deviceId === updatedIdOutput)[0]?.label,
        });
      } else {
        console.log(tempMic, "tempMictempMictempMictempMictempMic")
        setFormData({
          ...getFormData,
          getMicLabel: tempMic,
          getSpeakerLabel: speakerDevicesList.filter((ele) => ele.deviceId === updatedIdOutput)[0]?.label,
        });

      }
      speakerDeviceStream(
        speakerDevicesList.filter((ele) => ele.deviceId === updatedIdOutput)
      );
      const speakerOut = speakerDevicesList.filter((ele) => ele.deviceId === updatedIdOutput)[0];
      store.dispatch(tempAudioOutputAction({ speakerOut, deviceData: updatedIdOutput }));
      setSelectedAudio(speakerOut);
    }
    const isSelectedSpeakerNotPresent = speakerDevicesList?.findIndex(ele => ele?.deviceId === tempAudioOutput?.deviceData)
    if (tempAudioOutput?.deviceData && isSelectedSpeakerNotPresent < 0) {
      _handleOnOutsideClick();
      failToast("Selected Speaker Device Not Found");
    }

  }, [localDeviceListsStore])

  const MicList = deviceList.map((ele) => {
    return {
      id: ele.deviceId,
      option: ele.label,
    };
  });
  const speakerList = speakerDevicesList.map((ele) => {
    return {
      id: ele.deviceId,
      option: ele.label,
    };
  });

  const { getMicLabel, getSpeakerLabel } = getFormData;
  const handleInputChange = async (event) => {
    const { value = "", type = "", checked = false } = event.target || {};
    if (selectedStream?.active) {
      const videoTracks = selectedStream?.getTracks();
      videoTracks.forEach((track) => {
        track?.stop();
      });
    }
    const tempVideoStreamUpdated = store.getState()?.tempStreams?.audio;
    if (tempVideoStreamUpdated?.active) {
      const videoTracks = tempVideoStreamUpdated?.getTracks();
      videoTracks.forEach((track) => {
        track?.stop();
      });
    }

    setFormData({
      ...getFormData,
      getMicLabel: type === "checbox" ? checked : value,
    });
    const deviceData = deviceList.filter((ele) => ele.label === value)[0]?.deviceId;
    micDeviceStream(deviceList.filter((ele) => ele.label === value));
    const selectMic = !isAudioMute && await getMic(
      deviceList.filter((ele) => ele.label === value)[0]?.deviceId
    );
    store.dispatch(tempAudioStream({ selectMic, deviceData: deviceData }));
    setSelectedStream(selectMic);
  };
  const handleOuputChange = async (event) => {
    const {
      name = "",
      value = "",
      type = "",
      checked = false,
    } = event.target || {};

    setFormData({
      ...getFormData,
      getSpeakerLabel: type === "checbox" ? checked : value,
    });
    speakerDeviceStream(
      speakerDevicesList.filter((ele) => ele.label === value)
    );
    const speakerOut = speakerDevicesList.filter((ele) => ele.label === value)[0];
    store.dispatch(tempAudioOutputAction({ speakerOut, deviceData: speakerOut?.deviceId }));
    setSelectedAudio(speakerDevicesList.filter((ele) => ele.label === value)[0]
    );
  };

  async function handlePlayAudio() {
    const myAudio = document.getElementById("myAudio");
    await myAudio.setSinkId(selectedAudio.deviceId);
    getIsPlaying ? myAudio.play() : myAudio.pause();
  };

  useEffect(() => {
    handlePlayAudio();
  }, [getIsPlaying]);

  useEffect(() => {
    if (!selectedStream && localStreams) {
      const { localMic } = localStreams;
      setTimeout(() => {
        startMeterSetting(localMic);
      }, [500]);
    }
    if (selectedStream) {
      setTimeout(() => {
        startMeterSetting(selectedStream);
      }, [500]);
    }
  }, [localStreams, selectedStream, selectedAudio]);
  useEffect(() => {
    setIsPlaying(false);
    const myAudio = document.getElementById("myAudio");
    myAudio.pause()
  }, [selectedAudio]);
  return (
    <>
      {" "}

      <audio id="myAudio">
        <source src={AudioFile} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {(
        <fieldset>
          <div className="common-input-wrapper mb-0">
            <div className="lableInfo">
              <span className="inputLabel ">
                {t("BROADCAST.SETTINGS.AUDIO_TAB.MIC")}
              </span>
            </div>
            <div className="drop_down_audio">
              <div className="relative">
                <CommonDropDown
                  optionList={MicList}
                  mustFill={false}
                  value={getMicLabel}
                  name={"getMic"}
                  _onBlur={() => { }}
                  _onChange={handleInputChange}
                  className={` ${false ? " dropdown-error " : ""}`}
                />
              </div>
              <div className={`audio_speaker_eqic `}>
                {!isAudioMute ? <IconMicActive /> :
                  <IconMicInActive />}
                <div className="audio_mic_animation">
                  <canvas id="mic_volume1" class="mic_volume mic_volume_off mic_0 mic_30 mic_60 mic_90"></canvas>
                  <IconMicAnimation />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      )}
      <fieldset>
        <div className="common-input-wrapper mb-0">
          <div className="lableInfo">
            <span className="inputLabel ">
              {t("BROADCAST.SETTINGS.AUDIO_TAB.SPEAKER")}
            </span>
          </div>
          <div className="drop_down_audio">
            <div className="relative">
              <CommonDropDown
                optionList={speakerList}
                mustFill={false}
                value={getSpeakerLabel}
                name={"getSpeaker"}
                _onBlur={() => { }}
                _onChange={handleOuputChange}
                className={` ${false ? " dropdown-error " : ""}`}
              />
            </div>
            <button onClick={() => setIsPlaying(!getIsPlaying)} type="button" className={` audio_speaker_eqic ${getIsPlaying ? " active " : ""}`}>
              <IconSpeaker />
              <span className="btn_text">Test</span>
            </button>
          </div>
        </div>
      </fieldset>
      {/* <fieldset className="checkbox_fieldset">
        <CommonCheckbox
          id="check-getShiftComments"
          name="getShiftComments"
          checkVal={getShiftComments}
          onChange={handleInputChange}
        />
        <label htmlFor="check-getShiftComments">
          {t("BROADCAST.SETTINGS.AUDIO_TAB.CHECKBOX_ONE_TEXT")}
        </label>
      </fieldset>
      <fieldset className="checkbox_fieldset">
        <CommonCheckbox
          id="check-StereoAudio"
          name="getStereoAudio"
          checkVal={getStereoAudio}
          onChange={handleInputChange}
        />
        <label htmlFor="check-StereoAudio">
          {t("BROADCAST.SETTINGS.AUDIO_TAB.CHECKBOX_TWO_TEXT")}
        </label>
      </fieldset>
      <fieldset className="checkbox_fieldset">
        <CommonCheckbox
          id="check-getEchoCancellation"
          name="getEchoCancellation"
          checkVal={getEchoCancellation}
          onChange={handleInputChange}
        />
        <label htmlFor="check-getEchoCancellation">
          {t("BROADCAST.SETTINGS.AUDIO_TAB.CHECKBOX_THREE_TEXT")}
        </label>
        <p className="note_lite">
          {t("BROADCAST.SETTINGS.AUDIO_TAB.CHECKBOX_THREE_CAPTIONTEXT")}
        </p>
      </fieldset>
      <fieldset className="checkbox_fieldset">
        <CommonCheckbox
          id="check-getAdjustMic"
          name="getAdjustMic"
          checkVal={getAdjustMic}
          onChange={handleInputChange}
        />
        <label htmlFor="check-getAdjustMic">
          {t("BROADCAST.SETTINGS.AUDIO_TAB.CHECKBOX_FOUR_TEXT")}
        </label>
      </fieldset> */}
    </>
  );
}

export default AudioSettings;
