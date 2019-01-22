import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "leetCode",
      component: () => import("./views/leetCode/leetCode.vue")
    },
    {
      path: "/calcCircularLayout",
      name: "随机坐标点",
      component: () =>
        import("./views/calcCircularLayout/calcCircularLayout.vue")
    },
    {
      path: "/IM",
      name: "虾哔哔 IM",
      component: () => import("./views/IM/IM.vue")
    },
    {
      path: "/customCss",
      name: "在线换肤功能",
      component: () => import("./views/customCss/customCss.vue")
    }
  ]
});
