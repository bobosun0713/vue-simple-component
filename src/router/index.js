import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '@/views/index.vue';
const routes = [
  {
    path: '/',
    // or 動態引入(PS:減少第一次載入檔案大小，但會增加request數量)
    component: Index // () => import('@/components/HelloWorld.vue')
  }
];
export default createRouter({
  history: createWebHashHistory(),
  routes
});
