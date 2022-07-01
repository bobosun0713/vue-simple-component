<script>
export default { name: 'VLoading' };
</script>

<script setup>
import { getCurrentInstance, watch, ref } from 'vue';
const instance = getCurrentInstance();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: '請稍候'
  },
  isTimer: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 2000
  },
  useHTMLString: {
    type: Boolean,
    default: false
  },
  fullScreen: {
    type: Boolean,
    default: false
  }
});
const isLoading = ref(false);

watch(
  () => props.visible,
  val => {
    if (val) isLoading.value = true;
    else isLoading.value = false;
    if (props.isTimer) setTimer();
  }
);

let timer;
const setTimer = () => {
  timer = setTimeout(() => {
    isLoading.value = false;
    clearInterval(timer);
  }, props.duration);
};

const destroyElement = () => {
  instance.proxy.$el.parentNode.removeChild(instance.proxy.$el);
};
</script>

<template>
  <transition name="loading" @after-leave="destroyElement">
    <div v-show="isLoading" class="v-loading">
      <div class="v-loading-spinner">
        <template v-if="props.useHTMLString">
          <div v-html="props.message"></div>
        </template>
        <template v-else>
          <svg width="60" height="60">
            <circle
              cx="30"
              cy="30"
              r="14"
              style="stroke: #000; stroke-width: 5; stroke-dasharray: 60 10; fill: transparent"
            >
              <animateTransform
                attributeName="transform"
                begin="0s"
                dur="2s"
                type="rotate"
                from="0,30,30"
                to="360,30,30"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
          <p>{{ props.message }}</p>
        </template>
      </div>
    </div>
  </transition>
</template>

<style>
.v-loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000;
  width: 100vw;
  height: 100vh;
  background: rgba(227, 227, 227, 0.7);

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  transition: all 0.3s;
}

.v-loading-spinner {
  text-align: center;
  font-weight: 600;
}

.v-loading--parent {
  position: relative;
}
.v-loading--inner {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Animation */
.loading-enter-active,
.loading-leave-active {
  opacity: 1;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}
</style>
