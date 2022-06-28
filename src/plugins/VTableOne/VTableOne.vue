<script setup>
import { defineProps, onMounted, ref } from 'vue';
const prop = defineProps({
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

const columns = ref([]);

const initialColumns = () => {
  return new Promise(resolve => {
    for (const [key, value] of Object.entries(prop.data[0])) {
      columns.value.push({ title: value, prop: key });
    }

    resolve();
  });
};

const setColumns = () => {
  return new Promise(resolve => {
    const col = initialDataSetList('data-label');
    const row = initialDataSetList('data-prop');
    const idx = initialDataSetList('data-index');

    let result = [];
    for (let i = 0; i < col.length; i++) {
      result[i] = {
        //* 如果沒有指定index 直接取columns.length排最後一個 , 預設排序（ 舊->新 ）
        id: parseInt(idx[i] || col.length),
        title: col[i],
        prop: row[i]
      };
    }
    columns.value = col.length < 2 ? result : result.sort((a, b) => a.id - b.id);

    resolve();
  });
};

const initialDataSetList = attribute => {
  const initialSet = new Set();
  document.querySelectorAll(`[${attribute}]`).forEach(item => {
    initialSet.add(item.getAttribute(attribute));
  });
  return [...initialSet];
};

onMounted(async () => {
  await initialColumns();
  await setColumns();
});
</script>

<template>
  <div class="wrap">
    <table>
      <thead>
        <tr>
          <th v-if="selection">
            <input type="checkbox" />
          </th>
          <th v-for="col in columns" :key="col.title">
            {{ col.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in prop.data" :key="idx">
          <td v-if="selection">
            <input type="checkbox" />
          </td>
          <td v-for="(col, idx) in columns" :key="idx">
            <template v-if="'prop' in col">
              <slot :name="col.prop" :prop="col.prop" :row="row[col.prop]"></slot>
            </template>
            <slot v-else>default</slot>
          </td>
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
