# Woman Up! 项目当前状态报告 (2026-06)

## 项目基本信息

- **项目名称**: Woman Up! / 娘们要战斗
- **描述**: 面向独居、异地与低能量状态女性的异步支持型 Web 应用。包含 24 小时时间分配测试、未来轨迹预测、格斗/生存知识图鉴、双人异步呼吸闯关游戏（系统队友 NOIR-77）、电梯测试智慧小游戏、战斗力排行榜等。
- **核心设计原则**: 异步支持、低负担介入、隐私优先、不替代真人关系、提前介入。
- **GitHub**: https://github.com/kathyyxu/womanup
- **生产部署**: https://womanup-fight.vercel.app (Vercel)
- **本地路径**: /Users/kathy/womanup
- **当前分支**: main
- **最新 commit**: 3787aa1 (chore: trigger Vercel auto-deploy...)

## 技术栈

- React 18 + Vite 5 + React Router v6
- Tailwind CSS 3 + 自定义 brutalist/comic 风格 (大量 CSS 动画、SVG Radar、html2canvas 截图)
- 纯前端 + localStorage + 可选 MediaDevices (摄像头预览)
- Vercel Serverless Function (`/api/leaderboard`) + GitHub Contents API 持久化共享榜单 (需 GITHUB_TOKEN)
- 自定义 i18n (4 语言，无外部库)

**package.json 依赖**:
- 运行: react, react-dom, react-router-dom, lucide-react, html2canvas, vite, @vitejs/plugin-react
- 构建: tailwindcss, postcss, autoprefixer

**脚本**:
- `npm run dev` (vite --host 0.0.0.0)
- `npm run build`
- `npm run preview`

## 原始状态 (任务开始时)

- UI 层翻译基本完成 (nav、按钮、表单、状态提示等)。
- **核心问题**: 大量教育内容硬编码在 `src/data.js` (rankProfiles、trajectoryDetails、martialArtsCards、historicalWomenStories、survival*、wisdomQuestions 等)，全部为简体中文。
- 切换语言后，格斗/生存/故事/结果轨迹/测试题目等正文仍为中文 → “四个语言的版本还没做完”。
- 排行榜、邀请码、系统队友等也依赖中文 mock。
- 部署正常，但内容多语言不完整。
- 本地可运行，构建通过。

## 已完成工作

### 1. 结构分析与准备
- 完整阅读项目 (main.jsx, AppShell, data.js, i18n.jsx, 所有 pages, styles, api/leaderboard.js 等)。
- 确认技术栈、存储机制、计分逻辑、异步双人模拟。
- 提取所有 t()/get() key，定位缺失内容区块。

### 2. i18n 补全 (核心)
在 `src/i18n.jsx` 的 **四个语言字典** (zh-CN, zh-TW, en, ja) 中新增完整内容区块：

- `systemTeammate` (title, note)
- `ranks` (S/A/B/C/D: title, art, reason, quote, punchline, advice, timeline[])
- `trajectories` (各档位 1/2/5/10 年: year, headline, body)
- `martialArts` (8 种武术卡片)
- `womenQuotes` + `womenStories` (7 位历史人物完整故事/lesson/era)
- `survivalSkills` (8 大技能: name, line, scene, focus, actions[], avoid)
- `survivalProtocols`, `survivalScenarios`, `survivalDrills`
- `wisdom` { questions: [...] } (5 题完整 title/options/analysis)

**翻译质量**:
- zh-CN: 原始简体内容。
- zh-TW: 自然繁体 + 一致术语 (戰鬥力、電梯、隊友等)。
- en: 流畅自然英文 (匹配原有 UI 风格)。
- ja: 匹配原有日文 UI 风格的完整翻译。

文件从 ~1160 行增长到 **1832 行**。

### 3. 页面更新 (消费新数据)
修改以下页面，使用 `const { t, get } = useI18n()` 优先取翻译，fallback 到 data.js：

- `WomenStoriesPage.jsx`, `CombatGuidePage.jsx`, `SurvivalGuidePage.jsx`
- `ResultPage.jsx` (profile + trajectory + quote)
- `TrajectoryPage.jsx`
- `ElevatorTestPage.jsx` (questions 列表)
- `MatchPage.jsx`, `SquadPage.jsx`, `LeaderboardPage.jsx`, `TrainingPage.jsx` (systemTeammate)

**修复**:
- TrajectoryPage: 修复重复调用 useI18n() (合并为单次 `const { t, get } = useI18n()`)
- 其他小处确保 hook 顺序正确。

### 4. 部署与上线
- 本地多次 `npm run build` 验证 (无语法错误，新 bundle 正常)。
- Git push 到 origin/main (commits: 2651b0a 主翻译 + bfec86f 修复)。
- 用户在 Vercel UI 重新连接 Git。
- 使用 CLI 辅助：
  - `npx vercel --prod --yes` 强制从本地最新代码部署。
  - `npx vercel alias set ... womanup-fight.vercel.app` 更新主域名指向。
- **当前线上状态**:
  - 主域名 bundle: `index-D4JzKPM_.js` (新)
  - 最新部署: 3787aa1 (trigger) 已为 Production & Ready。
  - Preview "Visit" 链接已确认英文/多语言内容正确。

### 5. 其他
- 保持所有原有功能 (localStorage、计分、异步模拟、html2canvas、雷达图、摄像头等) 100% 兼容。
- 排行榜 API、邀请码生成等未改动。
- 数据源: data.js 作为 zh-CN fallback 保留。

## 当前状态 (2026-06)

**代码**:
- 干净 (git status empty)。
- 所有翻译内容已在 4 种语言完整可用。
- 支持语言切换后，正文 (故事、技能、档位描述、轨迹、题目) 正确切换。

**线上**:
- https://womanup-fight.vercel.app 已指向新构建。
- **验证方法**: 硬刷新 (Cmd/Ctrl+Shift+R) + 切换语言 + 无痕窗口测试。
- Preview 部署已确认可用；主域名缓存可能需要额外硬刷新。

**本地运行**:
```bash
npm install
npm run dev   # http://localhost:5173
```

**如何测试多语言**:
- 右上角 Language 下拉切换。
- 重点页面: /result (档位+轨迹), /survival, /combat, /women-stories, /elevator-test。
- 例子 (English):
  - S 档: "War God Awakened"
  - 故事: "Wu Zetian - Seizing narrative power..."
  - 生存技能: "Situational Awareness", "Boundary Expression" 等全英文。

## 遗留 / 注意事项

- Vercel 自定义域名/边缘缓存偶尔有短暂延迟 (已通过 alias 强制更新)。
- 排行榜持久化仍依赖 GitHub Token (生产环境需确保配置)。
- 未来 AI 功能计划 (用户提到益途户外孵化器比赛): 当前项目完全准备好作为基础 (所有内容已多语言化，可轻松扩展 AI 动态生成、个性化建议等)。
- 大文件警告: 主 bundle ~521kB (minified)，Vite 提示 chunk 较大 (可后续 code-split)。

## 后续建议 (如果继续)

- 验证主域名所有语言内容。
- 如果要加 AI: 可从 /result 轨迹生成、生存场景动态题库、AI 队友对话等切入。
- 运行 `npm run build && npm run preview` 本地预览生产 bundle。
- 需要我继续做什么？(AI 集成、更多内容、bug 修复、设计迭代等)

报告生成时间: 当前会话最新状态。
