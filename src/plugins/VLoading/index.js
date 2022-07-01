import LoadingCM from './Loading.vue';
import LoadingDirective from './directive.js';
import { createComponent } from '../utils/createComponent.js';
import merge from '../utils/merge.js';

export const defaultProps = {
  message: 'Loading...',
  duration: 2000,
  isTimer: false,
  useHTMLString: false,
  fullScreen: false
};

function loading(option) {
  const options = merge({}, defaultProps, option);
  const { vNode, component } = createComponent(LoadingCM, options);
  const { props } = vNode.component;

  function show() {
    document.body.appendChild(component);
    props.visible = true;
  }

  function close() {
    if (!props.visible) return;
    props.visible = false;
  }

  return {
    show,
    close
  };
}

export { loading, LoadingDirective };
