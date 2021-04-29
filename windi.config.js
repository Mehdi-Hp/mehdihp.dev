const { defineConfig } = require('windicss/helpers');
const plugin = require('windicss/plugin');
const typographyPlugin = require('windicss/plugin/typography');

module.exports = defineConfig({
    extract: {
        include: [
            'public/**/*.{html}'
        ],
        exclude: [
            'node_modules/**/*',
            '.git/**/*'
        ]
    },
    theme: {
        screens: {
            'xs': '480px',
            'sm': '640px',
            'md': '768px',
            'lg': '960px',
            'xl': '1280px',
            'xxl': '1600px'
        },
        colors: {
            primary: {
                lighter: '#F0F3F1',
                light: '#BDCFC2',
                DEFAULT: '#59AE90',
                dark: '#54675A'
            },
            secondary: {
                DEFAULT: '#f7e353',
                light: '#FFF9C5'
            },
            gray: {
                lighter: '#E4E6EA',
                light: '#DEE0E5',
                DEFAULT: '#b7bac1',
                dark: '#4B5563',
                darker: '#171818'
            },
            white: '#ffffff'
        },
        spacing: {
            ...Object.fromEntries(Array(4).fill(null).map((_, index) => {
                if (4 - index - 1 === 0) return [0, '0'];
                return [
                    (4 - index - 1),
                    `${(1.618 / (1.618 ** (index + 2))).toFixed(2)}rem`
                ];
            })),
            ...Object.fromEntries(Array(17).fill(null).map((_, index) => {
                return [
                    (index + 4),
                    `${(1.618 ** (index)).toFixed(2)}rem`
                ];
            }))
        },
        fontFamily: {
            slab: '"Podkova", "system-ui"',
            serif: '"Petrona", "system-ui"'
        },
        fontSize: {
            base: '125%'
        },
        lineHeight: {
            single: 1
        },
        boxShadow: {
            'rainbow': '0px 4px 0px #C0D8FC, 0px 8px 0px #E398BC, 0px 12px 0px #E1E288, 0px 16px 0px #B7E4B6, 0px 20px 0px #B6D1E4',
            'heading': '0 0.01em 0 rgb(216 218 222), 0 0.02em 0 rgb(216 218 222), 0 0.03em 0 rgb(216 218 222), 0 0.04em 0 rgb(216 218 222), 0 0.05em 0 rgb(216 218 222), 0 0.06em 0 rgb(216 218 222), 0 0.07em 0 rgb(216 218 222)',
            'images': '0px 36px 230px rgba(0, 0, 0, 0.5)',
            'button': '0px 14px 24px rgba(0, 0, 0, 0.1)'
        },
        extend: {
            typography(theme) {
                return {
                    present: {
                        css: {
                            'color': theme('colors.gray.darker'),
                            'font-family': theme('fontFamily.slab'),
                            'font-size': theme('spacing.4'),
                            'font-weight': '400',
                            'line-height': '1.618',
                            'max-width': '100ch',
                            'p': {
                                'margin-bottom': theme('spacing.3')
                            },
                            'a': {
                                'color': theme('colors.primary.DEFAULT'),
                                'text-decoration': 'underline',
                                '&:hover': {
                                    color: theme('colors.primary.dark')
                                }
                            },
                            'ul': {
                                'list-style': 'disc',
                                'list-style-position': 'outside',
                                'padding-left': theme('spacing.5')
                            },
                            'ul > li': {
                                'margin-bottom': theme('spacing.3'),
                                '&::marker': {
                                    'color': theme('colors.primary.DEFAULT')
                                }
                            }
                        }
                    }
                };
            }
        }
    },
    plugins: [
        typographyPlugin,
        plugin(({
            addUtilities, addComponents, config, theme
        }) => {
            addUtilities({
                '.type-presentation-heading-1': {
                    'font-family': config('theme.fontFamily.slab'),
                    'font-size': config('theme.spacing.9'),
                    'font-weight': '800',
                    'line-height': '70%',
                    'letter-spacing': '-6px'
                },
                '.type-presentation-heading-2': {
                    'font-family': config('theme.fontFamily.slab'),
                    'font-size': config('theme.spacing.7'),
                    'font-weight': '800'
                },
                '.type-presentation-heading-3': {
                    'font-family': config('theme.fontFamily.slab'),
                    'font-size': config('theme.spacing.5'),
                    'font-weight': '400'
                },
                '.type-content-heading-1': {
                    'font-family': config('theme.fontFamily.serif'),
                    'font-size': config('theme.spacing.6'),
                    'font-weight': '700'
                },
                '.type-content-heading-2': {
                    'font-family': config('theme.fontFamily.serif'),
                    'font-size': config('theme.spacing.5'),
                    'font-weight': '700'
                },
                '.type-presentation-body-1': {
                    'font-family': config('theme.fontFamily.slab'),
                    'font-size': config('theme.spacing.4'),
                    'font-weight': '400',
                    'line-height': '1.618',
                    'font-style': 'normal'
                },
                '.type-presentation-body-2': {
                    'font-family': config('theme.fontFamily.slab'),
                    'font-size': config('theme.spacing.4'),
                    'font-weight': '800',
                    'line-height': '1.618',
                    'font-style': 'normal'
                },
                '.type-content-body-1': {
                    'font-family': config('theme.fontFamily.serif'),
                    'font-size': config('theme.spacing.4'),
                    'font-weight': '400',
                    'line-height': '1.618'
                },
                '.type-content-body-2': {
                    'font-family': config('theme.fontFamily.serif'),
                    'font-size': config('theme.spacing.4'),
                    'font-weight': '600',
                    'line-height': '1.618'
                },
                '.type-content-subtitle': {
                    'font-family': config('theme.fontFamily.serif'),
                    'font-size': config('theme.spacing.3'),
                    'font-weight': '600',
                    'line-height': '1.618'
                }
            });

            addUtilities({
                '.text-shadow-rainbow': {
                    'text-shadow': config('theme.boxShadow.rainbow')
                },
                '.text-shadow-heading': {
                    'text-shadow': config('theme.boxShadow.heading')
                }
            });

            addComponents({
                '.button': {
                    'display': 'flex',
                    'align-items': 'center',
                    'color': theme('colors.primary.DEFAULT'),
                    'padding': `${theme('spacing.3')} ${theme('spacing.4')}`,
                    'box-shadow': theme('boxShadow.button'),
                    'background-image': 'linear-gradient(180deg, white, #e4ece5)',
                    'border-radius': '235px 105px 265px 75px/75px 225px 55px 255px',
                    'transition': 'border-radius 0.2s',
                    '&:hover': {
                        'border-radius': '10em'
                    }
                }
            });
        })
    ]
});
