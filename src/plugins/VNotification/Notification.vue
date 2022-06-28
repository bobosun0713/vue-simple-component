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
  duration: {
    type: Number,
    default: 3000
  },
  offsetTop: {
    type: Number,
    default: 30
  },
  position: {
    type: String,
    default: 'left'
  },
  zIndex: {
    type: Number,
    default: 1
  },
  width: {
    type: Number,
    default: 400
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

onMounted(() => {
  nextTick(() => {
    if (props.clearTimer) return;
    setTimer();
  });
});

const horizontalDirectionClass = computed(() => (/right/.test(props.position) ? 'right' : 'left'));
const verticalDirection = computed(() => (/bottom/.test(props.position) ? 'bottom' : 'top'));
const verticalStyle = computed(
  () => `${verticalDirection.value}:${props.offsetTop}px;z-index:${props.zIndex};width:${props.width}px`
);
const selectAnimation = computed(() =>
  horizontalDirectionClass.value.includes('right') ? 'notificationR' : 'notificationL'
);

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
</script>

<template>
  <transition :name="selectAnimation" mode="out-in" @after-leave="destroyElement">
    <div v-show="visible" class="notification" :class="horizontalDirectionClass" :style="verticalStyle">
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
