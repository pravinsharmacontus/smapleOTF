"use strict";(self.webpackChunkonthefly=self.webpackChunkonthefly||[]).push([[334],{53734:(e,t,n)=>{n.d(t,{Z:()=>i});var s=n(72791),a=n(80184);const l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{bottomDetails:t={}}=e,{page:n=1,totalRecords:s=0,size:l=10}=t,i=n*l,c=s-i>0?i:s,o=1===n?1:(n-1)*l+1;return(0,a.jsxs)("span",{className:"info",children:["Showing"," ",o," ","-"," ",c," ","of"," ",s," ","results"]})},i=s.memo(l)},39334:(e,t,n)=>{n.r(t),n.d(t,{default:()=>_});var s=n(72791),a=n(26181),l=n.n(a),i=n(3042),c=n(80184);const o=()=>(0,c.jsxs)(i.Row,{children:[(0,c.jsx)(i.Cell,{className:"TM resetCell"}),(0,c.jsx)(i.Cell,{className:"TM",children:"Host Name"}),(0,c.jsx)(i.Cell,{className:"TM",children:"Role"}),(0,c.jsx)(i.Cell,{className:"TM",children:"Broadcast Created On"}),(0,c.jsx)(i.Cell,{className:"TM",children:"Live Duration"}),(0,c.jsx)(i.Cell,{className:"TM",children:"No. of participants"}),(0,c.jsx)(i.Cell,{className:"TM",children:"GoLive"}),(0,c.jsx)(i.Cell,{className:"TM resetCell"})]}),r=s.memo(o);var d=n(62235),h=n(34523),m=n(16e3),u=n(42997),x=n(55402);const p=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{isLoading:t=!1,broadcastCountListData:n=[]}=e,a=e=>1===e?"Owner":2===e?"Admin":3===e?"Cohost":4===e?"Super Admin":5===e?"Admin":"";return(0,c.jsxs)(c.Fragment,{children:[n.length>0?(0,c.jsx)(c.Fragment,{children:n.map(((e,t)=>{const{userName:n="",createAt:l="",status:o="",userRoleId:r=0,totalParticipants:h=0,duration:m="0m"}=e;return(0,c.jsx)(s.Fragment,{children:(0,c.jsxs)(i.Row,{children:[(0,c.jsx)(i.Cell,{className:"TM resetCell"}),(0,c.jsx)(i.Cell,{className:"TM Email",children:(0,c.jsx)("div",{className:"emailVerify",children:(0,c.jsx)("div",{className:"ellipsis",style:{maxWidth:"calc(100%)"},children:(0,c.jsxs)("span",{children:[" ",n]})})})}),(0,c.jsx)(i.Cell,{className:"TM created_on",children:(0,c.jsx)("div",{className:"layout_container",children:(0,c.jsx)("span",{children:a(r)})})}),(0,c.jsx)(i.Cell,{className:"TM created_on",children:(0,c.jsx)("div",{className:"layout_container",children:(0,c.jsx)("span",{children:(0,u.WD)(l)})})}),(0,c.jsx)(i.Cell,{className:"TM created_on",children:(0,c.jsx)("div",{className:"layout_container",children:(0,c.jsx)("span",{children:""===m?"0 Mins":"".concat((0,x.lw)(m)," Mins")})})}),(0,c.jsx)(i.Cell,{className:"TM created_on",children:(0,c.jsx)("div",{className:"layout_container",children:(0,c.jsx)("span",{children:h})})}),(0,c.jsx)(i.Cell,{className:"TM status",children:(0,c.jsx)("div",{className:"layout_container",children:1===o?(0,c.jsx)("span",{className:"active",children:"Yes"}):(0,c.jsx)("span",{className:"inactive",children:"No"})})}),(0,c.jsx)(i.Cell,{className:"TM resetCell"})]})},(0,d.rv)(t+"idMemberAdded-sj"))}))}):(0,c.jsx)("div",{className:"absolute-center",children:"No Broadcast Found"}),(0,h.Y)("memberTable"),t?(0,c.jsx)(m.Z,{type:"fixed overlay"}):null]})},v=s.memo(p);var j=n(40992),g=n(32826),f=n(77983),b=n(53734);const N=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{initialPage:t=1,bottomDetails:n={},pageSizeChange:a=(()=>{}),changePageactive:l=(()=>{}),searchEnable:i,setSearchEnable:o=(()=>{})}=e||{};console.log("bottom",n);const r=n.totalPages>=2;return(0,c.jsx)(s.Fragment,{children:(0,c.jsxs)("div",{className:"TableOpertion",children:[(0,c.jsxs)("div",{className:"pagesInfo",children:[(0,c.jsx)(b.Z,{bottomDetails:n}),r&&(0,c.jsx)(s.Fragment,{children:(0,c.jsx)("div",{className:"pageSize",children:(0,c.jsxs)(s.Fragment,{children:[(0,c.jsx)("span",{children:"Show"}),(0,c.jsx)(j.Z,{OriginalData:f.yj,onChange:a,pageSize:n.size})]})})})]}),r&&(0,c.jsx)(g.Z,{initialPage:t,onChangePage:l,bottomDetails:n,searchEnable:i,setSearchEnable:o})]})})},C=s.memo(N);n(72426);var S=n(91523),y=n(52024),w=n(49050),T=(n(15298),n(80180));const E=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{_searchTerm:t="",onOpenCalendar:n=(()=>{}),onCalendarHandle:a=!1,addMemberInputData:l={},_onChangeTeamsData:i=(()=>{})}=e,{sDate:o=null,eDate:r=null}=l,[d,h]=(0,s.useState)(!0),[m,u]=(0,s.useState)(!1),[x,p]=(0,s.useState)(!1),[v,j]=(0,s.useState)(!1),g="NoOfBroadcastsSubHead";return(0,c.jsxs)(w.ZP,{filterId:g,parentClass:"cus_top",getEnableSliderFilter:e=>{p(e)},children:[(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(w.wx,{enableSearch:m,setEnableSearch:u,children:(0,c.jsx)(y.Az,{type:"text",value:t,name:"searchTerm",placeholder:"Search by Host Name",handleSetSearchInput:i,handleInputboxClear:()=>function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";setTimeout((()=>{(0,w.eu)(g)}),100),i({target:{name:e,value:""}})}("searchTerm"),parentClass:" tableSearch-absolute ".concat(m?" ":" mobileHide")})}),!1]}),(0,c.jsxs)(S.rU,{className:"back_arrow_btn",to:"/",children:[(0,c.jsx)(T._a3,{})," Back"]})]})},F=s.memo(E);var k=n(7706),D=n(16030),M=n(42409),P=n(62641);const W=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=new URLSearchParams(window.location.search).get("id"),{memberData:n=0}=e||{},[a,o]=(0,s.useState)({page:1,searchTerm:"",size:10,orgId:t}),d=(0,D.v9)((e=>null===e||void 0===e?void 0:e.broadcastCountListReducer))||{},h=(0,D.v9)((e=>{var t;return null===e||void 0===e||null===(t=e.broadcastCountListReducer)||void 0===t?void 0:t.analyticsResponses}))||{},[m,u]=(0,s.useState)(!1),{page:x}=a,{totalPages:p=0,totalRecords:j=0}=d,g=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const{target:{name:n="",value:s=""}={}}=e;if(t){const e={...a,[n]:s,page:1};o(e)}else{const e={...a,[n]:s};o(e)}};(0,s.useEffect)((()=>{P.Z.dispatch((0,M.PR)(a)),P.Z.dispatch({type:"DO_LOADING_PAGE",loading:!0})}),[a]);const f=(0,D.v9)((e=>{var t;return null===e||void 0===e||null===(t=e.broadcastCountListReducer)||void 0===t?void 0:t.analyticsResponses}))||{};return console.log("***123",a.size,p,j,a.page,f),(0,c.jsx)(s.Fragment,{children:(0,c.jsx)("div",{className:"ContentWrapper",children:(0,c.jsxs)("div",{className:"TeamWrapper df-11a df-col",children:[(0,c.jsx)(F,{_searchTerm:a.searchTerm,_onChangeTeamsData:e=>{g(e,!0),u(!0)},onCalendarHandle:!0,handleMemberPopupOpen:()=>{},searchEnable:m,setSearchEnable:e=>u(e)}),(0,c.jsx)("div",{className:"".concat((0,k.Ye)(k.Feature.FixedHeaderInTables)),children:(0,c.jsxs)("div",{className:"table-common stickyHeader\n                         ".concat(n.length<=6?"minHeight":"","\n                        "),children:[(0,c.jsx)("div",{className:"table-responsive memberTable adjustHeight",children:(0,c.jsxs)(i.StickyTable,{leftStickyColumnCount:0,borderColor:"#DEDEDE",borderWidth:"0.5px",stickyHeaderCount:1,children:[(0,c.jsx)(r,{}),(0,c.jsx)(v,{broadcastCountListData:h})]})}),h.length>0?(0,c.jsx)(C,{initialPage:x,pageSizeChange:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{name:t="",value:n=10}=l()(e,"target",{});o({...a,page:1,[t]:n})},changePageactive:function(){g({target:{name:"page",value:arguments.length>0&&void 0!==arguments[0]?arguments[0]:1}},!1)},bottomDetails:{size:a.size,totalPages:p,totalRecords:j,page:a.page}}):null]})})]})})})},_=s.memo(W)},49050:(e,t,n)=>{n.d(t,{Od:()=>f,xZ:()=>b,wx:()=>j,_j:()=>g,ZP:()=>v,eu:()=>p});var s=n(72791),a=n(96211),l=n(19800),i=n(80180),c=n(40549),o=n(80184);const r=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const[t,n]=(0,s.useState)(!1),{handlePopupClose:a=(()=>{}),setShow:l=!1,children:r=""}=e,d=function(){n(arguments.length>0&&void 0!==arguments[0]&&arguments[0])};return(0,s.useEffect)((()=>{!0===l&&setTimeout((()=>{n(l)}),500)}),[]),(0,o.jsx)(s.Fragment,{children:(0,o.jsx)(c.Z,{in:l,timeout:300,classNames:"show",unmountOnExit:!0,onEnter:()=>d(!0),onExited:()=>d(!1),children:(0,o.jsx)("div",{className:"PopupWrapper fixed ",children:(0,o.jsx)(c.Z,{in:t,timeout:300,classNames:"sideMenu",unmountOnExit:!0,onExited:()=>a(!1),children:(0,o.jsxs)("div",{className:"PopupInner custom",children:[(0,o.jsx)("div",{className:"PopupInnerLeft",onClick:()=>{a(!1)}}),(0,o.jsxs)("div",{className:"PopupForm heightFull",children:[(0,o.jsxs)("div",{className:"filterHeader",children:[(0,o.jsx)("span",{children:"Filter"}),(0,o.jsx)("button",{className:"",onClick:()=>a(!1),type:"button",children:(0,o.jsx)(i.bMz,{})})]}),(0,o.jsx)("div",{className:"filter-new-wraper",children:r})]})]})})})})})},d=s.memo(r);let h=0,m=0;const u=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"tableSortWraper2",t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n="";const s=document&&document.querySelector("#".concat(e));if(t&&s)return 0===h?(s.offsetWidth<s.scrollWidth?(setTimeout((()=>{s.classList.add("filterStyle2"),s.classList.remove("filterStyle3")}),100),h=s.offsetWidth+1,m=s.scrollWidth):s.classList.remove("filterStyle2"),n=s.offsetWidth<=s.scrollWidth):m<s.offsetWidth?(h=0,s.classList.remove("filterStyle2"),n=!1):(s.classList.add("filterStyle2"),s.classList.remove("filterStyle3"),n=!0),n;h=0,setTimeout((()=>{s&&s.classList.remove("filterStyle2"),s&&s.classList.add("filterStyle3")}),100)};n(62235);const x=function(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];setTimeout((()=>{window.innerWidth>1365?u(e,t,n):u(e,!1,n)}),100)},p=e=>{window.innerWidth>1365&&x(e)},v=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t="";const{filterId:n="",children:a="",parentClass:l="",setMoreFilter:i=(()=>{}),getEnableSliderFilter:c=(()=>{})}=e;return(0,s.useEffect)((()=>(x(n),c(window.innerWidth<=1365),()=>{u(n,!1),i(!1)})),[]),window.onresize=()=>{clearTimeout(t),t=setTimeout((()=>{c(window.innerWidth<=1365),x(n)}),100)},(0,o.jsx)(s.Fragment,{children:(0,o.jsx)("div",{id:n,className:"".concat(l||""," tableSortWraper2 custom"),children:a})})},j=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{children:t="",setEnableSearch:n=(()=>{}),enableSearch:c}=e;return(0,o.jsx)(s.Fragment,{children:(0,o.jsxs)("div",{className:"inputWrapper",children:[(0,o.jsx)(l.Z,{style:{display:"none"},className:"b-rounded b-auto bt-default cp-btn bt-outline mobileShow",onClick:()=>n(!c),children:(0,o.jsx)(i.jVj,{style:{width:"16px",height:"16px"}})}),(0,o.jsx)(a.default,{onOutsideClick:()=>n(!1),children:t})]})})},g=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{children:t="",EnableSliderFilter:n=!1,EnableFilterButton:a=!1,setEnableFilterButton:l=(()=>{})}=e;return(0,o.jsx)(s.Fragment,{children:n?(0,o.jsx)(d,{setShow:a,_outsideCustomer:()=>l(!1),handlePopupClose:()=>l(!1),children:t}):(0,o.jsx)(o.Fragment,{children:t})})},f=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{children:t="",EnableSliderFilter:n=!1,setEnableFilterButton:a=(()=>{})}=e;return(0,o.jsx)(s.Fragment,{children:(0,o.jsxs)("div",{className:"group-btn",children:[n&&false,t]})})},b=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{customClass:t="",filterId:n="",dropOpenState:a=!0,isDatePickerActive:l=!1,children:c="",onOpenCalendar:r=(()=>{}),resetDatePicker:d=(()=>{}),getDropOpenState:h=(()=>{})}=e;return(0,o.jsx)(s.Fragment,{children:(0,o.jsx)("div",{className:"".concat(l?" filtered ":" "," ").concat(t,"\n             custom-dropdown-sort custom-picker customDateFilter "),onClick:e=>{!function(){var e;let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";const n=t&&(null===t||void 0===t||null===(e=t.target)||void 0===e?void 0:e.querySelector(".datepickerDefault"));null===n||void 0===n||n.click()}(e)},children:(0,o.jsxs)("label",{htmlFor:"reports1",className:"custom-dropdown datePicker ".concat(l?"selected":""),children:[(0,o.jsx)("i",{onClick:e=>{!function(){var e;let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";const n=t&&(null===t||void 0===t||null===(e=t.target)||void 0===e?void 0:e.closest(".customDateFilter"));null===n||void 0===n||n.click()}(e)},className:"IconCalendar",children:(0,o.jsx)(i.Mi4,{})}),(0,o.jsx)("span",{className:"datepicker",children:a&&!l?(0,o.jsxs)("div",{onClick:()=>(p(n),h(!a),void setTimeout((()=>{!0===a&&document.getElementById("user_start_date_id").focus()}),100)),className:"datepickerDefault",children:[(0,o.jsx)("span",{onClick:()=>r(!0),children:"Created On"}),(0,o.jsx)("i",{onClick:()=>r(!0),className:"dropIcon",children:(0,o.jsx)(i.vzn,{})})]}):c}),l?(0,o.jsx)("i",{id:"#jestIconReset",className:"IconReset",onClick:()=>{d()},children:(0,o.jsx)(i.bMz,{})}):null]})})})}},34523:(e,t,n)=>{n.d(t,{Y:()=>l});var s=n(26181),a=n.n(s);function l(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";setTimeout((()=>{const t=document.getElementById(e);if(window.matchMedia("(min-width: 1199.5px)").matches){const n=document.querySelector(".sticky-table-table");if(n){const s=n.parentNode.offsetWidth;if(n.scrollWidth-s>0){let l,i;const c=document.querySelector(".OrgName"),o=document.querySelector(".Email"),r=a()(c,"offsetWidth",200),d=a()(o,"offsetWidth",200);function h(){const t=document.createElement("style");t.setAttribute("id",e),t.innerHTML="\n                  .table-common .".concat(e,"  .OrgName {\n                      max-width:calc(").concat(l,"px)!important;\n                      width:calc(").concat(l,"px)!important;\n                      min-width:100px!important;\n                  }\n                  .table-common .").concat(e," .Email {\n                      max-width:calc(").concat(i,"px)!important;\n                      width:calc(").concat(i,"px)!important;\n                      min-width:100px!important;\n                  }\n                  "),document.head.appendChild(t)}l=r-50,i=d-50,l<200&&(l=200),i<200&&(i=200),null!==t?(t.remove(),h()):h()}}}}),100)}},42409:(e,t,n)=>{n.d(t,{CR:()=>i,Lx:()=>a,PR:()=>l});var s=n(15472);const a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:s.u,data:e}},l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:s.W,data:e}},i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:s.W,data1:e}}}}]);
//# sourceMappingURL=334.e03f38f3.chunk.js.map