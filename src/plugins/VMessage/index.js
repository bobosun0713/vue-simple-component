import MessageCM from './Message.vue';
import { createComponent } from '../utils/createComponent.js';

let instances = [];
let instanceIdx = 0;

function message({
  visible = true,
  type = 'info',
  message = 'demo',
  duration = 2500,
  offsetTop = 20,
  eleSpacing = 10,
  defaultBgColor = {
    success: '#67c23a',
    danger: '#f56c6c',
    warning: '#e6a23c',
    info: '#909399'
  },
  clearTimer = false
}) {
  instanceIdx++;
  const vnode = createComponent(MessageCM, 'v-message');
  vnode.id = instanceIdx;
  vnode.offsetTop = offsetTop;
  instances.forEach(item => (vnode.offsetTop += Number(item.el.offsetHeight + eleSpacing)));
  instances.push(vnode);

  const instance = vnode.component;
  const { props, action } = instance;
  Object.assign(props, {
    visible,
    type,
    message,
    duration,
    offsetTop: vnode.offsetTop,
    zIndex: instanceIdx,
    defaultBgColor,
    clearTimer
  });
  Object.assign(action, {
    'on-close'() {
      closeMessage(vnode.id, offsetTop, eleSpacing);
    }
  });

  return vnode;
}

function closeMessage(id, offset, eleSpacing) {
  const instanceIdx = instances.findIndex(item => item.id === id);
  if (instanceIdx < 0 && !instances) return;
  instances[instanceIdx].component.props.visible = false;
  instances.splice(instanceIdx, 1);

  let verticalOffset = offset;
  instances.forEach((item, idx) => {
    verticalOffset += idx === 0 ? 0 : item.el.offsetHeight + eleSpacing;
    item.offsetTop = verticalOffset;
    item.component.props.offsetTop = verticalOffset;
  });
}

export { MessageCM, message };
