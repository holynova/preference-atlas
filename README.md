# Preference Atlas · 风格样本室

[简体中文](README.zh-CN.md) · [Demo](https://preference-atlas.xiaosang.cc/) · [Repository](https://github.com/holynova/preference-atlas)

Compare two responses to the same brief and score each from 1 to 4. Preference Atlas turns your scores and notes into a guide you can paste into your own AI. The interface and all 96 samples are in Chinese.

![The sample library with illustrated topic covers](assets/screenshot.png)

## Try a comparison

Open **中文句子** to compare two descriptions of the last ferry leaving the dock. Rate both versions, then open **我的指南 → 复制给 AI**. Giving both examples low scores asks the AI to propose a third approach. Equal high scores leave both approaches available.

Each of the eight topics has six pairs. The writing topics cover sentences, paragraphs, short articles and headlines. The visual topics cover interfaces, graphic design, palettes and charts. Browser storage keeps your progress on this device. Copy an individual guide or combine all rated topics.

[![Scan to open the live site](assets/qr.png)](https://preference-atlas.xiaosang.cc/)

## Run locally

From the repository root, run `python3 -m http.server 8000 --directory dist` and open <http://localhost:8000>. The site serves static HTML, CSS and JavaScript directly from `dist/`.

## Publish

Run `npm run check` on the main branch. The production target is the Cloudflare Worker declared in `wrangler.jsonc`. With access to the configured account, deploy the checked commit using `npx wrangler@4.164.0 deploy`.
