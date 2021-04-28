module.exports = {
    buildOptions: {
        out: 'public'
    },
    devOptions: {
        hmrDelay: 300
    },
    mount: {
        '_BUNDLE_': { url: '/' }
    },
    optimize: {
        bundle: true,
        minify: true,
        target: 'es2020'
    },
    plugins: [
        ['@snowpack/plugin-run-script', {
            cmd: 'windicss _BUNDLE_/**/*.html -o _BUNDLE_/assets/styles/tailwind.css -f windi.config.js -t -m',
            watch: 'nodemon --watch _BUNDLE_ -e html --exec "windicss _BUNDLE_/**/*.html -o _BUNDLE_/assets/styles/tailwind.css -f windi.config.js -t"'
        }],
        ['@snowpack/plugin-run-script', {
            cmd: 'eleventy',
            watch: '$1 --watch'
        }]
    ]
};
