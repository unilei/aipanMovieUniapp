(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-vod-apVod"],{"010b":function(t,e,i){"use strict";var o;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return o}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[t.videoSrc?i("v-uni-view",{staticClass:"vod-video"},[i("v-uni-video",{attrs:{id:"video",src:t.videoSrc,controls:!0,autoplay:!0,"page-gesture":!0,"play-btn-position":"center","enable-play-gesture":!0},on:{ended:function(e){arguments[0]=e=t.$handleEvent(e),t.videoEnd.apply(void 0,arguments)}}})],1):t._e(),i("v-uni-view",{staticClass:"video-bs"},[i("v-uni-view",{staticClass:"video-bs-title"},[t._v("倍速：")]),i("v-uni-view",{staticClass:"video-bs-tags"},t._l(t.beisuData,(function(e,o){return i("v-uni-view",{key:o,staticClass:"video-bs-tag",class:t.beisuValue==e?"bs-tag-active":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.beisu(e)}}},[t._v(t._s(e))])})),1)],1),i("v-uni-view",{staticClass:"play-url-container"},[i("v-uni-view",{staticClass:"play-url"},t._l(t.vodPlayList,(function(e,o){return i("v-uni-view",{key:o,staticClass:"play-url-item",class:t.videoPlayIndex==o?"play-item-active":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.playVideoUrl(e,o)}}},[t._v(t._s(e[0]))])})),1)],1)],1)},n=[]},"2fa9":function(t,e,i){var o=i("d326");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=i("4f06").default;a("586b04cd",o,!0,{sourceMap:!1,shadowMode:!1})},"92a2":function(t,e,i){"use strict";var o=i("2fa9"),a=i.n(o);a.a},b851:function(t,e,i){"use strict";i.r(e);var o=i("d067"),a=i.n(o);for(var n in o)"default"!==n&&function(t){i.d(e,t,(function(){return o[t]}))}(n);e["default"]=a.a},d067:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{videoSrc:"",isShow:!1,beisuData:[.5,.8,1,1.25,1.5,2],beisuValue:1}},computed:{vodPlayList:function(){return this.$store.state.videoPlayList},videoPlayIndex:function(){return this.$store.state.videoPlayIndex},prevVod:function(){return this.$store.getters.prevVod},nextVod:function(){return this.$store.getters.nextVod}},onLoad:function(e){t.log(this.nextVod),t.log(this.prevVod),t.log(this.vodPlayList),this.videoSrc=e.source},methods:{downloadVideo:function(e){var i=uni.downloadFile({url:e,success:function(e){200===e.statusCode&&t.log("下载成功")}});i.onProgressUpdate((function(e){t.log("下载进度"+e.progress),t.log("已经下载的数据长度"+e.totalBytesWritten),t.log("预期需要下载的数据总长度"+e.totalBytesExpectedToWrite),e.progress>50&&i.abort()}))},beisu:function(e){t.log(e),this.beisuValue=e,this.videoContext.playbackRate(e)},playVideoUrl:function(t,e){this.videoSrc=t[1],this.$store.commit("setVideoPlayIndex",e)},videoEnd:function(t){var e=this.nextVod;this.$store.commit("setVideoPlayIndex",e.index),e.data&&(this.videoSrc=e.data[1])}},onReady:function(t){this.videoContext=uni.createVideoContext("video")}};e.default=i}).call(this,i("5a52")["default"])},d326:function(t,e,i){var o=i("24fb");e=o(!1),e.push([t.i,"uni-page-body[data-v-52707be1]{background-color:rgba(0,0,0,.8)}.vod-video[data-v-52707be1]{width:100%}#video[data-v-52707be1]{width:100%}.video-bs[data-v-52707be1]{background-color:rgba(0,0,0,.8);display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;padding:%?10?% %?20?%}.video-bs-title[data-v-52707be1]{color:grey;font-size:%?24?%;font-weight:700}.video-bs-tags[data-v-52707be1]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.video-bs-tag[data-v-52707be1]{width:14%;color:grey;background-color:rgba(0,0,0,.9);margin-left:%?20?%;padding:%?10?% %?20?%;font-size:%?24?%;border-radius:%?8?%}.bs-tag-active[data-v-52707be1]{background-color:#000;color:#fff;border:%?1?% solid #eee}.play-url-container[data-v-52707be1]{background-color:rgba(0,0,0,.9)}.play-url[data-v-52707be1]{width:100%;padding:%?20?%;margin:%?10?% auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.play-url-item[data-v-52707be1]{background-color:#3d3d3d;border:%?1?% solid #000;padding:%?10?% %?20?%;margin:%?10?%;border-radius:%?10?%;font-size:%?28?%;color:#e0e0e0}.play-item-active[data-v-52707be1]{background-color:#000;color:#fff;border:%?1?% solid #eee}body.?%PAGE?%[data-v-52707be1]{background-color:rgba(0,0,0,.8)}",""]),t.exports=e},d948:function(t,e,i){"use strict";i.r(e);var o=i("010b"),a=i("b851");for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);i("92a2");var r,s=i("f0c5"),d=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,"52707be1",null,!1,o["a"],r);e["default"]=d.exports}}]);