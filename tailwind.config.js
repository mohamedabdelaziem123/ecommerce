/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      container: {
        center: true
      },
      screens: {
        '2xl':'1537px'
      }
      
    },
  },
  plugins: [
    require('flowbite/plugin') 
  ],
}

