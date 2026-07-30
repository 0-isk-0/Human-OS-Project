---
name: start-work
description: 作業開始時に現在地・Git状態・未完了項目を確認してから作業を始める。ユーザーが/start-workと入力したとき、または新しい作業を始める前に使う。
---

# start-work

コードを変更せず、次を読んで現在地を把握する。

1. `CLAUDE.md`（恒久ルール）
2. `docs/PROJECT_STATE.md`（現在地）
3. `docs/NEXT_ACTIONS.md`（次にやること）
4. 関連する設計文書（`docs/ARCHITECTURE.md` など、扱う範囲に応じて）
5. `git status` / `git log --oneline -10`

読んだ後、次を提示する。

- 現在地の要約
- 今回取り組む作業（`NEXT_ACTIONS.md` の `Now` から選ぶ、または ユーザーの指示に従う）
- 完了条件
- 簡単な計画（大きな変更の場合のみ）
- リスク・懸念点

質問待ちで長時間止まらず、安全に判断できる範囲で作業を続ける。ただし `Do Not Start Yet` に分類された項目には着手しない。
