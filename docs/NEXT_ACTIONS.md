# NEXT_ACTIONS.md

## Now

1. **Phase 0: シード20問を開発者自身に適用し、出力を手で1本作る**
   - 目的: 実際に3分で終わるか、途中でやめたくならないか、出力が禁止規則を通過するかを確かめる
   - 手順: `docs/design/seed-questions-v0.md` の Q0〜Q20 に答える → `explanation-design.md` §3の5P構造と提示順序に従って出力を手書きする
   - 完了条件: 出力の**全行が `explanation-design.md` §8 の禁止リストを通過**し、かつ本人が「これは自分のことだ」と感じられる
   - 保存先: `.local/`（Git管理外。個人データは公開リポジトリに置かない）
   - リスク: 出力を書くときに「因果の物語」を作りたくなる。原因と可変性を必ずセットにする規律を守る

2. **バーナムテスト**
   - 目的: 作った出力を別の人に見せて「自分にも当てはまる」と言われないか確かめる
   - 完了条件: 8割以上の人に当てはまる記述が出力から除去されている
   - 理由: **ユーザーの「当たってる」は精度の証拠にならない。**納得度をKPIにした瞬間にバーナム・マシンに退化する

3. **プロダクト名を決める**
   - 制約: 「MBTI」「診断」「AI占い」を入れない（商標・差別化の両面で不利）

4. ~~Phase 1に進む前に倫理審査の要否を確認する~~ → **解決済み（2026-08-06、D017）**: Grisha氏の回答により、Phase 1（開発者自身のデータのみ）は審査不要と確定。Phase 2以降で他者のデータを収集する場合のみ審査/適用除外の確認が必須。

5. **`gszep/claude-cloudflare-worker` の導入作業（Phase 2向け、着手可）**
   - 背景: D018でAPIキー正式申請は不要と確定。Grisha氏の案内により、開発者自身のClaude EnterpriseシートのOAuthをwrangler経由で使う
   - 手順: リポジトリのREADME/plan.mdに従い、①Cloudflareアカウントでの`wrangler login`、②`ANTHROPIC_OAUTH_TOKEN`（自分のClaude Codeの認証情報）と`APP_ACCESS_TOKEN`のsecret設定、③`npm run test:live`でライブ動作確認、④`npm run setup:apply`でデプロイ
   - 注意: secretの値は絶対にコード・Markdown・コミットに書かない。ログイン・トークン発行は本人が行う必要がある操作を含む
   - 完了条件: Workerがデプロイされ、`/health`と`/api/chat`が動作確認できる
   - タイミング: Phase 0/1（コード不要）と並行して進めてよいが、実際に使うのはPhase 2から

## Next

- GitHub Collaborator招待（`SouNobukawa`・`gszep`、2026-08-04送付・Pending）への応答確認
- プロダクト名を決める（Human OSはプロジェクト名。プロダクト名を別に付けるか含めて）
- 助成プログラムの進捗報告フォーマット・頻度が通知されたら `docs/ROADMAP.md` を更新する

## Later

- `docs/ARCHITECTURE.md` の技術構成が固まった段階で、`.claude/rules/frontend.md` 等のpath-scopedルールを追加する

## Waiting

- 大学からの進捗報告方法の通知（`docs/ROADMAP.md` 参照）
- Compliance API有効化有無の確認（問い合わせ窓口: 方針資料参照。技術判断への直接影響は小さいが要確認事項として残っている）

## Do Not Start Yet

- 長期記憶・AIエージェント連携・外部サービス連携・自動化などの将来構想機能（`docs/ROADMAP.md` の将来構想を参照。MVPが決まる前に着手しない）
