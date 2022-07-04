<script>
export default { name: 'VModal' };
</script>

<script setup>
import { useSlots, computed } from 'vue';
import { instanceSetting } from '../utils/v-core.js';
const modalInstance = instanceSetting();
modalInstance.instance.action = {
  'on-cancel': () => {},
  'on-confirm': () => {}
};
const slots = useSlots();
const props = defineProps({
  visible: { type: Boolean, default: false },
  size: { type: String, default: 'small' },
  title: { type: String, default: 'Title' },
  textContent: { type: String, default: 'Modal body text goes here.' },
  submitName: { type: String, default: 'SUBMIT' },
  submitType: { type: String, default: null },
  cancelName: { type: String, default: 'CANCEL' },
  onlyShowCancelBtn: { type: Boolean, default: false },
  isCommand: { type: Boolean, default: false }
});
const emit = defineEmits(['on-cancel', 'update:visible']);

const modalSize = computed(
  () =>
    new Map([
      ['large', 'modal-lg'],
      ['small', 'modal-sm'],
      ['xl', 'modal-xl'],
      ['middle', 'modal-md']
    ]).get(props.size) ?? 'modal-sm'
);
const buttonColor = computed(
  () =>
    new Map([
      ['submit', 'btn-primary'],
      ['delete', 'btn-danger'],
      ['confirm', 'btn-success']
    ]).get(props.submitType) ?? 'btn-primary'
);
const hasDefaultSlot = type => slots[type];

const onCancel = () => {
  emit('on-cancel');
  emit('update:visible', false);
  modalInstance.instance.action['on-cancel']();
};
const onConfirm = () => {
  emit('update:visible', false);
  modalInstance.instance.action['on-confirm']();
};
</script>

<template>
  <transition name="modal" @after-leave="modalInstance.destroyElement(modalInstance.instance)">
    <div v-show="props.visible" class="v-modal" @click.self.stop.="onCancel">
      <div class="v-modal-container" :class="modalSize">
        <div class="v-modal-content">
          <div v-if="props.title" class="v-modal-header">
            <h4 class="modal-title" v-text="title" />
            <button type="button" class="v-modal-cancel" @click="onCancel">
              <svg width="15" height="15" style="fill: transparent">
                <line x1="0" x2="15" y1="0" y2="15" stroke="grey" fill="transparent" stroke-width="3" />
                <line x1="0" x2="15" y1="15" y2="0" stroke="grey" fill="transparent" stroke-width="3" />
              </svg>
            </button>
          </div>

          <div class="v-modal-body">
            <template v-if="hasDefaultSlot('modal-body')">
              <slot name="modal-body"></slot>
            </template>
            <template v-else>
              <p>{{ props.textContent }}</p>
            </template>
          </div>

          <div class="v-modal-footer">
            <template v-if="hasDefaultSlot('modal-footer')">
              <slot name="modal-footer"></slot>
            </template>
            <template v-else>
              <button v-if="!props.onlyShowCancelBtn" type="button" class="btn btn-link" @click="onConfirm">
                <span>{{ props.submitName }}</span>
              </button>
              <button type="button" :class="['btn', buttonColor]" @click="onCancel">
                <span>{{ props.cancelName }}</span>
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
@import './_style.css';
</style>
