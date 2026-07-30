# PROJECT_STATE.md

最終更新: 2026-07-31（JST）

## 現在の要約

リポジトリ・運用テンプレート整備が完了し、プロジェクトの方向性を定める調査・ヒアリングを実施した段階。コードはまだ存在しない。市場・文献調査3本といしこへのヒアリング2回に基づく初期方針を `docs/plans/2026-07-31-initial-direction.md` に提案済み（**いしこの承認待ち**）。

## 完了

- ローカルリポジトリ作成（`~/アプリケーション/human-os-project`）
- Git識別情報をこのリポジトリ限定で分離設定（`user.name=0-isk-0`, `user.email=206745864+0-isk-0@users.noreply.github.com`、GitHub noreplyアドレス）
- 専用SSH鍵（`~/.ssh/id_github_isk`、host alias `github-isk`）で認証確認済み（既存鍵を使用、新規発行はしていない）
- GitHubリモート `git@github-isk:0-isk-0/Human-OS-Project.git` 設定・初回push済み
- README.md / .gitignore 作成・コミット・push済み
- Claude OS運用テンプレート（CLAUDE.md, docs/, .claude/rules・skills・agents・settings.json）導入
- 市場・文献調査3本完了（①パーソナルAI/デジタルツイン系、②PKM/Life OS系、③人格モデル・対話手法の文献。要約は `docs/plans/2026-07-31-initial-direction.md` §2）
- いしこへのヒアリング2ラウンド完了（同ドキュメント §3）
- 初期方針の提案ドキュメント作成（同ドキュメント。ステータス: 提案中）

## 作業中

なし。

## 停止・待機

- 初期方針への いしこの承認・修正待ち（`docs/plans/2026-07-31-initial-direction.md`）
- 助成プログラムからの進捗報告方法の通知待ち（`docs/ROADMAP.md` 参照）
- Claude APIキーの入手経路（Phase 2で必要。大学申請 or 自費、未決）

## 既知の問題

なし（コード未着手のため）。

## 現在の環境・branch・deployment

- ローカルパス: `~/アプリケーション/human-os-project`
- branch: `main`（`origin/main` を追跡）
- リモート: `git@github-isk:0-isk-0/Human-OS-Project.git`
- デプロイ先: なし（未着手）

## test/lint/typecheck/build/手動確認の結果

該当コードなし。実行対象なし。

## 次回セッションが必ず知るべき情報

- このプロジェクトは開発者の他の個人プロジェクトと完全に分離されている。GitHubアカウント・SSH鍵・git identityも別。リポジトリは公開前提で書く（他プロジェクトの固有名を書かない）。
- プロダクトの方向性は `docs/plans/2026-07-31-initial-direction.md` に提案済み（対話で更新され続ける・本人所有の人格モデル、という3層構造）。承認されたら `docs/DECISIONS.md` に記録し、PROJECT_CHARTER / ROADMAP / ARCHITECTURE に反映する。
- 次の一歩は `docs/NEXT_ACTIONS.md` の `Now` を参照。
