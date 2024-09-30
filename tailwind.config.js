/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

const rem = (num) => ({ [num]: `${num / 16}rem` });

const colors = {
  // Background
  netural: '#F1F5F9',
  'netural-light': '#EBEBEB',
  'netural-dark': '#ECEBED',

  // Button
  'button-primary': '#4C42D7',
  'button-primary-hover': '#393388',
  'button-success': '#B5E2C4',
  'button-success-hover': '#6DA172',
  'button-warning': '#CCD01C40',
  'button-warning-hover': '#CCD01C',
  'button-danger': '#C8415680',
  'button-danger-hover': '#C84156',

  'button-disabled': '#E1E1E1',

  // Text
  primary: '#191E3B',
  'primary-dark': '#182952',
  secondary: '#8E9CB2',
  'secondary-dark': '#D9D9D9',

  //
  blur: '#0069FF',
  success: '#B5E2C4',
  'success-dark': '#6DA172',
  warning: '#CCD01C40',
  'warnning-dark': '#CCD01C',
  error: '#C8415680',
  'error-dark': '#C84156',

  divider: '#8E9CB24A',
};

const typography = {
  fontSize: {
    ...rem(6),
    ...rem(8),
    ...rem(10),
    ...rem(11),
    ...rem(12),
    ...rem(13),
    ...rem(14),
    ...rem(15),
    ...rem(16),
    ...rem(17),
    ...rem(18),
    ...rem(19),
    ...rem(20),
    ...rem(24),
    ...rem(25),
    ...rem(28),
    ...rem(30),
  },
  lineHeight: {
    1: 1,
    ...rem(10),
    ...rem(12),
    ...rem(13),
    ...rem(14),
    ...rem(16),
    ...rem(18),
    ...rem(20),
    ...rem(21),
    ...rem(22),
    ...rem(23),
    ...rem(24),
    ...rem(25),
    ...rem(28),
    ...rem(30),
    ...rem(32),
    ...rem(36),
    ...rem(37),
    ...rem(40),
  },
  letterSpacing: {
    normal: `${0.3 / 16}rem`,
    ...rem(2),
  },
};

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    ...typography,
    fontFamily: {
      sans: ['Josefin Sans'],
      montserrat: ['Montserrat'],
      kanit: ['Kanit'],
      opensans: ['Open Sans'],
      roboto: ['Roboto'],
      arial: ['Arial'],
    },
    screens: {
      sm: '414px',
      md: '768px',
      lg: '1024px',
      lg2: '1200px',
      xl: '1440px',
      '2xl': '1920px'
    },
    extend: {
      colors,
      // spacing,
      borderRadius: {
        ...rem(3),
        ...rem(5),
        ...rem(8),
      },
      borderWidth: {
        ...rem(1),
      },
      backgroundImage: {
        'checkbox-inherit': `url(assets/icon/checkbox-inherit.svg)`,
      },
    },
  },
  variants: {
    fill: ['hover', 'focus'],
  },
  plugins: [require('flowbite/plugin')],
};
