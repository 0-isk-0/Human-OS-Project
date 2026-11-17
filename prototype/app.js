(function () {
  "use strict";
  var D = window.DEMO;
  var KEY = "hos-demo-v1";
  var DEPTH = 8; // 「ふつうの深さ」の問数（docs/design/domains.md）
  function HD(id) { return D.hyps[id] || D.newHyps[id]; }
  var app = document.getElementById("app");
  var nav = document.getElementById("nav");

  var STATUS = {
    unconfirmed: { label: "未確認", mark: "？" },
    confirmed: { label: "合っている", mark: "✓" },
    partial: { label: "一部合っている", mark: "◐" },
    restated: { label: "本人の言葉で書き換え", mark: "✎" },
    rejected: { label: "違う", mark: "✕" },
    hold: { label: "今は決めない", mark: "…" },
  };

  function fresh() {
    var hyps = {};
    D.hypOrder.forEach(function (id) {
      var h = D.hyps[id];
      hyps[id] = { status: "unconfirmed", a: h.a, by: "sample", conditions: "", reason: "", evidence: h.evidence.slice(), counter: [], conf: h.conf, confWhy: h.confWhy };
    });
    return { view: "welcome", arg: null, visitorQ0: "", hyps: hyps, order: D.hypOrder.slice(), seedPick: D.seedDemo.map(function (x) { return x.d.slice(); }), extra: [], history: [], deep: {}, care: {}, pending: null, flash: null };
  }

  var S;
  try { S = JSON.parse(sessionStorage.getItem(KEY)); } catch (e) { S = null; }
  if (!S) S = fresh();

  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function dom(id) { return D.domains.filter(function (d) { return d.id === id; })[0]; }
  function allFacts() { return D.facts.concat(S.extra); }
  function fact(id) { return allFacts().filter(function (f) { return f.id === id; })[0]; }
  function factsOf(domainId) { return allFacts().filter(function (f) { return f.domain === domainId; }); }
  function answered(domainId) { return factsOf(domainId).filter(function (f) { return f.a !== null; }).length; }
  function hypsOf(domainId) { return S.order.filter(function (id) { return HD(id).domain === domainId; }); }
  function countStatus(st) { return S.order.filter(function (id) { return S.hyps[id].status === st; }).length; }
  function deepDone(id) { return !!(S.deep[id] && S.deep[id].done); }
  function time(t) { var d = new Date(t); return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }
  function log(title, lines, diff) { S.history.push({ t: Date.now(), title: title, lines: lines || [], diff: diff || null }); }

  function go(view, arg) {
    S.view = view; S.arg = arg === undefined ? null : arg; S.pending = null; S.flash = null;
    if (view === "deepQ" && !deepDone(arg)) { S.deepStep = 0; delete S.deep[arg]; }
    render(); window.scrollTo(0, 0);
  }

  // ---------- 部品 ----------
  function factRow(f) {
    return '<li class="fact"><span class="fact-id">' + f.id + "</span><span class=\"fact-q\">" + esc(f.q) + '</span><span class="fact-a">' +
      (f.a === null ? '<em>「答えない」を選択</em>' : esc(f.a)) + "</span></li>";
  }

  function statusTag(st) { return '<span class="tag st st-' + st + '"><span aria-hidden="true">' + STATUS[st].mark + "</span> " + STATUS[st].label + "</span>"; }

  function hypCard(id, inReview) {
    var h = HD(id), s = S.hyps[id], rejected = s.status === "rejected";
    var out = '<article class="hyp st-' + s.status + '" id="card-' + id + '">';
    out += '<div class="hyp-head"><span class="tag tag-hyp">サンプル仮説</span>' + statusTag(s.status) + '<span class="hyp-dom">' + dom(h.domain).name + "</span></div>";
    out += "<h3>" + h.title + "</h3>";
    if (rejected) {
      out += '<p class="struck">' + esc(s.a) + "</p>";
      out += '<p class="note-line">「違う」と判定されました。広い言い方に言い換えて出し直すことはしません。</p>';
      if (s.reason) out += '<div class="own"><span class="vlabel">どこが違ったか（本人の言葉）</span><p>' + esc(s.reason) + "</p></div>";
    } else {
      out += '<div class="view"><span class="vlabel">見方A' + (s.by === "person" ? "（本人の言葉）" : "") + "</span><p>" + esc(s.a) + "</p></div>";
      if (s.conditions) out += '<div class="own"><span class="vlabel">当てはまらないとき（本人の言葉）</span><p>' + esc(s.conditions) + "</p></div>";
      out += '<div class="view alt"><span class="vlabel">見方B（別の説明）</span><p>' + h.b + "</p></div>";
      out += '<p class="undecided">どちらが合っているかは、この回答だけでは決められません。どちらの場合でも、次に試せることは同じです。<strong>' + h.next + "</strong></p>";
    }
    out += '<div class="basis"><span class="vlabel">根拠にした回答（' + s.evidence.length + "件）</span><ul>" + s.evidence.map(function (f) { return factRow(fact(f)); }).join("") + "</ul>";
    if (s.counter.length) out += '<span class="vlabel">見方Bを支える回答（' + s.counter.length + "件）</span><ul>" + s.counter.map(function (f) { return factRow(fact(f)); }).join("") + "</ul>";
    out += "</div>";
    if (!rejected) {
      out += '<p class="meta"><span class="meta-k">記述の確からしさ</span><strong class="conf conf-' + s.conf + '">' + s.conf + "</strong>" + s.confWhy + "</p>";
      out += '<p class="meta"><span class="meta-k">ここから言えないこと</span>' + h.cannot + "</p>";
    }
    if (S.flash && S.flash.id === id) {
      out += '<div class="changed" role="status"><span class="vlabel">変わったこと</span><ul>' + S.flash.lines.map(function (l) { return "<li>" + l + "</li>"; }).join("") +
        '</ul><button class="link" data-go="history">変更履歴を見る</button></div>';
    }
    out += actions(id, inReview);
    out += "</article>";
    return out;
  }

  function actions(id, inReview) {
    var h = HD(id), s = S.hyps[id], p = S.pending && S.pending.id === id ? S.pending.mode : null;
    if (p) {
      var cfg = {
        partial: { q: "どんなときは違いますか？", chips: h.partialChips, ok: "保存する", ph: "例：親しい相手のときは当てはまらない" },
        restate: { q: "あなたの言葉で書き換えてください", chips: [h.restate], ok: "この文に書き換える", ph: "" },
        disagree: { q: "どこが違いましたか？（書かなくても確定できます）", chips: [], ok: "「違う」で確定する", ph: "例：引いているのではなく、最初から相手に任せている" },
      }[p];
      var o = '<div class="form"><label class="form-q" for="txt-' + id + '">' + cfg.q + "</label>";
      o += '<textarea id="txt-' + id + '" rows="3" placeholder="' + cfg.ph + '">' + (p === "restate" ? esc(s.a) : "") + "</textarea>";
      if (cfg.chips.length) o += '<div class="chips"><span class="chips-k">サンプルの文を入れる</span>' + cfg.chips.map(function (c) { return '<button class="chip" data-fill="' + id + '" data-text="' + esc(c) + '">' + c + "</button>"; }).join("") + "</div>";
      o += '<div class="form-btns"><button class="btn primary" data-save="' + id + '">' + cfg.ok + '</button><button class="btn ghost" data-cancel="1">やめる</button></div></div>';
      return o;
    }
    if (s.status !== "unconfirmed") {
      var o2 = '<div class="after">';
      if (inReview) o2 += '<button class="btn primary" data-next="1">' + (nextUnjudged() ? "次の仮説へ" : "判定を終える") + "</button>";
      o2 += '<button class="btn ghost" data-redo="' + id + '">判定をやり直す</button></div>';
      return o2;
    }
    return '<div class="verdict"><p class="verdict-q">この仮説は、あなたに合っていますか？</p><div class="verdict-btns">' +
      '<button class="v v-agree" data-v="confirmed" data-id="' + id + '">合っている</button>' +
      '<button class="v" data-v="partial" data-id="' + id + '">一部合っている</button>' +
      '<button class="v" data-v="rejected" data-id="' + id + '">違う</button>' +
      '<button class="v" data-v="restated" data-id="' + id + '">言い換えたい</button>' +
      '<button class="v v-hold" data-v="hold" data-id="' + id + '">今は決めない</button>' +
      '</div><p class="verdict-foot">違うと思ったら教えてください。書き換えます。</p></div>';
  }

  function nextUnjudged() { return S.order.filter(function (id) { return S.hyps[id].status === "unconfirmed"; })[0] || null; }

  function back(view, arg, label) { return '<button class="back" data-go="' + view + '"' + (arg ? ' data-arg="' + arg + '"' : "") + ">← " + label + "</button>"; }

  // ---------- 画面 ----------
  var V = {};

  V.welcome = function () {
    return '<section class="hero"><p class="eyebrow">体験デモ</p><h1>Human OS</h1>' +
      '<p class="lead">選択肢に答えると、いまの自分がどこにいるかの地図ができる。<br>地図は、あなたが「違う」と言うたびに書き換わる。</p></section>' +
      '<ul class="points"><li><b>回答と仮説を分ける</b>あなたが答えたことと、そこから立てた仮説を、別のものとして見せます。</li>' +
      "<li><b>仮説には根拠と別の見方が付く</b>どの回答から立てたか、ほかにどう説明できるかを並べます。</li>" +
      "<li><b>決めるのは本人</b>合っているか、違うか、どう言い換えるか。判定はすべて履歴に残ります。</li></ul>" +
      '<section class="card q0"><label for="q0" class="q0-label">はじめに一つだけ。<br>自分について、いま一番知りたいことは何ですか？</label>' +
      '<textarea id="q0" rows="3" placeholder="例：なぜ人といると疲れるのか">' + esc(S.visitorQ0) + "</textarea>" +
      '<button class="link" data-sample-q0="1">架空の例を入れる</button>' +
      '<button class="btn primary wide" data-start="1">架空のプロフィールで体験する</button>' +
      '<p class="fine">入力した文は、この端末の外に送られません。このデモでは、架空の人物の回答と、あらかじめ用意したサンプル仮説を表示します。</p></section>';
  };

  V.seed = function () {
    var o = '<p class="eyebrow">入口 ／ 20問・約3分</p><h2>選択肢で答える</h2>' +
      '<p class="sub">本来はここで20問に答えます。このデモでは3問だけ、実際に選べる形で並べています（' + D.persona + "の回答があらかじめ入っています）。</p>";
    D.seedDemo.forEach(function (q, i) {
      o += '<section class="card"><p class="seed-n">' + q.n + '</p><p class="seed-q">' + q.q + '</p><div class="opts">' +
        q.o.map(function (x) { return '<button class="opt' + (S.seedPick[i].indexOf(x) >= 0 ? " on" : "") + '" data-seed="' + i + '" data-opt="' + esc(x) + '">' + x + "</button>"; }).join("") +
        "</div>" + (q.note ? '<p class="fine">' + q.note + "</p>" : "") + "</section>";
    });
    o += '<p class="fine">ここで選んだ内容は、このデモでは使いません。このあとは' + D.persona + "の回答で進みます。</p>";
    return o + '<button class="btn primary wide" data-go="home">地図を見る</button>';
  };

  V.home = function () {
    var un = countStatus("unconfirmed"), total = allFacts().filter(function (f) { return f.a !== null; }).length;
    var o = '<p class="eyebrow">' + D.persona + 'の地図</p><section class="card q0-show"><span class="vlabel">いま知りたいこと</span><p>' + D.q0 + "</p></section>";
    if (S.visitorQ0) o += '<p class="fine">あなたが入力した問い「' + esc(S.visitorQ0) + "」は、このデモでは使いません（架空の人物の回答を表示しているため）。</p>";
    o += '<section class="cta">' + (un
      ? "<p>サンプル仮説が " + D.hypOrder.length + " 件あります。未確認は <strong>" + un + ' 件</strong>。</p><button class="btn primary wide" data-review="1">仮説を一つずつ確かめる</button>'
      : '<p>仮説の判定が一通り終わりました。</p><button class="btn primary wide" data-go="deepPick">気になる領域を深掘りする</button>') + "</section>";
    o += '<div class="tiles"><div class="tile"><span class="tile-n">' + total + '</span><span class="tile-k">確認できた回答</span></div>' +
      '<div class="tile"><span class="tile-n">' + (D.hypOrder.length - un) + " / " + D.hypOrder.length + '</span><span class="tile-k">判定した仮説</span></div>' +
      '<div class="tile"><span class="tile-n">' + S.history.length + '</span><span class="tile-k">変更履歴</span></div></div>';
    o += '<h2 class="h-sec">7つの領域</h2><p class="sub">線は、聞けていることの量です（「ふつうの深さ」8問のうち）。</p><ul class="domains">';
    D.domains.forEach(function (d) {
      var n = Math.min(answered(d.id), DEPTH), hs = hypsOf(d.id);
      o += '<li><button class="domain" data-go="domain" data-arg="' + d.id + '"><span class="domain-top"><span class="domain-name">' + d.name + '</span><span class="domain-fig">' + n + " / " + DEPTH + "</span></span>" +
        '<span class="meter" role="img" aria-label="' + n + "問／" + DEPTH + '問"><span style="width:' + (n / DEPTH * 100) + '%"></span></span>' +
        '<span class="domain-st">' + (hs.length ? hs.map(function (id) { return statusTag(S.hyps[id].status); }).join("") : '<span class="tag st st-none">仮説なし（根拠が足りない）</span>') +
        (deepDone(d.id) ? '<span class="tag st st-deep">深掘り済み</span>' : "") + "</span></button></li>";
    });
    o += "</ul>";
    o += '<button class="btn ghost wide" data-go="deepPick">気になる領域を深掘りする</button>';
    o += '<p class="foot-links"><button class="link" data-go="about">このデモについて</button><button class="link" data-reset="1">最初からやり直す</button></p>';
    return o;
  };

  V.domain = function (id) {
    var d = dom(id), hs = hypsOf(id);
    var o = back("home", null, "地図に戻る") + "<h2>" + d.name + '</h2><p class="sub">' + d.asks + '</p><p class="scope">' + d.scope + "</p>";
    o += '<h3 class="h-sub"><span class="tag tag-fact">確認できた回答</span></h3><ul class="facts card">' + factsOf(id).map(factRow).join("") + "</ul>";
    o += '<h3 class="h-sub"><span class="tag tag-hyp">サンプル仮説</span></h3>';
    o += hs.length ? hs.map(function (h) { return hypCard(h, false); }).join("") : '<p class="empty">まだ仮説はありません。根拠にできる回答が足りないためです。</p>';
    o += D.deep[id]
      ? '<button class="btn ghost wide" data-go="deepQ" data-arg="' + id + '">' + (deepDone(id) ? "深掘りの結果を見る" : "この領域を深掘りする（" + D.deep[id].questions.length + "問）") + "</button>"
      : "";
    return o;
  };

  V.review = function (id) {
    var i = D.hypOrder.indexOf(id);
    return back("home", null, "地図に戻る") + '<p class="eyebrow">仮説を確かめる ／ ' + (i + 1) + " / " + D.hypOrder.length + "</p>" +
      '<div class="steps">' + D.hypOrder.map(function (h, k) { return '<span class="' + (k === i ? "now" : S.hyps[h].status !== "unconfirmed" ? "done" : "") + '"></span>'; }).join("") + "</div>" + hypCard(id, true);
  };

  V.reviewDone = function () {
    return '<p class="eyebrow">判定が終わりました</p><h2>地図が書き換わりました</h2>' +
      '<ul class="summary">' + Object.keys(STATUS).filter(function (k) { return k !== "unconfirmed" && countStatus(k); }).map(function (k) { return "<li>" + statusTag(k) + "<b>" + countStatus(k) + " 件</b></li>"; }).join("") + "</ul>" +
      '<button class="btn primary wide" data-go="manual">説明書を見る</button><button class="btn ghost wide" data-go="history">変更履歴を見る</button><button class="btn ghost wide" data-go="deepPick">気になる領域を深掘りする</button>';
  };

  V.manual = function () {
    function list(sts) { return D.hypOrder.filter(function (id) { return sts.indexOf(S.hyps[id].status) >= 0; }); }
    function mini(id) {
      var h = HD(id), s = S.hyps[id];
      return '<li><button class="mini" data-go="domain" data-arg="' + h.domain + '"><span class="mini-top">' + statusTag(s.status) + '<span class="hyp-dom">' + dom(h.domain).name + "</span></span>" +
        '<span class="mini-a' + (s.status === "rejected" ? " struck" : "") + '">' + esc(s.a) + "</span>" +
        (s.conditions ? '<span class="mini-c">当てはまらないとき：' + esc(s.conditions) + "</span>" : "") + "</button></li>";
    }
    function sec(title, tagClass, ids, empty) { return '<h3 class="h-sub"><span class="tag ' + tagClass + '">' + title + "</span></h3>" + (ids.length ? '<ul class="minis">' + ids.map(mini).join("") + "</ul>" : '<p class="empty">' + empty + "</p>"); }
    var ok = list(["confirmed", "partial", "restated"]);
    var o = '<p class="eyebrow">' + D.persona + "</p><h2>わたしの説明書</h2>";
    o += '<section class="card q0-show"><span class="vlabel">いま知りたいこと</span><p>' + D.q0 + '</p><span class="vlabel">いま言えること（サンプル）</span>';
    o += ok.length
      ? "<p class=\"q0-say\">「どうして」への答え（原因）は、この仕組みでは確かめられません。言えるのは、どんな場面で起きているかです。本人が確かめた見方は " + ok.length + " 件あります。</p><ul class=\"q0-ans\">" + ok.map(function (id) { return "<li>" + esc(S.hyps[id].a) + "</li>"; }).join("") + "</ul>"
      : "<p class=\"q0-say\">まだ、本人が確かめた仮説がありません。仮説を判定すると、ここが変わります。</p>";
    o += "</section>";
    o += sec("本人が確かめた仮説", "tag-ok", ok, "まだありません。");
    o += sec("まだ確かめていない仮説", "tag-hyp", list(["unconfirmed"]), "ありません。");
    o += sec("違うと言われたもの", "tag-no", list(["rejected"]), "ありません。消さずに、ここに残します。");
    var hold = list(["hold"]);
    o += '<h3 class="h-sub"><span class="tag tag-hold">まだ分からないこと</span></h3><ul class="minis">' + hold.map(mini).join("") +
      '<li class="plain">「決め方」「これからのこと」は、根拠にできる回答が足りず、仮説を立てていません。</li><li class="plain">Q18（経済的な不安）は「答えない」を選択。空欄のままにしています。</li></ul>';
    o += '<h3 class="h-sub"><span class="tag tag-fact">確認できた回答</span></h3>';
    D.domains.forEach(function (d) { o += '<details class="card"><summary>' + d.name + "（" + answered(d.id) + '件）</summary><ul class="facts">' + factsOf(d.id).map(factRow).join("") + "</ul></details>"; });
    return o;
  };

  V.history = function () {
    var o = "<h2>変更履歴</h2><p class=\"sub\">回答・判定・書き換えを、上書きせずに残します。新しい順です。</p>";
    if (!S.history.length) return o + '<p class="empty">まだ履歴はありません。</p>';
    o += '<ol class="timeline">';
    S.history.slice().reverse().forEach(function (e) {
      o += '<li><span class="tl-t">' + time(e.t) + '</span><div class="tl-b"><b>' + e.title + "</b>" + e.lines.map(function (l) { return "<p>" + l + "</p>"; }).join("");
      if (e.diff) o += '<div class="diff"><span class="vlabel">変更前</span><p class="struck">' + esc(e.diff.before) + '</p><span class="vlabel">変更後（本人の言葉）</span><p>' + esc(e.diff.after) + "</p></div>";
      o += "</div></li>";
    });
    return o + "</ol>";
  };

  V.deepPick = function () {
    var o = back("home", null, "地図に戻る") + '<h2>気になる領域を深掘りする</h2><p class="sub">掘る場所は本人が選びます。質問はこのデモ用のサンプルです。</p><ul class="picks">';
    D.domains.forEach(function (d) {
      var set = D.deep[d.id], n = Math.min(answered(d.id), DEPTH);
      var note = deepDone(d.id) ? "回答済み ／ 結果を見る" : set.questions.length + "問 ・ 約" + set.minutes + "分" + (set.care ? "（進む前に確認があります）" : "");
      o += '<li><button class="pick" data-go="deepQ" data-arg="' + d.id + '">' +
        '<span class="domain-top"><span class="domain-name">' + d.name + '</span><span class="domain-fig">' + n + " / " + DEPTH + '</span></span><span class="pick-note">' + note + "</span></button></li>";
    });
    return o + "</ul>";
  };

  V.deepQ = function (id) {
    var set = D.deep[id];
    if (deepDone(id)) return V.deepResult(id);
    if (set.care && !S.care[id]) {
      return back("deepPick", null, "領域を選び直す") + '<p class="eyebrow">' + dom(id).name + "</p><h2>" + set.care_title + "</h2>" +
        '<ul class="about">' + set.care_lines.map(function (l) { return "<li>" + l + "</li>"; }).join("") + "</ul>" +
        '<button class="btn primary wide" data-care="' + id + '">続ける（' + set.questions.length + "問）</button>" +
        '<button class="btn ghost wide" data-go="deepPick">やめておく</button>';
    }
    var i = S.deepStep || 0, q = set.questions[i];
    return back("deepPick", null, "領域を選び直す") + '<p class="eyebrow">' + dom(id).name + " ／ " + (i + 1) + " / " + set.questions.length + "</p>" +
      '<div class="steps">' + set.questions.map(function (x, k) { return '<span class="' + (k === i ? "now" : k < i ? "done" : "") + '"></span>'; }).join("") + "</div>" +
      '<section class="card"><p class="seed-n">サンプル質問</p><p class="seed-q">' + q.q + '</p><div class="answers">' +
      q.options.map(function (o) { return '<button class="answer" data-ans="' + esc(o.t) + '">' + o.t + "</button>"; }).join("") +
      '<button class="answer skip" data-ans="">答えない</button></div></section>';
  };

  V.deepResult = function (id) {
    var st = S.deep[id];
    var o = '<p class="eyebrow">' + dom(id).name + " ／ 深掘りの結果</p><h2>地図に書き足しました</h2>";
    o += '<h3 class="h-sub"><span class="tag tag-fact">加わった回答（' + st.added.filter(function (f) { return fact(f).a !== null; }).length + '件）</span></h3><ul class="facts card">' + st.added.map(function (f) { return factRow(fact(f)); }).join("") + "</ul>";
    o += '<h3 class="h-sub"><span class="tag tag-hyp">仮説の変化</span></h3><div class="changed"><ul>' + st.lines.map(function (l) { return "<li>" + l + "</li>"; }).join("") + "</ul></div>";
    o += '<p class="fine">この変化は、回答ごとにあらかじめ用意した分岐による例です。実際の分析は行っていません。</p>';
    o += st.target ? hypCard(st.target, false) : "";
    o += '<button class="btn primary wide" data-go="home">地図に戻る</button><button class="btn ghost wide" data-go="history">変更履歴を見る</button>';
    return o;
  };

  V.about = function () {
    return back("home", null, "地図に戻る") + "<h2>このデモについて</h2>" +
      '<ul class="about"><li><b>すべて架空です。</b>人物・回答・仮説は、体験の流れを見せるために作ったものです。実在の人の回答や、調査の結果ではありません。</li>' +
      "<li><b>分析は行っていません。</b>仮説はあらかじめ書いた文で、「サンプル」と表示しています。深掘り後の変化も、用意した分岐です。</li>" +
      "<li><b>何も保存・送信しません。</b>操作の記録は、このブラウザのタブの中だけにあり、閉じると消えます。</li>" +
      "<li><b>医療や心理の診断ではありません。</b></li></ul>" +
      '<h3 class="h-sub">このデモで見せたいこと</h3><ul class="about"><li>答えたこと（事実）と、そこから立てた仮説を分けて見せる。</li><li>仮説には、根拠にした回答・別の見方・言えないことを必ず添える。</li><li>「違う」と言われた仮説は、言い換えて出し直さず、そのまま残す。</li><li>判定と書き換えは、上書きせず履歴に残す。</li><li>掘る領域は本人が選ぶ。答えたくない質問は飛ばせる。</li></ul>';
  };

  // ---------- 操作 ----------
  function verdict(id, v, text) {
    var h = HD(id), s = S.hyps[id], lines = [], diff = null;
    text = (text || "").trim();
    var from = STATUS[s.status].label;
    if (v === "partial") {
      s.conditions = text;
      lines.push("当てはまらないときを、本人の言葉で書き足しました。");
    } else if (v === "restated") {
      diff = { before: s.a, after: text };
      s.a = text; s.by = "person";
      lines.push("見方Aを、本人の言葉に書き換えました。元の文は履歴に残しています。");
    } else if (v === "rejected") {
      s.reason = text;
      lines.push("この仮説を取り下げました。消さずに「違うと言われたもの」に残します。");
      if (text) lines.push("どこが違ったかを、本人の言葉で記録しました。");
    } else if (v === "hold") {
      lines.push("「まだ分からないこと」に移しました。あとで判定できます。");
    } else {
      lines.push("本人が確かめた仮説として、説明書に入りました。");
    }
    s.status = v;
    lines.unshift("状態：" + from + " → <b>" + STATUS[v].label + "</b>");
    log("判定 ／ " + h.title, lines, diff);
    S.pending = null; S.flash = { id: id, lines: lines };
  }

  function finishDeep(id) {
    var set = D.deep[id], st = S.deep[id], lines = [], forA = [], forB = [];
    st.added = [];
    set.questions.forEach(function (q) {
      var a = st.ans[q.id];
      S.extra.push({ id: q.id, domain: id, q: q.q.replace(/？$/, ""), a: a || null });
      st.added.push(q.id);
      var picked = q.options.filter(function (o) { return o.t === a; })[0];
      if (picked && picked.e === "A") forA.push(q.id);
      if (picked && picked.e === "B") forB.push(q.id);
    });
    var n = st.added.filter(function (f) { return fact(f).a !== null; }).length;
    log("深掘りに回答（" + dom(id).name + "）", [n + " 件の回答が加わりました。"]);
    st.target = set.target || null;

    if (set.creates && !S.hyps[set.creates]) {
      var nh = D.newHyps[set.creates];
      S.hyps[set.creates] = { status: "unconfirmed", a: nh.a, by: "sample", conditions: "", reason: "",
        evidence: nh.evidence.concat(forA), counter: forB, conf: nh.conf, confWhy: nh.confWhy };
      S.order.push(set.creates);
      st.target = set.creates;
      lines.push("この領域にはまだ仮説がありませんでしたが、<b>新しいサンプル仮説が1件立ちました</b>。");
      if (forB.length) lines.push("別の見方を支える回答も " + forB.length + " 件あり、隠さずに並べて表示します。");
      log("新しい仮説を追加 ／ " + nh.title, lines.slice());
      st.lines = lines; st.done = true; return;
    }

    if (!st.target) {
      lines.push("回答は記録しましたが、<b>仮説を立てるにはまだ足りません</b>。「まだ分からないこと」に残します。");
      st.lines = lines; st.done = true; return;
    }

    var s2 = S.hyps[st.target], h = HD(st.target);
    if (s2.status === "rejected") {
      lines.push("「" + h.title + "」は「違う」と判定済みのため、書き換えていません。回答は記録しました。");
    } else {
      forA.forEach(function (f) { s2.evidence.push(f); });
      forB.forEach(function (f) { s2.counter.push(f); });
      if (forA.length) lines.push("見方Aの根拠が " + forA.length + " 件増えました（" + forA.join("・") + "）。");
      if (forB.length) lines.push("見方Bを支える回答が " + forB.length + " 件加わりました（" + forB.join("・") + "）。隠さずに並べて表示します。");
      if (forA.length >= 2 && s2.conf === "低") { s2.conf = "中"; lines.push("記述の確からしさ：低 → <b>中</b>"); }
      if (forA.length || forB.length) {
        s2.confWhy = "根拠の回答は" + s2.evidence.length + "件。" + (s2.counter.length ? "別の見方を支える回答が" + s2.counter.length + "件あります。" : "深掘りの回答が同じ向きでした。");
        log("仮説を更新 ／ " + h.title, lines.slice());
      } else {
        lines.push("仮説を変える回答はありませんでした。回答は記録しました。");
      }
    }
    st.lines = lines; st.done = true;
  }

  document.addEventListener("click", function (ev) {
    var t = ev.target.closest("button"); if (!t) return;
    var d = t.dataset;
    if (d.go) return go(d.go, d.arg);
    if (d.sampleQ0) { document.getElementById("q0").value = D.q0; return; }
    if (d.start) {
      var v = document.getElementById("q0").value.trim();
      S.visitorQ0 = v && v !== D.q0 ? v : "";
      if (!S.history.length) {
        log("問いを立てた", ["「" + D.q0 + "」"]);
        log("入口の20問に回答", ["架空の回答を読み込みました（1 問は「答えない」を選択）。"]);
        log("サンプル仮説を " + D.hypOrder.length + " 件用意", ["すべて「未確認」の状態です。"]);
      }
      return go("seed");
    }
    if (d.review) return go("review", nextUnjudged() || D.hypOrder[0]);
    if (d.next) { var n = nextUnjudged(); return n ? go("review", n) : go("reviewDone"); }
    if (d.reset) { S = fresh(); render(); window.scrollTo(0, 0); return; }
    if (d.v) {
      if (d.v === "confirmed" || d.v === "hold") verdict(d.id, d.v);
      else S.pending = { id: d.id, mode: d.v === "partial" ? "partial" : d.v === "restated" ? "restate" : "disagree" };
      if (S.pending) S.flash = null;
      render(); focusCard(d.id); return;
    }
    if (d.seed !== undefined) {
      var sel = S.seedPick[d.seed], q = D.seedDemo[d.seed], at = sel.indexOf(d.opt);
      if (q.multi) { at >= 0 ? sel.splice(at, 1) : sel.push(d.opt); }
      else { S.seedPick[d.seed] = at >= 0 ? [] : [d.opt]; }
      render(); return;
    }
    if (d.care) { S.care[d.care] = true; S.deepStep = 0; render(); window.scrollTo(0, 0); return; }
    if (d.fill) { var ta = document.getElementById("txt-" + d.fill); ta.value = d.text; ta.focus(); return; }
    if (d.cancel) { S.pending = null; render(); return; }
    if (d.save) {
      var id = d.save, mode = S.pending.mode, txt = document.getElementById("txt-" + id).value.trim();
      if (mode !== "disagree" && !txt) { document.getElementById("txt-" + id).focus(); return; }
      if (mode === "restate" && txt === S.hyps[id].a) { document.getElementById("txt-" + id).focus(); return; }
      verdict(id, mode === "partial" ? "partial" : mode === "restate" ? "restated" : "rejected", txt);
      render(); focusCard(id); return;
    }
    if (d.redo) {
      var s = S.hyps[d.redo];
      log("判定をやり直す ／ " + HD(d.redo).title, ["状態：" + STATUS[s.status].label + " → <b>未確認</b>"]);
      s.status = "unconfirmed"; S.flash = null; render(); focusCard(d.redo); return;
    }
    if (d.ans !== undefined) {
      var dm = S.arg, set = D.deep[dm];
      if (!S.deep[dm]) S.deep[dm] = { ans: {} };
      S.deep[dm].ans[set.questions[S.deepStep || 0].id] = d.ans;
      S.deepStep = (S.deepStep || 0) + 1;
      if (S.deepStep >= set.questions.length) { S.deepStep = 0; finishDeep(dm); }
      render(); window.scrollTo(0, 0); return;
    }
  });

  function focusCard(id) { var c = document.getElementById("card-" + id); if (c) c.scrollIntoView({ block: "nearest", behavior: "smooth" }); }

  function render() {
    app.innerHTML = V[S.view](S.arg);
    app.className = "app view-" + S.view;
    nav.hidden = S.view === "welcome" || S.view === "seed";
    Array.prototype.forEach.call(nav.querySelectorAll("button"), function (b) { b.classList.toggle("on", b.dataset.go === S.view); });
    save();
  }

  render();
})();
