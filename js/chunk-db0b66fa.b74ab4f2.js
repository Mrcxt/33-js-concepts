(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-db0b66fa"],{b952:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"calcCircularLayout"},[r("p",[t._v("JavaScript计算N个点随机排列成圆的各个点坐标 ")]),r("p",[t._v("随机点的原理是根据 半径 ✖ 角度的正弦值和余弦值来得到 x轴和y轴 的距离。因此只要生成一个随机的角度就可以了")]),r("el-form",{attrs:{"label-width":"120px"}},[r("el-form-item",{attrs:{label:"坐标个数："}},[r("el-input-number",{attrs:{min:1,max:50},model:{value:t.form.nodeNum,callback:function(e){t.$set(t.form,"nodeNum",e)},expression:"form.nodeNum"}})],1),r("div",[r("el-form-item",{attrs:{label:"圆的中心坐标："}}),r("el-form-item",{attrs:{label:"x轴："}},[r("el-input-number",{attrs:{min:100,max:300},model:{value:t.form.center.x,callback:function(e){t.$set(t.form.center,"x",e)},expression:"form.center.x"}})],1),r("el-form-item",{attrs:{label:"y轴："}},[r("el-input-number",{attrs:{min:100,max:300},model:{value:t.form.center.y,callback:function(e){t.$set(t.form.center,"y",e)},expression:"form.center.y"}})],1)],1),r("el-form-item",{attrs:{label:"圆的半径："}},[r("el-input-number",{attrs:{min:1,max:200},model:{value:t.form.radius,callback:function(e){t.$set(t.form,"radius",e)},expression:"form.radius"}})],1),r("el-form-item",[r("el-button",{on:{click:function(e){t.calcCircularLayout(t.form.nodeNum,{x:t.form.center.x,y:t.form.center.y},t.form.radius)}}},[t._v("随机")]),r("el-button",{on:{click:function(e){t.calcCircularLayout_01(t.form.nodeNum,{x:t.form.center.x,y:t.form.center.y},t.form.radius)}}},[t._v("均匀")])],1)],1),r("div",{staticClass:"circle-items"},[r("div",{staticClass:"circle",style:{left:t.form.center.x+"px",top:t.form.center.y+"px"}}),t._l(t.calcCircularLayout_items,function(t){return[r("div",{staticClass:"circle",style:{left:t.x+"px",top:t.y+"px"}})]})],2)],1)},c=[],o={name:"calcCircularLayout",data:function(){return{form:{nodeNum:5,center:{x:200,y:200},radius:100},calcCircularLayout_items:""}},methods:{calcCircularLayout:function(t,e,r){for(var a,c,o=[],n=[],l=0;l<t;){var i=(2*Math.random()*Math.PI).toFixed(1);n.indexOf(i)<0&&(n.push(i),l++)}return n.forEach(function(t){a=e.x+r*Math.sin(t),c=e.y+r*Math.cos(t),o.push({x:a,y:c})}),console.info(o),this.calcCircularLayout_items=o,o},calcCircularLayout_01:function(t,e,r){var a,c,o,n,l=[];for(a=c=0;c<t;a=++c){var i=2*Math.PI*a;o=e.x+r*Math.sin(i/t),n=e.y+r*Math.cos(i/t),l.push({x:o,y:n})}return console.info(l),this.calcCircularLayout_items=l,l}}},n=o,l=(r("bf5e"),r("2877")),i=Object(l["a"])(n,a,c,!1,null,"bea9fb0c",null);i.options.__file="calcCircularLayout.vue";e["default"]=i.exports},bf5e:function(t,e,r){"use strict";var a=r("dede"),c=r.n(a);c.a},dede:function(t,e,r){}}]);
//# sourceMappingURL=chunk-db0b66fa.b74ab4f2.js.map