"use strict";(self.webpackChunkonthefly=self.webpackChunkonthefly||[]).push([[989],{77344:(e,t,s)=>{s.d(t,{Z:()=>c});var a=s(72791),l=s(22020),n=s(40549),o=s(96211),i=s(80184);const d=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{t:t}=(0,l.$)(),{onExited:s,handleClose:d,handleAction:c,btnBlue:r=!1,children:h="",textActionButton:u=t("COMMON.DELETE"),textCancelButton:m=t("COMMON.CANCEL"),enableActionButton:p=!0,enableCancelButton:v=!0,parentClass:x="lg",minWidth:g="",enableScreenHeight:b=!1,customActionComponent:j=""}=e,[y,_]=(0,a.useState)(!1);(0,a.useEffect)((()=>(setTimeout((()=>{_(!0)}),100),_(!1))),[]),(0,a.useEffect)((()=>(setTimeout((()=>{_(!0)}),100),_(!1))),[]);const f=e=>{"Escape"===e.key&&d(!1)};return(0,a.useEffect)((()=>(document.addEventListener("keydown",f,!1),()=>{document.removeEventListener("keydown",f,!1)}))),(0,i.jsx)(a.Fragment,{children:(0,i.jsx)("div",{className:"PopupWrapper fixed xs",children:(0,i.jsx)("div",{className:"PopupInner ActionPopup  ".concat(x," "),children:(0,i.jsx)("div",{className:"outside_wraper",children:(0,i.jsx)(o.default,{onOutsideClick:()=>{d(!1)},children:(0,i.jsx)(n.Z,{in:y,timeout:300,classNames:"alert",unmountOnExit:!0,onExited:()=>s(!1),children:(0,i.jsxs)("div",{style:{minWidth:g},className:"ActionPopupInner ".concat(b?" fixedheight ":" "),children:[h,(0,i.jsxs)("div",{className:"group-btn",children:[p&&(0,i.jsx)(i.Fragment,{children:j||(0,i.jsx)("button",{type:"button","data-auto":"action_button",className:" Btn outline  ".concat(r?" blue ":" delete "," "),"data-jest-id":"jestProceedDelete",onClick:e=>{e.target.blur(),c()},children:u})}),v&&(0,i.jsx)("button",{className:"Btn outline","data-jest-id":"jestCancelDelete",onClick:e=>{e.target.blur(),d(!1)},children:m})]})]})})})})})})})},c=a.memo(d)},49112:(e,t,s)=>{s.d(t,{Z:()=>i});s(72791);var a=s(26831),l=s(77344),n=s(5060),o=s(80184);const i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{getvideoDetailsEle:t={},getSelectedUrl:s="",getSelectedThumb:i="",_handleAction:d=(()=>{}),_handleClose:c=(()=>{}),playData:r=""}=e;return(0,o.jsxs)(l.Z,{textActionButton:"Done",enableCancelButton:!1,handleAction:d,parentClass:"share_video_modal",onExited:()=>c(!1),handleClose:()=>c(!1),children:[(0,o.jsxs)("div",{className:"action_head",children:[(0,o.jsx)("i",{className:"delete",children:(0,o.jsx)(n.AC,{})}),(0,o.jsx)("strong",{children:"Share Video"})]}),(0,o.jsx)(a.Z,{getvideoDetailsEle:t,getSelectedUrl:s,getSelectedThumb:i,playData:r})]})}},27202:(e,t,s)=>{s.d(t,{Z:()=>r});var a=s(72791),l=s(80184);const n=e=>{const{playbackUrl:t="",getSelectedThumb:s="",livePlayer:n=!1}=e;console.log("PlayBackHls",e),(0,a.useEffect)((()=>(d(t),()=>{d("")})),[]);const o=["play-large","restart","play","seasons","mute","volume","captions","fullscreen","heart"],i=["play-large","restart","rewind","play","fast-forward","progress","seasons","mute","volume","captions","fullscreen","heart","duration","current-time"];function d(e){var t;const s=null===(t=window)||void 0===t?void 0:t.Plyr;let a=!1;const l=new s("#player",{max_resolution:720,debug:!0,autoplay:!0,title:"",invertTime:!0,hls:{enabled:!0,src:e},storage:{enabled:!0,key:"gudsho-check"},ads:{enabled:!1,tagUrl:"https://gudsho-newsaas-qa.s3.amazonaws.com/gudsho-ads/VASUKI/pvt-tom-and-jerrysubs-1/1684934099801-advertisement.xml"},keyboard:{global:!0},controls:n?o:i,settings:["quality","captions"],tooltips:{controls:!0},captions:{active:!0,update:!0},liveDetails:{enabled:n,connected:n}});function d(){if(a&&l.loading){l.stop();document.querySelector(".plyr--loading").classList.remove("plyr--loading"),l.fullscreen&&l.fullscreen.exit()}}l.setNextEpisodes=!0,l.setNextPromo=!0,l.on("next-episodes",(e=>{console.log("next-episodes",e.detail.plyr.nextEpisodes)})),l.on("help",(e=>{console.log("help",e.detail.plyr.helpPopup)})),l.on("seasons",(e=>{console.log("seasons",e.detail.plyr.seasonsPopup)})),l.on("next-promo",(e=>{console.log("next-promosss",e.detail.plyr.nextPromo)})),l.on("restart",(e=>{console.log("restart",e)})),l.on("adsimpression",(e=>{document.querySelector(".plyr__ads").classList.add("is-ads-player-show"),console.log("adsimpression:::",e)})),l.on("adscomplete",(e=>{document.querySelector(".plyr__ads").classList.remove("is-ads-player-show"),console.log("adscomplete:::",e)})),l.on("404",(e=>{console.log(e),a=!0,d()})),l.on("timeupdate",(e=>{d()}))}return(0,l.jsx)("video",{poster:s,className:"allrites-player","data-id":"89188",id:"player",controls:!0})};var o=s(42997),i=s(5060),d=s(49112),c=s(80180);const r=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{controlerHeight:t=0,playbackUrl:s="",livePlayer:r=!1,enableHeader:h="",createdAt:u="",title:m="",_handlePopup:p=(()=>{}),_handleBack:v=(()=>{}),getSelectedThumb:x=""}=e,[g,b]=(0,a.useState)({eleWidth:0,eleHeight:0,getVideoShare:!1}),{eleWidth:j=0,eleHeight:y=0,getVideoShare:_=!1}=g,f=()=>{b({...g,getVideoShare:!1})},N=()=>{console.log("handleResizeByVideoSize resize by video size");const e="16:9",s=e.split(":")[0],a=e.split(":")[1],l=document.getElementById("container-custom-vplayer"),n=document.getElementById("video_parent_top"),o=l.offsetWidth,i=l.offsetHeight-n.offsetHeight-t,d=s*i/a,c=a*o/s;o>d&&i>c?b({...g,eleWidth:d,eleHeight:c}):o<d&&i>c?b({...g,eleWidth:s*c/a,eleHeight:c}):o>d&&i<c&&b({...g,eleWidth:s*i/a,eleHeight:i})};return(0,a.useEffect)((()=>(N(),window.addEventListener("resize",N),()=>{window.removeEventListener("resize",N)})),[]),(0,l.jsxs)(a.Fragment,{children:[(0,l.jsxs)("div",{style:{display:!1===h?"none":""},id:"video_parent_top",className:"broadcasted_videos_head",children:[(0,l.jsx)("div",{className:"action_1",children:(0,l.jsx)("button",{title:"Close",onClick:v,className:"action_back",type:"button",children:(0,l.jsx)(c.luM,{})})}),(0,l.jsxs)("div",{style:{width:"".concat(Math.round(j),"px"),visibility:"hidden"},className:"action_2",children:[(0,l.jsxs)("div",{className:"action_2_left",children:[(0,l.jsx)("h2",{children:m}),(0,l.jsx)("span",{children:(0,o.tO)(u)})]}),(0,l.jsxs)("div",{className:"action_2_right relative",children:[(0,l.jsx)("div",{className:"relative",children:(0,l.jsxs)("button",{className:"action_download",type:"button",children:[(0,l.jsx)("span",{children:"Download"}),(0,l.jsx)(i.AK,{})]})}),(0,l.jsx)("button",{onClick:p,className:"",type:"button",children:"Share"})]})]})]}),(0,l.jsx)("div",{className:"video_parent_wraper",children:(0,l.jsx)("div",{className:"broadcasted_videos_body",children:(0,l.jsx)("div",{id:"big_video_wraper",className:"broadcasted_video",children:(0,l.jsx)("div",{className:"viewers_broadcast_video",children:(0,l.jsx)("div",{id:"container-custom-vplayer",className:"container-custom-vplayer",children:(0,l.jsx)("div",{style:{width:"".concat(Math.round(j),"px"),height:"".concat(Math.round(y),"px")},className:"video-container",id:"video-container",children:(0,l.jsx)(n,{livePlayer:r,getSelectedThumb:x,playbackUrl:s})})})})})})}),_&&(0,l.jsx)(d.Z,{_handleAction:()=>{f()},_handleClose:()=>{f()}})]})}},38989:(e,t,s)=>{s.r(t),s.d(t,{default:()=>i});var a=s(72791),l=s(5060),n=s(27202),o=s(80184);const i=function(){return(0,o.jsx)(a.Fragment,{children:(0,o.jsxs)("div",{className:"embeded_video_page",style:{width:"100%",height:"100%"},children:[(0,o.jsxs)("div",{className:"embeded_overlay_top",children:[(0,o.jsx)("div",{className:"img",children:(0,o.jsx)("img",{src:l.Mf,alt:"",className:"logo"})}),(0,o.jsx)("div",{className:"video_session_name",children:(0,o.jsx)("p",{children:"MirrorFly Product UI Demo"})})]}),(0,o.jsx)(n.Z,{shareLiveUrl:!1,staticControl:!1,controlerHeight:0,playbackUrl:"https://s3.ap-south-1.amazonaws.com/onthefly.ivs.recording/ivs/v1/680703584604/7s2wiQnDIdLY/2023/7/13/7/57/mBQaCZXWC5oK/media/hls/master.m3u8",enableHeader:!1,getSelectedThumb:"",getvideoDetailsEle:{title:"temp",createdAt:123123123}})]})})}},26831:(e,t,s)=>{s.d(t,{Z:()=>m});var a=s(72791),l=s(52024),n=s(22020),o=s(72764),i=s(5060),d=s(80180),c=s(86299),r=s(16030),h=s(27202),u=s(80184);const m=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=/^[0-9\b]+$/,{_videoId:s="",getSelectedUrl:m="",shareLiveUrl:p=!1,getvideoDetailsEle:v="",getSelectedThumb:x=""}=e,[g,b]=(0,a.useState)(!1),j=()=>{b(!g)},y=(0,r.v9)((e=>null===e||void 0===e?void 0:e.awsStageReducer)),_=(0,r.v9)((e=>null===e||void 0===e?void 0:e.broadcastBranding)),{sessionName:f=""}=y,[N,C]=(0,a.useState)(560),[S,w]=(0,a.useState)(315),[E,k]=(0,a.useState)(""),[A,B]=(0,a.useState)(""),[L,T]=(0,a.useState)(!0),[P,D]=(0,a.useState)(g?"100%":"px"),[I,O]=(0,a.useState)(g?"100%":"px"),U=(null===_||void 0===_?void 0:_.hlsLink)||"",{t:H}=(0,n.$)();return(0,a.useEffect)((()=>{if(s&&document&&document.getElementById(s)){const e=(()=>{const e=document.createElement("canvas");e.style.display="none";const t=document.getElementById(s);return e.width=348,e.height=196,e.getContext("2d").drawImage(t,0,0,e.width,e.height),e.toDataURL("image/png")})();B(e)}}),[]),(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)("div",{className:"broadcaste_video_share_wraper",children:[(0,u.jsxs)("div",{className:"playback_video_wraper",children:[""===E&&(0,u.jsx)("div",{className:"overlay",children:(0,u.jsx)("button",{className:"play_button",onClick:()=>(T(!1),void setTimeout((()=>{k(m),T(!0)}),5e3)),type:"button",children:L?(0,u.jsx)(i.JF,{fill:"#fff"}):(0,u.jsx)(d.AE_,{fill:"#1367F2"})})}),""!==E?(0,u.jsx)(h.Z,{livePlayer:!0,shareLiveUrl:p,staticControl:!1,controlerHeight:0,playbackUrl:E,enableHeader:!1,getSelectedThumb:x||A||i.as,getvideoDetailsEle:v}):(0,u.jsx)("img",{src:x||A||i.as,alt:"poster"})]}),p?null:(0,u.jsx)("fieldset",{children:(0,u.jsx)(c.Z,{readOnly:!0,enableCopyIcon:!0,type:"text",caps:!1,mustFill:!1,value:"".concat(o.$Y).concat(U),name:"share_video",palceholder:p?"Viewer Joining Link":"Copy Video Link",_onBlur:()=>{},_onchange:()=>{},customClass:"",error:!1,className:" mb-0 "})}),(0,u.jsx)("div",{className:"common-input-wrapper copy_icon_hover_top mb-0",children:(0,u.jsx)(l.ld,{textAreaType2:!0,enableCopyIcon:!(!N||!S),mustFill:!1,type:"textarea",palceholder:"Embed",className:"mb-0",disabled:!1,value:'<iframe style="border: none" width="'.concat(g?"100":N).concat(g?"%":P,'"\nheight="').concat(g?"100":S).concat(g?"%":I,'" src="').concat(o.$Y).concat(U,'"\ntitle="').concat(f,'" frameborder="0"></iframe>'),name:"embeded",id:"embed-value",_onClick:e=>{var t;null===e||void 0===e||null===(t=e.target)||void 0===t||t.select()},customClass:"commonTextarea min-h custom_bg  ".concat(""),_onchange:()=>{},_onBlur:()=>{},error:!1,readOnly:!0,children:(0,u.jsxs)("div",{className:"radio_custom_check",children:[(0,u.jsxs)("div",{className:"radio-custom",children:[(0,u.jsxs)("label",{className:"radio",children:[(0,u.jsx)("input",{type:"radio",id:"responsive_size",value:g,onChange:j,checked:g}),(0,u.jsx)("label",{})]}),(0,u.jsx)("label",{htmlFor:"responsive_size",className:"label",children:H("BROADCAST.LAYOUT_OPTIONS.RESPONSIVE_SIZE")})]}),(0,u.jsxs)("div",{className:"radio-custom",children:[(0,u.jsxs)("label",{className:"radio",children:[(0,u.jsx)("input",{type:"radio",id:"fixed_size",value:!g,onChange:j,checked:!g}),(0,u.jsx)("label",{})]}),(0,u.jsx)("label",{htmlFor:"fixed_size",className:"label",children:H("BROADCAST.LAYOUT_OPTIONS.FIXED_SIZE")})]}),!g&&(0,u.jsxs)("div",{className:"fixed_size_input ",children:[(0,u.jsxs)("fieldset",{className:"mb-0",children:[(0,u.jsx)("input",{placeholder:"width",type:"text",name:"width",maxLength:4,value:N,onChange:e=>{(""===e.target.value||t.test(e.target.value))&&C(e.target.value)}}),(0,u.jsx)("div",{className:"floating_action",children:(0,u.jsx)("button",{onClick:()=>function(){D("%"===(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"%")?"px":"%")}(P),type:"button",className:"",children:(0,u.jsx)("span",{children:P})})})]}),(0,u.jsxs)("fieldset",{className:"mb-0",children:[(0,u.jsx)("input",{placeholder:"height",type:"text",name:"height",maxLength:4,value:S,onChange:e=>{(""===e.target.value||t.test(e.target.value))&&w(e.target.value)}}),(0,u.jsx)("div",{className:"floating_action",children:(0,u.jsx)("button",{onClick:()=>function(){O("%"===(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"%")?"px":"%")}(I),type:"button",className:"",children:(0,u.jsx)("span",{children:I})})})]})]})]})})})]})})}}}]);
//# sourceMappingURL=989.e3d4102e.chunk.js.map