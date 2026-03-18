import postcssPresetEnv from "postcss-preset-env";

export default {
  plugins: [
    postcssPresetEnv({
      stage: 3,
      minimumVendorImplementations: 2,
      features: {
        "custom-media-queries": true,
      },
      autoprefixer: true,
    }),
  ],
};
