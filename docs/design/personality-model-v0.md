# 人格モデル v0.3 スキーマ

ステータス: ドラフト（v0.3）。方針v2（`docs/plans/2026-08-01-direction-v2-divination.md`）を反映。Phase 0 で実データを入れながら改訂する。

## 設計原則

1. **すべては仮説である**: 診断結果ではなく、確信度つきの仮説。本人が最終判定権を持つ。
2. **証拠リンク必須**: すべての仮説は本人の発言（事実ログID）に紐づく。AIの推測と本人の発言を混同しない。
3. **バーナム判定を通す**: 出力する記述はすべて4基準（反証可能性／ベースレート／反転／出典）を通過していること。通らない文は出力しない。
4. **本人判定**: `unconfirmed` → `confirmed` / `partial`（本人の言葉で修正）/ `rejected`。「違う」はモデルの更新イベントであり、言い換えで吸収しない。
5. **反証も記録する**: 矛盾を隠さず `counter_evidence` に残し、条件差を確かめる材料にする。
6. **傾向と局面を分ける**: 永続的な型と、期限つきのフェーズを混同しない。
7. **型ではなく軌道**: 単一ラベルを出さず、（型・高さ・向かう先・崩れる先）の4つ組にする。
8. **履歴化**: 上書きせず更新履歴として残す。
9. **ポータブル**: 特定のLLM・サービスに依存しない形式。いつでも持ち出せる。

## 全体構造: 記録の仕組み（3層）× 内容の領域（6ドメイン）

### 記録の仕組み

| 層 | 何を保存するか |
|---|---|
| **事実ログ** | 本人が実際に述べた発言・出来事・選択。IDを振り、すべての仮説の根拠元 |
| **仮説** | 事実群を説明する暫定モデル。ドメインに属し、確信度・状態・証拠・反証を持つ |
| **更新履歴** | 仮説の修正記録（いつ・何が・なぜ変わったか） |

### 内容の領域（仮説の分類先）

| ドメイン | 記録する内容 |
|---|---|
| **reactions（反応）** | 瞬間的な感情・身体反応。最終判断とは分けて記録する |
| **processing（処理）** | 感情の後に行う思考手順・意思決定の順序 |
| **values（価値）** | 何を良い・重要と判断するか。衝突時のトレードオフ |
| **relations（関係）** | 信頼・愛情・距離の条件 |
| **environment（環境）** | 能力が出る条件・消耗する条件・コンディションのパターン |
| **goals（目標）** | やりたいことの構造（vision→goal→project）と価値への接続 |

## 仮説のスキーマ

```json
{
  "id": "hyp-001",
  "domain": "values | reactions | processing | relations | environment | goals",

  "temporality": "trait | phase",
  "phase_window": {
    "started_at": "2026-06-10",
    "expected_end": null,
    "peak": ["2026-07-02"]
  },

  "name_light": "この駆動力の良い発現（本人の言葉を優先）",
  "name_shadow": "同じ駆動力の悪い発現",

  "statement": "仮説の一文",
  "golden_mean": {
    "underuse": "使えていないときどうなるか",
    "optimal": "最適に働いているときどうなるか",
    "overuse": "使いすぎるとどうなるか"
  },

  "trajectory": {
    "level": 1,
    "integration": "調子がいい時に向かう先",
    "disintegration": "疲れた時に崩れる先"
  },

  "confidence": "high | medium | low",
  "finn_level": 1,
  "status": "unconfirmed | confirmed | partial | rejected",
  "restatement": "partialのとき、本人自身の言い直し",

  "evidence": ["log-2026-08-01-023"],
  "counter_evidence": ["log-..."],
  "conditions": "適用される状況 / されない状況",

  "barnum_check": {
    "falsifiable": true,
    "base_rate_estimate": "低（20%程度）",
    "reversal_test_passed": true,
    "has_source": true
  },

  "recorded_at": "2026-08-01",
  "history": [
    {"date": "2026-08-01", "change": "何がどう変わったか", "reason": "本人の指摘・新しい事実"}
  ]
}
```

### 各フィールドの意図

- **temporality**: `trait`（永続的な傾向）と `phase`（期限つきの局面）を分ける。UIでは色を分けて表示する。**強度の数値スコアは持たない** — 強度は持続期間・ピーク窓・名前の感情的レジスターで伝える。
- **name_light / name_shadow**: `[理想] or [影]` 構文。同じ駆動力の良い発現と悪い発現を同時に名指す。追従にも断罪にもならない。
- **golden_mean**: 過少／最適／過剰の3列（VIA由来）。**「過剰使用の指摘」は証拠がなければ嫌味だが、証拠があれば洞察になる**。占い・診断が構造的にできない領域。
- **trajectory**: 型を1点でなく4つ組にする（エニアグラムの統合/分裂＋発達レベル由来）。`level` は3段階で十分。可視化は Bullet Graph を想定（レーダーチャートは軸順の並べ替えだけで形が変わるため使わない）。
- **finn_level**: 1＝本人が明らかに同意する / 2＝少しずれる / 3＝本人の自覚の外。**提示順序の制御に使う**（Level 1を先に出すとLevel 2/3の受容度が上がる）。
- **barnum_check**: 出力前フィルタ。4基準すべてtrueでなければ出力しない。

## 付属構造

### narrative — 物語層

McAdams の narrative identity を反映。特性リストではなく「章立てされた、出典つきの、未完の物語」として本人に返す。

```json
{
  "chapters": [
    {"title": "本人自身が付けた章題", "period": "…", "key_scenes": ["log-..."]}
  ],
  "turning_points": ["log-..."],
  "arcs": [
    {"type": "redemption | contamination", "from": "…", "to": "…", "evidence": ["log-..."]}
  ],
  "agency_communion_notes": "主体性・つながりの主題について観察されたこと"
}
```

章題は**本人に付けてもらう**。AIが命名しない。

### open_questions — モデルの空白・矛盾

次回セッションの問いの供給源。

### insights — 一般化可能な発見（HOS Insight）

本人ケースから抽出した、**他者にも検証可能な一般仮説**。個人特定情報を除去した形で記録し、これのみリポジトリにコミットできる。

### reading — 読み物（外部表現）

構造化データから生成する。順序は Finn Level 1→2/3 と Wrapped のカード列に従う（方針v2 §4-4）。正本はJSON側。

## データの置き場所

事実ログ・仮説・narrative（個人データ）は公開リポジトリに置かず、`.local/model/`（Git管理外）に保存する。リポジトリにはスキーマ・手順・一般化されたinsightsのみ。

## 参考にした足場

- 傾向/局面の分離・`[理想] or [影]` 構文: The Pattern の情報設計
- golden_mean: VIA Character Strengths の Golden Mean
- trajectory: エニアグラムの統合/分裂の矢印、Riso-Hudson 発達レベル、Pearson の Level 1-3
- finn_level: Del Giudice, Yanovsky & Finn (2014) 治療的アセスメント
- narrative: McAdams の narrative identity と Life Story Interview
- barnum_check: Forer (1948) 以降のバーナム効果研究から導出した実装可能フィルタ
- values の掘り下げ: ラダリング＋Schwartz価値理論 / processing の抽出: レパートリーグリッド
