const path = require('path');
module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'globals': {
        'window': true,
        'document': true,
        'localStorage': true
    },
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': path.join(__dirname, 'webpack.config.js')
            }
        }
    },
    'rules': {
        'import/prefer-default-export': 'off',
        'comma-dangle': 'off',
        'no-console': 'off',
        'react/prop-types': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'consistent-return': 'off',
        'func-names': 'off',
        'no-unused-vars': [2, {'args': 'after-used', 'argsIgnorePattern': '^_'}]
    }
};
