import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import VM from './plugins/index.js';

createApp(App).use(router).use(VM).mount('#app');
