# Codex 错题入库工作流

本文档给 Codex 使用。用户上传学生数学错题照片后，按下面流程整理并入库。

## 目标

把一张错题照片整理为：

- 原始图片文件
- 一条结构化错题 JSON
- `data/mistakes/index.json` 中的一条索引记录
- 必要时更新 `data/knowledge.json`

当前只有一个学生：

```text
studentId: default
```

## 用户推荐指令

用户可以这样对 Codex 说：

```text
请从 GitHub 仓库 hyhml/knowledge_base 拉取最新内容。
我会上传一张学生数学错题照片。
请你识别题目，讲解解法，分析错因，关联已有知识点。
然后按 docs/mistake-schema.md 保存错题 JSON、图片和索引，并提交推送到 GitHub。
```

## 处理步骤

### 1. 同步仓库

先确认当前项目是最新版本：

```text
git pull
```

如果当前目录不是 Git 仓库，先克隆：

```text
git clone https://github.com/hyhml/knowledge_base.git
```

### 2. 保存图片

把用户上传的错题图片保存到：

```text
assets/mistakes/
```

命名格式：

```text
YYYY-MM-DD-math-knowledge-id-序号.jpg
```

如果原图不是 jpg，可以保留原格式，例如 `.png`。

### 3. 识别题目

从图片中整理：

- 题目文本
- 学生答案，若看不清写 `未提供`
- 题目条件
- 问题要求

如果图片无法识别关键信息，不要编造。应先向用户确认。

### 4. 讲解题目

讲解要面向基础薄弱学生：

- 先说明考查什么知识点
- 再给出完整解法
- 标出关键步骤
- 说明学生可能错在哪里
- 给出下次遇到同类题的检查点

不要只给最终答案。

### 5. 关联知识点

从 `data/knowledge.json` 中查找已有知识点 ID。

优先关联最直接的知识点，例如：

```text
quadratic-function
function-concept
function-monotonic
derivative-monotonic
```

如果一个错题涉及多个知识点：

- `knowledgeIds` 放主要知识点和直接相关知识点
- `prerequisiteIds` 放学生需要补的前置知识点

如果知识点库中没有合适知识点：

1. 先新增知识点到 `data/knowledge.json`
2. 按现有知识点模板补充字段
3. 再关联到错题

### 6. 判断错误类型

从下面枚举中选一个最主要的：

```text
知识漏洞
方法选择错误
审题错误
计算错误
公式遗忘
表达不规范
时间分配问题
```

如果有多个错误，`mistakeReason` 中说明，但 `mistakeType` 只填最主要的一个。

### 7. 生成错题 JSON

按 `docs/mistake-schema.md` 生成 JSON 文件。

保存路径：

```text
data/mistakes/YYYY-MM-DD-math-knowledge-id-序号.json
```

初次 AI 整理时：

```text
reviewStatus: draft
masteryStatus: 未掌握
```

### 8. 更新索引

同步更新：

```text
data/mistakes/index.json
```

新增一条索引记录，包含：

- `id`
- `file`
- `imagePath`
- `studentId`
- `subject`
- `date`
- `knowledgeIds`
- `reviewStatus`

同时更新：

```text
updatedAt
```

### 9. 校验

提交前检查：

- 错题 JSON 是合法 JSON
- `index.json` 是合法 JSON
- `knowledgeIds` 能在 `data/knowledge.json` 找到
- 图片路径真实存在
- `reviewStatus` 是 `draft` 或 `reviewed`
- `masteryStatus` 是 `未掌握`、`学习中` 或 `已掌握`

推荐校验命令：

```text
node -e "JSON.parse(require('fs').readFileSync('data/mistakes/index.json','utf8')); console.log('ok')"
```

### 10. 提交推送

提交信息建议：

```text
Add mistake: knowledge-name YYYY-MM-DD
```

例如：

```text
Add mistake: quadratic function 2026-07-14
```

推送到：

```text
main
```

## 质量要求

错题讲解必须满足：

- 能让基础薄弱学生看懂
- 不跳步骤
- 不只写公式
- 不编造看不清的题目信息
- 明确关联知识点
- 明确错因

## 发生冲突时

如果推送失败，先拉取远程：

```text
git pull --rebase
```

如果 `data/mistakes/index.json` 冲突：

1. 保留远程已有记录
2. 加入本次新增记录
3. 确保 `mistakes` 数组是合法 JSON
4. 再提交推送
