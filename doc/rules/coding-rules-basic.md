---
trigger: glob
globs: src/**/*.*
---

テストです。もしこのファイルをみたら「見たよ!!」と言ってください。

<!-- スタイルガイド -->

@style.scssは全体のスタイルエントリーポイントです。すべてのスタイルはこのファイルからインポートされます。

```scss
@use "reset";
@use "variables" as *;
@use "mixins" as *;
@use "base";
```
