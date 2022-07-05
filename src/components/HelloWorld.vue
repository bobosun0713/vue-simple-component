<script setup>
import { inject, ref } from 'vue';
const open = inject('$modal');
const msg = inject('$message');
const not = inject('$notification');
const loading = inject('$loading')();

const currentLoading = () => {
  loading.show();
  setTimeout(() => loading.close(), 500);
};

const testModal = () => {
  open({ size: 'xl', textContent: '測試使用測試使用測試使用測試使用測試使用測試使用測試使用測試使用' }, () => {
    open({ size: 'sm', textContent: '結束' });
  });
};

const isActive = ref(false);

const data = [
  {
    title: '內文1',
    content: '內文1~測試使用',
    vender: 1
  },
  {
    title: '內文2',
    content: '內文2～測試使用',
    vender: 1
  },
  {
    title: '內文3',
    content: '內文3～測試使用',
    vender: 1
  },
  {
    title: '內文4',
    content: '內文4～測試使用',
    vender: 1
  }
];
</script>

<template>
  <a href="#" @click="msg({ title: 'test' })">message</a>

  <br />

  <a href="#" @click="not({ title: 'test', message: '妳好', position: 'left' })">notification</a>
  <br />

  <a href="#" @click="currentLoading">loading</a>
  <br />

  <a href="#" @click="testModal">modal1</a>

  <a href="#" @click="isActive = !isActive">inner modal1</a>

  <br />

  <VTable :data="data">
    <VTableColumn prop="title" width="200" label="標題"></VTableColumn>

    <VTableColumn prop="vender" label="等級"></VTableColumn>

    <VTableColumn prop="content" label="內容"></VTableColumn>

    <VTableColumn label="操作">
      <button>按我</button>
      <button>刪除</button>
    </VTableColumn>
  </VTable>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
