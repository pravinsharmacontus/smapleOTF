(self.webpackChunkonthefly=self.webpackChunkonthefly||[]).push([[476],{44642:(e,o,t)=>{"use strict";t.r(o),t.d(o,{default:()=>T});var n=t(72791),a=(t(43822),t(80180)),i=(t(94424),t(66310),t(80184));var s=t(5060),c=t(55872),l=t(62235),r=t(58577),d=t(72764),u=t(44233),p=t(96728),f=t(74569),v=t.n(f),h=t(76912),g=t(55402),_=t(62641),m=t(40235),b=t(16e3),y=t(16030),k=t(38456),x=t(7082),j=t(59561),F=t(55644),S=t(97467),w=t(16695);function P(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{_heading:o="",_desc:t="",_isAccordionOpen:n="",_menuId:r="",children:u="",_icon:p=(0,i.jsx)(s.lt,{}),_activeId:f="",_getDeleteDrop:v="",_handleAccordion:h=(()=>{}),_handleDeleteAcc:g=(()=>{}),accountList:_=[]}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("h3",{children:o}),(0,i.jsxs)("div",{className:"accordionbox",children:[(0,i.jsxs)("div",{onClick:h,className:"accordion_header",children:[(0,i.jsx)("div",{className:"accordion_headerleft",children:(0,i.jsx)("p",{children:t})}),(0,i.jsx)("button",{type:"button",className:"".concat(n===r?" active ":"","accordion_right"),children:(0,i.jsx)(s.CC,{})})]}),n===r&&(0,i.jsxs)("div",{className:"accordion_body",children:[(0,i.jsx)("div",{className:"box_row",children:u}),(null===_||void 0===_?void 0:_.length)>0&&(0,i.jsx)("div",{className:"acc_active_list",children:_.map(((e,o)=>{console.log("qwqw accountList",_,_.length-1);const{id:t="",profile:n="",name:r="",config_type:u="",media_type:h="",media_name:m="",media_profile:b="",media_id:y="",config_id:k="",status:x=""}=e;let j="";return j="page"===u?"Facebook Page":"Facebook Profile","YT"==h&&(j="YouTube Channel"),(0,i.jsx)("div",{className:" acc_active_li ".concat(t===f?"active":" "),children:(0,i.jsxs)("div",{type:"button",className:"acc_active_card",children:[(0,i.jsxs)("div",{className:"acc_active_img_card",children:[(0,i.jsx)(F.Z,{className:"acc_active_img",placeholderImg:a.XLb,src:n||b,alt:"acc_active_name"}),(0,i.jsx)("i",{className:"acc_acc_img",children:p})]}),(0,i.jsxs)("div",{className:"acc_active_info",children:[(0,i.jsx)("strong",{title:r||m,className:"acc_active_name",children:r||m}),(0,i.jsx)("span",{className:"acc_active_type",children:j})]}),2===x?(0,i.jsxs)("button",{type:"button",className:"btn_reconnect",children:[(0,i.jsx)("span",{className:"btn_reconnect_icon",children:(0,i.jsx)(a.zok,{})}),(0,i.jsxs)("div",{className:" btn_reconnect_info_toast ".concat((null===_||void 0===_?void 0:_.length)-1===o&&0!==o?" top ":""),children:["Access to your ","FB"===h?" Facebook ":" YouTube ","account was lost. Please click on reconnect to connect and continue using service."]}),"FB"===h?(0,i.jsx)(S.Z,{className:"btn_reconnect_text btn_reconnect p-0",textActionButton:"Reconnect",scope:"public_profile,publish_video",type:k?"page":"",reconnectItems:{mediaId:y,mediaType:h,configId:k,configType:u}}):(0,i.jsx)(c.rg,{clientId:d.eZ,children:(0,i.jsx)(w.Z,{})})]}):null,(0,i.jsx)("div",{className:"relative drop_action_wraper",children:(0,i.jsx)("button",{title:"Disconnect",className:"drop_action_btn ".concat(v===t?"active":""),type:"button",onClick:()=>g(y,!0,r||m,u,h,k),children:(0,i.jsx)(s.n0,{})})})]})},(0,l.rv)(o+"fbAccountList"))}))})]})]})]})}const C=(0,n.memo)(P);function O(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{errorsCount:o="",_handleAlertClose:t=(()=>{}),alertState:s=!1}=e,[c,l]=(0,n.useState)(!1),[r,d]=(0,n.useState)(!1);return(0,n.useEffect)((()=>{s?(d(!0),setTimeout((()=>{l(!0)}),500)):(l(!1),setTimeout((()=>{d(!1)}),2e3))}),[s]),(0,i.jsx)(i.Fragment,{children:r?(0,i.jsx)("div",{className:"".concat(c?"open":"close"," integration_box_alert "),children:(0,i.jsxs)("div",{className:"integration_box_alert_body",children:[(0,i.jsx)("span",{className:"integration_box_alert_icon",children:(0,i.jsx)(a.v5H,{})}),(0,i.jsxs)("div",{className:"integration_box_alert_text",children:[o," Errors! OnTheFly has lost access to some of your social media accounts"]}),(0,i.jsx)("button",{onClick:t,title:"close",className:"integration_box_alert_close",children:(0,i.jsx)(a.kLi,{})})]})}):null})}const A=(0,n.memo)(O);var N=t(15430);const I=function(){const e=(0,y.v9)((e=>e))||{},{facebookPageList:o}=(null===e||void 0===e?void 0:e.facebookData)||{},{commonData:t}=e||{},{reconnectAccount:f}=t,[F,S]=(0,n.useState)("menu_1"),[w,P]=(0,n.useState)(!1),[O,I]=(0,n.useState)(!1),[L,E]=(0,n.useState)(!1),[T,D]=(0,n.useState)(!1),[G,q]=(0,n.useState)(!1),[Z,B]=(0,n.useState)(!1),[M,R]=(0,n.useState)(!1),[Y,W]=(0,n.useState)(!1),[J,U]=(0,n.useState)(!1),[z,H]=(0,n.useState)(!1),[X,$]=(0,n.useState)(!1),[K,V]=(0,n.useState)(!1),[Q,ee]=(0,n.useState)(!1),[oe,te]=(0,n.useState)(""),[ne,ae]=(0,n.useState)(""),[ie,se]=(0,n.useState)(""),[ce,le]=(0,n.useState)(""),[re,de]=(0,n.useState)(""),[ue,pe]=(0,n.useState)([]),[fe,ve]=(0,n.useState)(""),[he,ge]=(0,n.useState)(""),[_e,me]=(0,n.useState)(!1),[be,ye]=(0,n.useState)(!1),[ke,xe]=(0,n.useState)(!0),je=!1;let Fe;console.log("qaqa facebookPageList out",o),console.log(M,"getDeleteAcc");const Se=()=>(0,u.dX)("".concat(d.JW,"simulcast/api/media-config/get-media-list?token_check=true"),!0).then((e=>{if(200===(null===e||void 0===e?void 0:e.status)){let t=0;for(const n of null===e||void 0===e||null===(o=e.data)||void 0===o?void 0:o.response){var o;2===(null===n||void 0===n?void 0:n.status)&&(t+=1)}console.log(" resresresresreeerreerr",t),se(t)}})).catch((e=>{console.error("Error fetching responseGetMediaConfig data:",e)})),we=()=>(0,u.dX)("".concat(d.JW,"simulcast/api/media-config/get-media-list?media_type=YT&token_check=true"),!0).then((e=>{var o,t,n,a,i,s,c,l;(_.Z.dispatch((0,m.tM)(null===e||void 0===e||null===(o=e.data)||void 0===o?void 0:o.response[0])),200===e.status)&&(te(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.response),ae(null===e||void 0===e||null===(n=e.data)||void 0===n||null===(a=n.data)||void 0===a||null===(i=a.mediaConfigList[0])||void 0===i?void 0:i.mediaMail),le(null===e||void 0===e||null===(s=e.data)||void 0===s||null===(c=s.data)||void 0===c||null===(l=c.mediaConfigList[0])||void 0===l?void 0:l.mediaId))})).catch((e=>{console.error("Error fetching responseGetMediaConfig data:",e)})),Pe=()=>(0,u.dX)("".concat(d.JW,"simulcast/api/media-config/get-media-list?media_type=FB&token_check=true"),!0).then((e=>{var o;200===e.status&&pe(null===e||void 0===e||null===(o=e.data)||void 0===o?void 0:o.response)})).catch((e=>{console.error("Error fetching responseGetMediaConfig data:",e)}));(0,n.useEffect)((()=>{f&&(we(),Pe(),Se())}),[f]);const Ce=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";S(e===F?"":e)},Oe=e=>{B(e)},Ae=e=>{E(e),ve("")},Ne=()=>{E(!1),window.open("https://www.facebook.com/pages","_blank","noopener")};(0,n.useEffect)((()=>{!1===L&&Fe&&clearTimeout(Fe)}),[L]),(0,n.useEffect)((()=>("FacebookPageSuccess"!==L&&"FacebookProfileSuccess"!==L||(Fe=setTimeout((()=>{E(!1),clearTimeout(Fe)}),5e3)),()=>{clearTimeout(Fe)})),[L]);const Ie=(e,o)=>{console.log("qaqa active ddssaa",e,o),ve({datas:e,selectConfigId:o}),ge(o)},Le=async(e,o,t)=>{const{profileObj:n={}}=(0,l._6)(e),{email:a="",googleId:i=""}=n,s=null===o||void 0===o?void 0:o.access_token,c={Authorization:"Bearer ".concat(s),Accept:"application/json","Content-Type":"application/json"};try{var r,u,p,f;const n=await v().get("".concat(d.pk,"liveStreams?part=status&mine=true&key=").concat(d.Lq),{headers:c});if(console.log("responseStream Status responseStream:",n),200===(null===n||void 0===n?void 0:n.status)&&(null===n||void 0===n||null===(r=n.data)||void 0===r||null===(u=r.items)||void 0===u?void 0:u.length)>0){var h,_;ye(!0);const e=await(0,g.iN)(o,t,"YT");var m,b;if(console.log("1q1q responseMediaConfig:",null===e||void 0===e||null===(h=e.data)||void 0===h||null===(_=h.data)||void 0===_?void 0:_.mediaConfigList),200===e.status)te(null===e||void 0===e||null===(m=e.data)||void 0===m||null===(b=m.data)||void 0===b?void 0:b.mediaConfigList),ae(a),le(i),we();setTimeout((()=>{ye(!1)}),6e3)}if(200===(null===n||void 0===n?void 0:n.status)&&0==(null===n||void 0===n||null===(p=n.data)||void 0===p||null===(f=p.items)||void 0===f?void 0:f.length))try{const n=await v().post("".concat(d.pk,"liveStreams?part=id&part=snippet&part=cdn&key=").concat(d.Lq),g.Y2,{headers:c});console.log("responseStream Status responseIntegrationInitialStream:",n),200===(null===n||void 0===n?void 0:n.status)&&Le(e,o,t)}catch(O){var y,k,x,j;console.error("Error fetching responseIntegrationInitialStream data:",O),console.log("Response data responseIntegrationInitialStream:",null===O||void 0===O||null===(y=O.response)||void 0===y?void 0:y.data),me(403===(null===O||void 0===O||null===(k=O.response)||void 0===k||null===(x=k.data)||void 0===x||null===(j=x.error)||void 0===j?void 0:j.code))}}catch(O){var F,S,w,C;console.error("Error fetching broadcast data:",O),console.log("Response data:",null===O||void 0===O||null===(F=O.response)||void 0===F?void 0:F.data),P(403===(null===O||void 0===O||null===(S=O.response)||void 0===S||null===(w=S.data)||void 0===w||null===(C=w.error)||void 0===C?void 0:C.code))}},Ee=(0,c.Nq)({onSuccess:async e=>{var o,t,n;console.log(e);const a={code:null===e||void 0===e?void 0:e.code,redirect_url:null===(o=window)||void 0===o||null===(t=o.location)||void 0===t?void 0:t.origin,media_type:"YT"},i=await(0,u.SO)("".concat(d.JW,"simulcast/api/media-config/auth-code"),a),s=null===i||void 0===i||null===(n=i.data)||void 0===n?void 0:n.response,{access_token:c}=i.data.response;localStorage.setItem("tokenResponse integration",JSON.stringify(e));const p=await(0,r.nJ)(c),{data:{data:f={},status:h=0}={}}=(0,l._6)(p);if(200===h){const e={profileObj:{email:null===f||void 0===f?void 0:f.email,googleId:null===f||void 0===f?void 0:f.ssoid,givenName:null===f||void 0===f?void 0:f.name,type:"google",data:f}},o=await v().get("".concat(d.Af,"userinfo"),{headers:{Authorization:"Bearer ".concat(c)}});Le(e,s,null===o||void 0===o?void 0:o.data),console.log("qaqa onSuccess",null===o||void 0===o?void 0:o.data)}else console.log("onFailure",f)},flow:"auth-code",scope:"https://www.googleapis.com/auth/youtube",onError:e=>{onFailure(e,"google")}});(0,n.useEffect)((()=>{we(),Pe(),Se(),ee(!1)}),[]);const Te=(e,o)=>{console.log("qaqa active page int",e,o),console.log("qaqa actt setActionPopupType",L),void 0===o.media_id&&_.Z.dispatch({type:"DO_LOADING_PAGE",loading:!1}),""===o&&E(!1),"page"===(null===o||void 0===o?void 0:o.config_type)&&void 0!==o.media_id?e&&0!==(null===e||void 0===e?void 0:e.length)?(_.Z.dispatch({type:"DO_LOADING_PAGE",loading:!1}),E("ChooseFacebookPage"),de(o)):(_.Z.dispatch({type:"DO_LOADING_PAGE",loading:!1}),E("FacebookPageNotFound")):"profile"===(null===o||void 0===o?void 0:o.config_type)&&void 0!==o.media_id?e&&0!==(null===e||void 0===e?void 0:e.length)?(console.log("qaqa active profile int",e,o),_.Z.dispatch({type:"DO_LOADING_PAGE",loading:!1}),E("ChooseFacebookProfile"),de(o)):(_.Z.dispatch({type:"DO_LOADING_PAGE",loading:!1}),E("FacebookProfileNotFound")):"group"===(null===o||void 0===o?void 0:o.config_type)&&void 0!==o.media_id&&(e&&0!==(null===e||void 0===e?void 0:e.length)?(_.Z.dispatch({type:"DO_LOADING_PAGE",loading:!1}),E("ChooseFacebookGroup"),de(o)):(_.Z.dispatch({type:"DO_LOADING_PAGE",loading:!1}),E("FacebookGroupNotFound")))},De=(e,o,t,n,a,i)=>{U(e),H(a),$(i||""),V(n),R(o),W(t)},Ge=function(){R(arguments.length>0&&void 0!==arguments[0]&&arguments[0])};(0,n.useEffect)((()=>{setTimeout((()=>{D(!0),q(!1)}),500),q(!0)}),[]);const qe=()=>{ye(!1)};return(0,i.jsxs)(i.Fragment,{children:[G&&(0,i.jsx)(b.Z,{type:"fixed overlay"}),(0,i.jsxs)("div",{className:"integration_box_wraper ".concat(T?" fadeIn-enter-active_ ":" fadeIn-exit-active_ "," "),children:[(0,i.jsx)("div",{className:""}),(0,i.jsxs)("div",{className:"integration_box",children:[(0,i.jsx)("p",{children:"Connect an account to OnTheFly. Once connected, you can stream to it as often as you like. Not sure where to start?"}),(0,i.jsxs)(C,{_heading:"Facebook",_desc:" Connect an Facebook account to OnTheFly. Once connected, you can stream to it as often as you like.",_isAccordionOpen:F,_handleAccordion:()=>Ce("menu_1"),_icon:(0,i.jsx)(s.lt,{}),_menuId:"menu_1",_activeId:1,_getDeleteDrop:Q,_handleDeleteAcc:De,accountList:ue,children:[(0,i.jsx)("button",{type:"button",onClick:()=>Ae("FacebookPagePermissions"),className:"connection_box active",children:(0,i.jsxs)("div",{className:"connect_before",children:[(0,i.jsx)("i",{children:(0,i.jsx)(s.lt,{})}),(0,i.jsx)("span",{children:"Facebook Page"})]})}),(0,i.jsx)("button",{type:"button",onClick:()=>Ae("FacebookGroupPermissions"),className:"connection_box",children:(0,i.jsxs)("div",{className:"connect_before",children:[(0,i.jsx)("i",{children:(0,i.jsx)(s.lt,{})}),(0,i.jsx)("span",{children:"Facebook Group"})]})}),(0,i.jsx)("button",{type:"button",onClick:()=>Ae("FacebookProfilePermissions"),className:"connection_box",children:(0,i.jsxs)("div",{className:"connect_before",children:[(0,i.jsx)("i",{children:(0,i.jsx)(s.lt,{})}),(0,i.jsx)("span",{children:"Facebook Profile"})]})})]}),(0,i.jsx)(C,{_heading:"Youtube",_desc:"Connect an Youtube account to OnTheFly. Once connected, you can stream to it as often as you like.",_isAccordionOpen:F,_menuId:"menu_2",_handleAccordion:()=>Ce("menu_2"),_icon:(0,i.jsx)(a.LKl,{}),_activeId:1,_getDeleteDrop:Q,_handleDeleteAcc:De,accountList:oe,youtubeReconnect:()=>Ee(),children:(0,i.jsx)("button",{type:"button",className:"connection_box active",onClick:()=>Ee(),children:(0,i.jsxs)("div",{className:"connect_before",children:[(0,i.jsx)("i",{className:"img",children:(0,i.jsx)(a.LKl,{})}),(0,i.jsx)("span",{children:"Youtube Channel"})]})})}),je,je,je,je,ie>0?(0,i.jsx)(A,{alertState:ke,errorsCount:ie,_handleAlertClose:()=>{xe(!1)}}):null]})]}),null,M&&(0,i.jsx)(p.Z,{iconComponent:(0,i.jsx)(s.n0,{}),title:"Disconnect Account?",description:(0,i.jsxs)(i.Fragment,{children:["Are you sure you want to disconnect ",(0,i.jsxs)("strong",{children:[' "',Y,'" ']})," from "," ",(0,i.jsxs)("strong",{children:[" ","FB"===z?"Facebook":"YouTube"," "]})," account."]}),setActive:!0,onExited:()=>Ge(!1),actionButtonText:"Disconnect",cancelButtonText:"Cancel",handleClose:()=>Ge(!1),handleAction:()=>(async(e,o,t,n)=>{const a={media_id:e,media_type:t};_.Z.dispatch({type:"DO_LOADING_PAGE",loading:!0}),o&&(a.config_id=o);const i=await(0,u.SO)("".concat(d.JW,"simulcast/api/media-config-type/remove-config"),a,!0);var s;200===(null===i||void 0===i?void 0:i.status)?(we(),Pe(),Se(),R(!1),(0,k._X)("".concat("FB"===t?"Facebook "+((s=n).charAt(0).toUpperCase()+s.slice(1)):"YouTube account"," has been disconnected.")),setTimeout((()=>{_.Z.dispatch({type:"DO_LOADING_PAGE",loading:!1})}),3e3)):(setTimeout((()=>{_.Z.dispatch({type:"DO_LOADING_PAGE",loading:!1})}),3e3),(0,k.LP)(N.G.SOMETHING)),console.log("qaqa fbMediaDelete:",i)})(J,X,z,K)}),Z&&(0,i.jsx)(p.Z,{title:"Disconnect Account?",iconComponent:(0,i.jsx)(s.n0,{}),description:(0,i.jsxs)(i.Fragment,{children:["Are you sure you want to disconnect ",(0,i.jsxs)("strong",{children:[' "',Y,'" ']})," from "," ",(0,i.jsxs)("strong",{children:[" ","FB"===z?"Facebook":"YouTube"," "]})," account."]}),setActive:!0,onExited:()=>Oe(!1),actionButtonText:"Disconnect",cancelButtonText:"Cancel",handleClose:()=>Oe(!1),handleAction:async()=>{console.log("getYTMediaID",ne);try{const e=await(0,u.HG)("".concat(d.JW,"api/customer/deleteMediaConfig?mediaMail=").concat(ne,"&mediaId=").concat(ce,"&mediaType=YT"),!0);console.log("1q1q responseDeleteMediaConfig:",e),200===e.status&&te("")}catch(e){console.error("Error fetching endLiveStream data:",e),console.log("Response endLiveStream data error:",null===e||void 0===e?void 0:e.response)}Oe(!1)}}),w?(0,i.jsx)(x.Z,{_handleClose:()=>{P(!1)}}):null,_e?(0,i.jsx)(j.Z,{editStream:!0,_handleClose:()=>{me(!1)}}):null,be?(0,i.jsx)(h.Z,{_type:"YoutubeSuccess",_handleAction:qe,_handleClose:qe}):null,"FacebookPagePermissions"===L?(0,i.jsx)(h.Z,{_type:"FacebookPagePermissions",_handleAction:()=>{E("ChooseFacebookPage")},_handleClose:()=>Ae(!1),activePage:Te}):null,"ChooseFacebookPage"===L?(0,i.jsx)(h.Z,{_type:"ChooseFacebookPage",_handleAction:()=>(async()=>{var e,o,t;console.log("qaqa cc pppeee ",fe);const n={media_type:null===fe||void 0===fe||null===(e=fe.datas)||void 0===e?void 0:e.media_type,media_id:null===fe||void 0===fe||null===(o=fe.datas)||void 0===o?void 0:o.media_id,config_id:null===fe||void 0===fe?void 0:fe.selectConfigId,config_type:null===fe||void 0===fe||null===(t=fe.datas)||void 0===t?void 0:t.config_type};if(_.Z.dispatch({type:"DO_LOADING_PAGE",loading:!0}),""===fe)E(!1);else{const e=await(0,u.SO)("".concat(d.JW,"simulcast/api/media-config-type"),n);var a;console.log("qaqa cc resFbPage",e),200===(null===e||void 0===e?void 0:e.status)?(_.Z.dispatch({type:"DO_LOADING_PAGE",loading:!1}),E("FacebookPageSuccess"),Pe()):(console.log("resFbPageresFbPageres error"),(0,k.LP)(null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.message))}})(),_handleClose:()=>Ae(!1),fbId:re,choosePage:Ie}):null,"FacebookPageNotFound"===L?(0,i.jsx)(h.Z,{_type:"FacebookPageNotFound",_handleAction:()=>Ne(),_handleClose:()=>Ae(!1)}):null,"FacebookGroupPermissions"===L?(0,i.jsx)(h.Z,{_type:"FacebookGroupPermissions",_handleAction:()=>(async()=>{var e,o,t;E("ChooseFacebookGroup"),console.log("qaqa cc pppeee ",fe);const n={media_type:null===fe||void 0===fe||null===(e=fe.datas)||void 0===e?void 0:e.media_type,media_id:null===fe||void 0===fe||null===(o=fe.datas)||void 0===o?void 0:o.media_id,config_id:null===fe||void 0===fe?void 0:fe.selectConfigId,config_type:null===fe||void 0===fe||null===(t=fe.datas)||void 0===t?void 0:t.config_type};if(""===fe)E(!1);else{const e=await(0,u.SO)("".concat(d.JW,"simulcast/api/media-config-type"),n);var a;console.log("qaqa cc resFbPage",e),200===(null===e||void 0===e?void 0:e.status)?(E("FacebookGroupSuccess"),Pe()):(console.log("resFbPageresFbPageres error"),(0,k.LP)(null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.message))}})(),_handleClose:()=>Ae(!1),activePage:Te}):null,"ChooseFacebookGroup"===L?(0,i.jsx)(h.Z,{_type:"ChooseFacebookGroup",_handleAction:()=>{E("AddOntheflYFacebookGroup")},_handleClose:()=>Ae(!1),fbId:re,choosePage:Ie}):null,"FacebookGroupSuccess"===L?(0,i.jsx)(h.Z,{_type:"FacebookGroupSuccess",_handleAction:()=>Ae(!1),_handleClose:()=>Ae(!1)}):null,"FacebookGroupNotFound"===L?(0,i.jsx)(h.Z,{_type:"FacebookGroupNotFound",_handleAction:()=>Ne(),_handleClose:()=>Ae(!1)}):null,"FacebookPageSuccess"===L?(0,i.jsx)(h.Z,{_type:"FacebookPageSuccess",_handleAction:()=>Ae(!1),_handleClose:()=>Ae(!1)}):null,"AddOntheflYFacebookGroup"===L?(0,i.jsx)(h.Z,{_type:"AddOntheflYFacebookGroup",_handleAction:()=>{E("")},_handleClose:()=>Ae(!1),fbGroupId:he}):null,"FacebookProfilePermissions"===L?(0,i.jsx)(h.Z,{_type:"FacebookProfilePermissions",_handleAction:()=>{E("ChooseFacebookProfile")},_handleClose:()=>Ae(!1),activePage:Te}):null,"ChooseFacebookProfile"===L?(0,i.jsx)(h.Z,{_type:"ChooseFacebookProfile",_handleAction:()=>(async()=>{var e,o,t;console.log("qaqa cc pppeee ",fe);const n={media_type:null===fe||void 0===fe||null===(e=fe.datas)||void 0===e?void 0:e.media_type,media_id:null===fe||void 0===fe||null===(o=fe.datas)||void 0===o?void 0:o.media_id,config_id:null===fe||void 0===fe?void 0:fe.selectConfigId,config_type:null===fe||void 0===fe||null===(t=fe.datas)||void 0===t?void 0:t.config_type};if(""===fe)E(!1);else{const e=await(0,u.SO)("".concat(d.JW,"simulcast/api/media-config-type"),n);var a;console.log("qaqa cc resFbPage",e),200===(null===e||void 0===e?void 0:e.status)?(E("FacebookProfileSuccess"),Pe()):(0,k.LP)(null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.message)}})(),_handleClose:()=>Ae(!1),fbId:re,choosePage:Ie}):null,"FacebookProfileSuccess"===L?(0,i.jsx)(h.Z,{_type:"FacebookProfileSuccess",_handleAction:()=>Ae(!1),_handleClose:()=>Ae(!1)}):null]})};var L=t(10830),E=t(19350);const T=function(){return(0,n.useEffect)((()=>{_.Z.dispatch((0,L.EE)("integration")),_.Z.dispatch((0,E.Af)(!1))}),[]),(0,n.useEffect)((()=>()=>{_.Z.dispatch((0,L.EE)(""))}),[]),(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(c.rg,{clientId:d.eZ,children:(0,i.jsx)(I,{})})})}},87210:function(e,o,t){var n;e.exports=(n=t(72791),function(e){function o(n){if(t[n])return t[n].exports;var a=t[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,o),a.loaded=!0,a.exports}var t={};return o.m=e,o.c=t,o.p="",o(0)}([function(e,o,t){e.exports=t(8)},function(e,o,t){e.exports=t(6)()},function(e,o){e.exports=n},function(e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default=function(e,o){return decodeURIComponent(e.replace(new RegExp("^(?:.*[&\\?]"+encodeURIComponent(o).replace(/[\.\+\*]/g,"\\$&")+"(?:\\=([^&]*))?)?.*$","i"),"$1"))}},function(e,o,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}function i(e,o){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!o||"object"!=typeof o&&"function"!=typeof o?e:o}function s(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function, not "+typeof o);e.prototype=Object.create(o&&o.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),o&&(Object.setPrototypeOf?Object.setPrototypeOf(e,o):e.__proto__=o)}Object.defineProperty(o,"__esModule",{value:!0});var c=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},l=function(){function e(e,o){for(var t=0;t<o.length;t++){var n=o[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(o,t,n){return t&&e(o.prototype,t),n&&e(o,n),o}}(),r=n(t(2)),d=n(t(1)),u=n(t(5)),p=n(t(3)),f=function(){var e=!1;try{e=!!(window.navigator&&window.navigator.standalone||navigator.userAgent.match("CriOS")||navigator.userAgent.match(/mobile/i))}catch(o){}return e},v=function(e){function o(){var e,t,n;a(this,o);for(var s=arguments.length,l=Array(s),r=0;r<s;r++)l[r]=arguments[r];return t=n=i(this,(e=o.__proto__||Object.getPrototypeOf(o)).call.apply(e,[this].concat(l))),n.state={isSdkLoaded:!1,isProcessing:!1},n.responseApi=function(e){window.FB.api("/me",{locale:n.props.language,fields:n.props.fields},(function(o){c(o,e),n.props.callback(o)}))},n.checkLoginState=function(e){n.setStateIfMounted({isProcessing:!1}),e.authResponse?n.responseApi(e.authResponse):n.props.onFailure?n.props.onFailure({status:e.status}):n.props.callback({status:e.status})},n.checkLoginAfterRefresh=function(e){"connected"===e.status?n.checkLoginState(e):window.FB.login((function(e){return n.checkLoginState(e)}),!0)},n.click=function(e){if(n.state.isSdkLoaded&&!n.state.isProcessing&&!n.props.isDisabled){n.setState({isProcessing:!0});var o=n.props,t=o.scope,a=o.appId,i=o.onClick,s=o.returnScopes,c=o.responseType,l=o.redirectUri,r=o.disableMobileRedirect,d=o.authType,p=o.state;if("function"!=typeof i||(i(e),!e.defaultPrevented)){var f={client_id:a,redirect_uri:l,state:p,return_scopes:s,scope:t,response_type:c,auth_type:d};if(n.props.isMobile&&!r)window.location.href="https://www.facebook.com/dialog/oauth"+(0,u.default)(f);else{if(!window.FB)return void(n.props.onFailure&&n.props.onFailure({status:"facebookNotLoaded"}));window.FB.login(n.checkLoginState,{scope:t,return_scopes:s,auth_type:f.auth_type})}}}},i(n,t)}return s(o,e),l(o,[{key:"componentDidMount",value:function(){if(this._isMounted=!0,document.getElementById("facebook-jssdk"))this.sdkLoaded();else{this.setFbAsyncInit(),this.loadSdkAsynchronously();var e=document.getElementById("fb-root");e||((e=document.createElement("div")).id="fb-root",document.body.appendChild(e))}}},{key:"componentWillReceiveProps",value:function(e){this.state.isSdkLoaded&&e.autoLoad&&!this.props.autoLoad&&window.FB.getLoginStatus(this.checkLoginAfterRefresh)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"setStateIfMounted",value:function(e){this._isMounted&&this.setState(e)}},{key:"setFbAsyncInit",value:function(){var e=this,o=this.props,t=o.appId,n=o.xfbml,a=o.cookie,i=o.version,s=o.autoLoad;window.fbAsyncInit=function(){window.FB.init({version:"v"+i,appId:t,xfbml:n,cookie:a}),e.setStateIfMounted({isSdkLoaded:!0}),(s||e.isRedirectedFromFb())&&window.FB.getLoginStatus(e.checkLoginAfterRefresh)}}},{key:"isRedirectedFromFb",value:function(){var e=window.location.search;return(0,p.default)(e,"code")||(0,p.default)(e,"granted_scopes")}},{key:"sdkLoaded",value:function(){this.setState({isSdkLoaded:!0})}},{key:"loadSdkAsynchronously",value:function(){var e=this.props.language;!function(o,t,n){var a=o.getElementsByTagName(t)[0],i=a,s=a;o.getElementById(n)||((s=o.createElement(t)).id=n,s.src="https://connect.facebook.net/"+e+"/sdk.js",i.parentNode.insertBefore(s,i))}(document,"script","facebook-jssdk")}},{key:"render",value:function(){var e=this.props.render;if(!e)throw new Error("ReactFacebookLogin requires a render prop to render");var o={onClick:this.click,isDisabled:!!this.props.isDisabled,isProcessing:this.state.isProcessing,isSdkLoaded:this.state.isSdkLoaded};return this.props.render(o)}}]),o}(r.default.Component);v.propTypes={isDisabled:d.default.bool,callback:d.default.func.isRequired,appId:d.default.string.isRequired,xfbml:d.default.bool,cookie:d.default.bool,authType:d.default.string,scope:d.default.string,state:d.default.string,responseType:d.default.string,returnScopes:d.default.bool,redirectUri:d.default.string,autoLoad:d.default.bool,disableMobileRedirect:d.default.bool,isMobile:d.default.bool,fields:d.default.string,version:d.default.string,language:d.default.string,onClick:d.default.func,onFailure:d.default.func,render:d.default.func.isRequired},v.defaultProps={redirectUri:"undefined"!=typeof window?window.location.href:"/",scope:"public_profile,email",returnScopes:!1,xfbml:!1,cookie:!1,authType:"",fields:"name",version:"2.3",language:"en_US",disableMobileRedirect:!1,isMobile:f(),onFailure:null,state:"facebookdirect",responseType:"code"},o.default=v},function(e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default=function(e){return"?"+Object.keys(e).map((function(o){return o+"="+encodeURIComponent(e[o])})).join("&")}},function(e,o,t){"use strict";function n(){}var a=t(7);e.exports=function(){function e(e,o,t,n,i,s){if(s!==a){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function o(){return e}e.isRequired=e;var t={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:o,element:e,instanceOf:o,node:e,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o};return t.checkPropTypes=n,t.PropTypes=t,t}},function(e,o){"use strict";var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";e.exports=t},function(e,o,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}function i(e,o){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!o||"object"!=typeof o&&"function"!=typeof o?e:o}function s(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function, not "+typeof o);e.prototype=Object.create(o&&o.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),o&&(Object.setPrototypeOf?Object.setPrototypeOf(e,o):e.__proto__=o)}Object.defineProperty(o,"__esModule",{value:!0});var c=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},l=function(){function e(e,o){for(var t=0;t<o.length;t++){var n=o[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(o,t,n){return t&&e(o.prototype,t),n&&e(o,n),o}}(),r=n(t(2)),d=n(t(1)),u=n(t(9)),p=n(t(4)),f=function(e){return["button","input","select","textarea","optgroup","option","fieldset"].indexOf((e+"").toLowerCase())>=0},v=function(e){function o(){return a(this,o),i(this,(o.__proto__||Object.getPrototypeOf(o)).apply(this,arguments))}return s(o,e),l(o,[{key:"style",value:function(){var e=this.constructor.defaultProps.cssClass;return this.props.cssClass===e&&r.default.createElement("style",{dangerouslySetInnerHTML:{__html:u.default}})}},{key:"containerStyle",value:function(e){var o=e.isProcessing,t=e.isSdkLoaded,n=e.isDisabled,a={transition:"opacity 0.5s"};return(o||!t||n)&&(a.opacity=.6),c(a,this.props.containerStyle)}},{key:"renderOwnButton",value:function(e){var o=this.props,t=o.cssClass,n=o.size,a=o.icon,i=o.textButton,s=o.typeButton,l=o.buttonStyle,d=e.onClick,u="string"==typeof a,p={};return e.isDisabled&&f(this.props.tag)&&(p.disabled=!0),r.default.createElement("span",{style:this.containerStyle(e)},u&&r.default.createElement("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"}),r.default.createElement(this.props.tag,c({type:s,className:t+" "+n,style:l,onClick:d},p),a&&u&&r.default.createElement("i",{className:"fa "+a}),a&&!u&&a,i),this.style())}},{key:"render",value:function(){var e=this;return r.default.createElement(p.default,c({},this.props,{render:function(o){return e.renderOwnButton(o)}}))}}]),o}(r.default.Component);v.propTypes={textButton:d.default.string,typeButton:d.default.string,size:d.default.string,cssClass:d.default.string,icon:d.default.any,containerStyle:d.default.object,buttonStyle:d.default.object,tag:d.default.oneOfType([d.default.node,d.default.func])},v.defaultProps={textButton:"Login with Facebook",typeButton:"button",size:"metro",fields:"name",cssClass:"kep-login-facebook",tag:"button"},o.default=v},function(e,o,t){(o=e.exports=t(10)()).push([e.id,".kep-login-facebook{font-family:Helvetica,sans-serif;font-weight:700;-webkit-font-smoothing:antialiased;color:#fff;cursor:pointer;display:inline-block;font-size:calc(.27548vw + 12.71074px);text-decoration:none;text-transform:uppercase;transition:background-color .3s,border-color .3s;background-color:#4c69ba;border:calc(.06887vw + .67769px) solid #4c69ba;padding:calc(.34435vw + 13.38843px) calc(.34435vw + 18.38843px)}.kep-login-facebook.small{padding:calc(.34435vw + 3.38843px) calc(.34435vw + 8.38843px)}.kep-login-facebook.medium{padding:calc(.34435vw + 8.38843px) calc(.34435vw + 13.38843px)}.kep-login-facebook.metro{border-radius:0}.kep-login-facebook .fa{margin-right:calc(.34435vw + 3.38843px)}",""]),o.locals={"kep-login-facebook":"kep-login-facebook",small:"small",medium:"medium",metro:"metro",fa:"fa"}},function(e,o){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],o=0;o<this.length;o++){var t=this[o];t[2]?e.push("@media "+t[2]+"{"+t[1]+"}"):e.push(t[1])}return e.join("")},e.i=function(o,t){"string"==typeof o&&(o=[[null,o,""]]);for(var n={},a=0;a<this.length;a++){var i=this[a][0];"number"==typeof i&&(n[i]=!0)}for(a=0;a<o.length;a++){var s=o[a];"number"==typeof s[0]&&n[s[0]]||(t&&!s[2]?s[2]=t:t&&(s[2]="("+s[2]+") and ("+t+")"),e.push(s))}},e}}]))}}]);
//# sourceMappingURL=476.d4a84de5.chunk.js.map