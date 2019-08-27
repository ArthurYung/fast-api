(this["webpackJsonpfast-api"]=this["webpackJsonpfast-api"]||[]).push([[11],{104:function(e,t,a){"use strict";a.d(t,"a",function(){return i});var n=a(1),r=a(0),c=a.n(r),l=a(120);function i(e,t){var a=c.a.memo(c.a.forwardRef(function(t,a){return c.a.createElement(l.a,Object(n.a)({},t,{ref:a}),e)}));return a.muiName=l.a.muiName,a}},106:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(642),l=a(634),i=a(169),s=a.n(i),o=a(170),u=a.n(o),m=a(168),p=a.n(m),f=a(171),d=a.n(f),b=function(e){var t=e.type;return"success"===t?r.a.createElement(p.a,null):"warn"===t?r.a.createElement(s.a,null):"error"===t?r.a.createElement(u.a,null):r.a.createElement(d.a,null)};t.a=function(e){var t=e.message,a=e.visible,n=e.closed,i=e.type,s=void 0===i?"info":i;return r.a.createElement("span",null,r.a.createElement(c.a,{anchorOrigin:{vertical:"top",horizontal:"right"},autoHideDuration:3e3,open:a,onClose:function(e,t){"clickaway"!==t&&n()},className:"message-box-"+s},r.a.createElement(l.a,{className:"message-content","aria-describedby":"client-snackbar",message:r.a.createElement("span",{id:"client-snackbar",className:"message-content-txt"},r.a.createElement(b,{type:s}),t)})))}},133:function(e,t,a){"use strict";var n=a(113),r=a.n(n),c=a(114),l=a(18),i=a(13),s=a(0),o=a.n(s),u=a(30),m=a(35),p=Object(u.b)(function(e){return{historyData:e.history}},function(e){return{deleteTimer:function(t){e(Object(m.c)(t))}}}),f=a(625),d=a(627),b=a(624),y=a(326),E=a(164),v=a.n(E),h=a(602),g=a(631),O=a(325),j=a(163),k=a.n(j),w=a(161),N=a.n(w),S=a(628),C=a(629);function x(e,t){if(Boolean(e)){var a={yyyy:(e=e instanceof Date?e:new Date(e)).getFullYear().toString(),mm:("0"+(e.getMonth()+1)).slice(-2),dd:("0"+e.getDate()).slice(-2),HH:("0"+e.getHours()).slice(-2),MM:("0"+e.getMinutes()).slice(-2),SS:("0"+e.getSeconds()).slice(-2)};return t||(t="yyyy-mm-dd HH:MM:SS"),t=t.replace(/d{1,4}|m{1,4}|yy(?:yy)?|H{1,2}|M{1,2}|S{1,2}/g,function(e){return e in a?a[e]:""})}return""}var D=function(e){var t=e.info,a=e.deleteTimer,n=e.collectTimer,r=Object(s.useState)(1),c=Object(i.a)(r,2),l=c[0],u=c[1],m=Object(s.useState)(null),p=Object(i.a)(m,2),E=p[0],j=p[1],w=Boolean(E),D=2===t.status?"result-error":"result-success",T=[];function M(){j(null)}return function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";t.forEach(function(t){T.push({name:a+t.name,useTime:t.useTime}),t.children.length&&e(t.children,t.name)})}(t.children),o.a.createElement("aside",{className:"result-card"},o.a.createElement(b.a,{in:Boolean(l)},o.a.createElement(f.a,null,o.a.createElement(d.a,{avatar:o.a.createElement(O.a,{"aria-label":"recipe",className:D},1===t.status?o.a.createElement(N.a,null):o.a.createElement(k.a,null)),action:o.a.createElement(y.a,{"aria-label":"settings",onClick:function(e){j(e.currentTarget)}},o.a.createElement(v.a,null)),title:t.name,subheader:x(t.date,"mm-dd HH:MM:SS"),className:"result-card-header"}),o.a.createElement(S.a,null,T.map(function(e,t){return o.a.createElement("div",{className:"result-card-item",key:t},o.a.createElement("span",{className:"card-item-root"},e.name),o.a.createElement("span",{className:"card-item-time"},e.useTime,"ms"))})),o.a.createElement(C.a,null),o.a.createElement(S.a,null,1===t.status?o.a.createElement("div",{className:"result-active-success"},"use: ",t.useTime,"ms"):o.a.createElement("div",{className:"result-active-error"},t.error)))),o.a.createElement(h.a,{id:"long-menu",anchorEl:E,keepMounted:!0,open:w,onClose:M,PaperProps:{style:{width:120}}},o.a.createElement(g.a,{onClick:function(){M(),n(t)}},"Collect"),o.a.createElement(g.a,{onClick:function(){u(0),M(),setTimeout(function(){return a(t)},300)}},"Delete")))},T=a(635),M=a(639),P=a(172),H=a.n(P),I=a(630),B=a(632),L=a(633),F=a(42),J=a(167),z=a.n(J),A=a(166),R=a.n(A),V=function(e){var t=e.replayCollect,a=e.deleteCollect,n=Object(s.useState)([]),l=Object(i.a)(n,2),u=l[0],m=l[1];function p(){return(p=Object(c.a)(r.a.mark(function e(t){var n,c;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a(t);case 2:if(1===e.sent){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,Object(F.c)();case 7:n=e.sent,(c=n.data)&&m(c);case 10:case"end":return e.stop()}},e)}))).apply(this,arguments)}return Object(s.useEffect)(function(){Object(F.c)().then(function(e){m(e.data)})},[]),o.a.createElement("aside",{className:"collector-box"},o.a.createElement(I.a,null,u.map(function(e){return o.a.createElement(B.a,{key:e.id},o.a.createElement(L.a,{primary:e.timerInfo.name,secondary:x(e.timerInfo.date)}),o.a.createElement(y.a,{edge:"end","aria-label":"play",onClick:function(){return t(e)}},o.a.createElement(R.a,null)),o.a.createElement(y.a,{edge:"end","aria-label":"delete",onClick:function(){return function(e){return p.apply(this,arguments)}(e)}},o.a.createElement(z.a,null)))})))},Y=a(106),q=a(41),G=a(12);function K(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}t.a=p(Object(G.f)(function(e){var t=e.historyData,a=e.deleteTimer,n=e.history,u=Object(s.useState)(!1),m=Object(i.a)(u,2),p=m[0],f=m[1],d=Object(s.useState)({type:"success",visible:!1,message:""}),b=Object(i.a)(d,2),y=b[0],E=b[1];function v(e){var t=e.type,a=e.message;E({type:t,message:a,visible:!0})}function h(e){var t=q.a.getDatabaseInfo(e.uid),a={timerInfo:e,codeInfo:t,type:t.type};Object(F.a)(a).then(function(){v({type:"success",message:"Saved timer record"})}).catch(function(e){v({type:"warn",message:String(e)})})}function g(){return(g=Object(c.a)(r.a.mark(function e(t){var a,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.id){e.next=2;break}return e.abrupt("return",0);case 2:return e.next=4,Object(F.b)(t.id);case 4:if(a=e.sent,!(n=a.error)){e.next=9;break}return v({type:"error",message:n.message}),e.abrupt("return",0);case 9:return e.abrupt("return",1);case 10:case"end":return e.stop()}},e)}))).apply(this,arguments)}return o.a.createElement(s.Fragment,null,o.a.createElement("aside",{className:"history-box"},o.a.createElement("div",{className:"collector-button"},o.a.createElement(T.a,{variant:"extended","aria-label":"open",onClick:function(){f(!0)}},o.a.createElement(H.a,null),"Open Collector")),t.map(function(e){return o.a.createElement(D,{key:e.id,info:e,deleteTimer:a,collectTimer:h})})),o.a.createElement(M.a,{anchor:"right",open:p,onClose:function(){f(!1)}},o.a.createElement(V,{replayCollect:function(e){1===e.type?n.push({state:e.codeInfo,pathname:"/custom",search:"?type=1"+Date.now()}):2===e.type&&n.push({state:e.codeInfo,pathname:"/custom",search:"?type=2"+Date.now()}),f(!1)},deleteCollect:function(e){return g.apply(this,arguments)}})),o.a.createElement(Y.a,{visible:y.visible,type:y.type,closed:function(){E(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?K(a,!0).forEach(function(t){Object(l.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):K(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({},y,{visible:!1}))},message:y.message}))}))},73:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(47),l=a(13),i=a(636),s=a(623),o=a(12),u=Object(o.f)(function(e){var t=e.history,a=e.menuList,c=e.location,o=/^\/api\/(\d+)/,u=a[0].id,m=Object(n.useState)(u),p=Object(l.a)(m,2),f=p[0],d=p[1];return Object(n.useEffect)(function(){var e=c.pathname.match(o);e?d(e[1]):t.replace("/api/"+u)},[c.pathname,t,u,o]),r.a.createElement("div",{className:"api-menu"},r.a.createElement(i.a,{orientation:"vertical",variant:"scrollable",indicatorColor:"primary",value:f,onChange:function(e,a){t.push("/api/"+a)},"aria-label":"Vertical tabs example"},a.map(function(e,t){var a=e.name,n=e.id;return r.a.createElement(s.a,{key:n,label:a,value:n})})))}),m=a(41),p=a(133),f=m.a.getApiMenuList();t.default=function(e){var t=e.routes;return r.a.createElement("div",{className:"api-box"},r.a.createElement(u,{menuList:f}),r.a.createElement("div",{className:"api-view"},r.a.createElement("div",{className:"api-context"},t.map(function(e,t){return r.a.createElement(c.a,Object.assign({key:t},e))})),r.a.createElement(p.a,null)))}}}]);
//# sourceMappingURL=11.244be12d.chunk.js.map