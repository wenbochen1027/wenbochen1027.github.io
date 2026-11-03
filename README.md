# 陈闻博 · Wenbo Chen — 个人学术主页

纯静态网站，可通过 GitHub Pages 发布，无需安装依赖或运行构建命令。

## 建议使用的仓库和网址

- GitHub 账号：`wenbochen1027`
- 仓库名称：`wenbochen1027.github.io`
- 发布后的网址：`https://wenbochen1027.github.io/`

## 方法一：在 GitHub 网页上传（推荐）

1. 下载并解压 `Wenbo_Chen_GitHub_Pages.zip`。
2. 打开 https://github.com/new ，Owner 选择 `wenbochen1027`。
3. Repository name 填 `wenbochen1027.github.io`，选择 **Public**，创建仓库。若已有同名仓库，请先检查内容，避免覆盖现有网站。
4. 在仓库页面选择 **uploading an existing file**；已有文件的仓库使用 **Add file → Upload files**。
5. 进入解压后的目录，把其中的 `index.html`、`assets` 文件夹、`cv.html`、`README.md` 和 `.nojekyll` 上传到仓库根目录，点击 **Commit changes**。`.nojekyll` 是空文件，部分系统默认隐藏它；本网站也可使用 GitHub 默认静态发布流程。
6. 打开 **Settings → Pages → Build and deployment**。
7. Source 选择 **Deploy from a branch**，Branch 选择 **main**，文件夹选择 **/ (root)**，点击 **Save**。
8. 等待部署完成，在 Pages 设置中点击 **Visit site**。

重要：不要只上传 ZIP 文件，GitHub 不会自动解压它。也不要把外层文件夹整体作为一层上传；打开仓库后应直接看到 `index.html` 和 `assets/`。

本包是用于 **Upload files** 的网站文件包，不是 **Import repository** 页面所需的 Git 仓库 URL。

## 方法二：使用 Git

先在 GitHub 创建同名的空公开仓库，再在解压后的目录运行：

```sh
git init
git branch -M main
git add .
git commit -m "Publish academic website"
git remote add origin https://github.com/wenbochen1027/wenbochen1027.github.io.git
git push -u origin main
```

然后按方法一第 6–8 步启用 Pages。Git 操作需要使用你自己的 GitHub 登录。

## 文件说明

- `index.html`：主页、个人简介、研究项目、教育背景、工作经历、政策报告、助教经历与联系方式。
- `assets/style.css`：页面样式与深浅色配色。
- `assets/site.js`：中英文切换、主题记忆、导航高亮、移动端菜单与复制邮箱。
- `assets/IMG_1673.JPG`：个人照片。
- `assets/wenbo-chen-cv-cn.pdf` / `assets/wenbo-chen-cv-en.pdf`：中英文简历原件。
- `assets/language-icon.png`：你提供的语言切换图标。
- `assets/favicon.svg`：网站图标。
- `assets/licenses/feather.txt`：保留的图标许可文件。
- `cv.html`：跳转到中文 PDF 简历的备用入口。
- `.nojekyll`：跳过 Jekyll 处理，按静态文件发布。

资源路径已改为相对路径，也可用于 `https://用户名.github.io/仓库名称/` 形式的项目网站。纯静态托管不需要 ChatGPT 登录；页面语言和主题选择保存在访客自己的浏览器中。

## 后续更新

直接编辑相应文件或替换同名 PDF / 图片，提交到发布分支后等待 GitHub Pages 更新。研究项目的幻灯片展示位和未添加的内容按现有版本保留。

## GitHub 官方说明

- 创建 Pages：https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- 上传文件：https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- 选择发布来源：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
