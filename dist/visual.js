(() => {
  const sample = (label, rule, text, html) => ({ label, rule, text, html });
  const pair = (axis, brief, a, b) => ({ axis, brief, a, b });
  const frame = (kind, content) =>
    '<div class="vx vx-' + kind + '">' + content + "</div>";
  const note = '<span class="vx-meta">滨河文化馆 · 活动预约</span>';
  const exhibit = '<strong class="vx-name">植物拓印课</strong>';
  const time = '<span class="vx-detail">周六 14:00–15:30</span>';
  const action = '<span class="vx-action">查看场次</span>';
  const appointments = [
    "周六 10:00｜植物拓印",
    "周六 14:00｜植物拓印",
    "周日 10:00｜植物拓印",
  ];
  const slots = (style) =>
    frame(
      "ui",
      '<div class="vx-ui-base"><span class="vx-meta">滨河文化馆</span><strong class="vx-name">本周场次</strong><div class="vx-slots vx-' +
        style +
        '">' +
        appointments
          .map(
            (t) =>
              "<div><b>" +
              t.split("｜")[0] +
              "</b><span>" +
              t.split("｜")[1] +
              "</span></div>",
          )
          .join("") +
        "</div></div>",
    );
  const filters = (style) =>
    frame(
      "ui",
      '<div class="vx-ui-base"><span class="vx-meta">滨河文化馆</span><strong class="vx-name">活动日历</strong><div class="vx-filter vx-' +
        style +
        '"><b>全部</b><span>展览</span><span>讲座</span></div><div class="vx-event"><i>24</i><div><b>河流的形状</b><small>展览 · 全天开放</small></div></div></div>',
    );
  const actions = (style) =>
    frame(
      "ui",
      '<div class="vx-ui-base"><span class="vx-meta">滨河文化馆 · 已选场次</span><strong class="vx-name">确认预约</strong><span class="vx-detail">植物拓印课 · 周六 14:00</span><div class="vx-actions vx-' +
        style +
        '"><b>确认预约</b><span>修改场次</span></div></div>',
    );
  const progress = (style) =>
    frame(
      "ui",
      '<div class="vx-ui-base"><span class="vx-meta">滨河文化馆 · 入馆任务</span><strong class="vx-name">准备进度</strong><span class="vx-detail">已完成 2 项，共 4 项</span><div class="vx-progress vx-' +
        style +
        '">' +
        (style === "segments" ? "<i></i><i></i><i></i><i></i>" : "<i></i>") +
        '</div><b class="vx-status">下一项 · 选择场次</b></div>',
    );
  const ui = [
    pair(
      "信息起点",
      "为同一场课程做一张可预约的活动卡。",
      sample(
        "文字优先",
        "先用清楚的标题建立信息层级，把插图压缩为角标，让用户迅速扫到时间和入口。",
        "活动名和时间在上，票券图形作为角标。",
        frame(
          "ui",
          '<div class="vx-ui-base vx-title-first">' +
            note +
            exhibit +
            time +
            action +
            '<i class="vx-ticket" aria-hidden="true">✳</i></div>',
        ),
      ),
      sample(
        "图形优先",
        "为活动卡留出独立的封面区域，再依次排列标题、时间和入口。",
        "票券纹样占据整条封面，信息排列在下方。",
        frame(
          "ui",
          '<div class="vx-ui-base vx-image-first"><div class="vx-motif" aria-hidden="true">✳　✳　✳</div>' +
            note +
            exhibit +
            time +
            action +
            "</div>",
        ),
      ),
    ),
    pair(
      "列表分组",
      "让用户浏览同一组课程的三个可约场次。",
      sample(
        "紧凑行列",
        "把重复记录排成紧凑列表，对齐字段，用细线分隔相邻记录。",
        "每行一个场次，日期与课程分列。",
        slots("rows"),
      ),
      sample(
        "独立卡片",
        "将每条记录放进独立的小卡片，使用内边距和卡片间距区分记录。",
        "每个场次各有一张带浅色底的小卡。",
        slots("cards"),
      ),
    ),
    pair(
      "筛选控件",
      "用三个筛选项切换活动分类，当前为“全部”。",
      sample(
        "标签胶囊",
        "把筛选值做成独立的圆角标签，用实心底色表示当前选项。",
        "三个独立标签，当前值填色。",
        filters("pills"),
      ),
      sample(
        "下划线页签",
        "将分类横排成页签，用短下划线标示当前分类。",
        "三个页签共用一条基线。",
        filters("tabs"),
      ),
    ),
    pair(
      "操作层级",
      "在预约确认页同时呈现确认和修改两个动作。",
      sample(
        "主次按钮",
        "让首要动作使用实心按钮，次要动作使用轻量文字入口。",
        "确认填色，修改为文字。",
        actions("primary"),
      ),
      sample(
        "并列按钮",
        "当两个后续动作都值得考虑时，用等宽、同样描边的按钮并列呈现。",
        "确认和修改占用相等空间，使用统一描边。",
        actions("equal"),
      ),
    ),
    pair(
      "容器边界",
      "在浅灰背景上放置同一张活动信息卡。",
      sample(
        "细线框",
        "用一像素实线建立信息区的边界，保持卡面与背景在同一平面。",
        "白色平面，四周有清晰线框。",
        frame(
          "ui",
          '<div class="vx-ui-base vx-outline">' +
            note +
            exhibit +
            time +
            action +
            "</div>",
        ),
      ),
      sample(
        "柔和投影",
        "使用柔和阴影表达卡片层次，给边缘留出足够空间。",
        "白色卡面投下柔和阴影。",
        frame(
          "ui",
          '<div class="vx-ui-base vx-elevated">' +
            note +
            exhibit +
            time +
            action +
            "</div>",
        ),
      ),
    ),
    pair(
      "进度呈现",
      "表示四项入馆任务中已经完成两项。",
      sample(
        "分段进度",
        "在有固定步骤的流程中，为每一步保留独立色段，明确显示已完成与待完成的数量。",
        "四个等长色段，前两段填色。",
        progress("segments"),
      ),
      sample(
        "连续进度",
        "用连续色条展示整体进度，在旁边写清已完成数和总数。",
        "一条进度轨道，填满一半。",
        progress("continuous"),
      ),
    ),
  ];

  const poster = (style, title, detail, english) =>
    frame(
      "poster",
      '<div class="vx-sheet vx-' +
        style +
        '"><div class="vx-pic" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="vx-poster-words"><small>' +
        english +
        "</small><b>" +
        title +
        "</b><span>" +
        detail +
        "</span></div></div>",
    );
  const posterPair = (axis, brief, title, detail, english, l, r) =>
    pair(
      axis,
      brief,
      sample(l[0], l[1], l[2], poster(l[3], title, detail, english)),
      sample(r[0], r[1], r[2], poster(r[3], title, detail, english)),
    );
  const design = [
    posterPair(
      "构图重心",
      "为周日的声音展制作一张海报。",
      "山谷回声",
      "11.24　声音展",
      "ECHO FIELD",
      [
        "中轴对称",
        "把主题、图形和活动信息依中轴对齐，围绕中心安排留白。",
        "声波图形与标题共用中轴。",
        "center",
      ],
      [
        "偏轴构图",
        "将主图压到画面一侧，让左下标题与右上图形形成对角平衡。",
        "主图位于右上，标题置于左下。",
        "offset",
      ],
    ),
    posterPair(
      "标题字形",
      "为旧书展制作同一版标题海报。",
      "纸上来信",
      "旧书展　12.06—12.08",
      "PAPER LETTERS",
      [
        "细宋体",
        "主题字选用笔画粗细对比清楚的中文宋体，字距稍松，保留纸本文气。",
        "宋体标题，疏朗字距。",
        "serif",
      ],
      [
        "粗黑体",
        "主题字选用粗黑体，收紧字距，让标题成为第一眼看到的形状。",
        "黑体标题，紧凑字距。",
        "sans",
      ],
    ),
    posterPair(
      "图形语言",
      "为一场夜间游园活动设计封面。",
      "夜游花园",
      "晚间开放　19:00—21:00",
      "NIGHT GARDEN",
      [
        "轮廓线描",
        "使用粗细统一的轮廓线组织主图，让底色透过图形。",
        "四片叶子只保留轮廓。",
        "contour",
      ],
      [
        "实心剪影",
        "用实心剪影概括物体，依靠形状和负空间识别主图。",
        "四片叶子填成实心色块。",
        "solid",
      ],
    ),
    posterPair(
      "图文占比",
      "用一个圆和一行标题介绍电影放映。",
      "满月放映",
      "露天电影　周五 20:00",
      "MOON SCREEN",
      [
        "留白构图",
        "把核心意象缩至画面的一角，四周保留宽阔的连续留白。",
        "小型圆月悬在右上角。",
        "quiet",
      ],
      [
        "满幅裁切",
        "把核心意象放大并裁出画框，用越界图形营造临场感，同时保证文字对比。",
        "圆月放大到越过画面上边缘。",
        "bleed",
      ],
    ),
    posterPair(
      "表面肌理",
      "为社区印刷集市做一张双色邀请卡。",
      "油墨见面",
      "周日 10:00　印刷集市",
      "INK MARKET",
      [
        "平整色面",
        "以均匀色面和清晰边缘组织版式，保持色块内部平整。",
        "橘底与深色印章保持平涂。",
        "flat",
      ],
      [
        "颗粒纸感",
        "在大色面上叠加轻微颗粒，用细小且均匀的纹理模拟纸张。",
        "相同橘底增加可见细颗粒。",
        "grain",
      ],
    ),
    posterPair(
      "阅读方向",
      "给建筑开放日设计一张门票。",
      "穿过长廊",
      "建筑开放日　12.15",
      "OPEN CORRIDOR",
      [
        "水平横排",
        "沿水平基线排中文主标题，让标题和时间自上而下进入视线。",
        "标题在画面中横向展开。",
        "horizontal",
      ],
      [
        "中文竖排",
        "在有空间的海报或票券中采用中文竖排主标题，把简短时间信息沿底边横排。",
        "四字标题分成两列直排。",
        "vertical",
      ],
    ),
  ];

  const palette = (name, colors) =>
    frame(
      "palette",
      '<div class="vx-color-card" style="--vb:' +
        colors[0] +
        ";--vi:" +
        colors[1] +
        ";--va:" +
        colors[2] +
        ";--vs:" +
        colors[3] +
        '"><div><small>WEEKEND WALK</small><b>周末散步</b><span>河岸路线 · 5 公里</span></div><i aria-hidden="true"></i></div><div class="vx-swatches" aria-label="' +
        name +
        '配色">' +
        colors
          .map(
            (c) => '<span><i style="background:' + c + '"></i>' + c + "</span>",
          )
          .join("") +
        "</div>",
    );
  const palettePair = (axis, brief, left, right) => {
    const colorSample = ([label, rule, colors]) =>
      sample(
        label,
        rule +
          " 示例中背景、正文、强调、辅助色依次为 " +
          colors.join("、") +
          "。",
        "背景 / 正文 / 强调 / 辅助：" + colors.join(" / "),
        palette(label, colors),
      );
    return pair(axis, brief, colorSample(left), colorSample(right));
  };
  const color = [
    palettePair(
      "整体色温",
      "给河岸步行路线的封面定一个主色调。",
      [
        "暖色基调",
        "让暖白、棕红和陶土色构成主要色域。",
        ["#FFF0DD", "#422919", "#BC4B2E", "#E2A469"],
      ],
      [
        "冷色基调",
        "选用雾蓝背景、深蓝正文和冷调强调色。",
        ["#E6F0F5", "#17354A", "#287392", "#90B8C6"],
      ],
    ),
    palettePair(
      "饱和度",
      "给同一张步行卡配置绿色和黄色。",
      [
        "鲜明配色",
        "使用鲜亮的绿和柠檬黄构建活泼的视觉重音。",
        ["#F3F9D6", "#172F22", "#239B63", "#F1CA25"],
      ],
      [
        "低饱和配色",
        "把绿色与黄色向灰调收敛，维持柔和的整体气氛。",
        ["#F1F1E7", "#343D33", "#789381", "#C4BA8C"],
      ],
    ),
    palettePair(
      "强调色关系",
      "决定同一张蓝色路线卡的辅助图形用色。",
      [
        "邻近色",
        "围绕主色选取色相相近的辅助色，让图形自然过渡。",
        ["#E8F1F3", "#193847", "#278696", "#539B7E"],
      ],
      [
        "互补色",
        "用接近互补的冷暖色区分主图和辅助图形，让两者互相衬托。",
        ["#E8F1F3", "#193847", "#278696", "#E48646"],
      ],
    ),
    palettePair(
      "背景明度",
      "比较同一张步行封面的白天与夜间基调。",
      [
        "浅色底",
        "采用浅色大底配深色文字，强调色负责提示路线。",
        ["#F4EEDD", "#242D36", "#D89F47", "#B7CCBC"],
      ],
      [
        "深色底",
        "采用深色大底配浅色文字，并为强调色保留足够亮度。",
        ["#242D36", "#F4EEDD", "#D89F47", "#91AA97"],
      ],
    ),
    palettePair(
      "介入颜色的多少",
      "在纸白底和墨色字之间决定是否引入彩色。",
      [
        "灰阶层次",
        "主要依靠黑、白、灰的明度关系区分信息。",
        ["#F5F4F0", "#252523", "#60605D", "#C1C0B9"],
      ],
      [
        "单色点睛",
        "在黑白灰系统中仅引入一种鲜明的彩色作为视觉焦点。",
        ["#F5F4F0", "#252523", "#E75632", "#C1C0B9"],
      ],
    ),
    palettePair(
      "底色偏向",
      "保留深蓝文字与橘色主图，仅调整承载内容的纸色。",
      [
        "中性白底",
        "以中性白承载正文和图形，把色彩集中在内容中。",
        ["#FFFFFF", "#26394A", "#CD623C", "#A9BAC2"],
      ],
      [
        "有色纸底",
        "把低饱和色铺到大面积背景，让空白区域也传达气氛。",
        ["#E4EBD6", "#26394A", "#CD623C", "#A9BAC2"],
      ],
    ),
  ];

  const library = [
    ["文学", 80],
    ["历史", 55],
    ["科学", 65],
    ["艺术", 40],
  ];
  const visits = [
    ["一月", 20],
    ["二月", 30],
    ["三月", 25],
    ["四月", 45],
    ["五月", 40],
    ["六月", 60],
  ];
  const bars = (data, style) => {
    const direct = style !== "grid";
    const grids = [0, 20, 40, 60, 80]
      .map(
        (n) =>
          '<line class="vx-grid-line" x1="' +
          (46 + 2.3 * n) +
          '" x2="' +
          (46 + 2.3 * n) +
          '" y1="5" y2="111"/><text x="' +
          (46 + 2.3 * n) +
          '" y="127" text-anchor="middle">' +
          n +
          "</text>",
      )
      .join("");
    return (
      (direct ? "" : grids) +
      data
        .map(([key, value], i) => {
          const y = 14 + i * 27,
            end = 46 + 2.3 * value;
          const mark =
            style === "dots"
              ? '<line x1="46" x2="' +
                end +
                '" y1="' +
                y +
                '" y2="' +
                y +
                '" stroke="#79899b"/><circle cx="' +
                end +
                '" cy="' +
                y +
                '" r="5" fill="#315679"/>'
              : '<rect x="46" y="' +
                (y - 6) +
                '" width="' +
                (end - 46) +
                '" height="12" fill="' +
                (style === "focus" && key !== "科学" ? "#c4cbd2" : "#315679") +
                '"/>';
          return (
            '<text x="0" y="' +
            (y + 4) +
            '">' +
            key +
            "</text>" +
            mark +
            (direct
              ? '<text x="' +
                (end + 7) +
                '" y="' +
                (y + 4) +
                '">' +
                value +
                "</text>"
              : "")
          );
        })
        .join("")
    );
  };
  const trend = (style) => {
    const points = visits.map(([, n], i) => [21 + i * 43, 102 - n * 1.25]);
    const axis = '<path d="M10 102H249" class="vx-grid-line"/>';
    return (
      axis +
      (style === "line"
        ? '<polyline points="' +
          points.map((x) => x.join(",")).join(" ") +
          '" fill="none" stroke="#315679" stroke-width="2.6"/>'
        : "") +
      points
        .map(
          ([x, y], i) =>
            (style === "line"
              ? '<circle cx="' + x + '" cy="' + y + '" r="4" fill="#315679"/>'
              : '<rect x="' +
                (x - 9) +
                '" y="' +
                y +
                '" width="18" height="' +
                (102 - y) +
                '" fill="#315679"/>') +
            '<text x="' +
            x +
            '" y="' +
            (y - 9) +
            '" text-anchor="middle">' +
            visits[i][1] +
            '</text><text x="' +
            x +
            '" y="121" text-anchor="middle">' +
            visits[i][0] +
            "</text>",
        )
        .join("")
    );
  };
  const shares = [
    ["春", 60, 40],
    ["夏", 45, 55],
  ];
  const shareChart = (style) => {
    const legend =
      '<rect x="0" y="4" width="10" height="10" fill="#315679"/><text x="15" y="14">纸书</text><rect x="86" y="4" width="10" height="10" fill="#D6A05B"/><text x="101" y="14">电子书</text>';
    return (
      legend +
      shares
        .map(([s, p, e], i) => {
          const y = 38 + i * 47;
          if (style === "stacked")
            return (
              '<text x="0" y="' +
              (y + 12) +
              '">' +
              s +
              '</text><rect x="24" y="' +
              y +
              '" width="' +
              2.2 * p +
              '" height="19" fill="#315679"/><rect x="' +
              (24 + 2.2 * p) +
              '" y="' +
              y +
              '" width="' +
              2.2 * e +
              '" height="19" fill="#D6A05B"/><text x="' +
              (24 + 1.1 * p) +
              '" y="' +
              (y + 14) +
              '" text-anchor="middle" style="fill:white">' +
              p +
              '%</text><text x="' +
              (24 + 2.2 * p + 1.1 * e) +
              '" y="' +
              (y + 14) +
              '" text-anchor="middle">' +
              e +
              "%</text>"
            );
          return (
            '<text x="0" y="' +
            (y + 15) +
            '">' +
            s +
            "</text>" +
            [p, e]
              .map(
                (v, j) =>
                  '<rect x="24" y="' +
                  (y + j * 15) +
                  '" width="' +
                  3 * v +
                  '" height="11" fill="' +
                  (j ? "#D6A05B" : "#315679") +
                  '"/><text x="' +
                  (30 + 3 * v) +
                  '" y="' +
                  (y + j * 15 + 10) +
                  '">' +
                  v +
                  "%</text>",
              )
              .join("")
          );
        })
        .join("")
    );
  };
  const chartCard = (title, unit, values, body) =>
    frame(
      "chart",
      '<div class="vx-chart-paper"><b>' +
        title +
        "</b><small>" +
        unit +
        '</small><svg role="img" aria-label="' +
        title +
        "，" +
        values +
        '" viewBox="0 0 260 132">' +
        body +
        "</svg></div>",
    );
  const chartPair = (axis, brief, title, unit, values, left, right) => {
    const side = ([label, rule, detail, body]) =>
      sample(
        label,
        rule,
        detail + "。数据：" + values + "。",
        chartCard(title, unit, values, body),
      );
    return pair(axis, brief, side(left), side(right));
  };
  const bookValues = "文学 80、历史 55、科学 65、艺术 40";
  const chart = [
    chartPair(
      "数量编码",
      "比较四类书在一周内的借阅册数。",
      "本周借阅",
      "单位 · 册",
      bookValues,
      [
        "条形长度",
        "类别之间比较数量时，优先用共用零基线的条形，直接标注数值。",
        "长度表示册数",
        bars(library, "bars"),
      ],
      [
        "点的位置",
        "类别之间比较数量时，可用点图把重点放在端点位置，并直接标注数值。",
        "点的位置表示册数",
        bars(library, "dots"),
      ],
    ),
    chartPair(
      "时间序列",
      "展示阅览室上半年逐月的到访人次。",
      "阅览室到访",
      "单位 · 百人次",
      "一月至六月依次为 20、30、25、45、40、60",
      [
        "折线连接",
        "有序时间数据用折线连接观测点，突出上升、下降和转折。",
        "折线连接六个月份",
        trend("line"),
      ],
      [
        "逐月柱形",
        "用彼此独立的柱形呈现各期数值，让每一期都是一个可单独比较的单位。",
        "每个月用一根柱子表示",
        trend("bars"),
      ],
    ),
    chartPair(
      "类别排序",
      "安排四类图书在周借阅报告中的顺序。",
      "本周借阅",
      "单位 · 册",
      bookValues,
      [
        "保留目录顺序",
        "存在读者熟悉的类别顺序时，跨期图表保持这一顺序，便于定位。",
        "遵循文学、历史、科学、艺术的目录顺序",
        bars(library, "bars"),
      ],
      [
        "按数值排序",
        "制作单期类别比较时按数值降序排列，使最高与最低一目了然。",
        "文学第一、科学第二",
        bars(
          [...library].sort((a, b) => b[1] - a[1]),
          "bars",
        ),
      ],
    ),
    chartPair(
      "强调策略",
      "为科学类图书专题页引用完整的一周借阅数据。",
      "本周借阅",
      "单位 · 册",
      bookValues,
      [
        "统一着色",
        "用同一种颜色呈现可比数据，把注意力分配给整体分布。",
        "四类数据同色",
        bars(library, "bars"),
      ],
      [
        "单项高亮",
        "只高亮正文正在讨论的类别，保留其余数据作灰色参照。",
        "科学类用蓝色，其他三类用灰色",
        bars(library, "focus"),
      ],
    ),
    chartPair(
      "读数方式",
      "为同一张借阅图安排刻度或标注。",
      "本周借阅",
      "单位 · 册",
      bookValues,
      [
        "贴近数据标注",
        "在图形末端直接写出数值，让读者就近读取。",
        "数值紧跟每根条形",
        bars(library, "bars"),
      ],
      [
        "共用刻度网格",
        "用稀疏刻度与浅色网格线建立统一量尺，保留图形周围的留白。",
        "按 20 册一格读取图形",
        bars(library, "grid"),
      ],
    ),
    chartPair(
      "组成比例",
      "展示春夏两季两种阅读介质的占比。",
      "阅读介质",
      "单位 · 占比",
      "春季纸书 60%、电子书 40%，夏季纸书 45%、电子书 55%",
      [
        "百分比堆叠",
        "比较多个整体的内部构成时，把各组归一到 100%，再将类别按固定顺序堆叠。",
        "每季共用一根满幅条",
        shareChart("stacked"),
      ],
      [
        "同基线并列",
        "需要逐项对比比例时，使各类别从同一零点起步，按组并列排放。",
        "纸书和电子书各自从零画起",
        shareChart("grouped"),
      ],
    ),
  ];
  window.visualTopics = { ui, design, color, chart };
})();
