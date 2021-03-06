const Image = require('@11ty/eleventy-img');
const HtmlMin = require('html-minifier');
const markdownShortcode = require('eleventy-plugin-markdown-shortcode');
const hljs = require('highlight.js');
const Normalizer = require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');
const { format } = require('date-fns');
const MarkdownIt = require('markdown-it')({
    breaks: true,
    typographer: true,
    highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (error) { return error; }
        }

        return ''; // use external default escaping
    }
});
const { theme: { screens } } = require('./windi.config');

async function imageShortcode(src, alt, sizes, classList) {
    if (alt === undefined) { throw new Error(`Missing \`alt\` on image from: ${src}`); }

    const sizeParserRegex = new RegExp(`(?<=(?:min|max)-width:\\s)${Object.keys(screens).join('|')}`, 'gm');

    const widths = [1600, 1200, 1000, 800, 600, 400, 200];
    const formats = ['webp', 'avif'];
    if (src.endsWith('.png')) { formats.push('png'); }
    if (src.endsWith('.jpg') || src.endsWith('.jpeg')) { formats.push('jpeg'); }
    const metadata = await Image(src, {
        widths,
        formats,
        urlPath: '/assets/images/',
        outputDir: 'public/assets/images/'
    });
    const imageAttributes = {
        class: classList,
        alt,
        sizes: sizes.replace(sizeParserRegex, (occurrence) => {
            return screens[occurrence];
        }),
        loading: 'lazy',
        decoding: 'async',
        test: 'test'
    };
    return Image.generateHTML(metadata, imageAttributes, {
        whitespaceMode: 'inline'
    });
}

module.exports = (eleventyConfig) => {
    eleventyConfig.addPassthroughCopy('src/assets/fonts');
    eleventyConfig.addPassthroughCopy('src/assets/styles');
    eleventyConfig.addPassthroughCopy('src/assets/files');

    eleventyConfig.addShortcode('year', () => { return `${new Date().getFullYear()}`; });
    eleventyConfig.addPairedShortcode('parseMarkdown', (content) => {
        return MarkdownIt.render(content.trim());
    });

    eleventyConfig.addFilter('toReadableDate', (isoDate) => {
        const date = new Date(isoDate);
        return format(date, "MMMM do',' yyyy");
    });
    eleventyConfig.addFilter('toMachineDate', (isoDate) => {
        const date = new Date(isoDate);
        return format(date, "yyyy'-'M'-'d");
    });

    eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

    eleventyConfig.addPlugin(markdownShortcode, {
        typographer: true
    });

    eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
        if (outputPath && outputPath.endsWith('.html')) {
            const minified = HtmlMin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });
            return minified;
        }
        return content;
    });

    return {
        dir: {
            input: 'src',
            output: 'public',
            data: '_data'
        },
        jsDataFileSuffix: '.data'
    };
};
