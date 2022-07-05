<script>
import { h } from 'vue';
export default {
  name: 'VTable',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup(props, { slots }) {
    const slotWidth = slot => slots && slot.props.width;
    const slotAlign = slot => (slots && slot.props?.align) || 'center';

    const initData = slots.default().reduce((acc, crr) => {
      acc.push({ title: crr.props.label, prop: crr.props.prop });
      return acc;
    }, []);

    const tbodyColumn = () => props.data.map(data => h('tr', calculateColumn('td', data)));
    const calculateColumn = (tag = 'td', data) =>
      initData.map((item, idx) => {
        if (tag === 'td' && data) {
          const renderSlot = slots.default()[idx];
          Object.assign(renderSlot.props, { row: data[item.prop], data });
          return h(tag, { style: `text-align:${slotAlign(slots.default()[idx])}` }, renderSlot);
        }

        return h(
          tag,
          { style: `width:${slotWidth(slots.default()[idx])}px;text-align:${slotAlign(slots.default()[idx])}` },
          item.title
        );
      });

    return () =>
      h(
        'table',
        {
          class: 'table'
        },
        h('thead', { class: 'thead' }, h('tr', calculateColumn('th'))),
        h('tbody', tbodyColumn())
      );
  }
};
</script>

<style lang="scss"></style>
