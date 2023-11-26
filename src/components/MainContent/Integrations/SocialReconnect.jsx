import React from 'react';
import ReactFacebook from "react-facebook-login";
import store from '../../../store';
import { createMediaConfig } from '../../../helper/utility';
import { Post } from '../../../common/httpRestServices';
import { apiUrl } from '../../../helper/ApiUrl';
import { reconnectAccount } from '../../../store/action/editStreamAction';
import { failToast } from '../../../helper/ApiToast';

const SocialReconnect = (props) => {
    const { reconnectItems = "", type = "", scope = "", className = "", textActionButton = "" } = props;

    const reconnectPage = async () => {
      const recPageParams = {
        "media_type": reconnectItems?.mediaType,
        "media_id": reconnectItems?.mediaId,
        "config_id": reconnectItems?.configId,
        "config_type": reconnectItems?.configType
      };
      const recFbPage = await Post(
        `${apiUrl}simulcast/api/media-config-type`, recPageParams);
        if (recFbPage?.status === 200) {
        store.dispatch(reconnectAccount(true));
        store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
      }else{
        store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
        failToast(recFbPage?.data?.message);
      }
    };

    const actionPages = (data, fbDetails) => {
      if (fbDetails.media_id === undefined) {
        store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
      }
      if (fbDetails?.config_type === "page" && fbDetails.media_id !== undefined) {
        if (data && data?.length !== 0) {
          reconnectPage();
        } else {
          store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
        }
      }
    };

    const responseFBPage = async (response) => {
      const page_id = response?.id;
      const fbPageDetails = {
        media_type: "FB",
        config_type: "page",
        media_id: page_id,
      };
      const pageLivRes = await Post(
        `${apiUrl}simulcast/api/media-config/get-list`,
        fbPageDetails,
        true
      );
      actionPages(pageLivRes?.data?.response?.data, fbPageDetails);
    };

    const responseFacebook = async (response) => {
      store.dispatch(reconnectAccount(false));
      store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
      const tokenResponses = {
        access_token: response?.accessToken,
        expires_in: response?.expiresIn,
        refresh_token: response?.accessToken,
      };
      const userDetails = {
        sub: response?.id,
        name: response?.name,
        picture: response?.picture?.data?.url,
        email: response?.userID,
      };
      if(response?.accessToken){
        const resFBMediaConfig = await createMediaConfig(
          tokenResponses,
          userDetails,
          "FB"
        );
        console.log("qaqa responseFBMediaConfig", resFBMediaConfig);
        if (type === "page") {
          responseFBPage(response);
        }
      }
    };

    const onFailure = (resp) => {
      console.log("qaqa failure", resp);
      store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
    };

    return (<>
        <ReactFacebook
          textButton={textActionButton}
          cssClass={className}
          size="medium"
          appId="321648757198308" // 184732591628808 321648757198308 clone account - 1764424834041533
          autoLoad={false}
          fields="name,email,picture"
          scope={scope}
          callback={responseFacebook}
          onFailure={onFailure}
          onClick={() => {actionPages("","");}}
        />
    </>
    );
};

export default SocialReconnect;
