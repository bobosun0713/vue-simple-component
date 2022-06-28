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
  const vnode = createComponent(NotificationCM);

  vnode.id = 'v-notification' + instanceIdx;
  vnode.offsetTop = offsetTop;

  instances[position].forEach(item => (vnode.offsetTop += Number(item.el.offsetHeight + eleSpacing)));
  instances[position].push(vnode);

  const instance = vnode.component;
  const { props, action } = instance;
  Object.assign(props, {
    visible,
    title,
    message,
    duration,
    offsetTop: vnode.offsetTop,
    position,
    zIndex: instanceIdx,
    width,
    clearTimer,
    isCommand
  });
  Object.assign(action, {
    'on-close'() {
      closeMessage(vnode.id, offsetTop, position, eleSpacing);
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
