---
trigger: always_on
description: Figma MCP Server integration rules for Astro + Vanilla CSS projects
---

# ⛵️ Figma MCPルール v4.0

## 概要

FigmaデザインをFigma MCPサーバーを利用して**Astroコンポーネント**に変換するためのルールです。

- **目的:** FigmaデザインをAstroコンポーネントに変換する。
- **方法:** Figma MCPサーバーを使用する。
- **遵守事項:** 公式のベストプラクティスに従う。

[Figma MCP Server](https://developers.figma.com/docs/figma-mcp-server)

---

## 簡易ワークフロー

1. デザインのノードIDまたはURLを取得する。
2. デザインのノード構造を理解する。
3. デザインのスクリーンショットを取得する。
4. デザインのアセットをダウンロードする。
5. Astroコンポーネントを生成する。


## コード生成
- デザインのノード構造、スクリーンショット、アセットを元に、Astroコンポーネントを生成する。
- プロジェクトの技術スタック、デザインシステム、制約に従って実装する。

### 技術スタック

- Astro
- CSS(SCSS)
- JavaScript(TypeScript)
- その他package.jsonに記載されているもの


### デザインシステム

- BEMを基本としたクラスを使用。
- グローバルスタイル以外はコンポーネントごとに実装する。
- Tailwind CSSの使用禁止
- 詳細はルールや指示に従う

### 制約

- Figmaデザインを忠実に再現しつつ、レスポンシブデザインを実装する。
  - ターゲット解像度での正確な表示
  - モバイルファーストでの現代的なレイアウトの実装
- マークアップとスタイリングは原則別々のタスクとして実装する
  - ノード構造とが不適切な場合は、適切なHTML構造に変更する必要があるため
  - 不自然な絶対配置、固定配置、マジックナンバーによるレイアウトは避ける。
  - スクリーンショットを参照して、デザインの意図を理解し、適切な実装を行う。
- モバイルファーストで`max-width ≒ 画面幅` の場合、`width`を使用する
  - Figmaで固定値をだとしても、デザインの意図として`width`の場合がほとんど。

### 視覚的整合性チェック（スクリーンショット必須）

- **数値の整合確認:**
  実装後、`get_design_context` で取得した際の数値
  （幅・高さ・`gap`・`padding`・`margin`・`border-radius`・`font-size`・`letter-spacing` など）が、**CSS / SCSS 上の値と比較して矛盾がないか**を確認する。
  - 大きく差異がある場合は、**Figma の値を優先**する。
  - わずかな差異は手動で調整する。

- **スクリーンショットとの比較:**
  `get_screenshot` で取得した Figma のスクリーンショットとブラウザ表示を見比べ、主に要素間の距離感やレイアウトのバランスを確認する。
  - 画像などの要素サイズ
  - レイアウトの中央寄せ・左右寄せ
  - ブロック間の余白感
  - SP / PC それぞれでのレイアウト崩れの有無

- **レイヤー構造と DOM 構造の差異:**
  - DOMツリーは適切なHTML構造に変更する必要があるため、Figmaのノード構造に従う必要はない。視覚的に同じものになるように実装する。
  -
---

### アセット（素材）

- **画像:** `/public/assets/images/`に配置する。path指定時に`public`は必要ない(Viteの仕様)
- プレースホルダー、外部アイコンパッケージは**明示的にのみ使用する**。

---

## 禁止事項

❌ **以下は決して使用しないでください:**

- インラインスタイル (`style="..."`)
- Tailwindクラス (`text-blue-600`, `px-4`)
- コンテナに対する`display: inline-flex`（`display: flex`を使用）
- Figmaからそのまま出力された過度な`<div>`のネスト

---

## 出力形式

### Astroコンポーネントテンプレート

**マークアップ部とスタイル部は原則分けてFigma MCPから実装すること**

```astro
---
// ComponentName.astro
interface Props {
  // 必要なpropsを定義
}
const { text, ...props } = Astro.props
---

<div class="component-name" {...props}>{text}</div>

<style lang="scss">
  .component-name {
    /* CSSをここに記述 */
  }
</style>

```



---

## コード品質

Linter、formatterの責任範囲のことはそれぞれに任せ、頼れ。

**ツールへの委任:**

- CSS標準 → Stylelint
- JS標準 → ESLint
- フォーマット → Prettier

**開発者が注力すること:**

- **セマンティックHTML**
- **BEM命名**
- **デザイン変数（トークン）の正しい使用**
- **Flexbox/Gridレイアウト**

---

## アクセシビリティ（初期ドラフト: オプション）

以下の項目はレビュー段階で追加することを推奨します。プロジェクトを**完成させることを最優先**とし、完璧主義に陥らないように注意してください。

- `alt`属性
- `:focus-visible`スタイル
- ARIA属性（必要な場合）

---

## 参照

- Figma MCP Docs: [https://developers.figma.com/docs/figma-mcp-server/](https://developers.figma.com/docs/figma-mcp-server/)
- Best Practices: [https://developers.figma.com/docs/figma-mcp-server/code-connect-integration/#best-practices](https://developers.figma.com/docs/figma-mcp-server/code-connect-integration/#best-practices)
- Custom Rules: [https://developers.figma.com/docs/figma-mcp-server/add-custom-rules/](https://developers.figma.com/docs/figma-mcp-server/add-custom-rules/)

---

**バージョン履歴:**

- v4.0: 前半を大きく書き直し、なるべく簡潔に
- v3.0.1: ざっとみ修正
- v3.0: 公式ドキュメントに準拠、CSSルールを簡素化、LLM固有の回避策を削除
- v2.1: CSSルールの詳細化、3回使用ルールの導入
- v2.0: レイアウト戦略の明確化
- v1.0: 初版

---
