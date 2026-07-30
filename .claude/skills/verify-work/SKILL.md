---
name: verify-work
description: 変更後にテスト・lint・typecheck・buildなどを段階的に検証する。ユーザーが/verify-workと入力したとき、または実装後の検証時に使う。
---

# verify-work

最も狭い関連範囲から段階的に検証する。

1. 変更に直接関係するテストを実行する
2. lint
3. typecheck
4. build
5. 可能であれば手動確認（実際に動かして確認する）

実行できない項目は理由を明記する（例: テストが存在しない、ビルド手順が未確定）。
検証を通すために、テスト・型チェック・lintを無効化したり、失敗を握りつぶしたりしない。失敗した場合は原因を報告し、修正する。

結果は `docs/PROJECT_STATE.md` の「test/lint/typecheck/build/手動確認の結果」に反映する。
