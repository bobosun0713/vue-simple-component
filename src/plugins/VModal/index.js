import ModalCM from './Modal.vue';
import { createComponent } from '../utils/createComponent.js';
import merge from '../utils/merge.js';

const defaultProps = {
  size: 'small',
  title: 'Title',
  textContent: 'Modal body text goes here.',
  submitName: 'SUBMIT',
  submitType: null,
  cancelName: 'CANCEL',
  onlyShowCancelBtn: false,
  isCommand: true,
  link: ''
};

function modal(option, onConfirm, onCancel) {
  const options = merge({}, defaultProps, option);
  const { vNode, component } = createComponent(ModalCM, options);
  const { props, action } = vNode.component;
  props.visible = true;
  document.body.appendChild(component);

  const closeModal = () => {
    props.visible = false;
  };

  Object.assign(action, {
    'on-confirm'() {
      onConfirm && onConfirm();
      closeModal();
    },
    'on-cancel'() {
      onCancel && onCancel();
      closeModal();
    }
  });
}

export { ModalCM, modal };
