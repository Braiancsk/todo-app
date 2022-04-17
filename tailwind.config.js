module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'desktop-dark': "url('../src/assets/bg-desktop-dark.jpg')",
        'desktop-light': "url('../src/assets/bg-desktop-light.jpg')",
        'mobile-dark': "url('../src/assets/bg-mobile-dark.jpg')",
        'mobile-light': "url('../src/assets/bg-mobile-light.jpg')",
      },
      colors: {
        'dark-fundo': '#181824',
        'light-fundo': '#FAFAFA',
        'dark-board': '#25273C',
        'tab-hover': '#58566B',
        'tab-active': '#345EB3',
        'dark-close': '#3D3F58',
        'light-close': '#8D8C99',
        'dark-text': '#B5B7CE',
        'light-text': '#434247',
        'completed': '#60BBF4',
        'light-border': '#E6E5EA'
      },
    },
    container: {
      center: true,
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.05em',
      widest: '.1em',
      widest: '.60em',
    }
  },
  plugins: [],
}
