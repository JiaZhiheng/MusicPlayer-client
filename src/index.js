import { initPlayerControl, initPlayerEvent } from "./home/control.js";
import { homePage } from './home/home.js';
import { playerPage } from './player/player.js';
import { recommendListPage } from './recommendList/recommendList.js';
import { reactive } from "./util/reactive.js";
import { getRouterOptions } from "./util/util.js";

//数据响应式执行函数
let effective = () => changeComponent();
// 数据响应式处理
export const hashProxy = reactive({
  hash: ""
}, effective)

//路由表
const routers = [{
    name: 'home',
    path: '/home',
    component: homePage
  },
  {
    name: 'recommendList',
    path: '/recommendList',
    component: recommendListPage
  },
  {
    name: 'player',
    path: '/player',
    component: playerPage
  },
];
// let hash;

function changeComponent() {
  let options = getRouterOptions(hashProxy.hash);
  const [{ component, name }] = routers.filter(router => router.name == options.name);
  component(options);
  // document.querySelector('#header-title').innerHTML = name;
}

// 监听页面 load 和 hashchange 事件，事件触发后对代理对象赋值
window.addEventListener('load', () => {
  hashProxy.hash = window.location.hash;
  // changeComponent()
  initControl()
})

window.addEventListener('hashchange', () => {
  hashProxy.hash = window.location.hash;
  // changeComponent()
})

function initControl() {
  //初始化的时候加载歌曲
  initPlayerControl();
  //绑定底部控制栏的事件
  initPlayerEvent();
}