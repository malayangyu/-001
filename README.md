# CROSSUM

Official website: https://crossum.online

Company: HONG KONG CROSSUM LIMITED / 香港越商有限公司
Contact: YE FANG · info@crossum.online · 52900344
Address: Room 17C, 15/F, Vanta Industrial Centre, 21-33 Tai Lin Pai Road, Kwai Chung, New Territories, Hong Kong, China

一个纯前端的外贸服饰 / 首饰展示网站，英文内容，无后端、无支付功能。

## 本地预览

直接双击 `index.html` 即可打开；或者在本目录启动一个静态服务器：

```bash
npx serve .
```

然后访问 `http://localhost:3000`。

## 页面结构

- `index.html` — 首页（Hero、分类、热销商品、品牌故事、 jewelry 专区、评价、订阅）
- `shop.html` — 商品列表（分类筛选、价格筛选、搜索、排序）
- `product.html?id=xxx` — 商品详情（多图切换、颜色/尺码/数量、加入购物车、立即购买）
- `about.html` — 品牌故事
- `contact.html` — 联系我们（前端表单，仅提示不发送）

## 交互说明

- 商品数据统一维护在 `js/products.js`（共 26 个商品：13 件服饰 + 13 件首饰），修改价格、名称、图片、描述只需改这一个文件。
- 商品可通过 `images: [主图, 细节图]` 配置多张图片，详情页会自动显示缩略图并可点击切换；只填 `image` 的旧商品仍正常显示单图。
- 购物车使用浏览器 `localStorage` 保存，刷新页面不会丢失。
- 点击 **Proceed to Checkout** 或商品详情页的 **Buy It Now**，会弹出 **"Coming Soon!"** 提示框（支付功能预留）。
- 联系表单和邮件订阅为纯前端演示，只弹出提示，不会真的发送邮件。

## 图片

所有图片已放在 `assets/images/`，网站完全自包含，离线也能正常显示。共 26 张商品图：其中 6 张含真人肖像、品牌字样或地标的高风险旧图已替换为 AI 原创生成图，另外 20 张为新增 10 个商品的 AI 原创主图与细节图（已裁掉水印、无文字/Logo/真人面部）。其余为无品牌文字的静物/商品图。

## 推送到 GitHub

```bash
cd D:/project
git init
git add .
git commit -m "Initial commit: CROSSUM front-end store"
git remote add origin <你的仓库地址>
git push -u origin main
```
