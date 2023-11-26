import React from 'react';
import ReactFacebook from "react-facebook-login";
import { createMediaConfig } from '../../../../helper/utility';
import { apiUrl } from '../../../../helper/ApiUrl';
import { Post } from '../../../../common/httpRestServices';
import { facebookGroupListAction, facebookPageListAction, facebookProfileListAction } from '../../../../store/action/facebookAction';
import store from '../../../../store';

const FbPermissionAction = (_props) => {
    const { className = "", textActionButton = "", activePages = () => { }, type = "", scope = "" } = _props;
    const responseFBPage = async (response) => {
        // // const fbResponse = await axios.get(
        // //    `https://graph.facebook.com/v17.0/me/accounts?access_token=${response?.accessToken}`
        // //);
        const page_id = response?.id;
        const fbDetails = {
            media_type: "FB",
            config_type: "page",
            media_id: page_id,
        };
        const pageLivRes = await Post(
            `${apiUrl}simulcast/api/media-config/get-list`,
            fbDetails,
            true
        );
        const fbPageList = pageLivRes?.data?.response?.data;
        console.log("qaqa ded pageLivRes", fbPageList);
        store.dispatch(facebookPageListAction({fbPageList, fbDetails}));
        activePages(pageLivRes?.data?.response?.data, fbDetails);
    };

    const responseFBProfile = async (response) => {
        const profile_id = response?.id;
        const fbDetails = {
            media_type: "FB",
            config_type: "profile",
            media_id: profile_id,
        };
        const pageLivRes = await Post(
            `${apiUrl}simulcast/api/media-config/get-list`,
            fbDetails,
            true
        );
        const fbProfileList = pageLivRes?.data?.response?.data;
        console.log("qaqa ded profile LivRes", fbProfileList);
        store.dispatch(facebookProfileListAction({fbProfileList, fbDetails}));
        activePages(pageLivRes?.data?.response, fbDetails);
    };

    const responseFBGroup = async (response) => {
        const group_id = response?.id;
        const fbDetails = {
            media_type: "FB",
            config_type: "group",
            media_id: group_id,
        };
        const pageLivRes = await Post(
            `${apiUrl}simulcast/api/media-config/get-list`,
            fbDetails,
            true
        );
        const fbGroupList = pageLivRes?.data?.response?.data;
        console.log("qaqa ded group LivRes", fbGroupList);
        store.dispatch(facebookGroupListAction({fbGroupList, fbDetails}));
        activePages(pageLivRes?.data?.response?.data, fbDetails);
    };

    const responseFacebook = async (response) => {
        console.log("qaqa respp",response);
        store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
        // setFBUsername("")
        const tokenResponse = {
            access_token: response?.accessToken,
            expires_in: response?.expiresIn,
            refresh_token: response?.accessToken,
        };
        const userInfo = {
            sub: response?.id,
            name: response?.name,
            picture: response?.picture?.data?.url,
            email: response?.userID,
        };
        if(response?.accessToken){
            const responseFBMediaConfig = await createMediaConfig(
                tokenResponse,
                userInfo,
                "FB"
            );

            console.log("qaqa responseFBMediaConfig", responseFBMediaConfig);
            if (type === "page") {
                responseFBPage(response);
            }else if (type === "profile") {
                responseFBProfile(response);
            }else {
                responseFBGroup(response);
            }
        }
    };

    const onFailure = (resp) => {
        console.log("qaqa failure", resp);
        store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
    }

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
            onClick={() => {activePages("","");}}
        />
    </>
    );
};

export default FbPermissionAction;
