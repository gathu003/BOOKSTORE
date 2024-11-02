/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Include all relevant files for Tailwind to scan
    "./public/index.html"           // Include your main HTML file
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',           // Custom blue shade for primary color
        secondary: '#E5E7EB',         // Custom light gray for secondary color
        accent: '#F43F5E',            // Custom accent color (red-pink)
        background: '#F9FAFB',        // Optional background color for a light look
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Custom font family for body text
        heading: ['Poppins', 'sans-serif'], // Additional font for headings
      },
      spacing: {
        18: '4.5rem',                 // Custom spacing option
        72: '18rem',                  // Custom size for larger spacing or width
        84: '21rem',                  // Custom size for extra-large elements
      },
      borderRadius: {
        '4xl': '2rem',                // Custom border radius for rounded corners
      },
      boxShadow: {
        custom: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Custom shadow for elevated elements
      },
    },
  },
  plugins: [],
};






