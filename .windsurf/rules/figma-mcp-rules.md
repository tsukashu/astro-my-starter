---
trigger: always_on
description: Figma MCP rules for Astro + SCSS projects
---

# Figma MCP ルール v5.1

Figma MCP Server を使用する際のルール。
コーディング仕様は `./coding-rules-base.md` 参照。

---

## ワークフロー

1. ノード構造を把握する
2. スクリーンショットでデザイン意図を確認する
3. デザインコンテキストを取得する
4. マークアップ実装 → スタイル実装（原則分離）

---

## Figma レイヤーについて

構造は HTML の参考程度。セマンティックな DOM を優先し、不自然な値は判断して調整してよい。

---

## コンポーネント出力形式

```astro
---
interface Props { /* 必要なpropsのみ */ }
const { ...props } = Astro.props
---
<div class="block" {...props}>...</div>

<style lang="scss">
.block {
  &__element {}
  &--modifier {}
}
</style>
```
