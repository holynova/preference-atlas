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
const choices = {
  a: "更喜欢 A",
  b: "更喜欢 B",
  both: "都喜欢",
  neither: "都不喜欢",
};
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
  return Object.hasOwn(choices, v.choice) || (scoreOK(v.a) && scoreOK(v.b));
}
function count(id) {
  return pairs[id].filter((_, i) => complete(id, i)).length;
}
function started(id) {
  return pairs[id].some((_, i) => {
    const v = response(id, i);
    return complete(id, i) || scoreOK(v.a) || scoreOK(v.b) || !!v.note;
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
    '<section class="hero"><div class="hero-copy"><div class="hero-kicker"><i></i>个人风格指南生成器</div><h1>把偏好，<em>写成指南。</em></h1><p>比较文字与视觉样本，选出更喜欢的做法。<br>把你的选择整理成一份 AI 可以直接使用的风格指南。</p><a class="primary lime" href="' +
    (heroTarget
      ? "#rate/" + heroTarget.id + "/" + (firstOpen(heroTarget.id) + 1)
      : "#guides") +
    '">' +
    (first
      ? "继续比较「" + first.title + "」"
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
function sampleCard(option, side, t) {
  const letter = side.toUpperCase();
  return `<section class="sample">
    <div class="sample-head"><span class="letter" aria-hidden="true">${letter}</span><h2>样本 ${letter}</h2></div>
    <div class="specimen ${option.html ? "visual" : "written " + t.id}">${option.html || esc(option.text)}</div>
  </section>`;
}

function choiceControls(t, i, v) {
  const oldScores = ["a", "b"]
    .filter((side) => scoreOK(v[side]))
    .map((side) => side.toUpperCase() + " " + v[side] + "/4")
    .join("，");
  const prior = Object.hasOwn(choices, v.choice)
    ? "上次选了「" + choices[v.choice] + "」"
    : oldScores
      ? "原评分：" + oldScores
      : "";
  return `<div class="choice-panel">
    ${prior ? '<p class="prior">' + prior + "</p>" : ""}
    <div class="choice-grid" role="group" aria-label="你更喜欢哪一个？">${Object.entries(
      choices,
    )
      .map(
        ([value, label]) =>
          `<button type="button" class="${value === "a" || value === "b" ? "primary" : "secondary"}" data-choice="${value}" aria-pressed="${v.choice === value}">${label}</button>`,
      )
      .join("")}</div>
    <details class="note"${v.note ? " open" : ""}><summary>补充理由（选填）</summary>
      <input id="note" aria-label="选择的理由" maxlength="360" placeholder="哪处细节影响了你的选择？" value="${esc(v.note || "")}">
    </details>
    <div class="step-actions"><a class="back" href="${i ? "#rate/" + t.id + "/" + i : "#catalog"}">${i ? "‹ 上一组" : "‹ 返回目录"}</a></div>
  </div>`;
}
function rating(t, i) {
  const q = pairs[t.id][i],
    v = response(t.id, i),
    total = pairs[t.id].length;
  view.innerHTML =
    '<a class="back" href="#catalog">‹ 样本目录</a><div class="workhead"><div class="eyebrow">' +
    esc(t.en) +
    " / 样本对比</div><h1>" +
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
          (complete(t.id, j) ? "已选择" : "待选择") +
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
    '</h2><p>你更喜欢哪一个？点选后自动继续。</p></section><div class="pair">' +
    sampleCard(q.a, "a", t) +
    sampleCard(q.b, "b", t) +
    "</div>" +
    choiceControls(t, i, v);
}
const guideIntro =
  "请把这些选择用在相近的任务中。只选 A 或 B 表示在这次对比中更偏向它。遇到新场景，或你推测我可能喜欢另一种做法时，请给我两个具体样例确认。";
function feedback(q, v) {
  const sides = ["a", "b"];
  if (Object.hasOwn(choices, v.choice)) {
    const choice = v.choice;
    if (choice === "b") sides.reverse();
    const summary =
      choice === "both"
        ? `「${q.a.label}」和「${q.b.label}」都喜欢，可按场景选用。`
        : choice === "neither"
          ? "两个样本都不喜欢，请另给一种做法。"
          : `本组优先「${q[choice].label}」。${q[choice].rule}`;
    const samples = sides.map((side) => ({
      option: q[side],
      side,
      badge:
        choice === "both"
          ? "喜欢"
          : choice === "neither"
            ? "不喜欢"
            : choice === side
              ? "首选"
              : "对照",
      positive: choice === "both" || choice === side,
    }));
    return { summary, samples };
  }
  // Keep the user's absolute 1–4 scores when reading earlier responses.
  sides.sort((x, y) => v[y] - v[x]);
  const [best, other] = sides;
  const summary =
    v[best] <= 2
      ? "两个样本的分数都低，请另给一种做法。"
      : v.a === v.b
        ? `「${q.a.label}」和「${q.b.label}」都喜欢，可按场景选用。`
        : `优先「${q[best].label}」。${q[best].rule}` +
          (v[other] >= 3 ? `「${q[other].label}」也可接受。` : "");
  return {
    summary,
    samples: sides.map((side) => ({
      option: q[side],
      side,
      positive: v[side] >= 3,
      badge: `原评分 ${v[side]}/4（${["很不喜欢", "不太喜欢", "比较喜欢", "很喜欢"][v[side] - 1]}）`,
    })),
  };
}
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
    lines.push("- " + q.axis + "：" + feedback(q, v).summary);
  });
  lines.push("", "### 选择依据");
  pairs[t.id].forEach((q, i) => {
    if (!complete(t.id, i)) return;
    const v = response(t.id, i);
    lines.push("", "#### " + q.axis, "任务：" + q.brief);
    for (const { option, badge } of feedback(q, v).samples) {
      lines.push(
        `- ${badge} · ${option.label}：${option.rule}`,
        "  参考样本：" + option.text.replace(/\n/g, "\n  "),
      );
    }
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
      : "完成任意一组对比，这里就会出现你的选择、样例和给 AI 的指令。") +
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
    ' 组。复制内容包含具体做法、选择依据、样本和你的备注。</p></div><div class="guide-toolbar"><div class="action-inline"><button class="primary" data-copy="' +
    t.id +
    '">复制给 AI</button><a class="secondary" href="#rate/' +
    t.id +
    "/" +
    (firstOpen(t.id) + 1) +
    '">' +
    (n === total ? "回顾选择" : "继续选择") +
    '</a></div></div><div class="result-list">' +
    pairs[t.id]
      .map((q, i) => {
        if (!complete(t.id, i)) return "";
        const v = response(t.id, i);
        const result = feedback(q, v);
        return (
          '<section class="result"><div class="result-head"><h2>' +
          esc(q.axis) +
          '</h2><a href="#rate/' +
          t.id +
          "/" +
          (i + 1) +
          '">修改选择</a></div><p>' +
          esc(q.brief) +
          "</p>" +
          '<p class="guide-summary">' +
          esc(result.summary) +
          "</p>" +
          result.samples
            .map(
              ({ option, side, badge, positive }) =>
                `<div class="rule"><b class="${positive ? "high" : "low"}">${esc(badge)}</b>
              <div><h3>${esc(option.label)}</h3><p>${esc(option.rule)}</p>
              <details><summary>查看样本 ${side.toUpperCase()}</summary><blockquote>${esc(option.text)}</blockquote></details></div></div>`,
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
  if (Object.hasOwn(choices, button.dataset.choice)) {
    const { t, i } = currentQuestion();
    update(t.id, i, "choice", button.dataset.choice);
    const next = pairs[t.id].findIndex((_, j) => j > i && !complete(t.id, j));
    location.hash =
      count(t.id) === pairs[t.id].length
        ? "guide/" + t.id
        : "rate/" + t.id + "/" + ((next < 0 ? firstOpen(t.id) : next) + 1);
  }
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
