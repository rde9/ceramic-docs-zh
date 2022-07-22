// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ceramic 开发者文档',
  url: 'https://rde9.github.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'rde9', // Usually your GitHub org/user name.
  projectName: 'ceramic-docs-zh', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Ceramic 开发者文档',
        logo: {
          alt: 'Ceramic Icon',
          src: 'img/ceramic-icon.png',
        },
        items: [
          {
            href: 'https://github.com/ceramicnetwork/docs',
            label: '原始仓库',
            position: 'right',
          },
          {
            href: 'https://github.com/rde9/ceramic-docs-zh',
            label: '翻译仓库',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: 'Docs',
                to: '/learn/welcome',
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: 'Discord',
                href: 'https://chat.ceramic.network/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/ceramicnetwork',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: 'Blog',
                href: 'https://blog.ceramic.network/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/ceramicnetwork',
              },
              {
                label: 'Youtube Channel',
                href: 'https://www.youtube.com/channel/UCgCLq5dx7sX-yUrrEbtYqVw',
              },
            ],
          },
        ],
        copyright: `Made with ❤️ by Ceramic Chinese Community`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
