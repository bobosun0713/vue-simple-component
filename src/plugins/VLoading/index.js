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

function loading(props) {
  const options = merge({}, defaultProps, props);
  const instance = createComponent(LoadingCM, options);
  instance.component.props.visible = true;
}

export { loading, LoadingDirective };
