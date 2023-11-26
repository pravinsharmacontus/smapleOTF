import React, { useEffect, useState } from "react";
import "./BroadcastLayouts.scss";
import {
  IcondualActive,
  IcondualFullActive,
  IcondualFullInactive,
  IcondualInactive,
  IconfillviewActive,
  IconfillviewInactive,
  IconfullviewActive,
  IconfullviewInactive,
  IconhybridActive,
  IconhybridInactive,
  IconsingleActive,
  IconsingleInactive,
  IconthreeActive,
  IconthreeInactive,
} from "../../../../../assets/img";

function BroadcastLayouts(_props = {}) {
  const {
    handleLayoutViewType = () => { },
    layoutCount = 0,
    currentLayout = "",
    isUserChanged = () => { },
    isScreenShare
  } = _props;
  const [getLayout, setLayout] = useState("layout1");
  const handleLayouts = (layoutState = "") => {
    handleLayoutViewType(layoutState, "clicked");
    isUserChanged(true);
    return layoutState;
  };

  useEffect(() => {
    handleLayoutViewType(getLayout, "initial");
  }, []);
  useEffect(() => {
    setLayout(currentLayout);
  }, [currentLayout]);
  const temphide = true;

  return (
    <div className="broadcast_video_layout_wraper">
      <div className="broadcast_video_layout_list">
        <button
          onClick={!isScreenShare ? () => handleLayouts("layout1") : () => { }}
          style={{ cursor: !isScreenShare ? "" : " default " }}
          className=""
          type="button"
        >
          {getLayout === "layout1" ? (
            <IconsingleActive />
          ) : (
            <IconsingleInactive />
          )}
        </button>
        <button
          onClick={layoutCount > 1 && !isScreenShare ? () => handleLayouts("layout2") : () => { }}
          style={{ cursor: layoutCount > 1 && !isScreenShare ? "" : " default " }}
          className=""
          type="button"
        >
          {getLayout === "layout2" ? <IcondualActive /> : <IcondualInactive />}
        </button>
        <button
          style={{ cursor: temphide ? "default" : "" }}
          className=""
          type="button"
        >
          {isScreenShare ? (
            <IconfullviewActive />
          ) : (
            <IconfullviewInactive />
          )}
        </button>

        {!temphide && (
          <>
            <button
              onClick={
                layoutCount > 1 ? () => handleLayouts("layout2_1") : () => { }
              }
              style={{ cursor: temphide ? "default" : "" }}
              className=""
              type="button"
            >
              {getLayout === "layout2_1" ? (
                <IcondualFullActive />
              ) : (
                <IcondualFullInactive />
              )}
            </button>
            <button
              onClick={temphide ? () => { } : () => handleLayouts("layout3")}
              style={{ cursor: temphide ? "default" : "" }}
              className=""
              type="button"
            >
              {getLayout === "layout3" ? (
                <IconthreeActive />
              ) : (
                <IconthreeInactive />
              )}
            </button>
            <button
              onClick={temphide ? () => { } : () => handleLayouts("layout4")}
              style={{ cursor: temphide ? "default" : "" }}
              className=""
              type="button"
            >
              {getLayout === "layout4" ? (
                <IconfillviewActive />
              ) : (
                <IconfillviewInactive />
              )}
            </button>
            <button
              onClick={temphide ? () => { } : () => handleLayouts("layout6")}
              style={{ cursor: temphide ? "default" : "" }}
              className=""
              type="button"
            >
              {getLayout === "layout6" ? (
                <IconhybridActive />
              ) : (
                <IconhybridInactive />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default BroadcastLayouts;
