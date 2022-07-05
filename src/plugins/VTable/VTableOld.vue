<script>
export default { name: 'VTableOld' };
</script>
<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';

/* Props */
const prop = defineProps({
  columns: {
    type: Array,
    default() {
      return [];
    }
  },
  data: {
    type: Array,
    default() {
      return [];
    }
  },
  selection: {
    type: Boolean,
    default: false
  }
});

/* Status */
const orderBy = ref(null);
const checkAll = ref(false);

/* Emits */
const emit = defineEmits(['sorted']);

/* CheckBox */
const checkAllHandler = () => {
  prop.data.forEach(item => {
    item['checked'] = !checkAll.value;
  });
};
const checkHandler = row => {
  checkAll.value = false;
  row['checked'] = !row['checked'];
};

/* Sort Column */
const sortHandler = item => {
  if (item['sort'] === 'none') return;
  prop.columns.forEach(col => (col['sort'] !== 'none' ? (col['sort'] = false) : ''));
  item['sort'] = true;
  item['sortBy'] = orderBy.value !== item.prop ? 'asc' : item['sortBy'] === 'asc' ? 'desc' : 'asc';
  orderBy.value = item.prop;
  emit('sorted', { orderBy: item.prop, sortBy: item['sortBy'] });
};

/* HasResult */
const dataLength = computed(() => {
  if (!prop.data.length) return prop.columns.length;
  else return false;
});
</script>

<template>
  <div class="wrap">
    <table>
      <thead>
        <tr>
          <th v-if="selection">
            <input type="checkbox" v-model="checkAll" @click="checkAllHandler(row)" />
          </th>
          <th v-for="col in prop.columns" :key="col.title" @click="sortHandler(col)">
            {{ col.title }}
            <span v-if="col.sort">{{ !col.sortBy ? '' : col.sortBy === 'asc' ? '&uarr;' : '&darr;' }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="!dataLength">
          <tr v-for="(row, idx) in prop.data" :key="idx">
            <td v-if="selection">
              <input type="checkbox" v-model="row.checked" @click="checkHandler(row)" />
            </td>
            <td v-for="(col, idx) in prop.columns" :key="idx">
              <template v-if="'prop' in col">
                <slot :name="col.prop" :row="row"></slot>
              </template>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td :colspan="dataLength">目前沒有資料</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.wrap {
  padding: 12px;
}

.bg-primary-opacity {
  background: rgba(193, 137, 58, 0.08);
}

.bg-gray {
  background: #eee;
}

.no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.isHover {
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.08);
}

.w-100 {
  width: 300px;
}

.py-8 {
  padding: 50px 0px !important;
}

table {
  border-collapse: separate;
  border-spacing: 0;
}

th,
td {
  padding: 6px 12px;
  border: 1px solid;
}

.noBottomBorder {
  border-bottom: none;
}
</style>
