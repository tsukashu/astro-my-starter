/** @type {import('stylelint').Config} */

export default {
  extends: ["stylelint-config-standard-scss", "stylelint-config-html/astro", "stylelint-config-recess-order"],
  rules: {
    "comment-empty-line-before": null,
    "custom-property-pattern": null,
    "block-no-empty": null,
    "no-descending-specificity": null,
    "selector-class-pattern": null,
    "selector-id-pattern": null,
    "scss/load-no-partial-leading-underscore": null,
    "at-rule-no-unknown": null,
    "value-keyword-case": ["lower", { camelCaseSvgKeywords: true }],
    "declaration-block-no-redundant-longhand-properties": null,
  },
  ignoreFiles: ["**/node_modules/**", "**/dist/**", "**/build/**"],
};
