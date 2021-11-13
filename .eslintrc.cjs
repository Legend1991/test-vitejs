module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-param-reassign': ['off', 'always'],
    'import/extensions': ['off', 'always'],
    'import/no-extraneous-dependencies': ['off', 'always'],
    'react/function-component-definition': ['error', {
      'namedComponents': 'function-declaration',
      'unnamedComponents': 'arrow-function'
    }],
    'react/prop-types': ['off', 'always'],
    'jsx-a11y/label-has-associated-control': ['off', 'always'],
    'jsx-a11y/no-noninteractive-tabindex': ['off', 'always'],
    'jsx-a11y/anchor-is-valid': ['off', 'always'],
    'jsx-a11y/control-has-associated-label': ['off', 'always'],
    'lines-between-class-members': [
      'error',
      'always',
      { 'exceptAfterSingleLine': true },
    ],
    'no-plusplus': ['off', 'always'],
    'class-methods-use-this': ['off', 'always'],
    'max-len': ['error', { 'code': 80 }],
    'import/no-named-as-default': ['off', 'always'],
    'no-restricted-exports': ['off', 'always']
  },
};
