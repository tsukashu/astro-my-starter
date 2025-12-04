---
trigger: always_on
description: Figma MCP Server integration rules for Astro + Vanilla CSS projects
---

# ⛵️ Figma MCPルール v3.0

## 概要

FigmaデザインをFigma MCPサーバーを利用して**Astroコンポーネント**に変換するためのルールです。

- **目的:** FigmaデザインをAstroコンポーネントに変換する。
- **方法:** Figma MCPサーバーを使用する。
- **遵守事項:** 公式のベストプラクティスに従う。

---

## 必須ワークフロー

### 1\. デザインデータの取得

**ツールがアップデートされたので、試行錯誤中**

- Figma MCP ツールから、適切なもの使用してください。
- Figma のデザインを忠実に再現できるようにしてください。

### 2\. 実装前の検証

実装を開始する前に、以下を確認してください。

- ノードIDまたはURLがわからない場合は実装を中止し、ユーザに要求してください。ノードIDまたはURLはファイルによって提供される可能性があります。

- [ ] `get_desing_context`または`get_metadata`を使い、FigmaのFigmaのデザイン構造を把握した。
- [ ] `get_screenshot`を使用し、デザイン構造だけでなく、スクリーンショットを用いた構造把握もした。。
- [ ] ノード構造を理解した。
- [ ] 必要なアセット（画像など）を特定した。ダウンロードが必要かわからない場合は、コード生成前に確認してください。

### 3\. コード生成

- **成果物:** **Astroコンポーネント + Vanilla CSS またはSCSS**
- **禁止:** Tailwindクラスの使用
- **必須:** 既存のデザイン**トークン**（変数）やmixin, functionなどの利用。

---

## プロジェクトの前提

**グローバルルール、package.jsonからわかることは省略します**
**不明点があれば、実装前に確認してください**

### 技術スタック

[省略]

### デザインシステム

[省略]

### 制約

- **レスポンシブ:** **モバイルファースト**で実装する。
- **ターゲット解像度:** SP、PCそれぞれプロジェクトごとに確認。（`_variables.scss`などのcss,scssに記載されていることが多い。不明な場合は要確認）
- **マークアップとスタイリングは原則別々のタスクとして実装する**

---

## コード生成ルール

**原則グローバルルールと同一なので省略**

---

## CSSレイアウト

- 既存コードのレイアウト、コメント内の指示等を重視し、レイアウトのベースにすること

### Flexbox/Gridを優先

Figmaデザインによっては、オートレイアウトが不十分なため、不要な`position: absolute`や、flex系のプロパティが存在します。これらは、不要な場合、変更削除が可能です。

(オートレイアウトされている場合については後述)

**`position: absolute`を使う主なパターン(全てではない)**

- オーバーレイ（モーダル、ツールチップ）など、全画面
- バッジ、通知など親要素に対して位置が固定される一般的な使い方
- スティッキーヘッダー/フッターなど画面内で位置固定

### モバイルファーストでのmax-width

`max-width`を使用する場合、PCのサイズを確認し、問題がないか。

---

### Figmaオートレイアウトの変換

オートレイアウトの変換に関して**必要な場合のみ**以下を参考にしてください。
オートレイアウトからCSSへの変換が問題なくできる場合は無視してください。

(Figma 公式より)

| Figma設定                               | CSS対応                                             |
| :-------------------------------------- | :-------------------------------------------------- |
| **Hug contents** (コンテンツを抱き込む) | `width: fit-content;`                               |
| **Fill container** (コンテナを埋める)   | `flex: 1;` または `width: 100%;`                    |
| **Fixed** (固定値)                      | 固定値を使用（コメントを追加）                      |
| **Horizontal + gap** (水平 + 間隔)      | `display: flex; gap: 16px;`                         |
| **Vertical + gap** (垂直 + 間隔)        | `display: flex; flex-direction: column; gap: 24px;` |

### デザイン値と Figma 整合性チェック（get_design_context 前提）

- **数値の起点:**  
  `get_design_context` が返す **px / rem などの数値プロパティ** を、CSS / SCSS 実装時の**唯一の起点**とする。  
  すべてのプロパティを写経する必要はないが、**採用した数値は必ず Figma 由来**とする。

- **後からの調整禁止:**  
  一度 CSS / SCSS に採用した数値を、**「なんとなく良さそう」など感覚的な理由で変更しない**。

- **React + Tailwind → Astro + SCSS 変換時:**
  - クラス名・DOM 構造はプロジェクトルールに合わせて自由に変更してよい。
  - ただし、**最終的な見た目の px 値は Figma に基づく数値を維持**する。
  - デザイントークンやユーティリティに置き換える場合も、**最終的な描画サイズは変えない**。

- **例外的に数値を変えてよいケースのみ:**
  - 既存トークンに合わせるために、**同じ見た目になる値** へ置き換える場合
  - ブラウザ仕様やアクセシビリティ対応で、やむを得ず微調整が必要な場合  
    その際は **「どの値を」「なぜ変えたか」** をコメントまたは PR 説明に明記する。

### 視覚的整合性チェック（スクリーンショット必須）

- **数値の整合確認:**  
  実装後、`get_design_context` で控えた主要な数値  
  （幅・高さ・`gap`・`padding`・`margin`・`border-radius`・`font-size`・`letter-spacing` など）が  
  **CSS / SCSS 上の値と矛盾していないか**を確認する。

- **スクリーンショットとの比較:**  
  `get_screenshot` で取得した Figma のスクリーンショットとブラウザ表示を見比べ、次を確認する。
  - 画像などの要素サイズ
  - レイアウトの中央寄せ・左右寄せ
  - ブロック間の余白感
  - SP / PC それぞれでのレイアウト崩れの有無

- **レイヤー構造と DOM 構造の差異:**
  - Figma のレイヤー構造と実装 DOM は一致しなくてもよい。
  - レイアウトについては **Figma レイヤーより既存 DOM / コメントを優先**する。
  - `margin` / `padding` をどの要素に割り当てるかは DOM 構造に合わせて調整してよいが、  
    **最終的な見た目（スクリーンショットとの一致）を最優先**とする。

- **1:1 写経は不要だが、由来は Figma:**  
  Figma 上のすべての数値を 1:1 で写経する必要はない。  
  ただし、**CSS / SCSS に最終的に残る数値は「すべて Figma 由来」であり、後から感覚で変えていない**ことを、  
  数値比較と視覚比較の両方で確認する。

---

### アセット（素材）

- **画像:** `/public/assets/images/`に配置する。実装時に`public`は必要ない(Viteの仕様)
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
const {} = Astro.props;
---

<div class="component-name"></div>

<style lang="scss">
  .component-name {
    /* CSSをここに記述 */
  }
</style>
```

### コードコメント（保留）

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
- Best Practices: [https://developers.figma.com/docs/figma-mcp-server/code-connect-integration/\#best-practices](https://developers.figma.com/docs/figma-mcp-server/code-connect-integration/#best-practices)
- Custom Rules: [https://developers.figma.com/docs/figma-mcp-server/add-custom-rules/](https://developers.figma.com/docs/figma-mcp-server/add-custom-rules/)

---

**バージョン履歴:**

- v3.0.1: ざっとみ修正
- v3.0: 公式ドキュメントに準拠、CSSルールを簡素化、LLM固有の回避策を削除
- v2.1: CSSルールの詳細化、3回使用ルールの導入
- v2.0: レイアウト戦略の明確化
- v1.0: 初版

---
