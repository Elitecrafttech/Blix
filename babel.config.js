module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
      'module:metro-react-native-babel-preset',
    ],
    plugins: [
      "react-native-reanimated/plugin", // Add this plugin and ensure it's the last in the array
      'module:react-native-dotenv',
    ],
  };
};
