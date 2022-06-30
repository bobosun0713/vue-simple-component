import LoadingCM from './Loading.vue';
import { createComponent } from '../utils/createComponent.js';
import { addClass } from '../utils/dom.js';
import { defaultProps } from './index.js';

function insertDom(parent, loading, binding) {
  loading.component.props.visible = binding;
  parent.appendChild(loading.el);
}

export default {
  created(el, binding) {
    const { vNode } = createComponent(LoadingCM, defaultProps);
    el.loading = vNode;
    addClass(el, 'v-loading--parent');
    addClass(el.loading.el, 'v-loading--inner');

    if (binding.value) {
      insertDom(el, el.loading, binding.value);
    }
  },
  updated(el, binding) {
    if (binding.value) {
      insertDom(el, el.loading, binding.value);
    } else {
      el.loading.component.props.visible = false;
    }
  }
};
