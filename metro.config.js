// const { getDefaultConfig } = require("@expo/metro-config");

// const defaultConfig = getDefaultConfig(__dirname);

// defaultConfig.resolver.assetExts.push("cjs");
// defaultConfig.resolver.assetExts.push("css");

// module.exports = defaultConfig;
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-css-transformer")
    },
    resolver: {
      sourceExts: [...sourceExts, "css", "cjs"]
    }
  };
})();