# NEXT_ACTIONS.md

## Now

0. **方針v2の承認・修正**
   - 目的: `docs/plans/2026-08-01-direction-v2-divination.md`（占い×AIの方向。調査6本に基づく）を承認または修正する
   - 完了条件: D010・D011 の決定者欄が `[要確認]` から埋まる
   - リスク: なし（読んで判断するだけ）

1. **Phase 0 第1回セッション: 原点レポートの検証ヒアリング**
   - 目的: 原点レポート（ローカル保管）の暫定モデルを1件ずつ仮説として提示し、本人が「合う／違う／一部合う」を判定する
   - 完了条件: 全暫定仮説に判定がつき、`.local/model/` に人格モデルの初期データ（confirmed/partial/rejected）とセッションログが保存されている
   - 関連ファイル: `docs/design/interview-algorithm-v0.md`, `docs/design/personality-model-v0.md`
   - リスク: 判定が「なんとなく合う」で流れると精度が出ない。1件ずつ丁寧に

2. **第2回以降のセッション継続（週1〜2回目安）**
   - 目的: open_questionsと「次に深めるべきテーマ」からセッションを重ね、全ドメインにconfirmed仮説を揃える
   - 完了条件: Phase 0完了条件（「自分の説明書」を通読して本人が「これは自分だ」と感じる）
   - リスク: 他案件を妨げない時間配分を守る

## Next

- プロダクト名を決める（Human OSはプロジェクト名。プロダクト名を別に付けるか含めて）
- Claude APIキーの入手経路を決める（大学へ申請 or 自費。Phase 2着手前に必要）
- 助成プログラムの進捗報告フォーマット・頻度が通知されたら `docs/ROADMAP.md` を更新する

## Later

- `docs/ARCHITECTURE.md` の技術構成が固まった段階で、`.claude/rules/frontend.md` 等のpath-scopedルールを追加する

## Waiting

- 大学からの進捗報告方法の通知（`docs/ROADMAP.md` 参照）
- Compliance API有効化有無の確認（問い合わせ窓口: 方針資料参照。技術判断への直接影響は小さいが要確認事項として残っている）

## Do Not Start Yet

- 長期記憶・AIエージェント連携・外部サービス連携・自動化などの将来構想機能（`docs/ROADMAP.md` の将来構想を参照。MVPが決まる前に着手しない）
