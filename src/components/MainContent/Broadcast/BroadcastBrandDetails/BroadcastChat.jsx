import { MirrorflyConversation } from "mf-chat-uikit/dist";
import "mf-chat-uikit/dist/assets/scss/bundle.css";
import React, { useEffect, useState, memo } from 'react';
import "./BroadcastChat.scss";
import { ImgDevChatUnavailable } from '../../../../assets/img';
import { getSessionRequest } from "../../../../aws/awsHelper";
import store from "../../../../store";

const BroadcastChat = (_props = {}) => {
    const [popupAnimate, setPopupAnimate] = useState(false);
    const [getGroupId, setGroupId] = useState("");
    const awsStageData = store.getState()?.awsStageReducer;
    console.log("qwqw awsStageData", awsStageData);

    useEffect(() => {
        // // if (getGroupId !== "") {
        setTimeout(() => {
            setPopupAnimate(true);
        }, 500);
        return (() => {
            setPopupAnimate(false);
        });
        // // }
    }, []);

    useEffect(() => {
        setGroupId("");
        const constructedRequestData = getSessionRequest(awsStageData);
        console.log("qwqw constructedRequestData", constructedRequestData);
        setGroupId(constructedRequestData?.sessionJid);
        // // async function fetchData() {
        // //     const getRecentChats = await SDK.getRecentChats();
        // //     console.log("qsqs OTF-getRecentChats", getRecentChats?.data?.reverse()[0]?.fromUserId);
        // //     setGroupId(getRecentChats?.data?.reverse()[0]?.fromUserId);
        // // }
        // // fetchData();
    }, []);

    return (<>
        {
            popupAnimate ?
                <div className='BroadcastChat_chat_image'>

                    {getGroupId === "" ? <>
                        <img alt='chat' src={ImgDevChatUnavailable} />
                        <div className='chat_text'>Chat is currently unavailable at this moment. Please try again later.</div>
                    </> :
                        <div className='Broadcastchat_wrapper'>
                            <MirrorflyConversation
                                sdkInitial={true}
                                userId={getGroupId}
                                chatType="groupchat"
                                width="100%" // custom width for parent container
                                height="100%" // custom height for parent container
                            />
                        </div>
                    }
                </div >
                : null
        }
    </>);
};

export default memo(BroadcastChat);
