module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'no-param-reassign': 0,
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/consistent-type-imports': 2,
    quotes: ['error', 'single'], // 使用单引号
    semi: ['error', 'always'], // 结束添加分号
  },
};
