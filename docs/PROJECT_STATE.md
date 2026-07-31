# PROJECT_STATE.md

最終更新: 2026-07-31（JST）

## 現在の要約

**方針v3が承認され（D013）、Phase 0の実施準備が整った状態。** コードはまだ存在しない。

作るもの: 選択肢に答えると「**今の自分がどこにいるかの地図**」ができ、その中で「**実際に変えられる場所**」を根拠つきで示すもの。分析の比重（領域・深さ・時期・厳しさ）はユーザーが選ぶ。継続利用が前提。

**因果主張の範囲は科学的制約により限定した**（D013）: 「育ちが性格を作った」は言えない。因果を語ってよいのは①内容層（価値観・信念・所属・スキル）②現在の環境 のみ。特性層は現在の記述に留める。

調査は計18本完了。7領域を確定し（D014）、シード20問（所要3分）まで作成済み。

## 完了

- ローカルリポジトリ作成（`~/アプリケーション/human-os-project`）
- Git識別情報をこのリポジトリ限定で分離設定（`user.name=0-isk-0`, `user.email=206745864+0-isk-0@users.noreply.github.com`、GitHub noreplyアドレス）
- 専用SSH鍵（`~/.ssh/id_github_isk`、host alias `github-isk`）で認証確認済み（既存鍵を使用、新規発行はしていない）
- GitHubリモート `git@github-isk:0-isk-0/Human-OS-Project.git` 設定・初回push済み
- README.md / .gitignore 作成・コミット・push済み
- Claude OS運用テンプレート（CLAUDE.md, docs/, .claude/rules・skills・agents・settings.json）導入
- 市場・文献調査 計6本完了
  - 第1次: ①パーソナルAI/デジタルツイン系 ②PKM/Life OS系 ③人格モデル・対話手法の文献（要約: `docs/plans/2026-07-31-initial-direction.md` §2）
  - 第2次: ④占い市場・AI占いサービス ⑤占いが効く心理メカニズムと倫理設計 ⑥リーディング/アーキタイプの提示技法（要約: `docs/plans/2026-08-01-direction-v2-divination.md`）
- 開発者へのヒアリング4ラウンド完了
- 初期方針の承認（D004・D005）、大学関係者への共有メール送付済み
- 原点レポートの統合（D007〜D009）
- 方針v2（占い方向）の提案と却下（D010）
- 追加調査12本（発達環境と人格形成／適応型アセスメント／因果説明の提示／ナラティブと回顧バイアス／行動遺伝学の制約／不確実性の伝達／ケースフォーミュレーション／XAIとスクルータブルモデル ほか）
- **方針v3の承認（D013）**、7領域の確定とシード20問の作成（D014）
- 上位制約文書3本の整備: `scientific-constraints.md`（何を主張してよいか）、`explanation-design.md`（どう伝えるか）、`input-design.md`（何をどう聞くか）

## 作業中

なし。

## 停止・待機

- 方針v2への承認・修正待ち（`docs/plans/2026-08-01-direction-v2-divination.md`）
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
