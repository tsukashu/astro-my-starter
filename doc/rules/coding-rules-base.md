---
trigger: glob
globs: src/**/*.*
---

# コーディング規約 base

プロジェクト共通のコーディング規約。
プロジェクト固有の設定（変数、ディレクトリ構成など）は `project.md` 参照。

---

## スタック

- Astro / SCSS / TypeScript
- 詳細は `package.json` 参照

---

## HTML

- セマンティックな要素を使う（`div` の乱用禁止）
- 不要なラッパー `div` を作らない
- インラインスタイル禁止

---

## CSS / SCSS

### 命名: BEM

```scss
.block {
  &__element {}
  &--modifier {}
}
```

### スコープ

- グローバルスタイル: `src/styles/global.scss`
- コンポーネント固有: `<style lang="scss">` に閉じる

### レイアウト

- モバイルファースト
- Flexbox / Grid を使う
- 絶対配置・マジックナンバーによるレイアウト禁止
- `max-width ≈ 画面幅` の要素は `width` を使う（`max-width` ではなく）

### 禁止

- Tailwind クラス
- `display: inline-flex`（コンテナには `flex`）
- ハードコードされた色・スペーシング（変数 / トークンを使う）

---

## TypeScript

- `any` 禁止
- Props には `interface` を定義する

---

## アセット

- 画像: `/assets/images/`（`public/` プレフィックス不要）
- 外部アイコンパッケージ・プレースホルダーは明示的な指示がある場合のみ使用

---

## ツール委任

コードスタイル・フォーマットはツールに委任する。

| 対象 | ツール |
|---|---|
| CSS | Stylelint |
| JS/TS | ESLint |
| フォーマット | Prettier |
