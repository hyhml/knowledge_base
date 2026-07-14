# 数学知识点库

面向高三基础薄弱学生的数学知识点补救库。项目当前主攻数学知识点本身，重点解决三个问题：

- 快速定位学生不会的知识点
- 用更适合补基础的语言讲清知识点
- 记录掌握状态、常见错误、典型例题和推荐学习视频

当前版本：`v0.4.5`

## 在线访问

GitHub Pages 地址：

```text
https://hyhml.github.io/knowledge_base/
```

本地也可以直接打开：

```text
index.html
```

这是纯静态网页，不需要安装依赖，也不需要启动后端服务。

## 页面结构

页面采用两栏布局：

```text
KnowledgeBase
├── Sidebar
│   ├── Search
│   ├── Filters
│   ├── KnowledgeTree
│   └── SyncPanel
│
└── KnowledgeDetail
```

左侧负责定位知识点：

- 搜索知识点名称和关键词
- 按掌握状态筛选：全部、未掌握、学习中、已掌握
- 按难度筛选：全部、基础、中等、提高
- 按“学科 → 模块 → 章节 → 知识点”展示树状结构
- 协作者可在这里输入 GitHub Token 并保存修改

右侧负责展示知识点详情：

- 知识点名称
- 分类标签
- 掌握状态
- 难度
- 推荐视频
- 知识讲解
- 必会结论
- 常见错误
- 前置知识点
- 典型例题

## 当前内容规模

当前内置 21 个数学知识点，覆盖：

- 集合与逻辑
- 函数
- 三角函数
- 数列
- 不等式
- 平面向量
- 解析几何
- 导数
- 概率统计

每个知识点目前包含：

- 1 段知识讲解
- 3 个 B 站推荐视频及推荐理由
- 8 条必会结论
- 8 条常见错误
- 3-5 道典型例题，当前统一为 4 道
- 前置知识点关联
- 掌握状态

## 数据文件

共享知识点数据保存在：

```text
data/knowledge.json
```

网页打开时会优先读取：

```text
./data/knowledge.json
```

这样普通访问者不需要 GitHub Token，也不会因为 GitHub API 限流而读不到最新知识点。

浏览器 `localStorage` 只作为本地缓存使用。如果发现页面内容没有更新，可以强制刷新：

```text
Ctrl + F5
```

或者清理该网站的浏览器缓存后重新打开。

## 协作者编辑

普通访问者可以直接查看网页。协作者如需把修改保存回 GitHub 仓库，需要准备 GitHub Token。

协作者权限要求：

1. 需要拥有 `hyhml/knowledge_base` 仓库写权限。
2. 创建 GitHub fine-grained personal access token。
3. Token 只选择 `hyhml/knowledge_base` 仓库。
4. Repository permissions 只需要开启 `Contents: Read and write`。
5. 打开网页，在左侧“协作同步”区域输入 Token。
6. 修改知识点后点击“保存到 GitHub”。

安全说明：

- Token 不会写入代码仓库。
- Token 只保存在当前浏览器会话中。
- 不要把自己的 Token 发给别人。
- 如果多人同时编辑，保存前会检查远程版本，降低覆盖别人修改的风险。

## 知识点数据结构

单个知识点的数据大致如下：

```json
{
  "id": "quadratic-function",
  "subject": "数学",
  "module": "函数",
  "unit": "二次函数",
  "name": "二次函数图像与最值",
  "level": "基础",
  "status": "未掌握",
  "reviewDate": "",
  "prerequisites": ["function-concept"],
  "explanation": "知识讲解文本",
  "keyPoints": ["必会结论"],
  "pitfalls": ["常见错误"],
  "recommendedVideos": [
    {
      "title": "视频标题",
      "url": "https://www.bilibili.com/video/BV...",
      "reason": "推荐理由"
    }
  ],
  "examples": [
    {
      "question": "题目",
      "solution": "解法"
    }
  ]
}
```

树状结构由这些字段自动生成：

```text
subject → module → unit → name
```

不要手写另一份目录树，避免知识层级和数据不一致。

## 常见问题

### 页面没有显示最新例题

先强制刷新：

```text
Ctrl + F5
```

如果仍然不更新，打开这个地址确认共享数据是否已更新：

```text
https://hyhml.github.io/knowledge_base/data/knowledge.json
```

当前版本应包含 21 个知识点、共 84 道典型例题。

### 为什么有 Token 还可能加载失败

GitHub API 有访问频率限制。当前版本普通读取已经改为直接读取 `data/knowledge.json`，只有保存时才使用 GitHub API。

如果 Token 失效或权限不足，保存会失败；重新创建具备 `Contents: Read and write` 权限的 Token 即可。

### 为什么修改后别人没有立刻看到

GitHub Pages 有短时间缓存。一般等待 1-3 分钟后刷新即可。

## 版本记录

详见 [CHANGELOG.md](./CHANGELOG.md)。

当前版本：`v0.4.5`
