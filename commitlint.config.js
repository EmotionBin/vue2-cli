// 这里可以对 git commit 进行一些规范
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 开发新功能
        'fix', // 修补 bug
        'chore', // 日常事务
        'refactor', // 重构
        'perf', // 性能优化
        'style', // 样式修改 不影响代码运行的变动
        'build', // 构建项目
        'test', // 添加测试
        'revert', // 版本回滚
        'docs', // 文档
        'config', // 配置
        'ci', // 持续集成
        'test', // 测试
      ]
    ]
  }
}