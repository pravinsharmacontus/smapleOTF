import React, { memo, useEffect, useState } from 'react';
import "./AccountsIntegration.scss";
import Ripples from 'react-ripples';
import OutsideClickHandler from 'react-outside-click-handler';
import { FacebookIcon, IconInfoSm, ImgCustomerPlaceholer, YoutubeIcon } from '../../../../assets/images';
import { useSelector } from 'react-redux';
import { IconDotAnimation, IconLoaderWhite } from '../../../../assets/img';
import { Link } from 'react-router-dom';
import { Get } from '../../../../common/httpRestServices';
import { apiUrl } from '../../../../helper/ApiUrl';
import Image from '../../../../common/Image';

function AccountsIntegration(props = {}) {
    const { handleGetSelectedMedia = () => { } } = props;
    const {
        closeStream
    } = props || {};
    const [getDropShows, setDropShows] = useState(false);
    const [getBtnTitle, setBtnTitle] = useState('');
    const [getDropSupport, setDropSupport] = useState(false);
    const [getConnectedMedia, setConnectedMedia] = useState("");
    const [getYTLoader, setYTLoader] = useState(false);
    const globalData = useSelector((state) => state) || {};
    const awsStageReducer = useSelector((state) => state?.awsStageReducer); //store
    const { stageArn = "" } = awsStageReducer;
    const {
        commonData
    } = globalData || {};
    const { startYTLoader, endYTLoader, deleteSocialAccount, reconnectAccount } = commonData;
    const mediaSelection = JSON.parse(localStorage.getItem('Select_Media'))
        ? JSON.parse(localStorage.getItem('Select_Media')) : "";

    const fetchSavedMedia = async () => {
        setConnectedMedia(false);
        const refreshBroadcast = awsStageReducer?.stage?.arn;
        // //const getsessionBroadcast = destructStageId(destructStage(stageArn || refreshBroadcast));
        return Get(`${apiUrl}simulcast/api/media-broadcast/list?broadcast_id=${stageArn || refreshBroadcast}`, true)
            .then((res) => {
                const getMedia = res?.data?.response[0];
                if (res?.status === 200 && getMedia) {
                    // // let result = Object.values({getMedia});
                    setConnectedMedia(getMedia);
                }
            })
            .catch((err) => {
                console.error("Error fetching responseGetMediaConfig data:", err);
                setConnectedMedia(false);
            });
    };

    useEffect(() => {
        mediaSelection && fetchSavedMedia();
    }, [mediaSelection]);

    useEffect(() => {
        deleteSocialAccount && !closeStream && fetchSavedMedia();
    }, [deleteSocialAccount, closeStream]);

    useEffect(() => {
        if(reconnectAccount){
            fetchSavedMedia();
        }
    }, [reconnectAccount]);

    useEffect(() => {
        setTimeout(() => {
            fetchSavedMedia();
        }, 200);
    }, []);

    useEffect(() => {
        if (endYTLoader?.status === 200) {
            setYTLoader(false);
        } else if (startYTLoader === true) {
            setYTLoader(true);
        }
    }, [startYTLoader, endYTLoader]);

    const handleDropClose = () => {
        setDropSupport(false);
        setDropShows(false);
    };

    const handleClick = () => {
        setDropShows(!getDropShows);
        setTimeout(() => {
            setDropSupport(true);
        }, 100);
    };

    const handleChooseMediaIcon = (_chooseMedia) => {
        switch (_chooseMedia) {
            case "YT":
                return <YoutubeIcon />;
            case "FB":
                return <FacebookIcon />;
            default: return false;
        };
    };

    useEffect(() => {
        setBtnTitle(getConnectedMedia?.name);
        handleGetSelectedMedia(getConnectedMedia?.name);
    }, [getConnectedMedia]);

    useEffect(() => {
        return (() => {
            setBtnTitle("");
        });
    }, []);

    return (
        <>
            {getYTLoader && getConnectedMedia && (
                <div className='initializing_youtube'>
                    <>
                        <strong>Initializing {getConnectedMedia?.media_type === "FB" ? "Facebook" : "YouTube"}</strong>
                        <div className=''>
                            <IconDotAnimation />
                        </div>
                    </>
                </div>
            )}
            {getConnectedMedia ?
                <div className='relative'>
                    <OutsideClickHandler
                        onOutsideClick={handleDropClose}
                    >
                        <button onClick={(endYTLoader) && handleClick} type="button" className={` button ${getConnectedMedia?.media_status === 2 ? " reconnect " : ""}`}>
                            <div title={getBtnTitle ? getBtnTitle : ""} className="acc_icon_btn">
                                {/* <YoutubeIcon /> */}
                                {handleChooseMediaIcon(getConnectedMedia?.media_type)}
                            </div>
                            {getConnectedMedia && !getYTLoader && getConnectedMedia?.media_status === 1 ?
                                <Image className={getYTLoader ? "userinfo_img_loader" : "userinfo_img"}
                                    placeholderImg={ImgCustomerPlaceholer}
                                    src={getConnectedMedia?.profile ? getConnectedMedia?.profile : ""}
                                    alt={"profile"} />
                                : null}
                            {getConnectedMedia?.media_status === 2 ? <div className='userinfo_img'>
                                <IconInfoSm className='info_icon ' />
                            </div> : null}
                            {getYTLoader && getConnectedMedia && <i className='response_loader'>
                                <IconLoaderWhite fill='#1EAC8F' />
                            </i>
                            }
                        </button>

                        {getDropShows && getDropSupport &&

                            <div className="_drop_menu">
                                <Link target="_blank" className='button' to='/initiating-broadcast'>
                                    <Ripples
                                        onClick={handleClick}
                                        color="#105ef126"
                                        className="btn_sso_ripple"
                                    >
                                        <i>
                                            {handleChooseMediaIcon(getConnectedMedia?.media_type || mediaSelection)}
                                        </i>
                                        <span>View on {getConnectedMedia?.media_type === "FB" ? "Facebook" : "YouTube"}</span>
                                    </Ripples>
                                </Link>
                            </div>
                        }
                    </OutsideClickHandler>
                </div>
                : null}
        </>
    );
}

export default memo(AccountsIntegration);
