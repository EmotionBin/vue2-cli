// 格式化规则
module.exports = {
  // 单引号
  singleQuote: 'off',
  // 尾部分号
  semi: true,
  // 句末逗号使用 es5 中有效的逗号
  trailingComma: 'es5',
  // 对象属性，必要时使用引号
  quoteProps: 'as-needed',
  // tab 缩进为 2 个空格
  tabWidth: 2,
  // 不使用 tab 缩进，使用空格缩进
  useTabs: false,
  // 对象中 value 前增加一个空格
  bracketSpacing: true,
  // 换行长度
  printWidth: 80,
  // > 放在最后一行末尾，而非单独成行
  jsxBracketSameLine: true,
  // 可以省略箭头函数括号
  arrowParens: 'avoid',
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 对 html 内空格不敏感
  htmlWhitespaceSensitivity: 'ignore',
  jsxSingleQuote: false,
  // script style 标签内缩进
  vueIndentScriptAndStyle: true,
  embeddedLanguageFormatting: 'auto',
  insertPragma: false,
  requirePragma: false,
}