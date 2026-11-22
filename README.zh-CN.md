# 风格样本室 · Preference Atlas

[English](README.md) · [在线体验](https://preference-atlas.xiaosang.cc/) · [GitHub 源码](https://github.com/holynova/preference-atlas)

面对同一个任务，看看你喜欢哪一种写法或设计。给两个样本分别打 1–4 分，风格样本室就会把评分和备注整理成可以复制给自己 AI 的中文指南。

![样本目录首页，展示中文写作和视觉主题的插画封面](assets/screenshot.png)

## 试评一组

打开「中文句子」，比较末班船离岸的两种写法，分别打分。进入「我的指南」，选中主题并点击「复制给 AI」。如果两种都给低分，指南会请 AI 提出第三种写法；如果同样喜欢，两种做法都会保留。

文字主题包含句子、段落、短文和标题，视觉主题包含 UI、平面设计、配色和图表。每个主题 6 组，一共 48 组、96 个样本。进度保存在当前设备的浏览器中，可以复制单个主题，也可以合并所有已评主题。

[![扫码打开风格样本室](assets/qr.png)](https://preference-atlas.xiaosang.cc/)

## 本地运行

在仓库根目录执行 `python3 -m http.server 8000 --directory dist`，然后打开 <http://localhost:8000>。HTML、CSS 和 JavaScript 均直接从 `dist/` 提供。

## 发布

在 main 分支运行 `npm run check`。生产环境使用 `wrangler.jsonc` 声明的 Cloudflare Worker。登录对应账户后，执行 `npx wrangler@4.164.0 deploy` 即可部署已检查的提交。
