<script>
export default { name: 'VNotification' };
</script>

<script setup>
import { getCurrentInstance, computed, onMounted, nextTick } from 'vue';
const instance = getCurrentInstance();
instance.action = {
  'on-close': () => {}
};
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },

  title: {
    type: String,
    default: 'Title'
  },
  message: {
    type: String,
    default: 'demo'
  },
  position: {
    type: String,
    default: 'left'
  },
  duration: {
    type: Number,
    default: 3000
  },

  clearTimer: {
    type: Boolean,
    default: false
  }
});

onMounted(() => {
  nextTick(() => {
    if (props.clearTimer) return;
    setTimer();
  });
});

// Position
const selectAnimation = computed(() => {
  switch (props.position) {
    case 'left':
    case 'bottomleft':
      return 'notificationL';
    case 'right':
    case 'bottomright':
      return 'notificationR';
    default:
      return 'bottomleft';
  }
});

let timer;
const setTimer = () => {
  timer = setTimeout(() => {
    close();
  }, props.duration);
};
const close = () => {
  clearInterval(timer);
  instance.action['on-close']();
};

const destroyElement = () => {
  instance.proxy.$el.parentNode.removeChild(instance.proxy.$el);
};
</script>

<template>
  <transition :name="selectAnimation" mode="out-in" @after-leave="destroyElement">
    <div v-show="visible" class="notification">
      <div class="notification-header">
        <slot name="notification-header__title">
          <div class="notification-header__title">{{ props.title }}</div>
        </slot>
        <div class="notification-cancel" @click="close"></div>
      </div>

      <div class="notification-body">
        <slot name="notification-body">{{ message }}</slot>
      </div>

      <div class="notification-footer">
        <slot name="notification-footer"></slot>
      </div>
    </div>
  </transition>
</template>

<style>
@import './_style.css';
</style>
