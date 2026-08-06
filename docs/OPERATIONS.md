# OPERATIONS.md

## ローカル起動

`[要確認]`（コード未着手）

## 環境

- ローカルパス: `~/アプリケーション/human-os-project`
- Git remote: `git@github-isk:0-isk-0/Human-OS-Project.git`（SSH host alias、`~/.ssh/config` の `github-isk` を使用）
- このリポジトリのgit identity: `user.name=0-isk-0`, `user.email=206745864+0-isk-0@users.noreply.github.com`（`--local`設定、他リポジトリに影響しない。GitHubのnoreplyアドレスを使用し、個人メールを公開履歴に残さない）

## 検証コマンド

`[要確認]`（技術スタック決定後に追記）

## Preview / 本番反映

`[要確認]`（デプロイ先未定）

## Rollback

`[要確認]`

## 障害対応

`[要確認]`

## 外部ダッシュボード

- Claude Enterprise Analytics API（利用状況の受動的確認。会話内容は含まれない想定だが、Compliance API有効化の有無は `[要確認]`）

## Phase 2 APIアクセス: `gszep/claude-cloudflare-worker` の導入手順

D018で採用確定。**このリポジトリとは別リポジトリ**（Grisha氏所有、`0-isk-0`はCollaborator権限で招待済み）であり、Human OS Project本体には取り込まない。Cloudflare上に自分専用のインスタンスを1つデプロイし、将来Human OS Projectのアプリ側からそのWorkerのURLを呼び出す構成にする。

以下はいしこ自身のPC・アカウントで実行する手順（ログイン・secret登録はClaudeが代行できない）。

1. **リポジトリを自分の作業用ディレクトリにclone**
   ```sh
   git clone git@github-isk:gszep/claude-cloudflare-worker.git ~/アプリケーション/claude-cloudflare-worker
   cd ~/アプリケーション/claude-cloudflare-worker
   npm install
   ```

2. **CI-safeテストで動作確認**（Cloudflare/Claude接続不要）
   ```sh
   npm run test:ci
   ```

3. **Cloudflareアカウントにログイン**（ブラウザでの認証が必要）
   ```sh
   npx wrangler login
   npx wrangler whoami
   ```

4. **ローカルのClaude Codeが最新かつログイン済みであることを確認**した上で、ライブ動作確認を実行（自分のClaudeサブスクリプションでの実際の呼び出しが発生する）
   ```sh
   npm run test:live
   ```

5. **secretを設定してデプロイ**（値は絶対にファイル・コミット・チャットに書かない。以下はコマンドの雛形であり、値はシェルの対話プロンプトでのみ入力する）
   ```sh
   npm run db:migrate:remote
   npm run setup:apply
   ```
   （内部で `ANTHROPIC_OAUTH_TOKEN` と `APP_ACCESS_TOKEN` が `wrangler secret put` 経由でアップロードされる）

6. **デプロイ確認**
   ```sh
   WORKER_URL=https://<デプロイされたURL> APP_ACCESS_TOKEN="<設定した値>" npm run test:e2e
   ```

- 障害時: `npx wrangler tail` でWorkerのログを確認。Claude Code更新後は `npm run test:live` を再実行してから再デプロイする（README「Claude Code compatibility policy」参照。最新版のみ対応保証）。
- secretのローテーション: `wrangler secret put ANTHROPIC_OAUTH_TOKEN` を再実行すれば上書きされる。
