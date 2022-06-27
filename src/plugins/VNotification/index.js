import Notification from './Notification.vue';
import { h, render } from 'vue';

const instances = {
  left: [],
  right: [],
  bottomleft: [],
  bottomright: []
};
let instanceIdx = 0;

function setPosition(position, offsetTop) {
  return new Map([
    ['left', offsetTop ? `top:${offsetTop}px;left:10px;` : 'top:0px;left:10px;'],
    ['right', offsetTop ? `top:${offsetTop}px;right:10px;` : 'top:0px;right:10px;'],
    ['bottomleft', offsetTop ? `bottom:${offsetTop}px;left:10px;` : 'bottom:0px;left:10px;'],
    ['bottomright', offsetTop ? `bottom:${offsetTop}px;right:10px;` : 'bottom:0px;right:10px;']
  ]).get(position);
}

function createComponent({
  visible = true,
  width = 400,
  title = 'Title',
  message = 'demo',
  position = 'left',
  duration = 2500,
  offsetTop = 30,
  eleSpacing = 10,
  clearTimer = false
}) {
  instanceIdx++;
  const container = document.createElement('div');
  const vnode = h(Notification);

  //利用render函式，渲染vnode並掛載到 container 容器下
  render(vnode, container);
  // render 函式會把 vnode 轉成 html 在掛載到 container 下面，取 container 第一個節點（也就是組件本身）
  document.body.appendChild(container.firstChild);

  // 紀錄 vnode 間距離及索引
  vnode.id = instanceIdx;
  vnode.offsetTop = offsetTop;

  instances[position].forEach(item => (vnode.offsetTop += Number(item.el.offsetHeight + eleSpacing)));
  vnode.el.setAttribute('style', `${setPosition(position, vnode.offsetTop)}z-index:200${vnode.id};width:${width}px`);
  instances[position].push(vnode);

  // 獲取實例的 props
  const instance = vnode.component;
  const { props, action } = instance;
  Object.assign(props, {
    visible,
    title,
    message,
    duration,
    position,
    clearTimer
  });
  Object.assign(action, {
    'on-close'() {
      closeMessage(vnode.id, width, offsetTop, position, eleSpacing);
    }
  });
}

function closeMessage(id, width, offsetTop, position, eleSpacing) {
  const instanceIdx = instances[position].findIndex(item => item.id === id);
  if (instanceIdx < 0) return;
  instances[position][instanceIdx].component.props.visible = false;
  instances[position].splice(instanceIdx, 1);

  let verticalOffset = offsetTop;
  instances[position].forEach((item, idx) => {
    verticalOffset += idx === 0 ? 0 : item.el.offsetHeight + eleSpacing;
    item.offsetTop = verticalOffset;
    item.el.setAttribute('style', `${setPosition(position, item.offsetTop)}z-index:200${item.id};width:${width}px;`);
  });
}

export default {
  install(app) {
    app.component('v-notification', Notification);
    app.provide('$notification', createComponent);
  }
};
