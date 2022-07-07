import { nextTick } from 'vue';
export default {
  name: 'VTableColumn',
  props: {
    label: String,
    prop: String,
    row: [String, Number],
    width: [String, Number],
    data: Object
  },
  setup(props, { slots }) {
    const filterTag = slots
      .default?.({ row: props.row, data: props.data })
      .filter(item => item?.type?.description !== 'Comment');
    return () => {
      // 有傳入slot時 slots.default() 就不會是undefine，而是回傳array
      return filterTag?.length ? filterTag : props.row;
    };
  }
};
