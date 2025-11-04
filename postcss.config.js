import postcssGlobalData from "@csstools/postcss-global-data";
import postcssPresetEnv from "postcss-preset-env";

export default {
  plugins: [
    // Note: postcssGlobalData is placed before postcssPresetEnv
    postcssGlobalData({
      files: ["./src/styles/custom-media.css"],
    }),
    postcssPresetEnv({
      stage: 3, // used for add prefixes
      minimumVendorImplementations: 2, // for better stability
      features: {
        // must plugins, or if all of them are implemented enough, maybe no more to use postcss-preset-env.
        "media-query-ranges": true,
        "custom-media-queries": true,
      },
      autoprefixer: true, // explicitly
    }),
  ],
};
