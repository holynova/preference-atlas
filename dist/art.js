(() => {
  const ticks = '<i class="sa-proof-ticks"></i>';
  const ink = '<i class="sa-ink-strip"></i>';
  const crop =
    '<i class="sa-crop sa-crop-tl"></i><i class="sa-crop sa-crop-br"></i>';
  const lines = "<b></b>".repeat(5);
  const textBlock = '<i class="sa-lines">' + lines + "</i>";
  const sun =
    '<i class="sa-sun">' +
    Array.from(
      { length: 12 },
      (_, i) => '<b style="--ray:' + i + '"></b>',
    ).join("") +
    "</i>";
  const covers = {
    sentence:
      '<i class="sa-sen-grid"></i><span class="sa-sen-open">“</span><span class="sa-sen-word">字</span><span class="sa-sen-close">”</span>' +
      ink,
    paragraph:
      '<span class="sa-par-mark">¶</span><i class="sa-par-sheet">' +
      textBlock +
      textBlock +
      '<i class="sa-par-stroke"></i></i>' +
      ticks,
    article:
      '<i class="sa-book"><i class="sa-leaf sa-leaf-l"><i class="sa-leaf-title"></i>' +
      textBlock +
      '</i><i class="sa-leaf sa-leaf-r"><i class="sa-leaf-figure"></i>' +
      textBlock +
      "</i></i>" +
      crop,
    headline:
      '<i class="sa-head-rule"></i><span class="sa-head-word">头版</span><i class="sa-head-seal"></i>' +
      ticks,
    ui:
      '<i class="sa-window sa-window-back"><i></i></i><i class="sa-window sa-window-front"><i class="sa-window-top"><b></b><b></b><b></b></i><i class="sa-window-grid"><i class="sa-window-image"></i><i class="sa-window-row">' +
      textBlock +
      "<b></b></i></i></i>",
    design:
      '<div class="sa-flower">' +
      [0, 1, 2, 3].map((i) => '<i style="--petal:' + i + '"></i>').join("") +
      '</div><i class="sa-design-dot"></i>' +
      crop,
    color:
      '<i class="sa-wheel"></i><i class="sa-chips">' +
      ["#e34e23", "#fc8858", "#f7c9ac", "#eee8d7"]
        .map((c) => '<b style="--chip:' + c + '"></b>')
        .join("") +
      "</i>" +
      crop,
    chart:
      '<i class="sa-chart-frame"><i class="sa-chart-bars">' +
      [23, 42, 33, 61, 51, 77, 69, 98]
        .map((h) => '<b style="height:' + h + '%"></b>')
        .join("") +
      '</i></i><i class="sa-chart-key"></i>',
  };

  window.coverArt = (topicId) => {
    if (!Object.hasOwn(covers, topicId)) return "";
    return (
      '<div class="sa-cover sa-art-' +
      topicId +
      '" aria-hidden="true">' +
      covers[topicId] +
      "</div>"
    );
  };

  window.heroArt = () =>
    '<div class="sa-hero-art" aria-hidden="true"><div class="sa-hero-stack">' +
    '<div class="sa-card sa-card-letter">' +
    crop +
    '<span class="sa-letter-spec">Aa</span>' +
    ticks +
    "</div>" +
    '<div class="sa-card sa-card-wave">' +
    crop +
    '<i class="sa-wave"></i><i class="sa-wave-key"></i></div>' +
    '<div class="sa-card sa-card-sun">' +
    crop +
    sun +
    '<div class="sa-sun-footer"><i></i>' +
    ticks +
    "</div></div>" +
    "</div></div>";
})();
