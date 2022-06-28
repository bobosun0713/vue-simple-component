<script>
export default { name: 'VCollapse' };
</script>

<script setup>
import { ref, onMounted, computed } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  content: {
    type: String,
    default:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit similique nam hic deserunt officia. Ipsum doloribus impedit obcaecati eligendi'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['active']);
let isActive = ref(false);
let collapseBodyRef = ref(null);
let collapseBodyHeight = 0;
const setCollapseBodyHeight = computed(() => (isActive.value ? `${collapseBodyHeight}px` : `0px`));

const activeHandler = () => {
  isActive.value = !isActive.value;
  emit('active', isActive);
};

onMounted(() => {
  collapseBodyHeight = collapseBodyRef.value.getBoundingClientRect().height;
});
</script>

<template>
  <div class="collapse">
    <div class="collapse-header" :class="{ 'collapse-header--active': isActive }" @click="activeHandler">
      <slot name="collapse-header">
        {{ props.title }}
      </slot>
      <div class="collapse-icon" :class="{ 'collapse-icon--active': isActive }">
        <slot name="collapse-icon">&lsaquo;</slot>
      </div>
    </div>
    <div class="collapse-wrap" :style="`height:${setCollapseBodyHeight}`">
      <div ref="collapseBodyRef" class="collapse-body">
        <slot name="collapse-body">
          {{ props.content }}
        </slot>
      </div>
    </div>
  </div>
</template>

<style>
@import './_style.css';
</style>
