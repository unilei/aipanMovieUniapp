(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/actor/index"],{"0d24":function(t,n,a){"use strict";var e=a("5702"),o=a.n(e);o.a},"46c7":function(t,n,a){"use strict";var e;a.d(n,"b",(function(){return o})),a.d(n,"c",(function(){return c})),a.d(n,"a",(function(){return e}));var o=function(){var t=this,n=t.$createElement;t._self._c},c=[]},5702:function(t,n,a){},a852:function(t,n,a){"use strict";a.r(n);var e=a("46c7"),o=a("bd05");for(var c in o)"default"!==c&&function(t){a.d(n,t,(function(){return o[t]}))}(c);a("0d24");var i,u=a("f0c5"),r=Object(u["a"])(o["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],i);n["default"]=r.exports},bd05:function(t,n,a){"use strict";a.r(n);var e=a("df95"),o=a.n(e);for(var c in e)"default"!==c&&function(t){a.d(n,t,(function(){return e[t]}))}(c);n["default"]=o.a},df95:function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=o(a("41e4"));function o(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{actorData:[],actorTypeData:[],page:1}},onLoad:function(){this.getActorList(this.page)},methods:{getActorList:function(t){var n=this,a={ac:"list",pg:t};e.default.actorList(a).then((function(t){1==t.code&&(n.actorData=n.actorData.concat(t.list),n.actorTypeData=t.class)})).catch((function(t){console.log(t)}))},turnActorDetail:function(n){t.navigateTo({url:"./detail?id="+n})}},onReachBottom:function(){this.page++,this.getActorList(this.page)},onPullDownRefresh:function(){this.page=1,this.actorData=[],this.getActorList(this.page)},onShareAppMessage:function(){},onShareTimeline:function(){}};n.default=c}).call(this,a("543d")["default"])},f6b8:function(t,n,a){"use strict";(function(t){a("d7fc");e(a("66fd"));var n=e(a("a852"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,a("543d")["createPage"])}},[["f6b8","common/runtime","common/vendor"]]]);