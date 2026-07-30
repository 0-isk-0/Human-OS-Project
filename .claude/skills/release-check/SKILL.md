---
name: release-check
description: 本番公開・外部への反映前に環境変数・秘密情報・migration・rollbackを確認する。ユーザーが/release-checkと入力したとき、または本番反映・公開範囲の変更前に使う。
---

# release-check

`docs/OPERATIONS.md` と `docs/SECURITY.md` を読み、次を確認する。

1. 差分の内容（`git diff`）
2. 現在のbranch
3. 検証結果（`/verify-work` の結果）
4. データベース移行・スキーマ変更の有無
5. 環境変数名の変更（値は書かない）
6. 秘密情報の混入がないか（`git diff` に秘密値・鍵・トークンが含まれていないか）
7. Preview環境での確認手段
8. Rollback手段

明示的な指示がない限り、本番反映・公開範囲の変更を実行しない。確認結果をユーザーに報告し、実行の承認を得る。
