module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Elimina el plugin de react-native-dotenv
    plugins: []
  };
};
