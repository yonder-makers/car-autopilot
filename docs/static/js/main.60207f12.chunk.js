(this["webpackJsonpcar-autopilot"]=this["webpackJsonpcar-autopilot"]||[]).push([[0],{78:function(e,t,n){},79:function(e,t,n){},89:function(e,t,n){"use strict";n.r(t);var i=n(0),c=n.n(i),a=n(22),r=n.n(a),s=(n(78),n(44)),o=n(29),u=(n(79),n(24)),j=n(99),l=n(93),d=n(96),b=n(94);function O(e,t,n){Object(i.useEffect)((function(){var t=localStorage.getItem(e);t&&n(JSON.parse(t))}),[e]),Object(i.useEffect)((function(){localStorage.setItem(e,JSON.stringify(t))}),[e,t])}var h=n(11),m=n(98);var f=300;var x={throttle:0,angle:0,speed:0,simTime:0,wind:20,horsePower:200,isPaused:!1};function v(){var e=Object(i.useState)(x),t=Object(u.a)(e,2),n=t[0],c=t[1];return Object(i.useEffect)((function(){if(!n.isPaused){var e=setInterval((function(){c((function(e){var t,n,i,c=(t=e.horsePower,n=e.speed,i=e.throttle,(300-n)*i/(300/t*600)/(1e3/f)-.6-function(e,t){var n=e+t;return n*n/4e3/(1e3/f)}(e.speed,e.wind)-e.angle/(1e3/f));return Object(h.a)(Object(h.a)({},e),{},{simTime:e.simTime+1,speed:Math.max(0,e.speed+c)})}))}),f);return function(){clearInterval(e)}}}),[n.isPaused]),Object(h.a)(Object(h.a)({},n),{},{setThrottle:function(e){c((function(t){return Object(h.a)(Object(h.a)({},t),{},{throttle:e})}))},setWind:function(e){c((function(t){return Object(h.a)(Object(h.a)({},t),{},{wind:e})}))},setAngle:function(e){c((function(t){return Object(h.a)(Object(h.a)({},t),{},{angle:e})}))},setHorsePower:function(e){c((function(t){return Object(h.a)(Object(h.a)({},t),{},{horsePower:e})}))},setIsPaused:function(e){c((function(t){return Object(h.a)(Object(h.a)({},t),{},{isPaused:e})}))}})}var p=n(6);function g(e){var t=e.autopilot,n=t.config;return O("pid-controls",n,t.setCoeficients),Object(p.jsxs)(l.a,{title:"PID Coeficients",children:[Object(p.jsxs)("div",{children:["p: ",n.p]}),Object(p.jsx)(b.a,{min:0,max:40,step:.01,onChange:function(e){return t.setCoeficients(Object(h.a)(Object(h.a)({},n),{},{p:e}))},value:n.p,style:{width:400}}),Object(p.jsxs)("div",{children:["i: ",n.i]}),Object(p.jsx)(b.a,{min:0,max:10,step:.01,onChange:function(e){return t.setCoeficients(Object(h.a)(Object(h.a)({},n),{},{i:e}))},value:n.i,style:{width:400}}),Object(p.jsxs)("div",{children:["d: ",n.d]}),Object(p.jsx)(b.a,{min:0,max:10,step:.01,onChange:function(e){return t.setCoeficients(Object(h.a)(Object(h.a)({},n),{},{d:e}))},value:n.d,style:{width:400}})]})}function C(e){var t=e.autopilot;return Object(p.jsxs)(l.a,{title:"PID Diag",children:[Object(p.jsxs)("div",{children:[" Error: ",t.error]}),Object(p.jsxs)("div",{children:[" Integral: ",t.integral]}),Object(p.jsxs)("div",{children:[" Derivative: ",t.derivative]}),Object(p.jsxs)("div",{children:[" Output: ",t.output]})]})}var w=n(95);function T(e){var t=e.targetSpeed,n=e.changeSpeed;return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsxs)("div",{children:["Target speed: ",t]}),Object(p.jsxs)(j.b,{children:[Object(p.jsx)(b.a,{min:0,max:200,onChange:n,value:t,style:{width:200}}),Object(p.jsx)(w.a,{onClick:function(){return n(50)},children:"50"}),Object(p.jsx)(w.a,{onClick:function(){return n(70)},children:"70"}),Object(p.jsx)(w.a,{onClick:function(){return n(90)},children:"90"}),Object(p.jsx)(w.a,{onClick:function(){return n(130)},children:"130"})]})]})}function y(e){var t=e.simulator,n=t.speed,c=t.simTime,a=Object(i.useState)(Math.floor(n)),r=Object(u.a)(a,2),s=r[0],o=r[1],d=function(e,t){var n=Object(i.useState)({error:0,integral:0,derivative:0,output:0,config:{d:1,i:1,p:1}}),c=Object(u.a)(n,2),a=c[0],r=c[1];Object(i.useEffect)((function(){var n=a.config,i=t-e.speed,c=a.integral+.3*i,s=(i-a.error)/.3,o=n.p*i+n.i*c+n.d*s;r((function(e){return Object(h.a)(Object(h.a)({},e),{},{error:i,integral:c,derivative:s,output:o})}))}),[e.simTime]),Object(i.useEffect)((function(){e.setThrottle(Math.min(100,Math.max(0,a.output)))}),[a.output]);var s=Object(i.useCallback)((function(e){r((function(t){return Object(h.a)(Object(h.a)({},t),{},{config:e})}))}),[r]);return Object(h.a)(Object(h.a)({},a),{},{setCoeficients:s})}(t,s),b=function(e,t,n){var c=Object(i.useState)({startTime:new Date,hitCount:0}),a=Object(u.a)(c,2),r=a[0],s=a[1];return Object(i.useEffect)((function(){s((function(e){return Object(h.a)(Object(h.a)({},e),{},{startTime:new Date,endTime:void 0,hitCount:0})}))}),[e]),Object(i.useEffect)((function(){Math.abs(e-t)<.5?s((function(e){var t=Object(h.a)(Object(h.a)({},e),{},{hitCount:e.hitCount+1});return 1===t.hitCount&&(t.endTime=new Date),t})):r.hitCount>0&&s((function(e){return Object(h.a)(Object(h.a)({},e),{},{endTime:void 0,hitCount:0})}))}),[n]),{adjustingTime:Object(i.useMemo)((function(){return r.endTime?Object(m.a)(r.endTime,r.startTime):Object(m.a)(new Date,r.startTime)}),[n]),hitCount:r.hitCount}}(s,n,c),O=b.adjustingTime,f=b.hitCount;return Object(p.jsxs)(j.b,{direction:"vertical",style:{width:"100%"},children:[Object(p.jsxs)(l.a,{title:"Autopilot",children:[Object(p.jsx)(T,{changeSpeed:o,targetSpeed:s}),Object(p.jsxs)("div",{children:["Adjusting time: ",O,"seconds ",f&&Object(p.jsxs)("span",{children:["(hit: ",f,")"]})]})]}),Object(p.jsx)(C,{autopilot:d}),Object(p.jsx)(g,{autopilot:d})]})}function S(e){var t=e.simulator,n=t.speed,c=Object(i.useState)(Math.floor(n)),a=Object(u.a)(c,2),r=a[0],s=a[1];return function(e,t){Object(i.useEffect)((function(){e.speed>t?e.setThrottle(0):e.speed<t&&e.setThrottle(100)}),[e.simTime])}(t,r),Object(p.jsx)(l.a,{title:"Dumb Autopilot",children:Object(p.jsx)(T,{targetSpeed:r,changeSpeed:s})})}function P(e){var t=e.simulator,n=t.throttle,c=t.setThrottle,a=Object(i.useState)(1),r=Object(u.a)(a,2),s=r[0],o=r[1];return O("control-mode",s,o),Object(p.jsxs)(j.b,{direction:"vertical",children:[Object(p.jsxs)(l.a,{children:["Mode:",Object(p.jsxs)(d.a.Group,{onChange:function(e){return o(e.target.value)},value:s,children:[Object(p.jsx)(d.a,{value:1,children:"Manual"}),Object(p.jsx)(d.a,{value:2,children:"Dumb Autopilot"}),Object(p.jsx)(d.a,{value:3,children:"Autopilot"})]}),Object(p.jsxs)(j.b,{style:{width:"100%"},children:["Throttle:",Object(p.jsx)(b.a,{disabled:1!==s,min:1,max:100,onChange:c,value:n,style:{width:200}})]})]}),2===s&&Object(p.jsx)(S,{simulator:t}),3===s&&Object(p.jsx)(y,{simulator:t})]})}function M(e){var t=e.simulator,n=t.wind,i=t.setWind,c=t.angle,a=t.setAngle,r=t.horsePower,s=t.setHorsePower;return O("wind",n,i),O("angle",c,a),O("horsePower",r,s),Object(p.jsxs)(j.b,{direction:"vertical",style:{width:"100%"},children:[Object(p.jsx)(l.a,{children:Object(p.jsx)(w.a,{onClick:function(){return t.setIsPaused(!t.isPaused)},children:t.isPaused?"Continue":"Pause simulator"})}),Object(p.jsxs)(l.a,{children:["Horse power: ",r,Object(p.jsx)(b.a,{min:0,max:400,onChange:s,value:r,style:{width:"100%"}})]}),Object(p.jsxs)(l.a,{children:["Wind speed: ",n,Object(p.jsx)(b.a,{min:0,max:150,onChange:i,value:n,style:{width:"100%"}})]}),Object(p.jsxs)(l.a,{children:["Incline: ",c,Object(p.jsx)(b.a,{min:-25,max:25,onChange:a,value:c,style:{width:"100%"}})]})]})}var I=n(70),k=n.n(I),D=n(71);function E(e){var t=function(e,t){var n=Object(i.useState)([t]),c=Object(u.a)(n,2),a=c[0],r=c[1];return Object(i.useEffect)((function(){r((function(e){return[].concat(Object(D.a)(e),[Math.floor(t)])}))}),[e]),{data:a}}(e.simTime,e.currentValue).data,n=Object(i.useMemo)((function(){return{chart:{height:350,type:"line",animations:{enabled:!0,easing:"linear",dynamicAnimation:{speed:280}},toolbar:{show:!1},zoom:{enabled:!1}},dataLabels:{enabled:!1},stroke:{curve:"smooth"},title:{text:e.title,align:"left"},markers:{size:0},xaxis:{type:"numeric",range:100},yaxis:{max:e.max,min:e.min},legend:{show:!1}}}),[e.title,e.min,e.max]),c=[{name:"series-1",data:t}];return Object(p.jsx)(k.a,{options:n,series:c,type:"line",height:350})}var A=Object(i.memo)(E,(function(e,t){return e.simTime===t.simTime}));function F(e){var t=e.simulator,n=t.speed,i=t.simTime,c=t.throttle;return Object(p.jsxs)(j.b,{direction:"vertical",style:{width:"100%"},children:[Object(p.jsx)(l.a,{children:Object(p.jsx)(A,{title:"Speed: "+Math.round(n),simTime:i,currentValue:n,min:0,max:230})}),Object(p.jsx)(l.a,{children:Object(p.jsx)(A,{title:"Throttle: "+Math.round(c),simTime:i,currentValue:c,min:0,max:100})})]})}function H(){var e=v();return Object(p.jsxs)(s.a,{gutter:12,children:[Object(p.jsx)(o.a,{span:9,children:Object(p.jsx)(P,{simulator:e})}),Object(p.jsx)(o.a,{span:3,children:Object(p.jsx)(M,{simulator:e})}),Object(p.jsx)(o.a,{span:12,children:Object(p.jsx)(F,{simulator:e})})]})}var J=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,100)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),i(e),c(e),a(e),r(e)}))},N=(n(88),n(92)),W=n(97);function z(e){return Object(p.jsxs)(N.a,{className:"layout",children:[Object(p.jsx)(N.a.Header,{children:Object(p.jsx)(W.a,{theme:"dark",mode:"horizontal",defaultSelectedKeys:["1"],children:Object(p.jsx)(W.a.Item,{children:"Welcome"},"1")})}),Object(p.jsx)(N.a.Content,{style:{padding:"12px"},children:Object(p.jsx)("div",{className:"site-layout-content",children:e.children})})]})}r.a.render(Object(p.jsx)(c.a.StrictMode,{children:Object(p.jsx)(z,{children:Object(p.jsx)(H,{})})}),document.getElementById("root")),J()}},[[89,1,2]]]);
//# sourceMappingURL=main.60207f12.chunk.js.map