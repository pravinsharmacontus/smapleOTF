import React, { useEffect } from "react";
import "./Integrations.scss";
import Integrations from ".";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ssoYTGmailClientId } from "../../../helper/ApiUrl";
import store from "../../../store";
import { appStatusAction } from "../../../store/action/awsActions";
import { InBroadcastScreenAction } from "../../../store/action/tempAction";

function IntegrationHost(_props = {}) {

    useEffect(() => {
        store.dispatch(appStatusAction("integration"));
        store.dispatch(InBroadcastScreenAction(false));
    }, [])

    useEffect(() => {
        return () => {
            store.dispatch(appStatusAction(""))
        }
    },[])

    return (
        <>
            <GoogleOAuthProvider clientId={ssoYTGmailClientId}>
                <Integrations />
            </GoogleOAuthProvider>
        </>
    );
}
export default IntegrationHost;
