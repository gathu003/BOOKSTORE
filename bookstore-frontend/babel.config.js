module.exports = {
    presets: [
      'react-app', // Use the default Create React App preset
    ],
    plugins: [
      '@babel/plugin-proposal-private-property-in-object', // Fix for the deprecation warning
    ],
  };
  