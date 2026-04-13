import { useEffect, useEffectEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Bot,
  ChevronRight,
  Pause,
  Play,
  Radar,
  RefreshCw,
  Route,
  Signal,
  Sparkles,
  Video,
  Search,
} from "lucide-react";
import {
  modes,
  scenarios,
  summaryStatements,
  type BusinessType,
  type Level,
  type MetricKey,
  type ModeId,
  type ScenarioId,
  type UserType,
} from "./demoConfig";
import { calculateSimulation } from "./demoMath";
import {
  brandMeta,
  storyStages,
  type StoryStage,
  type StoryStageId,
} from "./storylineConfig";

const stageIcons: Record<StoryStage["icon"], LucideIcon> = {
  signal: Signal,
  alert: AlertTriangle,
  bot: Bot,
  route: Route,
  radar: Radar,
  sparkles: Sparkles,
};

const autoplaySpeed: Record<ModeId, number> = {
  executive: 4800,
  expo: 3200,
  expert: 5600,
};

const userLabels: Record<UserType, string> = {
  normal: "普通用户",
  vip: "VIP 用户",
  ai: "AI 重度用户",
};

const businessLabels: Record<BusinessType, string> = {
  ai: "AI 问答",
  meeting: "视频会议",
  uplink: "上行直播",
  video: "短视频",
  hybrid: "混合业务",
};

const scenarioDefaults: Record<
  ScenarioId,
  { userType: UserType; businessType: BusinessType; stationDensity: Level }
> = {
  district: { userType: "vip", businessType: "ai", stationDensity: "medium" },
  venue: { userType: "vip", businessType: "uplink", stationDensity: "high" },
  campus: { userType: "ai", businessType: "hybrid", stationDensity: "high" },
  corridor: { userType: "vip", businessType: "meeting", stationDensity: "high" },
};

function App() {
  const [mode, setMode] = useState<ModeId>("executive");
  const [stageId, setStageId] = useState<StoryStageId>("breakpoint");
  const [scenarioId, setScenarioId] = useState<ScenarioId>("district");
  const [boardEnabled, setBoardEnabled] = useState(false);
  const [collaborationEnabled, setCollaborationEnabled] = useState(false);
  const [stationDensity, setStationDensity] = useState<Level>("medium");
  const [load, setLoad] = useState<Level>("medium");
  const [interference, setInterference] = useState<Level>("medium");
  const [userType, setUserType] = useState<UserType>("vip");
  const [businessType, setBusinessType] = useState<BusinessType>("ai");
  const [autoplay, setAutoplay] = useState({
    active: false,
    paused: false,
    label: "手动浏览",
  });

  const timersRef = useRef<number[]>([]);
  const stage = storyStages.find((item) => item.id === stageId) ?? storyStages[0];
  const stageIndex = storyStages.findIndex((item) => item.id === stage.id);
  const nextStage = storyStages[(stageIndex + 1) % storyStages.length];
  const scenario = scenarios[scenarioId];

  const simulation = calculateSimulation({
    scenarioId,
    stationDensity,
    load,
    interference,
    boardEnabled,
    collaborationEnabled,
    userType,
    businessType,
  });

  const compareMetric = simulation.metrics.find((item) => item.key === stage.compareMetric);
  const latencyMetric = simulation.metrics.find((item) => item.key === "latency");
  const coordinationMetric = simulation.metrics.find((item) => item.key === "coordination");
  const closureMetric = simulation.metrics.find((item) => item.key === "closure");

  const radarAxes = buildRadarAxes(simulation, latencyMetric?.current ?? 0, closureMetric?.current ?? 0);
  const statusLabel = simulation.riskExposure
    ? "风险暴露中"
    : boardEnabled && collaborationEnabled
      ? "协同运行中"
      : "待介入";

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  const applyStageState = useEffectEvent((nextStageState: StoryStage) => {
    setScenarioId(nextStageState.scenarioId);
    setBoardEnabled(nextStageState.boardEnabled);
    setCollaborationEnabled(nextStageState.collaborationEnabled);
    setStationDensity(nextStageState.stationDensity);
    setLoad(nextStageState.load);
    setInterference(nextStageState.interference);
    setUserType(nextStageState.userType);
    setBusinessType(nextStageState.businessType);
  });

  useEffect(() => {
    applyStageState(stage);
  }, [applyStageState, stage]);

  useEffect(() => {
    if (!autoplay.active || autoplay.paused) return;

    clearTimers();
    let offset = 0;

    storyStages.forEach((item) => {
      const timer = window.setTimeout(() => {
        setStageId(item.id);
        setAutoplay((current) => ({ ...current, label: item.label }));
      }, offset);

      timersRef.current.push(timer);
      offset += autoplaySpeed[mode];
    });

    timersRef.current.push(
      window.setTimeout(() => {
        setAutoplay({
          active: false,
          paused: false,
          label: "故事线已结束",
        });
      }, offset),
    );

    return () => clearTimers();
  }, [autoplay.active, autoplay.paused, mode]);

  useEffect(() => () => clearTimers(), []);

  const goStage = (nextId: StoryStageId) => {
    clearTimers();
    setAutoplay({ active: false, paused: false, label: "手动浏览" });
    setStageId(nextId);
  };

  const startAutoplay = () => {
    clearTimers();
    setAutoplay({
      active: true,
      paused: false,
      label: storyStages[0].label,
    });
  };

  const resetCurrentStage = () => {
    clearTimers();
    setAutoplay({ active: false, paused: false, label: "已重置" });
    applyStageState(stage);
  };

  const applyScenario = (nextScenarioId: ScenarioId) => {
    const defaults = scenarioDefaults[nextScenarioId];
    setScenarioId(nextScenarioId);
    setStationDensity(defaults.stationDensity);
    setUserType(defaults.userType);
    setBusinessType(defaults.businessType);
  };

  const inputTone = simulation.riskExposure ? "danger" : boardEnabled && collaborationEnabled ? "ready" : "idle";
  const rightTags = [scenario.shortTitle, userLabels[userType], businessLabels[businessType], ...stage.tags].slice(0, 5);
  const afterPoints = stage.id === "value" ? summaryStatements : stage.afterPoints;
  const phonePrimaryMetric = compareMetric ?? simulation.metrics[0];

  return (
    <div className={`app-shell tone-${simulation.statusTone}`}>
      <div className="app-background" />

      <header className="shell-header">
        <div className="brand-unit">
          <div className="brand-avatar">
            <span className="brand-dot" />
            <Sparkles size={16} />
          </div>
          <div>
            <strong>{brandMeta.name}</strong>
            <span>{brandMeta.subtitle}</span>
          </div>
        </div>

        <nav className="story-nav">
          {storyStages.map((item) => {
            const Icon = stageIcons[item.icon];
            return (
              <button
                key={item.id}
                className={item.id === stage.id ? "story-pill active" : "story-pill"}
                onClick={() => goStage(item.id)}
              >
                <Icon size={14} />
                <span>{item.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        <div className="mode-switch compact">
          {Object.values(modes).map((entry) => (
            <button
              key={entry.id}
              className={mode === entry.id ? "mode-chip active" : "mode-chip"}
              onClick={() => {
                clearTimers();
                setAutoplay({ active: false, paused: false, label: "已切换模式" });
                setMode(entry.id);
              }}
            >
              {entry.label}
            </button>
          ))}
        </div>

        <div className="shell-actions">
          <button className="shell-icon-button" aria-label="video">
            <Video size={18} />
          </button>
          <button className="shell-icon-button" aria-label="search">
            <Search size={18} />
          </button>
        </div>
      </header>

      <main className="experience-grid">
        <aside className="info-column left">
          <section className="feature-card">
            <div className="feature-icon">
              <Sparkles size={18} />
            </div>
            <div className="card-copy">
              <span className="card-eyebrow">{stage.stageTag}</span>
              <h2>{stage.featureTitle}</h2>
              <p>{stage.featureBody}</p>
            </div>
          </section>

          <section className="compare-card">
            <div className="card-head">
              <span>效果对比</span>
              <strong>{metricTitle(stage.compareMetric)}</strong>
            </div>
            <div className="compare-flow">
              <div className="compare-box">
                <small>{stage.compareBeforeLabel}</small>
                <strong>{formatMetric(stage.compareMetric, compareMetric?.before ?? 0)}</strong>
              </div>
              <ChevronRight size={18} />
              <div className="compare-box emphasis">
                <small>{stage.compareAfterLabel}</small>
                <strong>{formatMetric(stage.compareMetric, compareMetric?.after ?? 0)}</strong>
              </div>
            </div>
            <div className="compare-note">{stage.compareInsight}</div>
          </section>

          <section className="list-card muted">
            <div className="card-head">
              <span>{stage.beforeTitle}</span>
            </div>
            <ul>
              {stage.beforePoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="list-card accent">
            <div className="card-head">
              <span>{stage.afterTitle}</span>
            </div>
            <ul>
              {afterPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </aside>

        <section className="phone-stage">
          <div className="stage-caption">
            <span className="card-eyebrow">{stage.stageTag}</span>
            <h1>{stage.heroTitle}</h1>
            <p>{stage.heroBody}</p>
          </div>

          <div className="phone-shell">
            <div className="phone-frame">
              <div className="phone-notch" />
              <div className="phone-status">
                <span>17:28</span>
                <strong>5G</strong>
              </div>

              <div className="phone-header">
                <div className="mini-avatar">
                  <Sparkles size={16} />
                  <span className="brand-dot" />
                </div>
                <div>
                  <strong>{brandMeta.name}</strong>
                  <span>{brandMeta.phoneSubtitle}</span>
                </div>
              </div>

              <div className="phone-scene-row">
                <span className="scene-chip">{scenario.shortTitle}</span>
                <span className="scene-chip">{userLabels[userType]}</span>
                <span className="scene-chip">{businessLabels[businessType]}</span>
              </div>

              <div className="conversation">
                <div className="conversation-time">今天 · 10:28</div>
                {stage.phoneMessages.map((message, index) => {
                  const text =
                    message.role === "system" && simulation.riskExposure
                      ? simulation.riskLabels[0]
                      : message.text;

                  return (
                    <div key={`${message.role}-${index}-${text}`} className="conversation-cluster">
                      <motion.div
                        className={`message-row ${message.role}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, delay: index * 0.06 }}
                      >
                        {message.role === "assistant" && <div className="bubble-avatar"><Sparkles size={14} /></div>}
                        <div className={`message-bubble ${message.role}`}>{text}</div>
                      </motion.div>

                      {index === 1 && (
                        <DiagnosticsCard
                          title={metricTitle(phonePrimaryMetric.key)}
                          primaryValue={formatMetric(phonePrimaryMetric.key, phonePrimaryMetric.after)}
                          scenarioLabel={scenario.shortTitle}
                          signalStrength={simulation.signalStrength}
                          latency={`${latencyMetric?.current ?? 0}ms`}
                          coordination={`${coordinationMetric?.current ?? 0}%`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="quick-replies">
                {stage.quickReplies.map((item) => (
                  <button key={item} className="reply-chip">
                    {item}
                  </button>
                ))}
              </div>

              <div className={`phone-input ${inputTone}`}>
                <span>{stage.inputHint}</span>
                <button className="send-button">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="stage-actions">
            <button className="action-button" onClick={() => goStage(nextStage.id)}>
              <ChevronRight size={16} />
              快进到下个节点
            </button>
            <button
              className="action-button"
              onClick={() => {
                if (autoplay.active) {
                  clearTimers();
                  setAutoplay({ active: false, paused: true, label: "已暂停" });
                } else {
                  startAutoplay();
                }
              }}
            >
              {autoplay.active ? <Pause size={16} /> : <Play size={16} />}
              {autoplay.active ? "暂停自动演示" : "自动演示"}
            </button>
            <button className="action-button" onClick={resetCurrentStage}>
              <RefreshCw size={16} />
              重播场景
            </button>
          </div>

          <div className="control-strip">
            <div className="strip-group">
              {Object.values(scenarios).map((item) => (
                <button
                  key={item.id}
                  className={item.id === scenarioId ? "strip-pill active" : "strip-pill"}
                  onClick={() => applyScenario(item.id)}
                >
                  {item.shortTitle}
                </button>
              ))}
            </div>
            <div className="strip-group">
              <button
                className={boardEnabled ? "strip-pill active" : "strip-pill"}
                onClick={() => setBoardEnabled((current) => !current)}
              >
                智能板
              </button>
              <button
                className={collaborationEnabled ? "strip-pill active" : "strip-pill"}
                onClick={() => setCollaborationEnabled((current) => !current)}
              >
                协同策略
              </button>
            </div>
          </div>
        </section>

        <aside className="info-column right">
          <section className="profile-card">
            <div className="profile-avatar">
              <Signal size={20} />
            </div>
            <strong>138****6789</strong>
            <span>{stage.profileNote}</span>
            <small>{statusLabel}</small>
          </section>

          <section className="radar-card">
            <div className="card-head">
              <span>体验画像</span>
              <strong>{simulation.userExperienceScore}%</strong>
            </div>
            <RadarChart values={radarAxes} />
          </section>

          <section className="tag-card">
            <div className="card-head">
              <span>用户画像标签</span>
              <strong>{rightTags.length}</strong>
            </div>
            <div className="tag-list">
              {rightTags.map((item) => (
                <span key={item} className="tag-pill">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="stat-card">
            <div className="card-head">
              <span>交互数据</span>
              <strong>{autoplay.label}</strong>
            </div>
            <div className="stat-grid">
              <StatItem label="连续底座" value={`${simulation.signalStrength}%`} />
              <StatItem label="协同效率" value={`${coordinationMetric?.current ?? 0}%`} />
              <StatItem label="AI 时延" value={`${latencyMetric?.current ?? 0}ms`} />
              <StatItem label="闭环时长" value={`${closureMetric?.current ?? 0}min`} />
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-tile">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function DiagnosticsCard({
  title,
  primaryValue,
  scenarioLabel,
  signalStrength,
  latency,
  coordination,
}: {
  title: string;
  primaryValue: string;
  scenarioLabel: string;
  signalStrength: number;
  latency: string;
  coordination: string;
}) {
  return (
    <motion.div
      className="diagnostic-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.34, ease: "easeOut" }}
    >
      <div className="diagnostic-card__head">
        <div className="diagnostic-card__kicker">
          <Signal size={16} />
          <span>700M Diagnostics</span>
        </div>
        <strong>{scenarioLabel} / 5G-A</strong>
      </div>

      <div className="diagnostic-card__body">
        <div className="diagnostic-card__metric">
          <span>{title}</span>
          <strong>{primaryValue}</strong>
        </div>
        <div className="diagnostic-card__stats">
          <div>
            <span>连续底座</span>
            <strong>{signalStrength}%</strong>
          </div>
          <div>
            <span>AI 时延</span>
            <strong>{latency}</strong>
          </div>
          <div>
            <span>协同效率</span>
            <strong>{coordination}</strong>
          </div>
        </div>
      </div>

      <div className="diagnostic-card__footer">
        <span>查看完整研判</span>
        <ChevronRight size={16} />
      </div>
    </motion.div>
  );
}

function RadarChart({ values }: { values: Array<{ label: string; value: number }> }) {
  const size = 220;
  const center = size / 2;
  const radius = 66;
  const rings = [0.25, 0.5, 0.75, 1];
  const points = values.map((item, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / values.length;
    const scaledRadius = radius * (item.value / 100);

    return {
      label: item.label,
      x: center + Math.cos(angle) * scaledRadius,
      y: center + Math.sin(angle) * scaledRadius,
      axisX: center + Math.cos(angle) * radius,
      axisY: center + Math.sin(angle) * radius,
    };
  });

  return (
    <div className="radar-shell">
      <svg viewBox={`0 0 ${size} ${size}`} className="radar-svg" aria-hidden="true">
        {rings.map((ring) => (
          <polygon
            key={ring}
            points={values
              .map((_, index) => {
                const angle = -Math.PI / 2 + (index * Math.PI * 2) / values.length;
                return `${center + Math.cos(angle) * radius * ring},${center + Math.sin(angle) * radius * ring}`;
              })
              .join(" ")}
            className="radar-ring"
          />
        ))}

        {points.map((point) => (
          <line
            key={point.label}
            x1={center}
            y1={center}
            x2={point.axisX}
            y2={point.axisY}
            className="radar-axis"
          />
        ))}

        <polygon points={points.map((point) => `${point.x},${point.y}`).join(" ")} className="radar-shape" />

        {points.map((point) => (
          <circle key={`${point.label}-dot`} cx={point.x} cy={point.y} r="4" className="radar-dot" />
        ))}
      </svg>

      <div className="radar-labels">
        {values.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}

function metricTitle(metric: MetricKey) {
  const titleMap: Record<MetricKey, string> = {
    coverage: "连续覆盖率",
    latency: "AI 时延 P95",
    uplink: "上行稳定性",
    coordination: "频层协同效率",
    closure: "闭环处置时长",
  };

  return titleMap[metric];
}

function formatMetric(metric: MetricKey, value: number) {
  const rounded = metric === "latency" || metric === "closure" ? Math.round(value) : Math.round(value);

  if (metric === "latency") return `${rounded}ms`;
  if (metric === "closure") return `${rounded}min`;
  return `${rounded}%`;
}

function buildRadarAxes(
  simulation: ReturnType<typeof calculateSimulation>,
  latency: number,
  closure: number,
) {
  return [
    { label: "连续", value: simulation.signalStrength },
    { label: "响应", value: clamp(100 - latency * 0.85, 24, 96) },
    { label: "承接", value: simulation.handoffBalance },
    { label: "保障", value: simulation.userExperienceScore },
    { label: "闭环", value: clamp(100 - closure * 0.72, 18, 92) },
  ];
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default App;
