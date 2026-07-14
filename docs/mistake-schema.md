# 错题入库字段规范

每一道错题单独保存为一个 JSON 文件，放在：

```text
data/mistakes/
```

错题图片放在：

```text
assets/mistakes/
```

当前只有一个学生，统一使用：

```text
studentId: default
```

## 文件命名

推荐命名格式：

```text
data/mistakes/YYYY-MM-DD-math-knowledge-id-序号.json
assets/mistakes/YYYY-MM-DD-math-knowledge-id-序号.jpg
```

示例：

```text
data/mistakes/2026-07-14-math-quadratic-function-001.json
assets/mistakes/2026-07-14-math-quadratic-function-001.jpg
```

如果一道错题关联多个知识点，文件名使用主要知识点 ID。

## JSON 结构

```json
{
  "id": "mistake-20260714-math-quadratic-function-001",
  "studentId": "default",
  "subject": "数学",
  "date": "2026-07-14",
  "source": "学生拍照",
  "imagePath": "assets/mistakes/2026-07-14-math-quadratic-function-001.jpg",
  "question": "题目文本",
  "studentAnswer": "学生原答案；如果图片中看不清，写“未提供”",
  "correctAnswer": "正确答案",
  "analysis": "面向基础薄弱学生的详细讲解",
  "mistakeReason": "学生出错的核心原因",
  "mistakeType": "知识漏洞",
  "knowledgeIds": ["quadratic-function"],
  "prerequisiteIds": ["function-concept"],
  "reviewStatus": "draft",
  "masteryStatus": "未掌握",
  "nextReviewDate": "",
  "tags": ["函数", "二次函数", "最值"],
  "createdAt": "2026-07-14T00:00:00+08:00",
  "updatedAt": "2026-07-14T00:00:00+08:00"
}
```

## 字段说明

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `id` | 是 | 错题唯一 ID，推荐与文件名一致 |
| `studentId` | 是 | 当前固定为 `default` |
| `subject` | 是 | 当前固定为 `数学` |
| `date` | 是 | 错题入库日期，格式 `YYYY-MM-DD` |
| `source` | 是 | 来源，例如 `学生拍照`、`周测`、`作业` |
| `imagePath` | 是 | 原始错题图片路径 |
| `question` | 是 | OCR 或人工整理后的题目文本 |
| `studentAnswer` | 否 | 学生错误答案，看不清时写 `未提供` |
| `correctAnswer` | 是 | 正确答案或最终结果 |
| `analysis` | 是 | 详细讲解，尽量用补基础语言 |
| `mistakeReason` | 是 | 为什么错，不要只写“不会” |
| `mistakeType` | 是 | 错误类型，见下方枚举 |
| `knowledgeIds` | 是 | 关联知识点 ID，必须来自 `data/knowledge.json` |
| `prerequisiteIds` | 否 | 需要补的前置知识点 ID |
| `reviewStatus` | 是 | 审核状态，`draft` 或 `reviewed` |
| `masteryStatus` | 是 | 掌握状态 |
| `nextReviewDate` | 否 | 下次复习日期，格式 `YYYY-MM-DD` |
| `tags` | 否 | 便于搜索的标签 |
| `createdAt` | 是 | 创建时间，带时区 |
| `updatedAt` | 是 | 更新时间，带时区 |

## mistakeType 枚举

```text
知识漏洞
方法选择错误
审题错误
计算错误
公式遗忘
表达不规范
时间分配问题
```

## reviewStatus 枚举

```text
draft
reviewed
```

AI 初次整理入库时统一使用：

```text
reviewStatus: draft
```

人工检查无误后再改为：

```text
reviewStatus: reviewed
```

## masteryStatus 枚举

```text
未掌握
学习中
已掌握
```

## 索引文件

错题索引文件：

```text
data/mistakes/index.json
```

结构：

```json
{
  "version": 1,
  "updatedAt": "2026-07-14T00:00:00+08:00",
  "mistakes": [
    {
      "id": "mistake-20260714-math-quadratic-function-001",
      "file": "data/mistakes/2026-07-14-math-quadratic-function-001.json",
      "imagePath": "assets/mistakes/2026-07-14-math-quadratic-function-001.jpg",
      "studentId": "default",
      "subject": "数学",
      "date": "2026-07-14",
      "knowledgeIds": ["quadratic-function"],
      "reviewStatus": "draft"
    }
  ]
}
```

新增错题时必须同步更新索引。
