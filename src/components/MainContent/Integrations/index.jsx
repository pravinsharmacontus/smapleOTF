import React, { useEffect, useState } from "react";
import "./Integrations.scss";
import { FacebookIcon, LinkedInIcon, YoutubeIcon } from '../../../assets/images';
import AddCohostPopup from "./AddCohostPopup";
import { IconArrow, IconDisconnect, IconFbDark } from "../../../assets/img";
import { useGoogleLogin } from "@react-oauth/google";
import { nullToObject } from "../../../helper/Validation";
import { getGoogleUserDetails } from "../../Login/SSOLogin/helperSSO";
import { YOUTUBE_API_KEY, apiUrl, youtubeApiUrl, ytUserInfoUrl } from "../../../helper/ApiUrl";
import { Delete, Get, Post } from "../../../common/httpRestServices";
import ActionPopup from "../../Common/ActionPopup";
import axios from "axios";
import IntegrationsPopups from "./IntegrationsPopups";
import { createMediaConfig, streamDetails } from "../../../helper/utility";
import store from "../../../store";
import { getAccessTokenAction } from "../../../store/action/editStreamAction";
import Loader from "../../../common/Loader";
import { useSelector } from "react-redux";
import { failToast, succToast } from "../../../helper/ApiToast";
import EnableLiveStreaming from "./EnableLiveStreaming";
import ActivateYoutubePopup from "../BroadcastedVideos/BroadcastedVideosTable/ActivateYoutubePopup";
import AccordianTab from "./AccordianTab";
import IntegrationAlert from "./IntegrationAlert";
import { constantValue } from "../../../const/errorTypes";

function Integrations(_props = {}) {

    const globalData = useSelector((state) => state) || {};
    const { facebookPageList } = globalData?.facebookData || {};
    const { commonData } = globalData || {};
    const { reconnectAccount } = commonData;
    const [isAccordionOpen, setIsAccordionOpen] = useState("menu_1");
    const [getEnableLiveStreaming, setEnableLiveStreaming] = useState(false);
    const [getAddCohost, setAddCohost] = useState(false);
    const [getActionPopupType, setActionPopupType] = useState(false);
    const [animatePopup, setAnimatePopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [getDeletePopup, setDeletePopup] = useState(false);
    const [getDeleteAcc, setDeleteAcc] = useState(false);
    const [getDeleteAccName, setDeleteAccName] = useState(false);
    const [getDeleteAccId, setDeleteAccId] = useState(false);
    const [getDeleteAccMediaType, setDeleteAccMediaType] = useState(false);
    const [getDeleteAccConfigId, setDeleteAccConfigId] = useState(false);
    const [getDeleteAccType, setDeleteAccType] = useState(false);
    const [getDeleteDrop, setDeleteDrop] = useState(false);
    const [getYTUsername, setYTUsername] = useState("");
    const [getYTMediaMail, setYTMediaMail] = useState("");
    const [reconnectCount, setReconnectCount] = useState("");
    const [getYTMediaId, setYTMediaId] = useState("");
    const [getFbId, setFbId] = useState("");
    const [fbAccountList, setFbAccountList] = useState([]);
    const [fbAccDetails, setFbAccDetails] = useState("");
    const [fbGroupId, setFbGroupId] = useState("");
    const [getActiveAcc, setActiveAcc] = useState(false);
    const [getAccSuccess, setAccSuccess] = useState(false);
    const [getIntegrationAlert, setIntegrationAlert] = useState(true);
    const tempHide = false;
    console.log("qaqa facebookPageList out", facebookPageList);
    console.log(getDeleteAcc, "getDeleteAcc");
    let clearPopup;
    const handleGetAddCohostClose = () => {
        setAddCohost(false);
    };

    const handleAlertClose = () => {
        setIntegrationAlert(false);
    };

    const fetchDataInitial = () => {
        return Get(`${apiUrl}simulcast/api/media-config/get-media-list?token_check=true`, true).then((res) => {
            if (res?.status === 200) {
                let count = 0;
                for(const element of res?.data?.response){
                    if(element?.status === 2){
                        count = count + 1;
                    }
                }
                console.log(" resresresresreeerreerr", count)
                setReconnectCount(count);
            }
        }).catch((err) => {
            console.error('Error fetching responseGetMediaConfig data:', err);
        });
    };

    const fetchData = () => {
        return Get(`${apiUrl}simulcast/api/media-config/get-media-list?media_type=YT&token_check=true`, true).then((res) => {
            store.dispatch(getAccessTokenAction(res?.data?.response[0]));
            if (res.status === 200) {
                setYTUsername(res?.data?.response);
                setYTMediaMail(res?.data?.data?.mediaConfigList[0]?.mediaMail);
                setYTMediaId(res?.data?.data?.mediaConfigList[0]?.mediaId);
            }
        }).catch((err) => {
            console.error('Error fetching responseGetMediaConfig data:', err);
        });
    };

    const fetchFb = () => {
        return Get(`${apiUrl}simulcast/api/media-config/get-media-list?media_type=FB&token_check=true`, true).then((res) => {
            if (res.status === 200) {
                setFbAccountList(res?.data?.response);
            }
        }).catch((err) => {
            console.error('Error fetching responseGetMediaConfig data:', err);
        });
    };

    useEffect(() => {
        if(reconnectAccount){
            fetchData();
            fetchFb();
            fetchDataInitial();
        }
    },[reconnectAccount]);

    const handleAccordion = (state = "") => {
        setIsAccordionOpen(state === isAccordionOpen ? "" : state);
    };

    const handlePopup = (state) => {
        setDeletePopup(state);
    };

    const handleActionPopupType = (state) => {
        setActionPopupType(state);
        setFbAccDetails("");
    };

    const handleFacebookPagePermissions = () => {
        setActionPopupType("ChooseFacebookPage");
    };
    const handleFacebookNotFound = () => {
        setActionPopupType(false);
        window.open("https://www.facebook.com/pages", "_blank", "noopener");
    };
    const handleChooseFacebookPage = async () => {
        console.log("qaqa cc pppeee ", fbAccDetails);
        const fbPageParams = {
            "media_type": fbAccDetails?.datas?.media_type,
            "media_id": fbAccDetails?.datas?.media_id,
            "config_id": fbAccDetails?.selectConfigId,
            "config_type": fbAccDetails?.datas?.config_type
        };
        store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
        if (fbAccDetails === "") {
            setActionPopupType(false);
        } else {
            const resFbPage = await Post(
                `${apiUrl}simulcast/api/media-config-type`, fbPageParams);
            console.log("qaqa cc resFbPage", resFbPage);
            if (resFbPage?.status === 200) {
                store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
                setActionPopupType("FacebookPageSuccess");
                fetchFb();
            } else {
                console.log("resFbPageresFbPageres error");
                failToast(resFbPage?.data?.message);
            }
        }
    };

    const handleChooseFacebookProfile = async () => {
        console.log("qaqa cc pppeee ", fbAccDetails);
        const fbPageParams = {
            media_type: fbAccDetails?.datas?.media_type,
            media_id: fbAccDetails?.datas?.media_id,
            config_id: fbAccDetails?.selectConfigId,
            config_type: fbAccDetails?.datas?.config_type,
        };
        if (fbAccDetails === "") {
            setActionPopupType(false);
        } else {
            const resFbPage = await Post(
                `${apiUrl}simulcast/api/media-config-type`, fbPageParams);
            console.log("qaqa cc resFbPage", resFbPage);
            if (resFbPage?.status === 200) {
                setActionPopupType("FacebookProfileSuccess");
                fetchFb();
            } else {
                failToast(resFbPage?.data?.message);
            }
        }
    };

    const handleChooseFacebookGroup = async () => {
        setActionPopupType("ChooseFacebookGroup");
        console.log("qaqa cc pppeee ", fbAccDetails);
        const fbPageParams = {
            "media_type": fbAccDetails?.datas?.media_type,
            "media_id": fbAccDetails?.datas?.media_id,
            "config_id": fbAccDetails?.selectConfigId,
            "config_type": fbAccDetails?.datas?.config_type
        };
        if (fbAccDetails === "") {
            setActionPopupType(false);
        } else {
            const resFbPage = await Post(
                `${apiUrl}simulcast/api/media-config-type`, fbPageParams);
            console.log("qaqa cc resFbPage", resFbPage);
            if (resFbPage?.status === 200) {
                setActionPopupType("FacebookGroupSuccess");
                fetchFb();
            } else {
                console.log("resFbPageresFbPageres error");
                failToast(resFbPage?.data?.message);
            }
        }
    };

    useEffect(() => {
        if (getActionPopupType === false && clearPopup) {
            clearTimeout(clearPopup);
        }
    }, [getActionPopupType]);

    useEffect(() => {
        if (getActionPopupType === "FacebookPageSuccess" || getActionPopupType === "FacebookProfileSuccess") {
            clearPopup = setTimeout(() => {
                setActionPopupType(false);
                clearTimeout(clearPopup);
            }, 5000);
        }
        return (() => {
            clearTimeout(clearPopup);
        })
    }, [getActionPopupType]);

    const choosePage = (datas, selectConfigId) => {
        console.log("qaqa active ddssaa", datas, selectConfigId);
        setFbAccDetails({ datas, selectConfigId });
        setFbGroupId(selectConfigId);
    };

    const handleSelectFacebookGroup = () => {
        setActionPopupType("AddOntheflYFacebookGroup");
    };
    const handleAddOntheflYFbGroup = () => {
        setActionPopupType("");
    };

    const handleFacebookProfilePermissions = () => {
        setActionPopupType("ChooseFacebookProfile");
    };

    const youtubeDisconnect = async () => {
        console.log("getYTMediaID", getYTMediaMail);
        try {
            const responseDeleteMediaConfig = await Delete(
                `${apiUrl}api/customer/deleteMediaConfig?mediaMail=${getYTMediaMail}&mediaId=${getYTMediaId}&mediaType=YT`,
                true
            );
            console.log("1q1q responseDeleteMediaConfig:", responseDeleteMediaConfig);
            if (responseDeleteMediaConfig.status === 200) {
                setYTUsername("");
            }
        } catch (error) {
            console.error("Error fetching endLiveStream data:", error);
            console.log("Response endLiveStream data error:", error?.response);
        }
        handlePopup(false);
    };

    const onSuccess = async (response, tokenResponse, userInfo) => {
        const { profileObj = {} } = nullToObject(response);
        const {
            email = "",
            // type = "",
            // givenName = "",
            googleId = "",
        } = profileObj;

        const ACCESS_TOKEN = tokenResponse?.access_token;

        const headers = {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        };

        try {
            const responseStream = await axios.get(
                `${youtubeApiUrl}liveStreams?part=status&mine=true&key=${YOUTUBE_API_KEY}`,
                { headers }
            );
            console.log("responseStream Status responseStream:", responseStream);
            if (responseStream?.status === 200 && responseStream?.data?.items?.length > 0) {
                setAccSuccess(true);
                const responseMediaConfig = await createMediaConfig(tokenResponse, userInfo, "YT");
                console.log('1q1q responseMediaConfig:', responseMediaConfig?.data?.data?.mediaConfigList);
                if (responseMediaConfig.status === 200) {
                    setYTUsername(responseMediaConfig?.data?.data?.mediaConfigList);
                    setYTMediaMail(email);
                    setYTMediaId(googleId);
                    fetchData();
                }
                setTimeout(() => {
                    setAccSuccess(false);
                }, 6000);
            }
            if (responseStream?.status === 200 && responseStream?.data?.items?.length == 0) {
                try {
                    const responseIntegrationInitialStream = await axios.post(
                        `${youtubeApiUrl}liveStreams?part=id&part=snippet&part=cdn&key=${YOUTUBE_API_KEY}`,
                        streamDetails,
                        { headers }
                    );
                    console.log(
                        "responseStream Status responseIntegrationInitialStream:",
                        responseIntegrationInitialStream
                    );
                    if (responseIntegrationInitialStream?.status === 200) {
                        onSuccess(response, tokenResponse, userInfo);
                    }
                } catch (error) {
                    console.error(
                        "Error fetching responseIntegrationInitialStream data:",
                        error
                    );
                    console.log('Response data responseIntegrationInitialStream:', error?.response?.data);
                    setActiveAcc(error?.response?.data?.error?.code === 403);
                }
            }
        } catch (error) {
            console.error("Error fetching broadcast data:", error);
            console.log('Response data:', error?.response?.data);
            setEnableLiveStreaming(error?.response?.data?.error?.code === 403);
        }
    };

    const youtubeIntegration = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            console.log(codeResponse);
            const auth_code = codeResponse?.code;
            const redirect_url = window?.location?.origin;
            const tokenParams = {
                "code": auth_code,
                "redirect_url": redirect_url,
                "media_type": "YT",
            };
            const getToken = await Post(
                `${apiUrl}simulcast/api/media-config/auth-code`,
                tokenParams
            );
            const tokenResponse = getToken?.data?.response;
            const { access_token } = getToken.data.response;
            localStorage.setItem(
                "tokenResponse integration",
                JSON.stringify(codeResponse)
            );
            const response = await getGoogleUserDetails(access_token);
            const { data: { data = {}, status = 0 } = {} } = nullToObject(response);
            if (status === 200) {
                const newObj = {
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
                onSuccess(newObj, tokenResponse, userInfo?.data);
                console.log("qaqa onSuccess", userInfo?.data);
                // setYTUsername(data.name)
            } else {
                console.log("onFailure", data);
                // // onFailure(data, "google");
            }
        },
        flow: "auth-code",
        scope: "https://www.googleapis.com/auth/youtube",
        onError: (errorResponse) => {
            onFailure(errorResponse, "google");
        },
    });

    useEffect(() => {
        fetchData();
        fetchFb();
        fetchDataInitial();
        setDeleteDrop(false);
    }, []);

    const activePages = (data, fbDetails) => {
        console.log("qaqa active page int", data, fbDetails);
        console.log("qaqa actt setActionPopupType", getActionPopupType);
        if (fbDetails.media_id === undefined) {
            store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
        }
        if (fbDetails === "") {
            setActionPopupType(false);
        }
        if (fbDetails?.config_type === "page" && fbDetails.media_id !== undefined) {
            if (data && data?.length !== 0) {
                // // setActionPopupType("FacebookPageNotFound");
                store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
                setActionPopupType("ChooseFacebookPage");
                setFbId(fbDetails);
            } else {
                // // setActionPopupType("ChooseFacebookPage");
                store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
                setActionPopupType("FacebookPageNotFound");
            }
        } else if (fbDetails?.config_type === "profile" && fbDetails.media_id !== undefined) {
            if (data && data?.length !== 0) {
                console.log("qaqa active profile int", data, fbDetails);
                // // setActionPopupType("FacebookPageNotFound");
                store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
                setActionPopupType("ChooseFacebookProfile");
                setFbId(fbDetails);
            } else {
                // // setActionPopupType("ChooseFacebookPage");
                store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
                setActionPopupType("FacebookProfileNotFound");
            }
        } else if (fbDetails?.config_type === "group" && fbDetails.media_id !== undefined) {
            if (data && data?.length !== 0) {
                // // setActionPopupType("FacebookPageNotFound");
                store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
                setActionPopupType("ChooseFacebookGroup");
                setFbId(fbDetails);
            } else {
                // // setActionPopupType("ChooseFacebookPage");
                store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
                setActionPopupType("FacebookGroupNotFound");
            }
        }
    };

    const activeId = 1;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleDeleteAcc = (mediaId, state, name, accType, mediaType, configId) => {
        setDeleteAccId(mediaId);
        setDeleteAccMediaType(mediaType);
        setDeleteAccConfigId(configId ? configId : "");
        setDeleteAccType(accType);
        setDeleteAcc(state);
        setDeleteAccName(name);
    };
    const handleDeleteAccClose = (state = false) => {
        setDeleteAcc(state);
    };

    const handleDisconnectAcc = async (mediaId, configId, mediaType, accType) => {
        const deleteMediaAcc = {
            "media_id": mediaId,
            "media_type": mediaType
            // "config_id": configId ? configId : "YT"
        };
        store.dispatch({ type: "DO_LOADING_PAGE", loading: true });
        if(configId){
            deleteMediaAcc.config_id = configId;  // optional for youtube/ mandatory to delete facebook
        }
        const fbMediaDelete = await Post(
            `${apiUrl}simulcast/api/media-config-type/remove-config`, deleteMediaAcc,
            true
        );
        if (fbMediaDelete?.status === 200) {
            fetchData();
            fetchFb();
            fetchDataInitial();
            setDeleteAcc(false);
            succToast(`${mediaType === "FB" ? "Facebook " + capitalizeFirstLetter(accType) : "YouTube account"} has been disconnected.`);
            setTimeout(() => {
                store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
            }, 3000);
        } else {
            setTimeout(() => {
                store.dispatch({ type: "DO_LOADING_PAGE", loading: false });
            }, 3000);
            failToast(constantValue.SOMETHING);
        }
        console.log('qaqa fbMediaDelete:', fbMediaDelete);
    };

    useEffect(() => {
        setTimeout(() => {
            setAnimatePopup(true);
            setLoading(false);
        }, 500);
        setLoading(true);
    }, []);

    const handleClose = () => {
        setEnableLiveStreaming(false);
    };
    const handleAccClose = () => {
        setActiveAcc(false);
    };
    const handleAccSuccessClose = () => {
        setAccSuccess(false);
    };

    return (
        <>
            {loading && <Loader type={"fixed overlay"} />}
            <div
                className={`integration_box_wraper ${!animatePopup ? " fadeIn-exit-active_ " : " fadeIn-enter-active_ "
                    } `}
            >
                <div className="">

                </div>
                <div className="integration_box">
                    <p>
                        Connect an account to OnTheFly. Once connected, you can stream to it
                        as often as you like. Not sure where to start?
                    </p>
                    <AccordianTab
                        _heading="Facebook"
                        _desc=" Connect an Facebook account to OnTheFly. Once connected, you
                        can stream to it as often as you like."
                        _isAccordionOpen={isAccordionOpen}
                        _handleAccordion={() => handleAccordion("menu_1")}
                        _icon={<IconFbDark />}
                        _menuId={"menu_1"}
                        _activeId={activeId}
                        _getDeleteDrop={getDeleteDrop}
                        _handleDeleteAcc={handleDeleteAcc}
                        accountList={fbAccountList}
                    >
                        <button
                            type="button"
                            onClick={() =>
                                handleActionPopupType("FacebookPagePermissions")
                            }
                            className="connection_box active"
                        >
                            <div className="connect_before">
                                <i>
                                    <IconFbDark />
                                </i>
                                <span>Facebook Page</span>
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                handleActionPopupType("FacebookGroupPermissions")
                            }
                            className="connection_box"
                        >
                            <div className="connect_before">
                                <i>
                                    <IconFbDark />
                                </i>
                                <span>Facebook Group</span>
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                handleActionPopupType("FacebookProfilePermissions")
                            }
                            className="connection_box"
                        >
                            <div className="connect_before">
                                <i>
                                    <IconFbDark />
                                </i>
                                <span>Facebook Profile</span>
                            </div>
                        </button>
                    </AccordianTab>
                    <AccordianTab
                        _heading="Youtube"
                        _desc="Connect an Youtube account to OnTheFly. Once connected, you
                        can stream to it as often as you like."
                        _isAccordionOpen={isAccordionOpen}
                        _menuId={"menu_2"}
                        _handleAccordion={() => handleAccordion("menu_2")}
                        _icon={<YoutubeIcon />}
                        _activeId={activeId}
                        _getDeleteDrop={getDeleteDrop}
                        _handleDeleteAcc={handleDeleteAcc}
                        accountList={getYTUsername}
                        youtubeReconnect={() => youtubeIntegration()}
                    >
                        <button
                            type="button"
                            className="connection_box active"
                            onClick={() => youtubeIntegration()}
                        >
                            <div className="connect_before">
                                <i className="img">
                                    <YoutubeIcon />
                                </i>
                                <span>Youtube Channel</span>
                            </div>
                        </button>
                    </AccordianTab>
                    {tempHide && (
                        <h3>LinkedIn</h3>
                    )}
                    {
                        tempHide && (
                            <div className="accordionbox">
                                <div onClick={() => handleAccordion("menu_3")} className='accordion_header'>
                                    <div className='accordion_headerleft'>
                                        <p>Connect an Linkedin account to OnTheFly. Once connected, you can stream to it as often as you like.</p>
                                    </div>
                                    <button type="button" className={`${isAccordionOpen === "menu_3" ? " active " : ""}accordion_right`}>
                                        <IconArrow />
                                    </button>
                                </div>
                                {isAccordionOpen === "menu_3" && (
                                    <div className='accordion_body'>
                                        <div className='box_row'>
                                            <div className='connection_box'>
                                                <i><LinkedInIcon /></i><span>LinkedIn Page</span>
                                            </div>
                                            <div className='connection_box'>
                                                <i><LinkedInIcon /></i><span>LinkedIn Group</span>
                                            </div>
                                            <div className='connection_box'>
                                                <i><LinkedInIcon /></i><span>LinkedIn Profile</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    }
                    {
                        tempHide && (
                            <h3>Twitter</h3>
                        )
                    }
                    {
                        tempHide && (
                            <div className="accordionbox">
                                <div >
                                    <div onClick={() => handleAccordion("menu_4")} className='accordion_header'>
                                        <div className='accordion_headerleft'>
                                            <p>Connect an Twitter account to OnTheFly. Once connected, you can stream to it as often as you like.</p>
                                        </div>
                                        <button type="button" className={`${isAccordionOpen === "menu_4" ? " active " : ""}accordion_right`}>
                                            <IconArrow />
                                        </button>
                                    </div>
                                </div>
                                {
                                    isAccordionOpen === "menu_4" && (
                                        <div className='accordion_body'>
                                            <div className='box_row'>
                                                <div className='connection_box'>
                                                    <i><FacebookIcon /></i><span>Twitter Page</span>
                                                </div>
                                                <div className='connection_box'>
                                                    <i><FacebookIcon /></i><span>Twitter Group</span>
                                                </div>
                                                <div className='connection_box'>
                                                    <i><FacebookIcon /></i><span>Twitter Profile</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div >
                        )
                    }
                    {reconnectCount > 0 ?
                    <IntegrationAlert
                        alertState={getIntegrationAlert}
                        errorsCount={reconnectCount}
                        _handleAlertClose={handleAlertClose} />
                    : null}
                </div>
            </div >
            {getAddCohost && tempHide ? (
                <AddCohostPopup _handleOnOutsideClick={handleGetAddCohostClose} />
            ) : null
            }
            {
                getDeleteAcc && (
                    <ActionPopup
                        iconComponent={<IconDisconnect />}
                        title="Disconnect Account?"
                        description={
                            <>
                                Are you sure you want to disconnect <strong> "{getDeleteAccName}" </strong> from {" "}
                                <strong> {getDeleteAccMediaType === "FB" ? "Facebook" : "YouTube"} </strong> account.
                            </>
                        }
                        setActive={true}
                        onExited={() => handleDeleteAccClose(false)}
                        actionButtonText="Disconnect"
                        cancelButtonText="Cancel"
                        handleClose={() => handleDeleteAccClose(false)}
                        handleAction={() => handleDisconnectAcc(getDeleteAccId, getDeleteAccConfigId, getDeleteAccMediaType, getDeleteAccType)}
                    />
                )
            }
            {
                getDeletePopup && (
                    <ActionPopup
                        title="Disconnect Account?"
                        iconComponent={<IconDisconnect />}
                        description={
                            <>
                                Are you sure you want to disconnect <strong> "{getDeleteAccName}" </strong> from {" "}
                                <strong> {getDeleteAccMediaType === "FB" ? "Facebook" : "YouTube"} </strong> account.
                            </>
                        }
                        setActive={true}
                        onExited={() => handlePopup(false)}
                        actionButtonText="Disconnect"
                        cancelButtonText="Cancel"
                        handleClose={() => handlePopup(false)}
                        handleAction={youtubeDisconnect}
                    />
                )
            }
            {getEnableLiveStreaming ? <EnableLiveStreaming _handleClose={handleClose} /> : null}
            {getActiveAcc ? <ActivateYoutubePopup editStream={true} _handleClose={handleAccClose} /> : null}
            {getAccSuccess ?
                <IntegrationsPopups
                    _type="YoutubeSuccess"
                    _handleAction={handleAccSuccessClose}
                    _handleClose={handleAccSuccessClose}
                />
                : null
            }

            {
                getActionPopupType === "FacebookPagePermissions" ? (
                    <IntegrationsPopups
                        _type="FacebookPagePermissions"
                        _handleAction={handleFacebookPagePermissions}
                        _handleClose={() => handleActionPopupType(false)}
                        activePage={activePages}
                    />)
                    : null
            }
            {
                getActionPopupType === "ChooseFacebookPage" ?
                    <IntegrationsPopups
                        _type="ChooseFacebookPage"
                        _handleAction={() => handleChooseFacebookPage()}
                        _handleClose={() => handleActionPopupType(false)}
                        fbId={getFbId}
                        choosePage={choosePage}
                    />
                    : null
            }
            {
                getActionPopupType === "FacebookPageNotFound" ?
                    <IntegrationsPopups
                        _type="FacebookPageNotFound"
                        _handleAction={() => handleFacebookNotFound()}
                        _handleClose={() => handleActionPopupType(false)}
                    />
                    : null
            }
            {
                getActionPopupType === "FacebookGroupPermissions" ?
                    <IntegrationsPopups
                        _type="FacebookGroupPermissions"
                        _handleAction={() => handleChooseFacebookGroup()}
                        _handleClose={() => handleActionPopupType(false)}
                        activePage={activePages}
                    />
                    : null
            }
            {
                getActionPopupType === "ChooseFacebookGroup" ?
                    <IntegrationsPopups
                        _type="ChooseFacebookGroup"
                        _handleAction={() => handleSelectFacebookGroup()}
                        _handleClose={() => handleActionPopupType(false)}
                        fbId={getFbId}
                        choosePage={choosePage}
                    />
                    : null
            }
            {
                getActionPopupType === "FacebookGroupSuccess" ?
                    <IntegrationsPopups
                        _type="FacebookGroupSuccess"
                        _handleAction={() => handleActionPopupType(false)}
                        _handleClose={() => handleActionPopupType(false)}
                    />
                    : null
            }
            {
                getActionPopupType === "FacebookGroupNotFound" ?
                    <IntegrationsPopups
                        _type="FacebookGroupNotFound"
                        _handleAction={() => handleFacebookNotFound()}
                        _handleClose={() => handleActionPopupType(false)}
                    />
                    : null
            }
            {
                getActionPopupType === "FacebookPageSuccess" ?
                    <IntegrationsPopups
                        _type="FacebookPageSuccess"
                        _handleAction={() => handleActionPopupType(false)}
                        _handleClose={() => handleActionPopupType(false)}
                    />
                    : null
            }
            {
                getActionPopupType === "AddOntheflYFacebookGroup" ?
                    <IntegrationsPopups
                        _type="AddOntheflYFacebookGroup"
                        _handleAction={() => handleAddOntheflYFbGroup()}
                        _handleClose={() => handleActionPopupType(false)}
                        fbGroupId={fbGroupId}
                    />
                    : null
            }
            {
                getActionPopupType === "FacebookProfilePermissions" ?
                    <IntegrationsPopups
                        _type="FacebookProfilePermissions"
                        _handleAction={handleFacebookProfilePermissions}
                        _handleClose={() => handleActionPopupType(false)}
                        activePage={activePages}
                    />
                    : null
            }
            {
                getActionPopupType === "ChooseFacebookProfile" ?
                    <IntegrationsPopups
                        _type="ChooseFacebookProfile"
                        _handleAction={() => handleChooseFacebookProfile()}
                        _handleClose={() => handleActionPopupType(false)}
                        fbId={getFbId}
                        choosePage={choosePage}
                    />
                    : null
            }
            {
                getActionPopupType === "FacebookProfileSuccess" ?
                    <IntegrationsPopups
                        _type="FacebookProfileSuccess"
                        _handleAction={() => handleActionPopupType(false)}
                        _handleClose={() => handleActionPopupType(false)}
                    />
                    : null
            }
        </>
    );
}
export default Integrations;
