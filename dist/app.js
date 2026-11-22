"use strict";
const topics = [
  {
    id: "sentence",
    title: "中文句子",
    desc: "同一句话，你更在意节奏、措辞，还是画面感？",
    group: "文字",
    en: "Sentence",
  },
  {
    id: "paragraph",
    title: "段落表达",
    desc: "看几句话怎样衔接，找到读起来舒服的呼吸感。",
    group: "文字",
    en: "Paragraph",
  },
  {
    id: "article",
    title: "整篇写作",
    desc: "从开篇到收束，比较一篇文章的组织方式。",
    group: "文字",
    en: "Composition",
  },
  {
    id: "headline",
    title: "标题命名",
    desc: "比较同一内容的不同标题，找到想点开的那一个。",
    group: "文字",
    en: "Headline",
  },
  {
    id: "ui",
    title: "UI 界面",
    desc: "在相同任务中，比较信息层级与界面呈现。",
    group: "视觉",
    en: "Interface",
  },
  {
    id: "design",
    title: "平面设计",
    desc: "看同一份内容在不同字体、构图与版式中成形。",
    group: "视觉",
    en: "Graphic design",
  },
  {
    id: "color",
    title: "色彩搭配",
    desc: "把颜色放进实际画面，比较它们一起出现的效果。",
    group: "视觉",
    en: "Color",
  },
  {
    id: "chart",
    title: "数据图表",
    desc: "同一组数据，你希望读者先看到什么？",
    group: "视觉",
    en: "Data graphics",
  },
];
const pairs = { ...window.writingTopics, ...window.visualTopics };
const labels = ["很不喜欢", "不太喜欢", "比较喜欢", "很喜欢"];
const key = "fengge-samples-v1";
const view = document.getElementById("view");
let transient = false;
function readSaved() {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}
let saved = readSaved();
let filter = "全部";
let notifyTimer;
const esc = (v) =>
  String(v).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const scoreOK = (n) => Number.isInteger(n) && n >= 1 && n <= 4;
function response(id, i) {
  return saved[id]?.[i] || {};
}
function complete(id, i) {
  const v = response(id, i);
  return scoreOK(v.a) && scoreOK(v.b);
}
function count(id) {
  return pairs[id].filter((_, i) => complete(id, i)).length;
}
function started(id) {
  return pairs[id].some((_, i) => {
    const v = response(id, i);
    return scoreOK(v.a) || scoreOK(v.b) || !!v.note;
  });
}
function firstOpen(id) {
  const i = pairs[id].findIndex((_, j) => !complete(id, j));
  return i < 0 ? 0 : i;
}
function update(id, index, field, value) {
  if (!transient) saved = readSaved();
  saved[id] = {
    ...saved[id],
    [index]: { ...response(id, index), [field]: value },
  };
  try {
    localStorage.setItem(key, JSON.stringify(saved));
  } catch {
    transient = true;
    document.getElementById("storage-label").textContent =
      "当前浏览器无法保存，关闭前请复制指南";
  }
}
const guides = () => topics.filter((t) => count(t.id) > 0);
function counters() {
  document.getElementById("guide-count").textContent = guides().length;
}
function notice(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(notifyTimer);
  notifyTimer = setTimeout(() => t.classList.remove("show"), 2600);
}
function routeParts() {
  return location.hash.slice(1).split("/");
}
function activeTopic(id) {
  return topics.find((t) => t.id === id);
}
function catalogCard(t) {
  const n = count(t.id),
    total = pairs[t.id].length;
  return (
    '<a class="topic" href="' +
    (n === total
      ? "#guide/" + t.id
      : "#rate/" + t.id + "/" + (firstOpen(t.id) + 1)) +
    '"><div class="art-frame">' +
    coverArt(t.id) +
    '</div><div class="topic-body"><div class="card-meta"><span>' +
    t.en +
    "</span><span>" +
    (started(t.id) ? "已评 " + n + " / " + total : total + " 组对比") +
    "</span></div><h3>" +
    t.title +
    "</h3><p>" +
    t.desc +
    "</p></div></a>"
  );
}
function catalog() {
  const first = topics.find(
    (t) => started(t.id) && count(t.id) < pairs[t.id].length,
  );
  const heroTarget =
    first || topics.find((t) => count(t.id) < pairs[t.id].length);
  const filtered = topics.filter(
    (t) => filter === "全部" || t.group === filter,
  );
  view.innerHTML =
    '<section class="hero"><div class="hero-copy"><div class="hero-kicker"><i></i>个人风格指南生成器</div><h1>把偏好，<em>写成指南。</em></h1><p>比较文字与视觉样本，给喜欢的做法打分。<br>把你的选择整理成一份 AI 可以直接使用的风格指南。</p><a class="primary lime" href="' +
    (heroTarget
      ? "#rate/" + heroTarget.id + "/" + (firstOpen(heroTarget.id) + 1)
      : "#guides") +
    '">' +
    (first
      ? "继续评「" + first.title + "」"
      : heroTarget
        ? "从" + heroTarget.title + "开始"
        : "查看我的指南") +
    '</a></div><div class="hero-art">' +
    heroArt() +
    '</div></section><section aria-labelledby="catalog-title"><div class="section-head"><div><div class="eyebrow">Sample library</div><h2 id="catalog-title">样本目录 <span class="count-tag">' +
    String(filtered.length).padStart(2, "0") +
    '</span></h2></div><div class="filters" aria-label="筛选样本主题">' +
    ["全部", "文字", "视觉"]
      .map(
        (f) =>
          '<button type="button" aria-pressed="' +
          (f === filter) +
          '" data-filter="' +
          f +
          '">' +
          f +
          "</button>",
      )
      .join("") +
    '</div></div><div class="topics">' +
    filtered.map(catalogCard).join("") +
    "</div></section>";
}
function sampleCard(option, side, v, t) {
  const letter = side.toUpperCase();
  return (
    '<section class="sample"><div class="sample-head"><span class="letter">' +
    letter +
    "</span><h2>样本 " +
    letter +
    '</h2></div><div class="specimen ' +
    (option.html ? "visual" : "written " + t.id) +
    '">' +
    (option.html || esc(option.text)) +
    '</div><fieldset class="ratings"><legend>给样本 ' +
    letter +
    ' 打分</legend><div class="scale">' +
    labels
      .map(
        (name, i) =>
          '<label><input type="radio" name="rate-' +
          side +
          '" value="' +
          (i + 1) +
          '" data-side="' +
          side +
          '" ' +
          (v[side] === i + 1 ? "checked" : "") +
          "><span><b>" +
          (i + 1) +
          "</b><small>" +
          name +
          "</small></span></label>",
      )
      .join("") +
    "</div></fieldset></section>"
  );
}
function rating(t, i) {
  const q = pairs[t.id][i],
    v = response(t.id, i),
    total = pairs[t.id].length;
  view.innerHTML =
    '<a class="back" href="#catalog">‹ 样本目录</a><div class="workhead"><div class="eyebrow">' +
    esc(t.en) +
    " / 样本评分</div><h1>" +
    t.title +
    '</h1></div><div class="track" aria-label="题目导航">' +
    pairs[t.id]
      .map(
        (p, j) =>
          '<a href="#rate/' +
          t.id +
          "/" +
          (j + 1) +
          '" title="第 ' +
          (j + 1) +
          " 组 · " +
          p.axis +
          '" aria-label="第 ' +
          (j + 1) +
          " 组，" +
          (complete(t.id, j) ? "已评分" : "待评分") +
          '" ' +
          (j === i ? 'aria-current="step"' : "") +
          ' class="' +
          (complete(t.id, j) ? "done" : "") +
          '"><span></span></a>',
      )
      .join("") +
    '</div><section class="prompt"><div class="eyebrow">对比 ' +
    String(i + 1).padStart(2, "0") +
    " / " +
    String(total).padStart(2, "0") +
    "</div><h2>" +
    esc(q.brief) +
    '</h2><p>分别给两个版本打分，可以给相同分数。</p></section><div class="pair">' +
    sampleCard(q.a, "a", v, t) +
    sampleCard(q.b, "b", v, t) +
    '</div><label class="note"><span>为什么这样选？ <small>选填</small></span><input id="note" maxlength="360" placeholder="例如：我喜欢这个开头，读起来更自然。" value="' +
    esc(v.note || "") +
    '"></label><div class="step-actions"><a class="secondary" href="' +
    (i ? "#rate/" + t.id + "/" + i : "#catalog") +
    '">' +
    (i ? "上一组" : "返回目录") +
    '</a><div class="advance"><span id="rate-status" aria-live="polite"></span><button class="primary" id="next"></button></div></div>';
  refreshStep(t, i);
}
function refreshStep(t, i) {
  const done = complete(t.id, i),
    n = count(t.id),
    total = pairs[t.id].length;
  const next = document.getElementById("next");
  next.disabled = !done;
  next.textContent =
    i < total - 1 ? "下一组" : n === total ? "生成主题指南" : "继续未评样本";
  const v = response(t.id, i);
  document.getElementById("rate-status").textContent = done
    ? "本组已评分"
    : scoreOK(v.a)
      ? "请给样本 B 打分"
      : scoreOK(v.b)
        ? "请给样本 A 打分"
        : "请选择两项评分";
  const current = document.querySelector(".track [aria-current]");
  current.classList.toggle("done", done);
  current.setAttribute(
    "aria-label",
    "第 " + (i + 1) + " 组，" + (done ? "已评分" : "待评分"),
  );
  counters();
}
const guideIntro =
  "请在对应场景中参考我的评分。4 分表示很喜欢，3 分表示比较喜欢，2 分表示不太喜欢，1 分表示很不喜欢。优先采用高分做法，少用低分做法。遇到新场景或相互冲突的要求，请先给我两个具体样例确认。";
function guideText(t) {
  const lines = [
    "## " +
      t.title +
      "（已评 " +
      count(t.id) +
      "/" +
      pairs[t.id].length +
      " 组）",
    "",
    "### 我希望你怎样处理",
  ];
  pairs[t.id].forEach((q, i) => {
    if (!complete(t.id, i)) return;
    const v = response(t.id, i);
    const best = v.a >= v.b ? "a" : "b",
      other = best === "a" ? "b" : "a";
    let preference;
    if (Math.max(v.a, v.b) <= 2)
      preference = "两个样本都不合意，请提出第三种做法。";
    else if (v.a === v.b)
      preference =
        "「" + q.a.label + "」和「" + q.b.label + "」都合意，可随场景选用。";
    else
      preference =
        "优先「" +
        q[best].label +
        "」。" +
        q[best].rule +
        (v[other] >= 3 ? "「" + q[other].label + "」也可接受。" : "");
    lines.push("- " + q.axis + "：" + preference);
  });
  lines.push("", "### 评分依据");
  pairs[t.id].forEach((q, i) => {
    if (!complete(t.id, i)) return;
    const v = response(t.id, i);
    lines.push("", "#### " + q.axis, "任务：" + q.brief);
    for (const side of ["a", "b"].sort((x, y) => v[y] - v[x])) {
      const o = q[side],
        score = v[side];
      lines.push(
        "- " +
          (score >= 3 ? "可采用" : "少采用") +
          "「" +
          o.label +
          "」（" +
          score +
          "/4）：" +
          o.rule,
        "  参考样本：" + o.text.replace(/\n/g, "\n  "),
      );
    }
    if (v.a === v.b)
      lines.push(
        v.a >= 3
          ? "两种做法都喜欢，可以按任务选用。"
          : "两种做法的分数都低，请另给一个方向。",
      );
    if (v.note?.trim()) lines.push("我的补充：" + v.note.trim());
  });
  return lines.join("\n");
}
function exportText(selection) {
  return (
    "# 我的个人风格指南\n\n" +
    guideIntro +
    "\n\n" +
    selection.map(guideText).join("\n\n")
  );
}
function guideList() {
  const list = guides(),
    total = list.reduce((s, t) => s + count(t.id), 0);
  view.innerHTML =
    '<div class="workhead guide-heading"><div class="eyebrow">Style guide</div><h1>我的指南</h1><p>' +
    (list.length
      ? "已记录 " +
        total +
        " 组对比。你可以复制单个主题，也可以把所有已评主题合在一起。"
      : "完成任意一组对比，这里就会出现你的评分、样例和给 AI 的指令。") +
    "</p></div>" +
    (list.length
      ? '<div class="guide-toolbar"><h2>已评主题 <span class="count-tag">' +
        list.length +
        '</span></h2><button class="primary" data-copy="all">复制全部指南</button></div><div class="guide-list">' +
        list
          .map(
            (t) =>
              '<a class="guide-row" href="#guide/' +
              t.id +
              '"><div class="guide-thumb">' +
              coverArt(t.id) +
              '</div><div><span class="eyebrow">' +
              t.en +
              "</span><h3>" +
              t.title +
              '</h3></div><span class="row-progress">' +
              count(t.id) +
              " / " +
              pairs[t.id].length +
              ' 组</span><span class="read-link">查看指南</span></a>',
          )
          .join("") +
        "</div>"
      : '<div class="empty"><img src="mark.svg" alt=""><h2>先选一组样本，试试手感。</h2><a class="primary" href="#catalog">去样本目录</a></div>');
}
function oneGuide(t) {
  const n = count(t.id),
    total = pairs[t.id].length;
  if (!n) {
    guideList();
    return;
  }
  view.innerHTML =
    '<a class="back" href="#guides">‹ 我的指南</a><div class="workhead"><div class="eyebrow">' +
    t.en +
    " / Style guide</div><h1>" +
    t.title +
    "指南</h1><p>已评 " +
    n +
    " / " +
    total +
    ' 组。复制内容包含具体做法、原始评分、样本和你的备注。</p></div><div class="guide-toolbar"><div class="action-inline"><button class="primary" data-copy="' +
    t.id +
    '">复制给 AI</button><a class="secondary" href="#rate/' +
    t.id +
    "/" +
    (firstOpen(t.id) + 1) +
    '">' +
    (n === total ? "重新查看评分" : "继续评分") +
    '</a></div></div><div class="result-list">' +
    pairs[t.id]
      .map((q, i) => {
        if (!complete(t.id, i)) return "";
        const v = response(t.id, i);
        return (
          '<section class="result"><div class="result-head"><h2>' +
          esc(q.axis) +
          '</h2><a href="#rate/' +
          t.id +
          "/" +
          (i + 1) +
          '">调整评分</a></div><p>' +
          esc(q.brief) +
          "</p>" +
          ["a", "b"]
            .sort((a, b) => v[b] - v[a])
            .map(
              (s) =>
                '<div class="rule"><b class="' +
                (v[s] >= 3 ? "high" : "low") +
                '">' +
                v[s] +
                " / 4</b><div><h3>" +
                esc(q[s].label) +
                "</h3><p>" +
                (v[s] >= 3 ? "可采用" : "少采用") +
                "的做法 · " +
                esc(q[s].rule) +
                "</p><details><summary>查看样本 " +
                s.toUpperCase() +
                "</summary><blockquote>" +
                esc(q[s].text) +
                "</blockquote></details></div></div>",
            )
            .join("") +
          (v.note?.trim()
            ? '<div class="your-note">我的补充 · ' +
              esc(v.note.trim()) +
              "</div>"
            : "") +
          "</section>"
        );
      })
      .join("") +
    "</div>";
}
async function copy(selection) {
  const result = exportText(selection);
  try {
    if (!navigator.clipboard?.writeText) throw Error();
    await navigator.clipboard.writeText(result);
  } catch {
    const field = document.createElement("textarea");
    field.value = result;
    field.setAttribute("aria-label", "可复制的指南");
    field.className = "clipboard-temp";
    document.body.append(field);
    field.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {}
    if (!copied) {
      field.className = "manual-copy";
      view.append(field);
      field.focus();
      field.select();
      notice("请复制已选中的指南文本");
      return;
    }
    field.remove();
  }
  notice("指南已复制，可以粘贴给 AI");
}
function currentQuestion() {
  const [, id, raw] = routeParts(),
    t = activeTopic(id);
  if (!t) return null;
  const i =
    Math.min(pairs[id].length, Math.max(1, Number.parseInt(raw, 10) || 1)) - 1;
  return { t, i };
}
function render(reset = true) {
  const [page, id] = routeParts(),
    t = activeTopic(id);
  const inGuide = page === "guides" || page === "guide";
  for (const part of ["catalog", "guides"]) {
    const el = document.getElementById("nav-" + part);
    if (part === (inGuide ? "guides" : "catalog"))
      el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  }
  if (page === "rate" && t) rating(t, currentQuestion().i);
  else if (page === "guides") guideList();
  else if (page === "guide" && t) oneGuide(t);
  else catalog();
  counters();
  document.title =
    (t ? t.title + " · " : inGuide ? "我的指南 · " : "") + "风格样本室";
  if (reset) {
    window.scrollTo(0, 0);
    view.focus({ preventScroll: true });
  }
}
view.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.filter) {
    filter = button.dataset.filter;
    catalog();
    document
      .querySelector('button[aria-pressed="true"]')
      .focus({ preventScroll: true });
    return;
  }
  if (button.dataset.copy) {
    copy(
      button.dataset.copy === "all"
        ? guides()
        : [activeTopic(button.dataset.copy)],
    );
    return;
  }
  if (button.id === "next") {
    const { t, i } = currentQuestion();
    if (!complete(t.id, i)) return;
    location.hash =
      i + 1 < pairs[t.id].length
        ? "rate/" + t.id + "/" + (i + 2)
        : count(t.id) === pairs[t.id].length
          ? "guide/" + t.id
          : "rate/" + t.id + "/" + (firstOpen(t.id) + 1);
  }
});
view.addEventListener("change", (event) => {
  if (!event.target.dataset.side) return;
  const { t, i } = currentQuestion();
  update(t.id, i, event.target.dataset.side, Number(event.target.value));
  refreshStep(t, i);
});
view.addEventListener("input", (event) => {
  if (event.target.id === "note") {
    const { t, i } = currentQuestion();
    update(t.id, i, "note", event.target.value);
  }
});
const dialog = document.getElementById("about");
document.getElementById("method").onclick = () => dialog.showModal();
dialog.querySelector("button").onclick = () => dialog.close();
window.addEventListener("storage", (e) => {
  if (e.key === key || e.key === null) {
    saved = readSaved();
    render(false);
  }
});
window.addEventListener("hashchange", () => render());
render(false);
