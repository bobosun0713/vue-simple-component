import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.vue', 'src/**/*.js'] //檢查文件
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        /** 如果多個文件，可以使用
         * '@import "@/assets/scss/xxx.scss";
         * @import"@/assets/scss/xxx.scss";'
         **/
        additionalData: `@import "@/assets/scss/main.scss";` //共享scss(variable,mixin,function...)
      }
    }
  }
});
