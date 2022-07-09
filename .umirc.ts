import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // // 配置式路由demo
  // routes: [
  //   { exact: true, path: '/', component: '@/pages/index' },
  //   { exact: true, path: '/login', component: '@/pages/login' },
  //   {
  //     path: '/main',
  //     component: '@/pages/main/_layout',
  //     wrappers:['@/wrappers/Auth'],  // 权限验证,
  //     routes: [
  //       {
  //         path: '/main/content',
  //         component: '@/pages/main/content/_layout',
  //         routes: [
  //           {
  //             path: '/main/content/info',
  //             component: '@/pages/main/content/info',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   { component: '@/pages/404' },
  // ],
  // // 代理
  // proxy:{
  //   "/api":{
  //     target:"https://i.maoyao.com",
  //     changeOrigin:true
  //   }
  // },
  // // 路由模式
  // history:{
  //   type:'hash', // browser || hash
  // }
});
