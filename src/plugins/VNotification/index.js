import NotificationCM from './Notification.vue';
import { createComponent } from '../utils/createComponent.js';

const instances = {
  left: [],
  right: [],
  bottomleft: [],
  bottomright: []
};
let instanceIdx = 0;

function notification({
  visible = true,
  width = 350,
  title = 'Title',
  message = 'demo',
  position = 'left',
  duration = 2500,
  offsetTop = 30,
  eleSpacing = 10,
  clearTimer = false,
  isCommand = true
}) {
  instanceIdx++;
  const { vNode, component } = createComponent(NotificationCM);
  document.body.appendChild(component);

  vNode.id = 'v-notification' + instanceIdx;
  vNode.offsetTop = offsetTop;

  instances[position].forEach(item => (vNode.offsetTop += Number(item.el.offsetHeight + eleSpacing)));
  instances[position].push(vNode);

  const instance = vNode.component;
  const { props, action } = instance;
  Object.assign(props, {
    visible,
    title,
    message,
    duration,
    offsetTop: vNode.offsetTop,
    position,
    zIndex: instanceIdx,
    width,
    clearTimer,
    isCommand
  });
  Object.assign(action, {
    'on-close'() {
      closeMessage(vNode.id, offsetTop, position, eleSpacing);
    }
  });
}

function closeMessage(id, offsetTop, position, eleSpacing) {
  const instanceIdx = instances[position].findIndex(item => item.id === id);
  if (instanceIdx < 0 && !instanceIdx) return;
  instances[position][instanceIdx].component.props.visible = false;
  instances[position].splice(instanceIdx, 1);

  let verticalOffset = offsetTop;
  instances[position].forEach((item, idx) => {
    verticalOffset += idx === 0 ? 0 : item.el.offsetHeight + eleSpacing;
    item.component.props.offsetTop = verticalOffset;
  });
}
export { NotificationCM, notification };
