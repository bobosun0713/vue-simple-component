<script>
export default { name: 'VMessage' };
</script>

<script setup>
import { getCurrentInstance, onMounted, computed, nextTick } from 'vue';
const instance = getCurrentInstance();
instance.action = {
  'on-close': () => {}
};

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'info'
  },
  message: {
    type: String,
    default: 'demo'
  },
  duration: {
    type: Number,
    default: 3000
  },
  offsetTop: {
    type: Number,
    default: 10
  },
  zIndex: {
    type: Number,
    default: 1
  },
  defaultBgColor: {
    type: Object,
    default() {
      return {
        success: '#67c23a',
        danger: '#f56c6c',
        warning: '#e6a23c',
        info: '#909399'
      };
    }
  },
  clearTimer: {
    type: Boolean,
    default: false
  },
  isCommand: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:visible']);

const verticalStyle = computed(() => `top:${props.offsetTop}px;z-index:${props.zIndex};`);

onMounted(() => {
  nextTick(() => {
    if (props.clearTimer) return;
    setTimer();
  });
});

let timer;
const setTimer = () => {
  timer = setTimeout(() => {
    close();
  }, props.duration);
};
const close = () => {
  clearInterval(timer);
  emit('update:visible', false);
  instance.action['on-close']();
};
const destroyElement = () => {
  if (!props.isCommand) return;
  instance.proxy.$el.parentNode.removeChild(instance.proxy.$el);
};
const backgroundColor = computed(() => props.defaultBgColor[props.type]);
</script>

<template>
  <transition name="message" mode="out-in" @after-leave="destroyElement">
    <div v-show="visible" class="message" :style="verticalStyle">
      <div class="message-body" :style="`background:${backgroundColor};}`">
        {{ message }}
      </div>
      <button type="button" class="message-cancel" @click="close"></button>
    </div>
  </transition>
</template>

<style>
@import './_style.css';
</style>
