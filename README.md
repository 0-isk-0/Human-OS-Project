# Human OS Project

人間の思考・記憶・判断・行動を支援するOS（Operating System）を目指す研究・開発プロジェクト。

千葉工業大学「AI活用推進助成プログラム」採択プロジェクト（実施期間: 2026年7月28日〜2027年5月1日）。

## 第一段階で作るもの

選択肢に答えると「**今の自分がどこにいるかの地図**」ができ、その中で「**実際に変えられる場所**」を根拠つきで示す自己理解プラットフォーム。

- 入力は選択式が土台（シード20問・約3分）。さらに知りたい人だけ対話で深める
- 分析の比重（領域・深さ・時期・踏み込み具合）をユーザーが選ぶ
- 出力の全行に、本人の回答という出典をつける。誰にでも当てはまる記述（バーナム効果）は出さない
- 「育ちが性格を作った」とは言わない。因果を語るのは、価値観・信念などの内容層と現在の環境に限る（[科学的制約](docs/design/scientific-constraints.md)）

## 現在地

Phase 0（設計と自己適用、コードなし）。7領域とシード20問まで作成済み。詳細は [PROJECT_STATE](docs/PROJECT_STATE.md) と [ROADMAP](docs/ROADMAP.md)。

## ドキュメント

| 内容 | ファイル |
|---|---|
| 現在の方針（承認済み） | [docs/plans/2026-08-01-direction-v3.md](docs/plans/2026-08-01-direction-v3.md) |
| 目的・対象・非対象 | [docs/PROJECT_CHARTER.md](docs/PROJECT_CHARTER.md) |
| 領域定義・シード設問 | [docs/design/domains.md](docs/design/domains.md), [docs/design/seed-questions-v0.md](docs/design/seed-questions-v0.md) |
| 何を主張してよいか／どう伝えるか／何を聞くか | [scientific-constraints](docs/design/scientific-constraints.md), [explanation-design](docs/design/explanation-design.md), [input-design](docs/design/input-design.md) |
| 設計判断の記録 | [docs/DECISIONS.md](docs/DECISIONS.md) |
| 次にやること | [docs/NEXT_ACTIONS.md](docs/NEXT_ACTIONS.md) |
| 用語 | [docs/GLOSSARY.md](docs/GLOSSARY.md) |

Claude Code での作業ルールは [CLAUDE.md](CLAUDE.md) を参照。
