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
        divider: "#ABABAB",
        'gray-thumb': '#F8F7F5',
        'gray-auth': '#F2F2F2',
        'gray-border': '#CFCFCF',
        'black-placeholder': '#595959',
        'blue-facebook': '#1877F2',
        'blue-nav': '#F3F4F8',
      },
      fontSize: {
        '22': "22px",
        '13': ['13px', '13px'],
        '15': '15px',
        '32': ['32px', '36px'],
        '34': "34px",
        '40': "40px"
      },
    },
  },
  plugins: [],
}
