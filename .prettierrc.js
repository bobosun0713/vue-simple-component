module.exports = {
  printWidth: 120, //編輯器每行的長度，預設80
  tabWidth: 2, //製表符tab的寬度，預設值是2
  useTabs: false, //程式碼縮排是否用製表符tab，預設false
  semi: true, //是否使用分號，預設true，使用分號
  singleQuote: true, //是否使用單引號，預設為false
  quoteProps: 'as-needed', //物件屬性的引號使用 as-needed 僅在需要的時候使用 consistent 有一個屬性需要引號，就都需要引號 preserve 保留使用者輸入的情況
  jsxSingleQuote: false, // jsx 不使用單引號，而使用雙引號
  trailingComma: 'none', //末尾逗號 none 末尾沒有逗號 es5 es5有效的地方保留 all 在可能的地方都加上逗號
  bracketSpacing: true, //字面量物件括號中的空格，預設true true - Example: { foo: bar }.  false - Example: {foo: bar}.
  jsxBracketSameLine: false,
  arrowParens: 'avoid', //箭頭函式中的括號always avoid
  htmlWhitespaceSensitivity: 'ignore',
  vueIndentScriptAndStyle: false, //是否給vue中的 <script> and <style>標籤加縮排
  endOfLine: 'auto', //行末尾標識
  eslintIntegration: true, //不讓prettier使用eslint的程式碼格式進行校驗
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120
      }
    }
  ]
};
