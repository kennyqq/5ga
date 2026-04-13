import type {
  BusinessType,
  Level,
  MetricKey,
  ScenarioId,
  UserType,
} from "./demoConfig";

export type StoryStageId =
  | "breakpoint"
  | "risk"
  | "ignite"
  | "rebuild"
  | "operate"
  | "value";

export type PhoneMessage = {
  role: "assistant" | "user" | "system";
  text: string;
};

export type StoryStage = {
  id: StoryStageId;
  label: string;
  shortLabel: string;
  icon:
    | "signal"
    | "alert"
    | "bot"
    | "route"
    | "radar"
    | "sparkles";
  stageTag: string;
  heroTitle: string;
  heroBody: string;
  featureTitle: string;
  featureBody: string;
  compareMetric: MetricKey;
  compareBeforeLabel: string;
  compareAfterLabel: string;
  compareInsight: string;
  beforeTitle: string;
  beforePoints: string[];
  afterTitle: string;
  afterPoints: string[];
  profileNote: string;
  tags: string[];
  phoneMessages: PhoneMessage[];
  quickReplies: string[];
  inputHint: string;
  scenarioId: ScenarioId;
  stationDensity: Level;
  load: Level;
  interference: Level;
  userType: UserType;
  businessType: BusinessType;
  boardEnabled: boolean;
  collaborationEnabled: boolean;
};

export const brandMeta = {
  name: "小智 XiaoZhi",
  subtitle: "中国移动 · 700M × 5G-A 智能协同助手",
  phoneSubtitle: "在线 · 连续体验守护中",
};

export const storyStages: StoryStage[] = [
  {
    id: "breakpoint",
    label: "体验断点",
    shortLabel: "体验断点",
    icon: "signal",
    stageTag: "Stage 01 / Breakpoint",
    heroTitle: "先让客户看到，用户是在哪里掉下去的。",
    heroBody:
      "不先把体验断点放到终端用户眼前，700M 和无线智能板就永远像后台能力名词。",
    featureTitle: "连续体验底座",
    featureBody: "VIP 用户刚进入商圈楼宇，AI 助手与视频会议开始变慢。",
    compareMetric: "latency",
    compareBeforeLabel: "传统网络",
    compareAfterLabel: "智协同",
    compareInsight: "楼宇边缘 AI 响应明显回稳",
    beforeTitle: "传统方式",
    beforePoints: [
      "进楼瞬间出现体验跳变",
      "AI 问答先慢下来",
      "客户只会感知到网络不稳",
    ],
    afterTitle: "小智方式",
    afterPoints: [
      "先识别高价值用户",
      "先稳住连续连接",
      "让客户感知到持续在线",
    ],
    profileNote: "商圈中的 VIP 商务用户",
    tags: ["VIP", "AI 办公", "楼宇边缘"],
    phoneMessages: [
      { role: "assistant", text: "你好，我是小智，检测到你刚进入楼宇边缘。" },
      { role: "user", text: "我在做 AI 会议纪要，别卡。" },
      { role: "system", text: "连续覆盖波动 · AI 响应抬升" },
      { role: "assistant", text: "当前 700M 仍在被动兜底，体验连续性存在断点。" },
    ],
    quickReplies: ["继续分析", "看看原因"],
    inputHint: "输入：为什么会慢？",
    scenarioId: "district",
    stationDensity: "medium",
    load: "medium",
    interference: "medium",
    userType: "vip",
    businessType: "ai",
    boardEnabled: false,
    collaborationEnabled: false,
  },
  {
    id: "risk",
    label: "风险放大",
    shortLabel: "风险放大",
    icon: "alert",
    stageTag: "Stage 02 / Risk",
    heroTitle: "不只是稍微差一点，而是最值钱的业务先失稳。",
    heroBody:
      "当高并发、VIP、上行业务叠加时，没有智能协同的 700M 加密会把风险推到台前。",
    featureTitle: "高价值业务风险",
    featureBody: "场馆入口高并发时，直播与分享业务对上行稳定性最敏感。",
    compareMetric: "uplink",
    compareBeforeLabel: "传统网络",
    compareAfterLabel: "智协同",
    compareInsight: "VIP 直播上行从红区拉回安全区",
    beforeTitle: "不作为代价",
    beforePoints: [
      "VIP 保障失稳",
      "700M / 2.6G 承接失衡",
      "重传风险快速抬升",
    ],
    afterTitle: "客户会记住",
    afterPoints: [
      "风险被看见了",
      "协同的必要性被放大了",
      "投资收益和 SLA 被连在一起",
    ],
    profileNote: "场馆中的 VIP 观演用户",
    tags: ["VIP", "上行直播", "高并发"],
    phoneMessages: [
      { role: "assistant", text: "当前处于场馆入口高压时刻，上行直播需求正在快速抬升。" },
      { role: "user", text: "我的直播怎么突然红了？" },
      { role: "system", text: "VIP 保障失稳 · 承接路径拥塞" },
      { role: "assistant", text: "如果只有加密没有协同，风险会先出现在最值钱的业务上。" },
    ],
    quickReplies: ["先稳直播", "继续排查"],
    inputHint: "输入：现在问题在哪？",
    scenarioId: "venue",
    stationDensity: "high",
    load: "high",
    interference: "high",
    userType: "vip",
    businessType: "uplink",
    boardEnabled: false,
    collaborationEnabled: false,
  },
  {
    id: "ignite",
    label: "智能介入",
    shortLabel: "智能介入",
    icon: "bot",
    stageTag: "Stage 03 / Ignite",
    heroTitle: "无线智能板的第一价值，不是增强，而是先看懂人和业务。",
    heroBody:
      "一旦网络知道这是 AI 重度用户、低时延场景、楼宇边缘位置，后面的承接决策才有意义。",
    featureTitle: "业务理解开始生效",
    featureBody: "智能板先识别用户价值、业务类型和区域热度，再触发策略。",
    compareMetric: "coordination",
    compareBeforeLabel: "仅靠无线参数",
    compareAfterLabel: "理解业务后",
    compareInsight: "先识别，再决策",
    beforeTitle: "没看懂之前",
    beforePoints: [
      "不知道谁更值得保障",
      "不知道业务对什么最敏感",
      "地图和策略还是脱节的",
    ],
    afterTitle: "看懂之后",
    afterPoints: [
      "知道这是 AI 重度用户",
      "知道这里是高价值热区",
      "知道该优先稳住什么",
    ],
    profileNote: "楼宇里的 AI 重度用户",
    tags: ["AI 重度", "高价值热区", "时延敏感"],
    phoneMessages: [
      { role: "assistant", text: "已识别：AI 重度用户、楼宇边缘、低时延敏感业务。" },
      { role: "user", text: "那你先帮我稳住。" },
      { role: "system", text: "无线智能板已介入" },
      { role: "assistant", text: "开始按用户价值、业务类型和区域热度生成承接决策。" },
    ],
    quickReplies: ["开始优化", "看下动作"],
    inputHint: "输入：你准备怎么做？",
    scenarioId: "district",
    stationDensity: "medium",
    load: "high",
    interference: "high",
    userType: "ai",
    businessType: "ai",
    boardEnabled: true,
    collaborationEnabled: false,
  },
  {
    id: "rebuild",
    label: "协同重构",
    shortLabel: "协同重构",
    icon: "route",
    stageTag: "Stage 04 / Rebuild",
    heroTitle: "真正的变化，是 700M 和 2.6G 被重新分工。",
    heroBody:
      "700M 不再只是兜底，2.6G 也不再只是被动扛流量，协同路径被按体验目标重新组织。",
    featureTitle: "承接路径被改写",
    featureBody: "高移动场景下，700M 锁住连续底座，2.6G 接住高吞吐需求。",
    compareMetric: "coverage",
    compareBeforeLabel: "连续性断裂",
    compareAfterLabel: "连续性恢复",
    compareInsight: "从峰值叙事回到连续体验叙事",
    beforeTitle: "旧承接方式",
    beforePoints: [
      "700M 被动兜底",
      "2.6G 被动抗压",
      "移动中容易错误驻留",
    ],
    afterTitle: "新承接方式",
    afterPoints: [
      "700M 托底连续连接",
      "2.6G 接力高吞吐业务",
      "切换过程更稳定",
    ],
    profileNote: "交通场景中的移动办公用户",
    tags: ["移动办公", "高移动性", "频间切换"],
    phoneMessages: [
      { role: "assistant", text: "已将 700M 切为连续底座，2.6G 接管高吞吐承载。" },
      { role: "user", text: "我在移动中也别断。" },
      { role: "system", text: "驻留路径已重构" },
      { role: "assistant", text: "频间错误驻留下降，连续体验正在恢复。" },
    ],
    quickReplies: ["继续前进", "看下结果"],
    inputHint: "输入：现在稳定了吗？",
    scenarioId: "corridor",
    stationDensity: "high",
    load: "medium",
    interference: "medium",
    userType: "vip",
    businessType: "meeting",
    boardEnabled: true,
    collaborationEnabled: true,
  },
  {
    id: "operate",
    label: "闭环回灌",
    shortLabel: "闭环回灌",
    icon: "radar",
    stageTag: "Stage 05 / Operate",
    heroTitle: "这不是一次性优化，而是会自己持续变准的网络。",
    heroBody:
      "问题定界、规划回灌、效果验证放进同一条链路里，客户才能相信这套能力可持续。",
    featureTitle: "运维闭环启动",
    featureBody: "投诉和热区不再分散在多个系统里，而是回到同一张体验地图。",
    compareMetric: "closure",
    compareBeforeLabel: "传统处置",
    compareAfterLabel: "闭环处置",
    compareInsight: "从被动排障变成主动回灌",
    beforeTitle: "过去的问题处理",
    beforePoints: [
      "投诉定界慢",
      "优化动作难验证",
      "规划和运维彼此断开",
    ],
    afterTitle: "现在的闭环动作",
    afterPoints: [
      "问题直达区域与频层",
      "动作直达规划与策略",
      "效果可以回看和复用",
    ],
    profileNote: "校园里的 AI 学习用户",
    tags: ["AI 学习", "室内外切换", "规划回灌"],
    phoneMessages: [
      { role: "assistant", text: "我已把体验异常回灌为规划与运维任务。" },
      { role: "user", text: "以后类似问题还会再发生吗？" },
      { role: "system", text: "投诉定界 + 规划回灌" },
      { role: "assistant", text: "后续会持续修正热区、弱覆盖和承接策略。" },
    ],
    quickReplies: ["看闭环记录", "继续总结"],
    inputHint: "输入：还有没有后续动作？",
    scenarioId: "campus",
    stationDensity: "high",
    load: "medium",
    interference: "medium",
    userType: "ai",
    businessType: "hybrid",
    boardEnabled: true,
    collaborationEnabled: true,
  },
  {
    id: "value",
    label: "价值定格",
    shortLabel: "价值定格",
    icon: "sparkles",
    stageTag: "Stage 06 / Value",
    heroTitle: "最后留给客户的，不是参数，而是四句能带走的话。",
    heroBody:
      "故事收口时要像参考页一样干净，直接把 700M、智能板、体验价值和闭环资产定格下来。",
    featureTitle: "最终记忆点",
    featureBody: "700M 不再是补覆盖，智能板也不再是单点工具。",
    compareMetric: "coverage",
    compareBeforeLabel: "补覆盖叙事",
    compareAfterLabel: "体验底座叙事",
    compareInsight: "从单点能力走向经营资产",
    beforeTitle: "客户过去容易记成",
    beforePoints: [
      "700M 只是低频补点",
      "智能板只是一个工具",
      "优化只改善几个指标",
    ],
    afterTitle: "现在客户应该记住",
    afterPoints: [
      "700M 是连续体验底座",
      "智能板是智能协同中枢",
      "这是端到端经营能力",
    ],
    profileNote: "高层汇报中的目标客户",
    tags: ["高层汇报", "显标价值", "经营能力"],
    phoneMessages: [
      { role: "assistant", text: "现在你看到的不是单点优化，而是一套可以复制的经营能力。" },
      { role: "user", text: "所以 700M 不只是补覆盖？" },
      { role: "system", text: "价值收口完成" },
      { role: "assistant", text: "对，它已经变成 5G-A 连续体验和高价值保障的智能协同底座。" },
    ],
    quickReplies: ["回到开头", "重播一遍"],
    inputHint: "输入：最后一句话是什么？",
    scenarioId: "district",
    stationDensity: "high",
    load: "medium",
    interference: "medium",
    userType: "vip",
    businessType: "ai",
    boardEnabled: true,
    collaborationEnabled: true,
  },
];
