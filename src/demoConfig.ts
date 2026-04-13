export type ModeId = "executive" | "expo" | "expert";
export type ScenarioId = "district" | "venue" | "campus" | "corridor";
export type PageId =
  | "overview"
  | "planning"
  | "mechanism"
  | "operations"
  | "summary";
export type OverlayId = "business" | "coverage" | "interference" | "traffic";
export type PresetId = "planning" | "coordination" | "assurance" | "operations";
export type CapabilityId =
  | "business"
  | "network"
  | "coordination"
  | "closedLoop";
export type Level = "low" | "medium" | "high";
export type UserType = "normal" | "vip" | "ai";
export type BusinessType = "ai" | "meeting" | "uplink" | "video" | "hybrid";
export type MetricKey =
  | "coverage"
  | "latency"
  | "uplink"
  | "coordination"
  | "closure";

export type MetricConfig = {
  key: MetricKey;
  title: string;
  unit: string;
  threshold: number;
  better: "up" | "down";
  description: string;
};

export type Hotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  overlay: OverlayId;
  priority: "core" | "support";
};

export type Scenario = {
  id: ScenarioId;
  title: string;
  shortTitle: string;
  tagline: string;
  audienceHook: string;
  narrative: string;
  mobilityStory: string;
  heroLabel: string;
  valueHeadline: string;
  riskHeadline: string;
  closeCopy: string;
  baseMetrics: Record<MetricKey, number>;
  valueBullets: string[];
  businessOutcomes: string[];
  costOfInaction: string[];
  abilityFocus: CapabilityId[];
  hotspots: Hotspot[];
  buildings: { x: number; y: number; w: number; h: number; label: string }[];
};

export const modes = {
  executive: {
    id: "executive" as ModeId,
    label: "高层模式",
    summary: "突出显标、价值和不作为代价。",
    closeLine: "让 700M 从补覆盖走向 5G-A 智能协同底座",
  },
  expo: {
    id: "expo" as ModeId,
    label: "展会模式",
    summary: "30 秒高光路径，强调记忆点。",
    closeLine: "让 5G-A 从可见走向可感、可运营",
  },
  expert: {
    id: "expert" as ModeId,
    label: "专家模式",
    summary: "展示承接机制、图层逻辑和闭环。",
    closeLine: "把规划、协同、保障、运维放进同一张沙盘",
  },
};

export const pages = [
  { id: "overview" as PageId, label: "主舞台" },
  { id: "planning" as PageId, label: "规划视角" },
  { id: "mechanism" as PageId, label: "协同机制" },
  { id: "operations" as PageId, label: "运维闭环" },
  { id: "summary" as PageId, label: "价值收口" },
];

export const overlayMeta: Record<
  OverlayId,
  { label: string; summary: string }
> = {
  business: { label: "业务感知", summary: "AI 热区、VIP 热区、上行敏感区" },
  coverage: { label: "覆盖", summary: "连续覆盖、深覆盖薄弱点、移动连续性" },
  interference: { label: "干扰", summary: "重叠覆盖、承接失衡、重传风险" },
  traffic: { label: "话务", summary: "高负载区、拥塞热点、承接压力" },
};

export const presets = {
  planning: {
    id: "planning" as PresetId,
    label: "规划视角",
    overlays: ["business", "coverage"] as OverlayId[],
    summary: "先看业务，再决定 700M 加密去哪里最值钱。",
  },
  coordination: {
    id: "coordination" as PresetId,
    label: "协同视角",
    overlays: ["coverage", "traffic", "interference"] as OverlayId[],
    summary: "看 700M 与 2.6G 如何分层承接。",
  },
  assurance: {
    id: "assurance" as PresetId,
    label: "保障视角",
    overlays: ["business", "coverage", "traffic"] as OverlayId[],
    summary: "聚焦 VIP 与 AI 业务的体验连续性。",
  },
  operations: {
    id: "operations" as PresetId,
    label: "运维视角",
    overlays: ["interference", "traffic", "coverage"] as OverlayId[],
    summary: "把投诉、根因和优化动作串成闭环。",
  },
};

export const capabilities = {
  business: {
    id: "business" as CapabilityId,
    title: "业务理解",
    value: "识别 AI、VIP、上下行敏感业务，知道谁更值得保障。",
    details: [
      "区分 AI 问答、视频会议、上行直播等业务特征。",
      "将 VIP 与高价值区域映射成保障优先级。",
      "把业务感知地图直接连接到 700M 加密策略。",
    ],
  },
  network: {
    id: "network" as CapabilityId,
    title: "网络理解",
    value: "同步看懂 700M / 2.6G 的覆盖、负载、干扰与驻留。",
    details: [
      "识别弱覆盖洼地、频层重叠区和承接失衡位置。",
      "理解高并发、室内外切换和高移动性对体验的影响。",
      "把复杂网络状态翻译成高层也能看懂的语言。",
    ],
  },
  coordination: {
    id: "coordination" as CapabilityId,
    title: "协同决策",
    value: "根据业务、负载和无线条件，动态重构 700M 与 2.6G 承接。",
    details: [
      "在连续覆盖和高吞吐承载之间做业务级动态分配。",
      "在干扰高发场景下降低重传与错误驻留。",
      "让 700M 从被动兜底变成高价值场景的主动底座。",
    ],
  },
  closedLoop: {
    id: "closedLoop" as CapabilityId,
    title: "闭环优化",
    value: "从质差发现到规划回灌形成全生命周期闭环。",
    details: [
      "快速定界 VIP 投诉对应的区域、频层与根因。",
      "把优化建议直接回灌到加密规划和策略调整。",
      "让规划、保障、运维形成一套连续动作。",
    ],
  },
};

export const metrics: MetricConfig[] = [
  {
    key: "coverage",
    title: "连续覆盖率",
    unit: "%",
    threshold: 88,
    better: "up",
    description: "高价值区域中的连续可用覆盖水平",
  },
  {
    key: "latency",
    title: "AI 时延 P95",
    unit: "ms",
    threshold: 65,
    better: "down",
    description: "AI 与会议协同等敏感业务的时延稳定性",
  },
  {
    key: "uplink",
    title: "上行稳定性",
    unit: "%",
    threshold: 92,
    better: "up",
    description: "直播、会议上传、AI 多模态上行的连续度",
  },
  {
    key: "coordination",
    title: "频层协同效率",
    unit: "%",
    threshold: 86,
    better: "up",
    description: "700M 与 2.6G 的智能承接效率",
  },
  {
    key: "closure",
    title: "闭环处置时长",
    unit: "min",
    threshold: 40,
    better: "down",
    description: "从问题定界到优化建议输出的平均时间",
  },
];

export const scenarios: Record<ScenarioId, Scenario> = {
  district: {
    id: "district",
    title: "城区高价值商圈",
    shortTitle: "商圈",
    tagline: "商务用户穿越楼宇群，持续调用 AI 助手与视频会议。",
    audienceHook: "最容易解释高价值体验与 ROI 的场景。",
    narrative:
      "700M 负责拉平连续体验底座，2.6G 负责吞吐承接，无线智能板决定谁该驻留、何时分流、何处补强。",
    mobilityStory:
      "VIP 商务用户从街区进入楼宇再到会议室，AI 响应与视频稳定性不能在门口掉线。",
    heroLabel: "VIP 商务用户",
    valueHeadline: "从楼宇边缘掉体验，走向 AI 业务稳定在线。",
    riskHeadline: "商圈里如果只做 700M 加密而不做智能协同，ROI 与 SLA 风险会同时暴露。",
    closeCopy: "让商圈中的 700M 从补覆盖底牌升级为高价值业务协同底座。",
    baseMetrics: { coverage: 84, latency: 78, uplink: 86, coordination: 73, closure: 82 },
    valueBullets: [
      "覆盖断续变成街区级连续体验",
      "AI 问答与会议业务时延更稳",
      "700M 从兜底驻留转向主动承接高价值区域",
    ],
    businessOutcomes: [
      "高价值用户体验更可经营",
      "5G-A 显标不再只靠热点测速",
      "网络投资更精准命中高价值楼宇",
    ],
    costOfInaction: [
      "VIP 会议业务在楼宇边缘抖动放大",
      "700M 与 2.6G 承接失衡，投资收益被稀释",
      "高价值场景投诉难以快速闭环",
    ],
    abilityFocus: ["business", "network", "coordination", "closedLoop"],
    hotspots: [
      { id: "d1", label: "AI 办公网格", x: 22, y: 24, size: 18, overlay: "business", priority: "core" },
      { id: "d2", label: "深覆盖盲点", x: 58, y: 44, size: 16, overlay: "coverage", priority: "core" },
      { id: "d3", label: "重叠干扰区", x: 71, y: 32, size: 14, overlay: "interference", priority: "support" },
      { id: "d4", label: "会议高峰压力", x: 41, y: 68, size: 20, overlay: "traffic", priority: "core" },
    ],
    buildings: [
      { x: 12, y: 12, w: 12, h: 22, label: "楼宇 A" },
      { x: 28, y: 22, w: 10, h: 18, label: "楼宇 B" },
      { x: 46, y: 18, w: 12, h: 28, label: "楼宇 C" },
      { x: 64, y: 16, w: 11, h: 20, label: "楼宇 D" },
      { x: 74, y: 48, w: 10, h: 18, label: "园区入口" },
    ],
  },
  venue: {
    id: "venue",
    title: "大型场馆 / 演唱会",
    shortTitle: "场馆",
    tagline: "高并发瞬时波动，直播、视频分享和 VIP 保障同时发生。",
    audienceHook: "最适合展会快闪演示的强冲突场景。",
    narrative:
      "场馆边缘和入口由 700M 拉住连续连接，2.6G 承担爆发流量，无线智能板负责把 VIP、媒体、直播和普通用户区分开来。",
    mobilityStory:
      "观众从检票口到看台再到场馆边缘，网络负载瞬时波动，直播与分享业务对上行稳定性极为敏感。",
    heroLabel: "VIP 观演用户",
    valueHeadline: "在高并发场景下，先稳住连接，再谈峰值能力。",
    riskHeadline: "没有智能协同的 700M 加密会让高并发下的承接失衡更快暴露。",
    closeCopy: "让场馆里的 5G-A 不只是峰值好看，而是关键用户一直可用。",
    baseMetrics: { coverage: 81, latency: 96, uplink: 78, coordination: 69, closure: 96 },
    valueBullets: [
      "场馆边缘连续连接不丢失",
      "直播上行与 VIP 保障可以共存",
      "频层承接压力从失衡走向可控",
    ],
    businessOutcomes: [
      "最能体现视觉冲击与风险代价",
      "高价值用户与媒体保障可以包装为差异化能力",
      "减少峰值场景下的投诉与被动兜底",
    ],
    costOfInaction: [
      "入口区重传抬升，VIP 体验优先级失效",
      "上行直播业务出现红色抖动与中断风险",
      "700M 被迫低效兜底，2.6G 负载压力过载",
    ],
    abilityFocus: ["network", "coordination", "business", "closedLoop"],
    hotspots: [
      { id: "v1", label: "看台直播热区", x: 27, y: 42, size: 22, overlay: "traffic", priority: "core" },
      { id: "v2", label: "检票口弱覆盖", x: 62, y: 60, size: 18, overlay: "coverage", priority: "core" },
      { id: "v3", label: "媒体上行区", x: 70, y: 28, size: 14, overlay: "business", priority: "support" },
      { id: "v4", label: "重叠干扰扇区", x: 44, y: 25, size: 18, overlay: "interference", priority: "core" },
    ],
    buildings: [
      { x: 18, y: 26, w: 52, h: 40, label: "场馆主体" },
      { x: 8, y: 54, w: 10, h: 12, label: "检票口" },
      { x: 74, y: 22, w: 10, h: 14, label: "媒体区" },
      { x: 76, y: 56, w: 10, h: 12, label: "外场" },
    ],
  },
  campus: {
    id: "campus",
    title: "校园 / 园区 / 教学楼",
    shortTitle: "校园",
    tagline: "室内外切换频繁，AI 学习与视频业务并存，热区清晰。",
    audienceHook: "适合讲按业务价值做加密，而不是盲目补点。",
    narrative:
      "无线智能板把教学楼、实验区、宿舍与广场的业务热度映射到一张图上，指导 700M 投资命中真正有价值的区域。",
    mobilityStory:
      "学生从教学楼到图书馆再到广场，AI 学习、多媒体内容与社交流量交织，室内外承接切换频繁。",
    heroLabel: "AI 重度用户",
    valueHeadline: "让地图先看懂业务，再驱动 700M 精准投入。",
    riskHeadline: "没有业务感知的加密，会把有限投资分散到低价值区域。",
    closeCopy: "让校园里的 700M 加密从经验式决策走向业务级精准规划。",
    baseMetrics: { coverage: 83, latency: 74, uplink: 84, coordination: 76, closure: 75 },
    valueBullets: [
      "按业务热区优化站点与承接策略",
      "教学楼和园区边缘的体验更连续",
      "规划命中率和投资解释力更强",
    ],
    businessOutcomes: [
      "更容易对规划、优化和市场部门同时讲清楚",
      "ROI 叙事从覆盖投资变成高价值体验投资",
      "形成可复制的场景化案例模板",
    ],
    costOfInaction: [
      "加密点位与真实热区错位，投资命中率偏低",
      "弱覆盖问题在室内外切换时被放大",
      "高价值楼宇体验提升不明显，价值链难闭环",
    ],
    abilityFocus: ["business", "closedLoop", "network", "coordination"],
    hotspots: [
      { id: "c1", label: "教学楼 AI 热区", x: 32, y: 28, size: 18, overlay: "business", priority: "core" },
      { id: "c2", label: "广场高并发", x: 57, y: 56, size: 16, overlay: "traffic", priority: "support" },
      { id: "c3", label: "楼宇弱覆盖", x: 46, y: 38, size: 18, overlay: "coverage", priority: "core" },
      { id: "c4", label: "实验区失衡", x: 73, y: 30, size: 16, overlay: "interference", priority: "support" },
    ],
    buildings: [
      { x: 20, y: 18, w: 14, h: 24, label: "教学楼" },
      { x: 38, y: 24, w: 14, h: 20, label: "图书馆" },
      { x: 58, y: 18, w: 18, h: 18, label: "实验区" },
      { x: 26, y: 56, w: 18, h: 12, label: "宿舍区" },
      { x: 52, y: 54, w: 20, h: 14, label: "中心广场" },
    ],
  },
  corridor: {
    id: "corridor",
    title: "交通走廊 / 地铁口 / 道路移动场景",
    shortTitle: "交通",
    tagline: "高移动性与频间切换并存，连续可用比单点峰值更关键。",
    audienceHook: "适合讲 5G-A 不只是峰值速率，而是连续体验。",
    narrative:
      "700M 把地铁口、出站道路和沿线走廊串成连续底座，2.6G 在高密度路段接力吞吐；无线智能板持续稳定频间承接。",
    mobilityStory:
      "用户从地铁口出站、步行到打车点再进入主干道，业务链路始终在移动，频间切换对体验连续性至关重要。",
    heroLabel: "移动办公用户",
    valueHeadline: "让连续体验成为 5G-A 的主叙事，而不是瞬时峰值。",
    riskHeadline: "当移动性提升而协同关闭时，错误驻留与切换风险会快速外溢。",
    closeCopy: "让交通走廊中的 700M 真正承担起连续体验底座角色。",
    baseMetrics: { coverage: 86, latency: 72, uplink: 82, coordination: 74, closure: 71 },
    valueBullets: [
      "移动连续性体验显著更稳",
      "频间切换更少错误驻留",
      "高移动性场景更容易形成 5G-A 显性价值",
    ],
    businessOutcomes: [
      "把连续覆盖、稳定时延和弱覆盖底座讲成完整方案",
      "更容易复制到道路、轨交与站厅场景",
      "补足高价值移动场景的体验经营故事",
    ],
    costOfInaction: [
      "地铁口与道路衔接区频繁切换导致体验断裂",
      "AI 与会议业务在移动中出现驻留抖动",
      "高移动性下的承接策略缺乏可解释性",
    ],
    abilityFocus: ["network", "coordination", "business", "closedLoop"],
    hotspots: [
      { id: "r1", label: "出站口高移动区", x: 20, y: 54, size: 18, overlay: "coverage", priority: "core" },
      { id: "r2", label: "主干道高话务", x: 50, y: 50, size: 20, overlay: "traffic", priority: "core" },
      { id: "r3", label: "切换敏感带", x: 38, y: 34, size: 14, overlay: "interference", priority: "support" },
      { id: "r4", label: "移动办公热区", x: 68, y: 22, size: 14, overlay: "business", priority: "support" },
    ],
    buildings: [
      { x: 10, y: 54, w: 16, h: 12, label: "地铁口" },
      { x: 30, y: 40, w: 14, h: 10, label: "换乘厅" },
      { x: 48, y: 44, w: 26, h: 10, label: "主干道" },
      { x: 72, y: 18, w: 14, h: 12, label: "办公楼" },
    ],
  },
};

export const playbooks = {
  executive: [
    { id: "exposure", label: "问题暴露", duration: 6000 },
    { id: "escalation", label: "风险放大", duration: 6000 },
    { id: "ignite", label: "能力点亮", duration: 4000 },
    { id: "reframe", label: "协同重构", duration: 8000 },
    { id: "close", label: "价值收口", duration: 6000 },
  ],
  expo: [
    { id: "exposure", label: "问题暴露", duration: 5000 },
    { id: "escalation", label: "风险放大", duration: 4000 },
    { id: "ignite", label: "能力点亮", duration: 3000 },
    { id: "reframe", label: "协同重构", duration: 5000 },
    { id: "close", label: "价值收口", duration: 5000 },
  ],
  expert: [
    { id: "exposure", label: "问题暴露", duration: 6000 },
    { id: "escalation", label: "风险放大", duration: 6000 },
    { id: "ignite", label: "能力点亮", duration: 5000 },
    { id: "reframe", label: "协同重构", duration: 8000 },
    { id: "close", label: "价值收口", duration: 5000 },
  ],
};

export const summaryStatements = [
  "700M 不只是补覆盖，而是 5G-A 连续体验底座。",
  "无线智能板不是单点特性工具，而是 700M 智能协同中枢。",
  "方案不只优化网络指标，更把用户体验变成可经营能力。",
  "从规划、协同、保障到运维，形成端到端闭环。",
];
