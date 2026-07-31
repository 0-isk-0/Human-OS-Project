# CLAUDE.md

このファイルには、**すべてのセッションで必ず守る恒久的なルールだけ**を書く。
現在地・進捗・次にやることは書かない → [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md) / [`docs/NEXT_ACTIONS.md`](docs/NEXT_ACTIONS.md)。

## プロジェクトの目的（要約）

Human OS Project は、人間の思考・記憶・判断・行動を支援する「思考OS」を目指す研究・開発プロジェクト。
第一段階として、**対話から本人の言葉だけを根拠に人格モデルを育て、読み物として返す**自己理解プラットフォームを作る。
詳細・背景・非対象は [`docs/PROJECT_CHARTER.md`](docs/PROJECT_CHARTER.md)、方向性は [`docs/plans/`](docs/plans/) を正本とする。

## 出力に関する絶対規則（プロダクトが人に返す文章）

本プロジェクトが人に対して出力する人格記述には、次を必ず課す（根拠: 方針v2 §1）。

- **バーナム判定4基準を全行に課す**: ①反証可能か ②誰にでも当てはまらないか ③反対を言っても成立しないか ④本人の発言という出典があるか。一つでも欠けたら出力しない。
- **禁止構文**: 「時には◯◯、時には△△」型の両価接続 / 年齢・ライフステージの一般論 / 「まだ活かしきれていない力」型の検証不能な記述 / 出典のない断定。
- **「違う」を言い換えで吸収しない**: 本人の否定はモデルの更新イベントとして記録する。より広い記述に逃げない。
- **断定の直後に必ず証拠を1つ添える**。帰属先は常に本人の発言であり、「AIが分析した結果」とは書かない。

千葉工業大学「AI活用推進助成プログラム」採択（Claude Enterprise利用権、実施期間 2026-07-28〜2027-05-01）。

## 技術スタック

現時点でコードは未着手。`[要確認]`（決定したらここと [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) を更新する）。

開発方針: 完成度よりも試作・改善・検証を高速に繰り返す（詳細は [`docs/PROJECT_CHARTER.md`](docs/PROJECT_CHARTER.md)）。

## 上位制約（方針より上位。ここに反する機能・文言は実装しない）

| 制約 | ファイル |
|---|---|
| **何を主張してよく、何を主張してはいけないか** | [`docs/design/scientific-constraints.md`](docs/design/scientific-constraints.md) |
| **因果をどう伝えるか（文言レベルの禁止・推奨）** | [`docs/design/explanation-design.md`](docs/design/explanation-design.md) |
| **何をどう聞くか** | [`docs/design/input-design.md`](docs/design/input-design.md) |

## 正本ファイルの地図

| 知りたいこと | 見るファイル |
|---|---|
| 現在の方針 | `docs/plans/2026-08-01-direction-v3.md`（承認済み） |
| 領域定義・シード設問 | `docs/design/domains.md`, `docs/design/seed-questions-v0.md` |
| 目的・対象・非対象 | `docs/PROJECT_CHARTER.md` |
| 今どこまで進んでいるか | `docs/PROJECT_STATE.md` |
| 次に何をするか | `docs/NEXT_ACTIONS.md` |
| 技術構成・データフロー | `docs/ARCHITECTURE.md` |
| なぜその設計にしたか | `docs/DECISIONS.md` |
| 中長期計画 | `docs/ROADMAP.md` |
| 起動・デプロイ・復旧手順 | `docs/OPERATIONS.md` |
| 秘密情報・権限・公開前確認 | `docs/SECURITY.md` |
| 用語の定義 | `docs/GLOSSARY.md` |

## 作業プロトコル

- 作業開始時に `docs/PROJECT_STATE.md` と `docs/NEXT_ACTIONS.md` を読んでから作業する（`/start-work`）。
- 大きな変更は調査→計画→実装→検証→記録。小さく明確な変更は過剰に計画しない。
- 実装後は検証可能な範囲でテスト・lint・buildなどを確認する（`/verify-work`）。
- 重要な設計判断は `docs/DECISIONS.md` に記録する（`/record-decision`）。
- 作業終了時・`/clear`前・引き継ぎ時は `docs/PROJECT_STATE.md` / `docs/NEXT_ACTIONS.md` を更新する（`/finish-work`）。
- 本番公開・外部への反映を伴う変更は `/release-check` を経て、明示的な指示がない限り実行しない。

## 完了条件

- 変更が要求した動作を満たしている
- 実行可能な検証（テスト・lint・typecheck・build・手動確認）を行い、結果を報告している
- 未完了の作業を完了扱いにしていない

## 安全境界

- Gitリポジトリ管理は **専用GitHubアカウント `0-isk-0`** に完全分離する。開発者の他の個人プロジェクトとは紐付けない（このリポジトリは公開される前提で書く: 他プロジェクトの固有名・アカウント名をコミット対象ファイルに書かない）。
- `.env` 系ファイルや秘密鍵・トークンの実値をコード・Markdownに書かない。
- 秘密情報の値を読み上げたり転記したりしない。確認できない内容は推測せず `[要確認]` とする。
- 破壊的操作（force push、履歴書き換え、データ削除）は明示的な指示がない限り行わない。コミットは初日から細かく行い、履歴は研究記録として扱う。
- 依頼されていない本番デプロイ・課金操作は行わない。
