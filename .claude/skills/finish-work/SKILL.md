---
name: finish-work
description: 作業終了時にPROJECT_STATE・NEXT_ACTIONSなどを更新して次回へ引き継ぐ。ユーザーが/finish-workと入力したとき、作業の区切り、/clear前、セッション終了時に使う。
---

# finish-work

1. `git diff` / `git status` で今回の変更内容を確認する。
2. 検証結果（テスト・lint・typecheck・build・手動確認）を確認する。未実行の場合は理由を明記する。
3. 次を更新する。
   - `docs/PROJECT_STATE.md`: 完了・作業中・停止待機・既知の問題・次回セッションが必ず知るべき情報
   - `docs/NEXT_ACTIONS.md`: Now/Next/Later/Waiting/Do Not Start Yet
   - 重要な設計判断があれば `docs/DECISIONS.md`
   - 人間向けの変更があれば `README.md`
4. 次を報告する。
   - 完了したこと
   - 検証したこと・できなかったこと
   - 未完了のこと
   - 次回最初にやるべきこと
