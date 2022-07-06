import { h } from 'vue';
export default {
  name: 'VTableColumn',
  setup(props, { slots, attrs }) {
    // 有傳入slot時 slots.default() 就不會是undefine，而是回傳array
    return () => (slots.default?.() ? h(slots.default, { row: attrs['row'], data: attrs['data'] }) : attrs['row']);
  }
};
