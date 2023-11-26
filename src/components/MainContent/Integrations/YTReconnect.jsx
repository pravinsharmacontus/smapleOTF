import React from "react";
import "./Integrations.scss";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { nullToObject } from "../../../helper/Validation";
import { YOUTUBE_API_KEY, apiUrl, youtubeApiUrl, ytUserInfoUrl } from "../../../helper/ApiUrl";
import { createMediaConfig } from "../../../helper/utility";
import { getGoogleUserDetails } from "../../Login/SSOLogin/helperSSO";
import { Post } from "../../../common/httpRestServices";
import store from "../../../store";
import { reconnectAccount } from "../../../store/action/editStreamAction";

function YTReconnect(_props = {}) {

    const onSuccess = async (response, tokenResponse, userInfo) => {
        store.dispatch(reconnectAccount(false));
        nullToObject(response);

        const ACCESS_TOKEN = tokenResponse?.access_token;
        const headers = {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        };

        try {
            const resStream = await axios.get(
                `${youtubeApiUrl}liveStreams?part=status&mine=true&key=${YOUTUBE_API_KEY}`,
                { headers }
            );
            if (resStream?.status === 200 && resStream?.data?.items?.length > 0) {
                const resMediaConfig = await createMediaConfig(tokenResponse, userInfo, "YT");
                console.log('1q1q resMediaConfig:', resMediaConfig?.data);
                if (resMediaConfig.status === 200) {
                    store.dispatch(reconnectAccount(true));
                }else {
                    store.dispatch(reconnectAccount(false));
                }
            }
        } catch (error) {
            console.log('Response data:', error);
        }
    };

    const youtubeReconnect = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            console.log(codeResponse);
            const auth_code = codeResponse?.code;
            const redirect_url = window?.location?.origin;
            const tokenYTParams = {
                "code": auth_code,
                "redirect_url": redirect_url,
                "media_type": "YT",
            };
            const getResToken = await Post(
                `${apiUrl}simulcast/api/media-config/auth-code`,
                tokenYTParams
            );
            const tokenResponse = getResToken?.data?.response;
            const { access_token } = getResToken.data.response;
            localStorage.setItem(
                "tokenResponse integration",
                JSON.stringify(codeResponse)
            );
            const response = await getGoogleUserDetails(access_token);
            const { data: { data = {}, status = 0 } = {} } = nullToObject(response);
            if (status === 200) {
                const newProfileObj = {
                    profileObj: {
                        email: data?.email,
                        googleId: data?.ssoid,
                        givenName: data?.name,
                        type: "google",
                        data: data,
                    },
                };
                const userInfo = await axios.get(`${ytUserInfoUrl}userinfo`, {
                    headers: { Authorization: `Bearer ${access_token}` },
                });
                onSuccess(newProfileObj, tokenResponse, userInfo?.data);
                console.log("qaqa onSuccess", userInfo?.data);
            } else {
                console.log("onFailure", data);
            }
        },
        flow: "auth-code",
        scope: "https://www.googleapis.com/auth/youtube",
        onError: (errorResponse) => {
            console.log("onFailure", errorResponse);
        },
    });

    return (
        <>
        <strong className='btn_reconnect_text btn_reconnection_text' onClick={() => youtubeReconnect()}>Reconnect</strong>
        </>
    );
}
export default YTReconnect;
