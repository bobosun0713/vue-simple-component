<script>
export default { name: 'VTableColumn' };
</script>

<script setup>
import { useAttrs } from 'vue';
const attrs = useAttrs();
</script>

<template>
  <slot :row="attrs['row']" :data="attrs['data']">{{ attrs['row'] }}</slot>
</template>
