module.exports = {
  content: [
    './src/**/*.{js,jsx}',
    'node_modules/flowbite-react/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
      },
      underline: {
        base: "rounded-t-lg",
        active: {
          on: "text-cyan-600 rounded-t-lg border-b-2 border-cyan-600 active dark:text-cyan-500 dark:border-cyan-500",
          off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
        }
      }
    },
    colors: {
      Darker: "#0d1728",
      Dark: '#11242e',
      blueTemplate: '#00B7FF',
      heartColor:'#FF6666',
      Green: "#7AA874",
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1400px',
    },
  }, 
  plugins: [
    require('flowbite/plugin')
  ],

}
