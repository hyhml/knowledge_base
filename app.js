const STORAGE_KEY = "mathKnowledgeBase:v1";
const TOKEN_KEY = "mathKnowledgeBase:githubToken";
const GITHUB_CONFIG = {
  owner: "hyhml",
  repo: "knowledge_base",
  branch: "main",
  path: "data/knowledge.json"
};

let sharedFileSha = "";

const seedKnowledge = [
  {
    id: "set-basic",
    module: "集合与逻辑",
    unit: "集合",
    name: "集合的含义与表示",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: [],
    explanation:
      "集合就是把满足同一个条件的对象放在一起。做题时先看元素是什么，再看条件是什么，最后判断元素能不能放进这个集合。",
    keyPoints: [
      "常用表示方法有列举法、描述法和区间表示法。",
      "元素与集合之间用属于或不属于表示。",
      "集合与集合之间才讨论包含关系。"
    ],
    pitfalls: [
      "把元素和集合混在一起，误用属于和包含。",
      "描述法中没有看清变量范围。",
      "空集是任何集合的子集。"
    ],
    examples: [
      {
        question: "用区间表示 {x | -1 < x <= 3}。",
        solution: "左端点不取，右端点取，所以写成 (-1, 3]。"
      }
    ]
  },
  {
    id: "logic-condition",
    module: "集合与逻辑",
    unit: "常用逻辑用语",
    name: "充分条件与必要条件",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: ["set-basic"],
    explanation:
      "判断充分必要条件时，把命题写成“如果 p，那么 q”。只要 p 能推出 q，p 就是 q 的充分条件；反过来 q 能推出 p，p 就是 q 的必要条件。",
    keyPoints: [
      "p => q：p 是 q 的充分条件。",
      "q => p：p 是 q 的必要条件。",
      "两个方向都能推出，就是充要条件。"
    ],
    pitfalls: [
      "只凭语感判断，没有写出两个推出方向。",
      "把充分和必要的方向记反。"
    ],
    examples: [
      {
        question: "x = 2 是 x² = 4 的什么条件？",
        solution: "x = 2 能推出 x² = 4，但 x² = 4 不能推出 x = 2，所以是充分不必要条件。"
      }
    ]
  },
  {
    id: "function-concept",
    module: "函数",
    unit: "函数概念",
    name: "函数的定义域与值域",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: ["set-basic"],
    explanation:
      "定义域是 x 能取哪些数，值域是 y 最后能得到哪些数。遇到函数题，先不要急着算，第一步通常是检查 x 有没有限制。",
    keyPoints: [
      "分母不能为 0。",
      "偶次根号内必须大于等于 0。",
      "对数真数必须大于 0。",
      "实际问题还要看题目背景限制。"
    ],
    pitfalls: [
      "只化简表达式，忘记保留原函数定义域。",
      "求值域时没有先确定定义域。"
    ],
    examples: [
      {
        question: "求 f(x)=1/(x-2) 的定义域。",
        solution: "分母 x-2 不能为 0，所以 x != 2，定义域为 (-∞,2)∪(2,+∞)。"
      }
    ]
  },
  {
    id: "function-monotonic",
    module: "函数",
    unit: "函数性质",
    name: "函数单调性",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: ["function-concept"],
    explanation:
      "单调性看的是 x 变大时，y 是一直变大还是一直变小。基础题可以看图像、看一次函数斜率、看二次函数对称轴，复杂题再用定义或导数。",
    keyPoints: [
      "递增：x1 < x2 时，f(x1) < f(x2)。",
      "递减：x1 < x2 时，f(x1) > f(x2)。",
      "二次函数在对称轴两侧单调性相反。"
    ],
    pitfalls: [
      "没有说明单调区间。",
      "把整个定义域上的性质和某个区间上的性质混淆。"
    ],
    examples: [
      {
        question: "y=(x-1)² 在哪个区间递减？",
        solution: "开口向上，对称轴 x=1，左侧递减，所以在 (-∞,1] 递减。"
      }
    ]
  },
  {
    id: "function-parity",
    module: "函数",
    unit: "函数性质",
    name: "函数奇偶性",
    level: "基础",
    status: "学习中",
    reviewDate: "",
    prerequisites: ["function-concept"],
    explanation:
      "奇偶性先看定义域是否关于 0 对称，再比较 f(-x) 和 f(x)。f(-x)=f(x) 是偶函数，f(-x)=-f(x) 是奇函数。",
    keyPoints: [
      "判断奇偶性前必须先看定义域。",
      "偶函数图像关于 y 轴对称。",
      "奇函数图像关于原点对称。"
    ],
    pitfalls: [
      "定义域不对称时还继续判断公式。",
      "f(-x) 化简出错。"
    ],
    examples: [
      {
        question: "判断 f(x)=x³+x 的奇偶性。",
        solution: "f(-x)=-x³-x=-(x³+x)=-f(x)，所以是奇函数。"
      }
    ]
  },
  {
    id: "quadratic-function",
    module: "函数",
    unit: "二次函数",
    name: "二次函数图像与最值",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: ["function-concept"],
    explanation:
      "二次函数的核心是开口方向和对称轴。先配方或找对称轴，再判断最值在顶点还是区间端点。",
    keyPoints: [
      "y=ax²+bx+c 的对称轴是 x=-b/(2a)。",
      "a>0 开口向上，顶点处取最小值。",
      "限制区间上求最值时，要比较端点和顶点。"
    ],
    pitfalls: [
      "区间最值题只看顶点，不看端点。",
      "对称轴公式符号写错。"
    ],
    recommendedVideos: [
      {
        title: "【新高考一轮复习】二次函数！考点全梳理！",
        url: "https://www.bilibili.com/video/BV1M4jJ65Ee9",
        reason: "覆盖高中二次函数常见考点，适合先建立高考复习框架。"
      },
      {
        title: "关于二次函数，你应该知道的基本知识",
        url: "https://www.bilibili.com/video/BV1Fb4y1K77y",
        reason: "讲解偏概念理解，适合基础薄弱学生补开口方向、对称轴、顶点等核心认识。"
      },
      {
        title: "【压轴】二次函数区间最值4类大全",
        url: "https://www.bilibili.com/video/BV1zmSoBnEX1",
        reason: "集中训练区间最值分类讨论，能补上“顶点和端点都要比较”的易错点。"
      }
    ],
    examples: [
      {
        question: "求 y=x²-4x+5 的最小值。",
        solution: "配方得 y=(x-2)²+1，所以最小值是 1。"
      }
    ]
  },
  {
    id: "exponential-log",
    module: "函数",
    unit: "指数与对数",
    name: "指数函数与对数函数",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: ["function-concept"],
    explanation:
      "指数和对数是一对反向运算。指数函数看底数是否大于 1；对数函数还要先检查真数大于 0、底数大于 0 且不等于 1。",
    keyPoints: [
      "a>1 时，y=a^x 递增；0<a<1 时递减。",
      "log_a x 的定义域是 x>0。",
      "log_a MN = log_a M + log_a N。"
    ],
    pitfalls: [
      "忽略对数真数大于 0。",
      "把 log_a(M+N) 错拆成 log_a M + log_a N。"
    ],
    examples: [
      {
        question: "解 log₂(x-1)=3。",
        solution: "先有 x-1>0。由定义得 x-1=8，所以 x=9。"
      }
    ]
  },
  {
    id: "trig-basic",
    module: "三角函数",
    unit: "任意角三角函数",
    name: "三角函数定义与象限符号",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: [],
    explanation:
      "三角函数的符号由终边所在象限决定。基础薄弱时先记单位圆：cos 看横坐标，sin 看纵坐标，tan 看纵坐标除以横坐标。",
    keyPoints: [
      "第一象限 sin、cos、tan 都为正。",
      "第二象限 sin 正，cos 和 tan 负。",
      "第三象限 tan 正，sin 和 cos 负。",
      "第四象限 cos 正，sin 和 tan 负。"
    ],
    pitfalls: [
      "角度和弧度混用。",
      "没有先判断角的终边象限。"
    ],
    examples: [
      {
        question: "sin 210° 的符号是什么？",
        solution: "210° 在第三象限，sin 为负。"
      }
    ]
  },
  {
    id: "trig-identity",
    module: "三角函数",
    unit: "诱导公式",
    name: "诱导公式与同角关系",
    level: "基础",
    status: "学习中",
    reviewDate: "",
    prerequisites: ["trig-basic"],
    explanation:
      "诱导公式本质是把大角、负角转成熟悉的锐角或特殊角。处理时先确定函数名是否变化，再确定符号。",
    keyPoints: [
      "sin²x + cos²x = 1。",
      "tan x = sin x / cos x。",
      "kπ ± x 通常看象限符号。"
    ],
    pitfalls: [
      "只背公式，不判断象限符号。",
      "化简时漏掉 cos x 不能为 0 的限制。"
    ],
    examples: [
      {
        question: "化简 sin(π-x)。",
        solution: "π-x 在第二象限，sin 为正，所以 sin(π-x)=sin x。"
      }
    ]
  },
  {
    id: "sequence-basic",
    module: "数列",
    unit: "数列概念",
    name: "数列通项与前 n 项和",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: [],
    explanation:
      "通项 an 是第 n 项的表达式，前 n 项和 Sn 是从第 1 项加到第 n 项。看到 Sn 和 an 的关系题，要记住 an=Sn-S(n-1)。",
    keyPoints: [
      "n>=2 时，an = Sn - S(n-1)。",
      "求出 an 后要单独检查 a1。",
      "数列题里的 n 通常是正整数。"
    ],
    pitfalls: [
      "直接套 an=Sn-S(n-1)，忘记检查 n=1。",
      "把项数 n 和项 an 混淆。"
    ],
    examples: [
      {
        question: "已知 Sn=n²，求 an。",
        solution: "n>=2 时 an=n²-(n-1)²=2n-1，a1=S1=1，也符合公式。"
      }
    ]
  },
  {
    id: "arithmetic-sequence",
    module: "数列",
    unit: "等差数列",
    name: "等差数列",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: ["sequence-basic"],
    explanation:
      "等差数列的每一项比前一项多同一个数，这个固定差叫公差。题目中出现相邻两项差相同，就优先考虑等差数列。",
    keyPoints: [
      "通项公式：an=a1+(n-1)d。",
      "前 n 项和：Sn=n(a1+an)/2。",
      "等差中项：2b=a+c。"
    ],
    pitfalls: [
      "把 n-1 写成 n。",
      "求和公式里项数 n 漏乘。"
    ],
    examples: [
      {
        question: "等差数列 a1=3，d=2，求 a10。",
        solution: "a10=3+(10-1)×2=21。"
      }
    ]
  },
  {
    id: "geometric-sequence",
    module: "数列",
    unit: "等比数列",
    name: "等比数列",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: ["sequence-basic"],
    explanation:
      "等比数列的每一项除以前一项都等于同一个数，这个固定比叫公比。和等差数列不同，它是乘法变化。",
    keyPoints: [
      "通项公式：an=a1q^(n-1)。",
      "q != 1 时，Sn=a1(1-q^n)/(1-q)。",
      "q = 1 时，Sn=na1。"
    ],
    pitfalls: [
      "忘记讨论 q=1。",
      "把等差和等比公式混用。"
    ],
    examples: [
      {
        question: "等比数列 a1=2，q=3，求 a4。",
        solution: "a4=2×3³=54。"
      }
    ]
  },
  {
    id: "inequality-basic",
    module: "不等式",
    unit: "不等式性质",
    name: "不等式基本性质",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: [],
    explanation:
      "不等式最容易出错的是乘除负数。两边同时乘或除以负数时，不等号方向必须改变。",
    keyPoints: [
      "两边加减同一个数，不等号方向不变。",
      "两边乘除正数，不等号方向不变。",
      "两边乘除负数，不等号方向改变。"
    ],
    pitfalls: [
      "除以含字母的式子时，没有判断正负。",
      "移项时符号变了，不等号又被误改。"
    ],
    examples: [
      {
        question: "解 -2x > 6。",
        solution: "两边除以 -2，不等号变向，得 x < -3。"
      }
    ]
  },
  {
    id: "basic-inequality",
    module: "不等式",
    unit: "基本不等式",
    name: "基本不等式",
    level: "中等",
    status: "未掌握",
    reviewDate: "",
    prerequisites: ["inequality-basic"],
    explanation:
      "基本不等式常用于求最值，但必须满足正数条件，并且等号能取到。做题时先检查“正、定、等”三个条件。",
    keyPoints: [
      "a>0，b>0 时，a+b >= 2√ab。",
      "使用前要有正数条件。",
      "求最值时要检查等号成立条件。"
    ],
    pitfalls: [
      "没有正数条件就套公式。",
      "等号取不到还写最值。"
    ],
    examples: [
      {
        question: "x>0，求 x+1/x 的最小值。",
        solution: "由基本不等式得 x+1/x >= 2，当 x=1 时取等号，最小值为 2。"
      }
    ]
  },
  {
    id: "vector-basic",
    module: "平面向量",
    unit: "向量概念",
    name: "向量的线性运算",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: [],
    explanation:
      "向量既有大小又有方向。线性运算可以用几何法看平移，也可以用坐标法逐项相加减。",
    keyPoints: [
      "向量相等要求长度相等且方向相同。",
      "坐标表示下，(x1,y1)+(x2,y2)=(x1+x2,y1+y2)。",
      "k(x,y)=(kx,ky)。"
    ],
    pitfalls: [
      "把向量长度相等误认为向量相等。",
      "坐标相减顺序写反。"
    ],
    examples: [
      {
        question: "a=(2,-1)，b=(3,4)，求 a+b。",
        solution: "对应坐标相加，a+b=(5,3)。"
      }
    ]
  },
  {
    id: "vector-dot",
    module: "平面向量",
    unit: "数量积",
    name: "向量数量积",
    level: "基础",
    status: "学习中",
    reviewDate: "",
    prerequisites: ["vector-basic"],
    explanation:
      "数量积把两个向量变成一个数。它常用来求夹角、判断垂直，也可以用坐标公式快速计算。",
    keyPoints: [
      "a·b=|a||b|cosθ。",
      "坐标公式：(x1,y1)·(x2,y2)=x1x2+y1y2。",
      "a·b=0 且两个向量非零时，a 与 b 垂直。"
    ],
    pitfalls: [
      "把数量积结果写成向量。",
      "判断垂直时忘记非零向量条件。"
    ],
    examples: [
      {
        question: "a=(1,2)，b=(4,-2)，判断是否垂直。",
        solution: "a·b=1×4+2×(-2)=0，所以两个非零向量垂直。"
      }
    ]
  },
  {
    id: "line-equation",
    module: "解析几何",
    unit: "直线",
    name: "直线方程与斜率",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: [],
    explanation:
      "直线题先看能不能求斜率。斜率表示直线倾斜程度，已知一点和斜率时可用点斜式。",
    keyPoints: [
      "过两点的斜率 k=(y2-y1)/(x2-x1)，x1 != x2。",
      "点斜式：y-y0=k(x-x0)。",
      "垂直于 x 轴的直线没有斜率。"
    ],
    pitfalls: [
      "两点斜率分子分母顺序不一致。",
      "遇到 x=常数 的直线还硬套斜率公式。"
    ],
    examples: [
      {
        question: "求过 (1,2)，斜率为 3 的直线方程。",
        solution: "用点斜式 y-2=3(x-1)，整理得 y=3x-1。"
      }
    ]
  },
  {
    id: "circle-equation",
    module: "解析几何",
    unit: "圆",
    name: "圆的标准方程",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: ["quadratic-function"],
    explanation:
      "圆的标准方程直接告诉你圆心和半径。看到 x²、y² 系数相同，可以尝试配方化成标准方程。",
    keyPoints: [
      "标准方程：(x-a)²+(y-b)²=r²。",
      "圆心是 (a,b)，半径是 r。",
      "一般方程化标准方程常用配方。"
    ],
    pitfalls: [
      "把 r² 当成半径。",
      "配方时常数项移动出错。"
    ],
    examples: [
      {
        question: "圆 (x-2)²+(y+1)²=9 的圆心和半径是什么？",
        solution: "圆心为 (2,-1)，半径为 3。"
      }
    ]
  },
  {
    id: "derivative-basic",
    module: "导数",
    unit: "导数概念",
    name: "导数的意义与基本公式",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: ["function-concept", "function-monotonic"],
    explanation:
      "导数可以理解为函数在某一点附近变化快慢，也可以看作切线斜率。基础阶段先把常见求导公式用熟。",
    keyPoints: [
      "(x^n)' = nx^(n-1)。",
      "(sin x)' = cos x，(cos x)' = -sin x。",
      "(e^x)' = e^x，(ln x)' = 1/x。"
    ],
    pitfalls: [
      "幂函数求导指数减 1 漏掉。",
      "三角函数求导符号记错。"
    ],
    examples: [
      {
        question: "求 f(x)=x³-2x 的导数。",
        solution: "f'(x)=3x²-2。"
      }
    ]
  },
  {
    id: "derivative-monotonic",
    module: "导数",
    unit: "导数应用",
    name: "用导数判断单调性",
    level: "中等",
    status: "未掌握",
    reviewDate: "",
    prerequisites: ["derivative-basic", "inequality-basic"],
    explanation:
      "导数判断单调性的核心是看 f'(x) 的正负。f'(x)>0 时函数递增，f'(x)<0 时函数递减。",
    keyPoints: [
      "先求定义域，再求导数。",
      "解 f'(x)>0 或 f'(x)<0 得到单调区间。",
      "临界点要结合定义域分区间讨论。"
    ],
    pitfalls: [
      "没有先写定义域。",
      "导数为 0 的点没有分区间。",
      "把导数正负和函数值正负混淆。"
    ],
    examples: [
      {
        question: "判断 f(x)=x²-2x 的单调性。",
        solution: "f'(x)=2x-2。x<1 时 f'<0 递减；x>1 时 f'>0 递增。"
      }
    ]
  },
  {
    id: "probability-basic",
    module: "概率统计",
    unit: "概率",
    name: "古典概型",
    level: "基础",
    status: "未掌握",
    reviewDate: "",
    prerequisites: [],
    explanation:
      "古典概型要求每个基本结果等可能。概率等于有利结果数除以所有可能结果数。",
    keyPoints: [
      "P(A)=事件 A 包含的基本事件数 / 基本事件总数。",
      "使用前要确认每个基本事件等可能。",
      "列举时要避免重复和遗漏。"
    ],
    pitfalls: [
      "没有判断等可能就套公式。",
      "把顺序不同的结果是否算不同弄混。"
    ],
    examples: [
      {
        question: "掷一枚骰子，出现偶数的概率是多少？",
        solution: "偶数有 2、4、6 三种，总共六种，概率为 3/6=1/2。"
      }
    ]
  }
];

const state = {
  items: [],
  activeId: "",
  filters: {
    status: "全部",
    level: "全部",
    query: ""
  }
};

const els = {
  searchInput: document.querySelector("#searchInput"),
  tokenInput: document.querySelector("#tokenInput"),
  syncStatus: document.querySelector("#syncStatus"),
  loadSharedBtn: document.querySelector("#loadSharedBtn"),
  saveSharedBtn: document.querySelector("#saveSharedBtn"),
  knowledgeTree: document.querySelector("#knowledgeTree"),
  statusFilters: document.querySelector("#statusFilters"),
  levelFilters: document.querySelector("#levelFilters"),
  pageTitle: document.querySelector("#pageTitle"),
  detailView: document.querySelector("#detailView"),
  addBtn: document.querySelector("#addBtn"),
  resetBtn: document.querySelector("#resetBtn"),
  dialog: document.querySelector("#editorDialog"),
  form: document.querySelector("#knowledgeForm"),
  dialogTitle: document.querySelector("#dialogTitle"),
  deleteBtn: document.querySelector("#deleteBtn"),
  idField: document.querySelector("#idField"),
  nameField: document.querySelector("#nameField"),
  moduleField: document.querySelector("#moduleField"),
  unitField: document.querySelector("#unitField"),
  levelField: document.querySelector("#levelField"),
  statusField: document.querySelector("#statusField"),
  reviewDateField: document.querySelector("#reviewDateField"),
  prereqField: document.querySelector("#prereqField"),
  explanationField: document.querySelector("#explanationField"),
  keyPointsField: document.querySelector("#keyPointsField"),
  pitfallsField: document.querySelector("#pitfallsField"),
  examplesField: document.querySelector("#examplesField")
};

function cloneSeed() {
  return normalizeItems(JSON.parse(JSON.stringify(seedKnowledge)));
}

function normalizeItems(items) {
  return items.map((item) => ({
    subject: "数学",
    ...item,
    subject: item.subject || "数学"
  }));
}

function loadItems() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return cloneSeed();

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? normalizeItems(parsed) : cloneSeed();
  } catch {
    return cloneSeed();
  }
}

function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
}

function githubContentsUrl() {
  const { owner, repo, path } = GITHUB_CONFIG;
  return `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
}

function githubHeaders(token = "") {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function decodeBase64Unicode(value) {
  const binary = atob(value.replace(/\s/g, ""));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeBase64Unicode(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

function setSyncStatus(message, tone = "muted") {
  els.syncStatus.textContent = message;
  els.syncStatus.dataset.tone = tone;
}

function getToken() {
  return els.tokenInput.value.trim();
}

async function fetchSharedFile(token = "") {
  const url = `${githubContentsUrl()}?ref=${encodeURIComponent(GITHUB_CONFIG.branch)}`;
  const response = await fetch(url, {
    headers: githubHeaders(token),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`GitHub 读取失败：${response.status}`);
  }

  const payload = await response.json();
  const content = JSON.parse(decodeBase64Unicode(payload.content));
  return {
    content,
    sha: payload.sha
  };
}

async function loadSharedData({ showSuccess = true } = {}) {
  try {
    const token = getToken();
    setSyncStatus("正在加载 GitHub 共享数据");
    const shared = await fetchSharedFile(token);
    state.items = Array.isArray(shared.content) ? normalizeItems(shared.content) : cloneSeed();
    sharedFileSha = shared.sha;
    state.activeId = state.items[0]?.id || "";
    saveItems();
    render();
    setSyncStatus(showSuccess ? "已加载 GitHub 共享数据" : "已自动加载 GitHub 共享数据", "ok");
  } catch (error) {
    setSyncStatus("共享数据加载失败，当前显示本地缓存", "warn");
    console.error(error);
  }
}

async function saveSharedData() {
  const token = getToken();
  if (!token) {
    setSyncStatus("保存需要协作者 GitHub Token", "warn");
    els.tokenInput.focus();
    return;
  }

  try {
    setSyncStatus("正在检查 GitHub 最新版本");
    const remote = await fetchSharedFile(token);
    if (sharedFileSha && remote.sha !== sharedFileSha) {
      setSyncStatus("远程数据已更新，请先加载共享数据再保存", "warn");
      return;
    }

    const nextContent = `${JSON.stringify(state.items, null, 2)}\n`;
    const response = await fetch(githubContentsUrl(), {
      method: "PUT",
      headers: {
        ...githubHeaders(token),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `Update math knowledge data ${new Date().toISOString().slice(0, 10)}`,
        content: encodeBase64Unicode(nextContent),
        sha: remote.sha,
        branch: GITHUB_CONFIG.branch
      })
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error("Token 权限不足或已失效");
      }
      if (response.status === 409) {
        throw new Error("远程数据发生冲突，请重新加载后再保存");
      }
      throw new Error(`GitHub 保存失败：${response.status}`);
    }

    const payload = await response.json();
    sharedFileSha = payload.content.sha;
    saveItems();
    setSyncStatus("已保存到 GitHub，共享网页会读取最新数据", "ok");
  } catch (error) {
    setSyncStatus(error.message || "保存失败", "warn");
    console.error(error);
  }
}

function markLocalChanged() {
  setSyncStatus("本地已修改，协作者可点击保存到 GitHub", "warn");
}

function statusClass(status) {
  if (status === "已掌握") return "ok";
  if (status === "学习中") return "warn";
  return "weak";
}

function groupByStructure(items) {
  return items.reduce((subjects, item) => {
    const subjectName = item.subject || "数学";
    const moduleName = item.module || "未分模块";
    const unitName = item.unit || "未分章节";
    if (!subjects.has(subjectName)) subjects.set(subjectName, new Map());
    const modules = subjects.get(subjectName);
    if (!modules.has(moduleName)) modules.set(moduleName, new Map());
    const units = modules.get(moduleName);
    if (!units.has(unitName)) units.set(unitName, []);
    units.get(unitName).push(item);
    return subjects;
  }, new Map());
}

function splitLines(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseExamples(value) {
  return splitLines(value).map((line) => {
    const [question, ...solutionParts] = line.split("=>");
    return {
      question: question.trim(),
      solution: solutionParts.join("=>").trim()
    };
  });
}

function examplesToText(examples) {
  return (examples || [])
    .map((example) => `${example.question || ""} => ${example.solution || ""}`.trim())
    .join("\n");
}

function makeId(name) {
  const base = name
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "knowledge"}-${Date.now().toString(36)}`;
}

function filteredItems() {
  const query = state.filters.query.trim().toLowerCase();

  return state.items.filter((item) => {
    const statusMatch =
      state.filters.status === "全部" || item.status === state.filters.status;
    const levelMatch =
      state.filters.level === "全部" || item.level === state.filters.level;
    const text = [
      item.name,
      item.subject || "数学",
      item.module,
      item.unit,
      item.explanation,
      ...(item.keyPoints || []),
      ...(item.pitfalls || [])
    ]
      .join(" ")
      .toLowerCase();
    const queryMatch = !query || text.includes(query);
    return statusMatch && levelMatch && queryMatch;
  });
}

function renderChips(container, values, activeValue, onSelect) {
  container.innerHTML = "";
  values.forEach((value) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip${value === activeValue ? " active" : ""}`;
    button.textContent = value;
    button.addEventListener("click", () => onSelect(value));
    container.append(button);
  });
}

function renderFilters() {
  renderChips(
    els.statusFilters,
    ["全部", "未掌握", "学习中", "已掌握"],
    state.filters.status,
    (value) => {
      state.filters.status = value;
      render();
    }
  );

  renderChips(
    els.levelFilters,
    ["全部", "基础", "中等", "提高"],
    state.filters.level,
    (value) => {
      state.filters.level = value;
      render();
    }
  );
}

function selectTreeItem(activeId = "") {
  if (activeId) state.activeId = activeId;
  render();
}

function renderKnowledgeTree(items) {
  const subjects = groupByStructure(items);
  const total = items.length;

  if (!total) {
    els.knowledgeTree.innerHTML = `<div class="tree-empty">没有匹配的知识点</div>`;
    return;
  }

  const subjectBlocks = [...subjects.entries()]
    .map(([subjectName, modules]) => {
      const subjectItems = [...modules.values()].flatMap((units) => [...units.values()].flat());
      const moduleBlocks = [...modules.entries()]
        .map(([moduleName, units]) => {
          const moduleItems = [...units.values()].flat();
          const unitBlocks = [...units.entries()]
            .map(([unitName, topicItems]) => {
              const itemButtons = topicItems
                .map(
                  (item) => `
                    <button
                      class="tree-node tree-topic${item.id === state.activeId ? " active" : ""}"
                      type="button"
                      data-tree-id="${escapeHtml(item.id)}"
                      title="${escapeHtml(item.name)}"
                    >
                      <span class="status-dot ${statusClass(item.status)}"></span>
                      <span>${escapeHtml(item.name)}</span>
                    </button>
                  `
                )
                .join("");

              return `
                <details class="tree-unit" open>
                  <summary class="tree-summary tree-unit-name">
                    <span>${escapeHtml(unitName)}</span>
                    <span class="tree-count">${topicItems.length}</span>
                  </summary>
                  <div class="tree-children">${itemButtons}</div>
                </details>
              `;
            })
            .join("");

          return `
            <details class="tree-module" open>
              <summary class="tree-summary tree-module-name">
                <span>${escapeHtml(moduleName)}</span>
                <span class="tree-count">${moduleItems.length}</span>
              </summary>
              <div class="tree-module-inner">${unitBlocks}</div>
            </details>
          `;
        })
        .join("");

      return `
        <details class="tree-subject" open>
          <summary class="tree-summary tree-subject-name">
            <span>${escapeHtml(subjectName)}</span>
            <span class="tree-count">${subjectItems.length}</span>
          </summary>
          <div class="tree-children">${moduleBlocks}</div>
        </details>
      `;
    })
    .join("");

  els.knowledgeTree.innerHTML = `
    <button class="tree-root" type="button" data-tree-root="true">
      <span>全部匹配</span>
      <span class="tree-count">${total}</span>
    </button>
    ${subjectBlocks}
  `;

  els.knowledgeTree.querySelector("[data-tree-root]").addEventListener("click", () => {
    selectTreeItem(items[0]?.id || "");
  });

  els.knowledgeTree.querySelectorAll("[data-tree-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectTreeItem(button.dataset.treeId);
    });
  });
}

function renderDetail(items) {
  const active = items.find((item) => item.id === state.activeId) || items[0];
  if (!active) {
    els.detailView.innerHTML = `<div class="empty-state">左侧没有匹配的知识点</div>`;
    return;
  }

  state.activeId = active.id;
  const prereqItems = (active.prerequisites || [])
    .map((id) => state.items.find((item) => item.id === id))
    .filter(Boolean);

  els.detailView.innerHTML = `
    <div class="detail-head">
      <div>
        <h3>${escapeHtml(active.name)}</h3>
        <div class="detail-meta">
          <span class="tag">${escapeHtml(active.subject || "数学")}</span>
          <span class="tag">${escapeHtml(active.module)}</span>
          <span class="tag">${escapeHtml(active.unit)}</span>
          <span class="tag ${statusClass(active.status)}">${escapeHtml(active.status)}</span>
          <span class="tag">${escapeHtml(active.level)}</span>
          ${active.reviewDate ? `<span class="tag">复查 ${escapeHtml(active.reviewDate)}</span>` : ""}
        </div>
      </div>
      <button class="button secondary" id="editActiveBtn" type="button">编辑</button>
    </div>

    <section class="detail-section">
      <h4>讲解</h4>
      <p>${escapeHtml(active.explanation)}</p>
    </section>

    <section class="detail-section">
      <h4>推荐视频</h4>
      ${renderRecommendedVideos(active.recommendedVideos)}
    </section>

    <section class="detail-section">
      <h4>必会结论</h4>
      ${renderList(active.keyPoints)}
    </section>

    <section class="detail-section">
      <h4>常见错误</h4>
      ${renderList(active.pitfalls)}
    </section>

    <section class="detail-section">
      <h4>前置知识点</h4>
      ${renderPrerequisites(prereqItems)}
    </section>

    <section class="detail-section">
      <h4>典型例题</h4>
      ${renderExamples(active.examples)}
    </section>
  `;

  document.querySelector("#editActiveBtn").addEventListener("click", () => openEditor(active));
  document.querySelectorAll("[data-prereq-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = state.items.find((entry) => entry.id === button.dataset.prereqId);
      if (!item) return;
      state.filters.query = "";
      els.searchInput.value = "";
      state.filters.status = "全部";
      state.filters.level = "全部";
      selectTreeItem(item.id);
    });
  });
}

function renderList(items = []) {
  if (!items.length) return `<p>暂未记录</p>`;
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderRecommendedVideos(videos = []) {
  if (!videos.length) return `<p>暂未记录</p>`;
  return `
    <div class="video-list">
      ${videos
        .map(
          (video) => `
            <a class="video-link" href="${escapeHtml(video.url)}" target="_blank" rel="noopener noreferrer">
              <strong>${escapeHtml(video.title)}</strong>
              <span>${escapeHtml(video.reason)}</span>
            </a>
          `
        )
        .join("")}
    </div>
  `;
}

function renderPrerequisites(items) {
  if (!items.length) return `<p>暂无前置知识点</p>`;
  return `
    <div class="prereq-list">
      ${items
        .map(
          (item) =>
            `<button type="button" data-prereq-id="${escapeHtml(item.id)}">${escapeHtml(
              item.name
            )}</button>`
        )
        .join("")}
    </div>
  `;
}

function renderExamples(examples = []) {
  if (!examples.length) return `<p>暂未记录</p>`;
  return examples
    .map(
      (example) => `
        <div class="example">
          <strong>${escapeHtml(example.question || "例题")}</strong>
          <p>${escapeHtml(example.solution || "暂未记录解法")}</p>
        </div>
      `
    )
    .join("");
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderTitle(items) {
  els.pageTitle.textContent = `知识点详情 · ${items.length} 项匹配`;
}

function render() {
  const items = filteredItems();
  if (items.length && !items.some((item) => item.id === state.activeId)) {
    state.activeId = items[0].id;
  }
  renderFilters();
  renderKnowledgeTree(items);
  renderTitle(items);
  renderDetail(items);
}

function openEditor(item = null) {
  const isEditing = Boolean(item);
  els.dialogTitle.textContent = isEditing ? "编辑知识点" : "新增知识点";
  els.deleteBtn.hidden = !isEditing;
  els.idField.value = item?.id || "";
  els.nameField.value = item?.name || "";
  els.moduleField.value = item?.module || "";
  els.unitField.value = item?.unit || "";
  els.levelField.value = item?.level || "基础";
  els.statusField.value = item?.status || "未掌握";
  els.reviewDateField.value = item?.reviewDate || "";
  els.prereqField.value = (item?.prerequisites || []).join(",");
  els.explanationField.value = item?.explanation || "";
  els.keyPointsField.value = (item?.keyPoints || []).join("\n");
  els.pitfallsField.value = (item?.pitfalls || []).join("\n");
  els.examplesField.value = examplesToText(item?.examples || []);
  els.dialog.showModal();
}

function readForm() {
  const name = els.nameField.value.trim();
  const id = els.idField.value || makeId(name);
  return {
    id,
    subject: "数学",
    name,
    module: els.moduleField.value.trim(),
    unit: els.unitField.value.trim(),
    level: els.levelField.value,
    status: els.statusField.value,
    reviewDate: els.reviewDateField.value,
    prerequisites: els.prereqField.value
      .split(",")
      .map((idValue) => idValue.trim())
      .filter(Boolean),
    explanation: els.explanationField.value.trim(),
    keyPoints: splitLines(els.keyPointsField.value),
    pitfalls: splitLines(els.pitfallsField.value),
    examples: parseExamples(els.examplesField.value)
  };
}

function saveFromForm() {
  const nextItem = readForm();
  const index = state.items.findIndex((item) => item.id === nextItem.id);
  if (index >= 0) {
    if (state.items[index].recommendedVideos) {
      nextItem.recommendedVideos = state.items[index].recommendedVideos;
    }
    state.items[index] = nextItem;
  } else {
    state.items.unshift(nextItem);
  }
  state.activeId = nextItem.id;
  saveItems();
  render();
  markLocalChanged();
}

function deleteActive() {
  const id = els.idField.value;
  if (!id) return;
  const item = state.items.find((entry) => entry.id === id);
  if (!item) return;

  const confirmed = window.confirm(`确认删除“${item.name}”？`);
  if (!confirmed) return;

  state.items = state.items
    .filter((entry) => entry.id !== id)
    .map((entry) => ({
      ...entry,
      prerequisites: (entry.prerequisites || []).filter((prereqId) => prereqId !== id)
    }));
  state.activeId = state.items[0]?.id || "";
  saveItems();
  els.dialog.close();
  render();
  markLocalChanged();
}

function resetData() {
  const confirmed = window.confirm("确认恢复样例数据？当前浏览器里的修改会被覆盖。");
  if (!confirmed) return;
  state.items = cloneSeed();
  state.activeId = state.items[0]?.id || "";
  saveItems();
  render();
  markLocalChanged();
}

els.searchInput.addEventListener("input", (event) => {
  state.filters.query = event.target.value;
  render();
});

els.tokenInput.value = sessionStorage.getItem(TOKEN_KEY) || "";
els.tokenInput.addEventListener("input", () => {
  sessionStorage.setItem(TOKEN_KEY, getToken());
});

els.loadSharedBtn.addEventListener("click", () => loadSharedData());
els.saveSharedBtn.addEventListener("click", saveSharedData);
els.addBtn.addEventListener("click", () => openEditor());
els.resetBtn.addEventListener("click", resetData);
els.deleteBtn.addEventListener("click", deleteActive);

els.form.addEventListener("submit", (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  saveFromForm();
  els.dialog.close();
});

async function init() {
  state.items = loadItems();
  state.activeId = state.items[0]?.id || "";
  render();
  await loadSharedData({ showSuccess: false });
}

init();
