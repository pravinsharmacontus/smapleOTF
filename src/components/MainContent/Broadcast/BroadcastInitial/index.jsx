import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { LottieLiveBroadcasting } from "../../../../assets/img";
import "./BroadcastInitial.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function BroadcastInitial(_props = {}) {
  const { t } = useTranslation();
  const { handleCreateStreaming = () => { }, userRoleId } = _props;
  const hostDetails = useSelector((state) => state?.CusPage?.customerDtls?.emailVerified);
  const [roleId, setRoleId] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  useEffect(() => {
    setRoleId(userRoleId !== 3 ? true : false)
    setEmailVerified(hostDetails !== 0 ? true : false)
  })
  console.log("userroleid", userRoleId, userRoleId !== 3, hostDetails !== 1, emailVerified, roleId)
  return (
    <div className="broadcasting_initiate">
      <Lottie
        className="icon_animate"
        animationData={LottieLiveBroadcasting}
        loop={true}
      />
      {roleId && emailVerified ?
        <>
          <h1 className="heading">{t("BROADCAST.BROADCAST_MAIN_TITLE")}</h1>
          <p className="desc">{t("BROADCAST.BROADCAST_MAIN_CAPTION")}</p>
          <button
            onClick={handleCreateStreaming}
            className="action"
            type="button"
          >
            {t("COMMON.CREATE_BUTTON")}
          </button>
        </>
        :
        <>
          <h1 className="heading">{"No Live streaming events available to join"}</h1>
          <p className="desc">{"Join an organisation as host to create your own live stream"}</p>
        </>
      }
    </div>
  );
}

export default BroadcastInitial;
