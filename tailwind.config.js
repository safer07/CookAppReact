/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      lg: { max: '1279px' },
      md: { max: '1023px' },
      sm: { max: '767px' },
    },

    container: {
      center: true,
    },

    fontSize: {
      sm: ['0.875rem', '1.25rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.5rem'], // 18px
      xl: ['1.25rem', '1.75rem'], // 20px
      '2xl': ['1.5rem', '2rem'], // 24px
      '3xl': ['2rem', '2.5rem'], // 32px
      '4xl': ['2.5rem', '3rem'], // 40px
      '5xl': ['3rem', '3.5rem'], // 48px
      // "6xl": ["3rem", "3.5rem"],
    },

    spacing: {
      px: '1px',
      0: '0',
      0.25: '0.125rem',
      0.5: '0.25rem',
      0.75: '0.375rem',
      1: '0.5rem',
      1.25: '0.625rem',
      1.5: '0.75rem',
      1.75: '0.875rem',
      2: '1rem',
      2.5: '1.25rem',
      3: '1.5rem',
      3.5: '1.75rem',
      4: '2rem',
      4.5: '2.25rem',
      5: '2.5rem',
      5.5: '2.75rem',
      6: '3rem',
      7: '3.5rem',
      8: '4rem',
      9: '4.5rem',
      10: '5rem',
      12: '6rem',
      14: '7rem',
      16: '8rem',
      18: '9rem',
      20: '10rem',
      22: '11rem',
      24: '12rem',
      26: '13rem',
      28: '14rem',
      30: '15rem',
      32: '16rem',
      36: '18rem',
      40: '20rem',
      48: '24rem',
    },

    boxShadow: {
      // sm: "0 0 2px 0 rgba(0, 0, 0, 1)",
      DEFAULT: '0 2px 6px -2px rgb(0 0 0 / 0.2)',
      md: '0 2px 8px -2px rgb(0 0 0 / 0.2)',
      'md-active': '0 2px 8px 0 rgb(0 0 0 / 0.2)',
      glow: '0 0 8px -2px rgb(0 0 0 / 0.2)',
      // lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      none: '0 0 0 0 #0000',
    },

    extend: {
      colors: {
        primary: {
          // 900: "#103570",
          // 800: "#405d8d",
          // 300: "#7086a9",
          // 100: "#f0f5fc",
          active: '#2E7349',
          DEFAULT: '#42A66A',
          highGradient: '#38BDA1',
          lowGradient: '#90DC7B',
          bg: '#EDFAF2',
        },
        base: {
          800: '#333840',
          600: '#58606e',
          400: '#8e99ab',
          // 300: "#c8d1e0",
          // 100: "#f5f7fa",
          borders: '#C8D1E0',
          bg: '#F5F7FA',
        },
        system: {
          error: '#DE1B1B',
        },
        green: {
          highGradient: '#38BDA1',
          lowGradient: '#90DC7B',
        },
        yellow: {
          highGradient: '#F59D22',
          lowGradient: '#FAD843',
        },
        red: {
          highGradient: '#F53422',
          lowGradient: '#FA7D43',
        },
        pink: {
          highGradient: '#FF6BA2',
          lowGradient: '#FFA1A1',
        },
      },

      textColor: {
        'title-color': 'var(--text-title-color)',
        'primary-color': 'var(--text-primary-color)',
        'secondary-color': 'var(--text-secondary-color)',
        'tertiary-color': 'var(--text-tertiary-color)',
        'accent-color': 'var(--text-accent-color)',
      },

      fontSize: {
        h1: ['var(--h1-font-size)', 'var(--h1-line-height)'],
        h2: ['var(--h2-font-size)', 'var(--h2-line-height)'],
        h3: ['var(--h3-font-size)', 'var(--h3-line-height)'],
        h4: ['var(--h4-font-size)', 'var(--h4-line-height)'],
      },

      fontFamily: {
        title: ['var(--font-title)'],
        body: ['var(--font-body)'],
      },

      padding: {
        section: 'var(--section-padding-block)',
      },

      screens: {
        'hover-hover': { raw: '(hover: hover)' },
      },

      keyframes: {
        blink: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.25)' },
        },
        showModal: {
          '0%': { opacity: 0, transform: 'scale(0.5)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        hideModal: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.5)' },
        },
        showBackdrop: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        hideBackdrop: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },

      animation: {
        blink: 'blink 300ms ease-in-out forwards',
        showModal: 'showModal 300ms ease-in-out forwards',
        hideModal: 'hideModal 300ms ease-in-out forwards',
        showBackdrop: 'showBackdrop 300ms ease-in-out forwards',
        hideBackdrop: 'hideBackdrop 300ms ease-in-out forwards',
      },
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
}
