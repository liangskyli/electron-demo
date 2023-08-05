module.exports = {
  extends: require.resolve('@umijs/max/stylelint'),
  rules: {
    // your rules
    'rule-empty-line-before': null,
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    'length-zero-no-unit': [true, { ignore: ['custom-properties'] }],
    'property-no-vendor-prefix': [
      true,
      {
        ignoreProperties: ['user-select', 'text-size-adjust', 'touch-callout'],
      },
    ],
    'function-no-unknown': [true, { ignoreFunctions: ['constant', 'env'] }],
  },
};
