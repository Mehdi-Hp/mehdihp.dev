module.exports = {
    root: true,
    extends: 'airbnb',
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'indent': ['error', 4],
        'no-param-reassign': ['error', {
            props: false
        }],
        'no-unused-vars': ['error', {
            vars: 'all',
            args: 'none',
            ignoreRestSiblings: false
        }],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'comma-dangle': ['error', 'never'],
        'quote-props': ['error', 'consistent'],
        'max-len': 'off',
        'no-multiple-empty-lines': ['error', { 'max': 2 }],
        'arrow-body-style': ['error', 'always']
    }
};
