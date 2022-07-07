import { h } from 'vue';
export default {
  name: 'VTable',
  props: { data: Array },
  setup(props, { slots }) {
    const slotWidth = slot => slots && slot.props?.width;
    const slotAlign = slot => (slots && slot.props?.align) || 'center';

    const initData = slots.default().reduce((acc, crr) => {
      if (typeof crr.type !== 'symbol') {
        acc.push({ vnode: crr, props: { title: crr.props.label, prop: crr.props.prop } });
        return acc;
      }
      return acc;
    }, []);

    const tbodyColumn = () => props.data.map(data => h('tr', calculateColumn('td', data)));

    const calculateColumn = (tag = 'td', data) =>
      initData.map(item => {
        if (tag === 'td' && data) {
          // 把每筆default的值重新設定，並回傳新的 default props 來做渲染
          // 每筆row的column都包含，該筆row所有的資料
          Object.assign(item.vnode.props, { row: data[item.props.prop], data });
          return h(tag, { style: `text-align:${slotAlign(item)}` }, item.vnode);
        }

        return h(tag, { style: `width:${slotWidth(item)}px;text-align:${slotAlign(item)}` }, item.props.title);
      });

    return () =>
      h(
        'table',
        {
          class: 'table'
        },
        [
          //* thead
          h('thead', { class: 'thead' }, h('tr', calculateColumn('th'))),
          //* tbody
          h('tbody', tbodyColumn())
        ]
      );
  }
};
