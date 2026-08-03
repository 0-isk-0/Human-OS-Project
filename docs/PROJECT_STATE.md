# PROJECT_STATE.md

最終更新: 2026-08-04（JST）

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
- **助成プログラムの技術的支援を発見・活用**: Grisha Szep氏のリポジトリ `gszep/claude-cloudflare-worker`（Private、`0-isk-0`でアクセス確認済み）が、**APIキーなしでClaude Codeの認証情報を使ってWebアプリからClaudeを呼べる実験的な仕組み**を提供している。Cloudflare Worker＋D1、学生の自分のClaudeサブスク＋Cloudflareアカウントで動く。README に明記された重要な注意: 「本番用基盤ではない」「機微な参加者データを収集する前に倫理審査の承認か正式な免除を得ること」「API限定アクセスが必要ならAPIキーを使うこと」
- GitHub上で `SouNobukawa`（信川教授）・`gszep`（Grisha氏）をこのリポジトリのCollaboratorとして招待済み（Pending Invite、2026-08-04）。**個人所有（非Organization）リポジトリのため、GitHubの共同作業者には権限選択肢がなく、Write権限で招待される**（Read限定は不可。Publicリポジトリなので実害は小さいと判断し進めた）

## 作業中

なし。

## 停止・待機

- `SouNobukawa`・`gszep` のCollaborator招待への応答待ち（Pending Invite、2026-08-04送付）
- **倫理審査の確認が未着手**: `gszep/claude-cloudflare-worker` のREADMEが「機微な参加者データを収集する前に倫理審査の承認か正式な免除を得ること」と明記している。Human OS Project の Phase 1（友人へのミニテスト）はこれに該当する可能性が高い。**Phase 1に進む前に、Grisha氏または大学に倫理審査の要否を確認する必要がある**（まだ質問文を送っていない）
- 助成プログラムからの進捗報告方法の通知待ち（`docs/ROADMAP.md` 参照）
- 方針v2（占い方向）は却下済み（D010）、対応不要

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
- **`interview-algorithm-v0.md`・`personality-model-v0.md`は初期の対話型設計であり、現在は方針v3（選択式が土台）に置き換わっている。正本は `docs/plans/2026-08-01-direction-v3.md` と `docs/design/domains.md`・`seed-questions-v0.md`。**
- **次にやること（優先順）**:
  1. `docs/design/seed-questions-v0.md` の20問に、いしこ自身が答えてみる（Phase 0）
  2. その回答から、`explanation-design.md` の規律（原因を語るときは必ず可変性もセットで語る／単一因果を出さない／`[理想] or [影]`構文 等）に従って出力を1本手で書く
  3. 出力が `explanation-design.md` §8 の禁止リストを全行通過しているか確認し、バーナムテスト（別の人に見せて「自分にも当てはまる」と言われないか）を行う
  4. **並行して**: Phase 1（友人へのミニテスト）に進む前に、倫理審査の要否をGrisha氏らに確認する（上記「停止・待機」参照）
- 上位制約は3文書: `scientific-constraints.md`（何を主張してよいか）／`explanation-design.md`（どう伝えるか）／`input-design.md`（何をどう聞くか）。方針や実装がこれらと矛盾する場合は制約文書が優先。
- 個人データ（セッションログ・モデル実データ・原点レポート・氏名や学籍番号を含む下書き）は `.local/`（Git管理外）に置く。**公開リポジトリに個人情報・他案件の固有名を書かない**（過去に一度、他プロジェクトの固有名を含めてしまい、履歴を作り直した経緯がある。D006参照）。
- 技術基盤の選択肢が1つ増えた: `gszep/claude-cloudflare-worker`（APIキー不要でClaudeをWebアプリから呼べる実験的Worker）。詳細は上記「完了」欄と`docs/ROADMAP.md`のPhase 2。
