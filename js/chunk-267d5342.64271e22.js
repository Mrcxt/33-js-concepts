(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-267d5342"],{"02f4":function(t,e,n){var i=n("4588"),r=n("be13");t.exports=function(t){return function(e,n){var o,s,c=String(r(e)),a=i(n),l=c.length;return a<0||a>=l?t?"":void 0:(o=c.charCodeAt(a),o<55296||o>56319||a+1===l||(s=c.charCodeAt(a+1))<56320||s>57343?t?c.charAt(a):o:t?c.slice(a,a+2):s-56320+(o-55296<<10)+65536)}}},"0390":function(t,e,n){"use strict";var i=n("02f4")(!0);t.exports=function(t,e,n){return e+(n?i(t,e).length:1)}},"0bfb":function(t,e,n){"use strict";var i=n("cb7c");t.exports=function(){var t=i(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"214f":function(t,e,n){"use strict";n("b0c5");var i=n("2aba"),r=n("32e9"),o=n("79e5"),s=n("be13"),c=n("2b4c"),a=n("520a"),l=c("species"),u=!o(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),f=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var p=c(t),d=!o(function(){var e={};return e[p]=function(){return 7},7!=""[t](e)}),g=d?!o(function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[l]=function(){return n}),n[p](""),!e}):void 0;if(!d||!g||"replace"===t&&!u||"split"===t&&!f){var m=/./[p],v=n(s,p,""[t],function(t,e,n,i,r){return e.exec===a?d&&!r?{done:!0,value:m.call(e,n,i)}:{done:!0,value:t.call(n,e,i)}:{done:!1}}),h=v[0],x=v[1];i(String.prototype,t,h),r(RegExp.prototype,p,2==e?function(t,e){return x.call(t,this,e)}:function(t){return x.call(t,this)})}}},3846:function(t,e,n){n("9e1e")&&"g"!=/./g.flags&&n("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:n("0bfb")})},"4dd5":function(t,e,n){"use strict";var i=n("5c67"),r=n.n(i);r.a},"520a":function(t,e,n){"use strict";var i=n("0bfb"),r=RegExp.prototype.exec,o=String.prototype.replace,s=r,c="lastIndex",a=function(){var t=/a/,e=/b*/g;return r.call(t,"a"),r.call(e,"a"),0!==t[c]||0!==e[c]}(),l=void 0!==/()??/.exec("")[1],u=a||l;u&&(s=function(t){var e,n,s,u,f=this;return l&&(n=new RegExp("^"+f.source+"$(?!\\s)",i.call(f))),a&&(e=f[c]),s=r.call(f,t),a&&s&&(f[c]=f.global?s.index+s[0].length:e),l&&s&&s.length>1&&o.call(s[0],n,function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(s[u]=void 0)}),s}),t.exports=s},"5c67":function(t,e,n){},"5f1b":function(t,e,n){"use strict";var i=n("23c6"),r=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var o=n.call(t,e);if("object"!==typeof o)throw new TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==i(t))throw new TypeError("RegExp#exec called on incompatible receiver");return r.call(t,e)}},"6b54":function(t,e,n){"use strict";n("3846");var i=n("cb7c"),r=n("0bfb"),o=n("9e1e"),s="toString",c=/./[s],a=function(t){n("2aba")(RegExp.prototype,s,t,!0)};n("79e5")(function(){return"/a/b"!=c.call({source:"a",flags:"b"})})?a(function(){var t=i(this);return"/".concat(t.source,"/","flags"in t?t.flags:!o&&t instanceof RegExp?r.call(t):void 0)}):c.name!=s&&a(function(){return c.call(this)})},a481:function(t,e,n){"use strict";var i=n("cb7c"),r=n("4bf8"),o=n("9def"),s=n("4588"),c=n("0390"),a=n("5f1b"),l=Math.max,u=Math.min,f=Math.floor,p=/\$([$&`']|\d\d?|<[^>]*>)/g,d=/\$([$&`']|\d\d?)/g,g=function(t){return void 0===t?t:String(t)};n("214f")("replace",2,function(t,e,n,m){return[function(i,r){var o=t(this),s=void 0==i?void 0:i[e];return void 0!==s?s.call(i,o,r):n.call(String(o),i,r)},function(t,e){var r=m(n,t,this,e);if(r.done)return r.value;var f=i(t),p=String(this),d="function"===typeof e;d||(e=String(e));var h=f.global;if(h){var x=f.unicode;f.lastIndex=0}var b=[];while(1){var _=a(f,p);if(null===_)break;if(b.push(_),!h)break;var w=String(_[0]);""===w&&(f.lastIndex=c(p,o(f.lastIndex),x))}for(var y="",S=0,C=0;C<b.length;C++){_=b[C];for(var k=String(_[0]),E=l(u(s(_.index),p.length),0),M=[],O=1;O<_.length;O++)M.push(g(_[O]));var R=_.groups;if(d){var $=[k].concat(M,E,p);void 0!==R&&$.push(R);var T=String(e.apply(void 0,$))}else T=v(k,p,E,M,R,e);E>=S&&(y+=p.slice(S,E)+T,S=E+k.length)}return y+p.slice(S)}];function v(t,e,i,o,s,c){var a=i+t.length,l=o.length,u=d;return void 0!==s&&(s=r(s),u=p),n.call(c,u,function(n,r){var c;switch(r.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,i);case"'":return e.slice(a);case"<":c=s[r.slice(1,-1)];break;default:var u=+r;if(0===u)return n;if(u>l){var p=f(u/10);return 0===p?n:p<=l?void 0===o[p-1]?r.charAt(1):o[p-1]+r.charAt(1):n}c=o[u-1]}return void 0===c?"":c})}})},b0c5:function(t,e,n){"use strict";var i=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:i!==/./.exec},{exec:i})},fddd:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"IM-demo"},[n("p",[t._v("在线聊天室 -- “虾哔哔”。通过 websocket 实现的简易聊天室。")]),n("div",{staticClass:"IM"},[t._m(0),n("div",{staticClass:"im_content"},[n("div",{ref:"ref_scroll",staticClass:"im_content-groups"},[n("ul",[t._l(t.msg_list,function(e,i){return[e.type&&"tips"===e.type?n("li",{staticClass:"im_content-tips"},[n("span",[t._v(t._s(e.msg))])]):n("li",{staticClass:"im_content-msgs",attrs:{rule:e.log.user_type}},[n("div",{staticClass:"im_content-msgs-time"},[t._v(t._s(e.log.msg_time))]),n("div",{staticClass:"im_content-msgs-main"},[n("i",{staticClass:"im_icon el-icon-picture"}),n("div",{staticClass:"im_content-msgs-msg"},[n("span",{domProps:{innerHTML:t._s(e.msg)}})])])])]})],2)])]),n("div",{staticClass:"im_inputbox"},[n("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.input_msg,expression:"input_msg",modifiers:{trim:!0}}],staticClass:"im_inputbox-textarea",attrs:{autocomplete:"off",placeholder:"请输入您想问的问题..."},domProps:{value:t.input_msg},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.wsSend(e):null},input:function(e){e.target.composing||(t.input_msg=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),n("div",{staticClass:"im_inputbox-tools"},[n("i",{staticClass:"im_icon el-icon-service"}),n("el-button",{attrs:{type:"primary"},on:{click:t.wsSend}},[t._v("发送")])],1)])])])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"im_header"},[n("div",{staticClass:"im_header-name"},[n("span",[t._v("虾哔哔")])]),n("div",{staticClass:"im_header-right"},[n("i",{staticClass:"im_icon el-icon-minus"}),n("i",{staticClass:"im_icon el-icon-close"})])])}],o=(n("6b54"),n("a481"),n("cadf"),n("551c"),n("097d"),{name:"IM",data:function(){return{Socket:null,msg_list:[],input_msg:""}},created:function(){this.initSocket()},watch:{msg_list:function(){this.scrollToBottom()}},methods:{initSocket:function(){var t=this,e={sid:this.UUID(),botid:"501f522a99184b789b8e81d504380860",debugmode:"on"},n="ws://192.168.179.215/ws?sid=".concat(e.sid,"&botid=").concat(e.botid,"&debugmode=").concat(e.debugmode);this.Socket=new WebSocket(n),this.Socket.onopen=function(e){t.wsOnOpen(e)},this.Socket.onmessage=function(e){t.wsOnMessage(e)},this.Socket.onerror=function(e){t.wsOnError(e)},this.Socket.onclose=function(e){t.wsOnClose(e)}},wsOnOpen:function(t){console.log(t),this.msg_list.push({type:"tips",msg:"机器人上线了"})},wsOnMessage:function(t){console.log(t);var e=JSON.parse(t.data);this.msg_list.push(e)},wsOnError:function(t){},wsOnClose:function(t){this.msg_list.push({type:"tips",msg:"机器人下线了"})},wsSend:function(){if(""!=this.input_msg){this.Socket.send(this.input_msg);var t=this.$days().format("YYYY-MM-DD HH-mm-ss");this.msg_list.push({msg:this.input_msg,log:{user_type:0,msg_type:0,msg_time:t}}),this.input_msg=""}},UUID:function(){var t=(new Date).getTime(),e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"==e?n:7&n|8).toString(16)});return e},handleScroll:function(){this.gotop=window.pageYOffset>=this.height},scrollTop:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2?arguments[2]:void 0,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:500;window.requestAnimationFrame||(window.requestAnimationFrame=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)});var r=Math.abs(e-n),o=Math.ceil(r/i*50);function s(e,n,i){if(e!==n){var r=e+i>n?n:e+i;e>n&&(r=e-i<n?n:e-i),t===window?window.scrollTo(r,r):t.scrollTop=r,window.requestAnimationFrame(function(){return s(r,n,i)})}}s(e,n,o)},scrollToBottom:function(){var t=this.$refs.ref_scroll;t.scrollTop!=t.scrollHeight&&this.scrollTop(this.$refs.ref_scroll,t.scrollTop,t.scrollHeight,1300)}}}),s=o,c=(n("4dd5"),n("2877")),a=Object(c["a"])(s,i,r,!1,null,"403dbd61",null);a.options.__file="IM.vue";e["default"]=a.exports}}]);
//# sourceMappingURL=chunk-267d5342.64271e22.js.map