const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        primary: ['"Poppins"', ...fontFamily.sans]
      },
      colors: {
        primary: {
          '50': '#f0f9f4',
          '100': '#daf1e3',
          '200': '#b7e3ca',
          '300': '#88cdab',
          '400': '#65b891',
          '500': '#34956b',
          '600': '#247754',
          '700': '#1d5f45',
          '800': '#194c39',
          '900': '#153f30',
          '950': '#0b231a',
        },
        ternary: {
          '50': '#ebfeff',
          '100': '#cefaff',
          '200': '#a2f3ff',
          '300': '#63e8fd',
          '400': '#1cd2f4',
          '500': '#00b4d8',
          '600': '#0390b7',
          '700': '#0a7394',
          '800': '#125d78',
          '900': '#144d65',
          '950': '#063346',
        },
        theme: colors.zinc,
      }
    },
  },
  plugins: [
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }),
    require("@tailwindcss/typography")
  ],
}

