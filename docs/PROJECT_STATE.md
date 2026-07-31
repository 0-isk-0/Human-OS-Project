# PROJECT_STATE.md

最終更新: 2026-07-31（JST）

## 現在の要約

方針確定・設計統合まで完了し、Phase 0（本人ケーススタディ）の開始直前。コードはまだ存在しない。開発者が持ち込んだ原点レポート（成立経緯・暫定モデル、ローカル保管）を「検証待ちの仮説集」として設計に統合し（D007〜D009）、人格モデルスキーマv0.2・対話アルゴリズムv0.2・フェーズ計画（Phase 0本人→Phase 1友人ミニテスト→Phase 2 Webアプリ→Phase 3拡大）を確定した。次の作業は第1回検証セッション。

## 完了

- ローカルリポジトリ作成（`~/アプリケーション/human-os-project`）
- Git識別情報をこのリポジトリ限定で分離設定（`user.name=0-isk-0`, `user.email=206745864+0-isk-0@users.noreply.github.com`、GitHub noreplyアドレス）
- 専用SSH鍵（`~/.ssh/id_github_isk`、host alias `github-isk`）で認証確認済み（既存鍵を使用、新規発行はしていない）
- GitHubリモート `git@github-isk:0-isk-0/Human-OS-Project.git` 設定・初回push済み
- README.md / .gitignore 作成・コミット・push済み
- Claude OS運用テンプレート（CLAUDE.md, docs/, .claude/rules・skills・agents・settings.json）導入
- 市場・文献調査3本完了（①パーソナルAI/デジタルツイン系、②PKM/Life OS系、③人格モデル・対話手法の文献。要約は `docs/plans/2026-07-31-initial-direction.md` §2）
- いしこへのヒアリング（方針2ラウンド＋原点レポート統合1ラウンド）完了
- 初期方針の承認（D004・D005）、大学関係者への共有メール送付済み
- 原点レポートの統合（D007〜D009）: モデルスキーマv0.2、対話アルゴリズムv0.2、フェーズ計画改訂

## 作業中

なし。

## 停止・待機

- 大学関係者からの返信待ち（GitHubユーザー名確認 → Collaborator招待、APIキー手続きの案内）
- 助成プログラムからの進捗報告方法の通知待ち（`docs/ROADMAP.md` 参照）

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
- プロダクトの方向性は確定済み: 対話で更新され続ける・本人所有の人格モデル（D004）、段階的に自己理解→思考支援OS（D008）。
- 原点レポートと本人の個人データ（セッションログ・モデル実データ）は `.local/`（Git管理外）に置く。**公開リポジトリに個人情報・他案件の固有名を書かない。**
- 次の一歩は Phase 0 第1回セッション（原点レポートの暫定モデル検証）。手順は `docs/design/interview-algorithm-v0.md`。
