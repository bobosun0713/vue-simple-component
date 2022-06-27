module.exports = {
  root: true, // 找當前配置文件不能往父層查找
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'prettier', '@vue/prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2017
  },
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'no-var': 2, //禁用var，用let和const代替
    'no-unused-vars': [2, { args: 'none' }], //消除未使用的變數  不檢查函式
    'no-redeclare': 2, //禁止多次宣告同一變數
    'no-dupe-keys': 2 //在建立物件字面量時不允許key重複
    // 'vue/attributes-order': 2, // vue api使用顺序
    //  "vue/order-in-components": []
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        mocha: true
      }
    }
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
};
