module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        280: "280px"
      },
      height: {
        280: "280px"
      },
      padding: {
        200: "200px",
      },
      colors: {
        primary: "#E16246",
        secondary: "#E83434",
        divider: "#ABABAB",
        'gray-thumb': '#F8F7F5',
        'gray-auth': '#F2F2F2',
        'gray-border': '#CFCFCF',
        'black-placeholder': '#A9A9A9',
        'blue-facebook': '#1877F2',
        'blue-nav': '#F3F4F8',
        'blue-hover': '#ccd2ea',
        'gray-rdo': '#C5C5C5',
        'gray-button': '#E5E7EB'
      },
      fontSize: {
        '22': "22px",
        '13': ['13px', '13px'],
        '15': '15px',
        '32': ['32px', '36px'],
        '34': "34px",
        '40': "40px"
      },
      boxShadow: {
        'circle': '0px 0px 10px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ['group-hover'],
      visibility: ['group-hover']
    }
  }
}
