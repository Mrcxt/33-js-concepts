import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            redirect: "/JavaScript",
            visible: false
        },
        {
            path: "/home",
            name: "首页",
            visible: false,
            component: () =>
                import ("./views/home/home.vue")
        },
        {
            path: "/JavaScript",
            name: "JavaScript",
            component: () =>
                import ("./components/layout/layout.vue"),
            children: [{
                    path: "leetCode",
                    name: "leetCode",
                    component: () =>
                        import ("./views/JavaScript/leetCode/leetCode.vue")
                },
                {
                    path: "calcCircularLayout",
                    name: "随机坐标点",
                    component: () =>
                        import ("./views/JavaScript/calcCircularLayout/calcCircularLayout.vue")
                },
                {
                    path: "IM",
                    name: "虾哔哔 IM",
                    component: () =>
                        import ("./views/JavaScript/IM/IM.vue")
                },
                {
                    path: "D3-00",
                    name: "D3-00",
                    component: () =>
                        import ("./views/JavaScript/D3/D3.vue")
                }, {
                    path: "D3-demo",
                    name: "D3-demo",
                    component: () =>
                        import ("./views/JavaScript/D3/D3-dmeo.vue")
                }, {
                    path: "D3-force",
                    name: "D3-force",
                    component: () =>
                        import ("./views/JavaScript/D3/D3-force.vue")
                }, {
                    path: "IDCard",
                    name: "IDCard",
                    component: () =>
                        import ("./views/JavaScript/IDCard/IDCard.vue")
                },
            ]
        },
        {
            path: "/CSS",
            name: "CSS",
            component: () =>
                import ("./components/layout/layout.vue"),
            children: [{
                path: "customCss",
                name: "在线换肤功能",
                component: () =>
                    import ("./views/CSS/customCss/customCss.vue")
            }]
        }
    ]
});