# Astro Starter Kit: Minimal

```sh
pnpm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

```text
/
├── public/              # 静的ファイル
├── src/
│   ├── components/      # コンポーネント (Header, Footer, Main)
│   ├── layouts/         # レイアウト
│   ├── pages/
│   │   └── index.astro  # トップページ
│   └── styles/          # SCSSファイル
└── package.json         # 依存関係とスクリプト
```

Astroは `src/pages/` ディレクトリの `.astro` ファイルをページとして認識します。

## 🧞 Commands

| コマンド         | 説明                                |
| :--------------- | :---------------------------------- |
| `pnpm install`   | 依存関係をインストール              |
| `pnpm dev`       | 開発サーバー起動 (localhost:4321)   |
| `pnpm build`     | 本番ビルド (./dist/に出力)          |
| `pnpm preview`   | ビルドプレビュー                    |
| `pnpm lint`      | コードチェック (ESLint + Stylelint) |
| `pnpm lint:fix`  | コード自動修正                      |
| `pnpm astro ...` | Astro CLI実行                       |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
