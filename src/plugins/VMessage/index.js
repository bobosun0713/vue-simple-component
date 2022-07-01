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
  clearTimer = false,
  isCommand = true
}) {
  instanceIdx++;
  const { vNode, component } = createComponent(MessageCM);
  document.body.appendChild(component);

  vNode.id = instanceIdx;
  vNode.offsetTop = offsetTop;
  instances.forEach(item => (vNode.offsetTop += Number(item.el.offsetHeight + eleSpacing)));
  instances.push(vNode);

  const { props, action } = vNode.component;
  Object.assign(props, {
    visible,
    type,
    message,
    duration,
    offsetTop: vNode.offsetTop,
    zIndex: instanceIdx,
    defaultBgColor,
    clearTimer,
    isCommand
  });
  Object.assign(action, {
    'on-close'() {
      closeMessage(vNode.id, offsetTop, eleSpacing);
    }
  });
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
