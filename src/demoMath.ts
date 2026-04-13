import {
  type BusinessType,
  type Level,
  metrics,
  type MetricKey,
  type OverlayId,
  presets,
  scenarios,
  type ScenarioId,
  type UserType,
} from "./demoConfig";

type SimulationInput = {
  scenarioId: ScenarioId;
  stationDensity: Level;
  load: Level;
  interference: Level;
  boardEnabled: boolean;
  collaborationEnabled: boolean;
  userType: UserType;
  businessType: BusinessType;
};

const levelOffset: Record<Level, number> = { low: -1, medium: 0, high: 1 };
const userWeight: Record<UserType, number> = { normal: 0, vip: 1, ai: 2 };
const businessWeight: Record<BusinessType, number> = {
  ai: 2,
  meeting: 1,
  uplink: 2,
  video: 1,
  hybrid: 2,
};

export function calculateSimulation(input: SimulationInput) {
  const scenario = scenarios[input.scenarioId];
  const density = levelOffset[input.stationDensity];
  const load = levelOffset[input.load];
  const interference = levelOffset[input.interference];
  const user = userWeight[input.userType];
  const business = businessWeight[input.businessType];

  const riskExposure =
    input.load === "high" &&
    (!input.boardEnabled || !input.collaborationEnabled) &&
    (input.userType !== "normal" ||
      input.businessType === "ai" ||
      input.businessType === "uplink" ||
      input.interference === "high");

  const missingBoardPenalty = input.boardEnabled ? 0 : 2;
  const missingCoordPenalty = input.collaborationEnabled ? 0 : 2;

  const before = {
    coverage: clampValue(
      scenario.baseMetrics.coverage +
        density * 2 -
        load * 3 -
        interference * 4 -
        user,
      62,
      97,
    ),
    latency: clampValue(
      scenario.baseMetrics.latency +
        load * 8 +
        interference * 10 +
        business * 4 -
        density * 3,
      38,
      160,
    ),
    uplink: clampValue(
      scenario.baseMetrics.uplink -
        load * 4 -
        interference * 5 -
        (input.businessType === "uplink" ? 6 : 0) +
        density * 2,
      55,
      99,
    ),
    coordination: clampValue(
      scenario.baseMetrics.coordination -
        load * 5 -
        interference * 6 -
        missingCoordPenalty * 6,
      48,
      98,
    ),
    closure: clampValue(
      scenario.baseMetrics.closure +
        load * 10 +
        interference * 8 +
        missingBoardPenalty * 8 +
        missingCoordPenalty * 8,
      24,
      160,
    ),
  };

  const boost = (input.boardEnabled ? 1.4 : 0) + (input.collaborationEnabled ? 1.8 : 0);
  const fullBoost = 1.4 + 1.8;
  const after = {
    coverage: clampValue(before.coverage + fullBoost * 5 + density * 2 + 2, 62, 99),
    latency: clampValue(before.latency - fullBoost * 12 - density * 2 - 3, 28, 160),
    uplink: clampValue(before.uplink + fullBoost * 6 + 2, 55, 99),
    coordination: clampValue(
      before.coordination + fullBoost * 9 + density * 2 + 3,
      48,
      99,
    ),
    closure: clampValue(before.closure - fullBoost * 14 - 4, 18, 160),
  };

  const current = input.boardEnabled && input.collaborationEnabled ? after : before;
  const statusTone = riskExposure
    ? "risk"
    : input.boardEnabled && input.collaborationEnabled
      ? "success"
      : "watch";

  const missingCapabilities = [
    !input.boardEnabled ? "缺少业务识别与问题定界" : null,
    !input.collaborationEnabled ? "缺少多频协同与资源联动" : null,
    input.interference === "high" && !input.collaborationEnabled
      ? "缺少干扰抑制与承接重构"
      : null,
  ].filter(Boolean) as string[];

  const riskLabels = riskExposure
    ? [
        input.userType === "vip" ? "VIP 业务保障失稳" : "高价值业务保障压力抬升",
        input.businessType === "ai"
          ? "AI 响应超过 SLA 基线"
          : "实时业务时延波动明显",
        "700M / 2.6G 承接失衡",
        input.interference === "high" ? "重传风险抬升" : "错误驻留率抬升",
      ]
    : input.boardEnabled && input.collaborationEnabled
      ? [
          "连续覆盖恢复到高价值区域",
          "业务驻留策略按体验目标自动重构",
          "投诉定界与规划回灌形成闭环",
        ]
      : ["当前仍处于过渡态，建议开启无线智能板与协同策略。"]; 

  const metricsWithDelta = metrics.map((metric) => {
    const beforeValue = before[metric.key];
    const afterValue = after[metric.key];
    const currentValue = current[metric.key];
    const delta =
      metric.better === "up"
        ? afterValue - beforeValue
        : beforeValue - afterValue;

    return {
      ...metric,
      before: roundMetric(metric.key, beforeValue),
      after: roundMetric(metric.key, afterValue),
      current: roundMetric(metric.key, currentValue),
      delta: roundMetric(metric.key, delta),
      thresholdBreached:
        metric.better === "up"
          ? currentValue < metric.threshold
          : currentValue > metric.threshold,
    };
  });

  const recommendedPreset = riskExposure
    ? presets.operations.id
    : input.boardEnabled && input.collaborationEnabled
      ? presets.coordination.id
      : presets.assurance.id;

  const signalStrength = clampValue(62 + density * 8 - interference * 6, 38, 92);
  const handoffBalance = clampValue(54 + density * 5 - load * 4 + boost * 6, 32, 96);
  const userExperienceScore = clampValue(
    (current.coverage + current.uplink + current.coordination) / 3 -
      current.latency / 7,
    45,
    96,
  );

  return {
    riskExposure,
    statusTone,
    missingCapabilities,
    riskLabels,
    metrics: metricsWithDelta,
    recommendedPreset,
    signalStrength: Math.round(signalStrength),
    handoffBalance: Math.round(handoffBalance),
    userExperienceScore: Math.round(userExperienceScore),
  };
}

export function nextOverlayState(current: OverlayId[], id: OverlayId) {
  return current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];
}

function clampValue(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function roundMetric(metric: MetricKey, value: number) {
  if (metric === "latency" || metric === "closure") {
    return Math.round(value);
  }

  return Math.round(value * 10) / 10;
}
