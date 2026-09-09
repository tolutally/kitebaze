import { useEffect, useId, useState } from 'react';

const ASK = "Who's in Saturday and what do they owe?";
const APPS_EYEBROW = 'Already connected';

const APPS = [
  { label: 'Scheduling', line: 'Bookings and slots', action: 'Resolving conflicts', outcome: 'Dates confirmed', colour: '#2f70bd', glyph: 'calendar' },
  { label: 'Accounting', line: 'Invoices and balances', action: 'Matching payments', outcome: 'Amount confirmed', colour: '#27859a', glyph: 'coin' },
  { label: 'Documents', line: 'Contracts and forms', action: 'Checking requirements', outcome: 'Gaps flagged', colour: '#f27d08', glyph: 'file' },
  { label: 'Email', line: 'Threads with clients', action: 'Running follow-ups', outcome: 'Reply captured', colour: '#3f8f5f', glyph: 'send' },
  { label: 'Spreadsheets', line: 'The tracker you keep', action: 'Syncing records', outcome: 'Tracker updated', colour: '#5a5fd0', glyph: 'grid' },
];

const CYCLE = 14000;
const TIMING = {
  typeStart: 400,
  typeEnd: 2600,
  askOut: 3200,
  appsIn: 3400,
  workStart: 4300,
  workStep: 1300,
  loadingDone: 850,
  outcomeIn: 1100,
  appsOut: 13200,
};
const FADE = 400;

const BOX = { x: 150, y: 452, w: 690, h: 108, r: 18, pad: 36 };
const ROW = { x: 70, top: 320, gap: 100, tile: 58, textX: 112 };
const ACTION = { x: 300, w: 280, h: 58, r: 16 };
const OUTCOME = { x: 610, w: 235, h: 58, r: 16 };

const GLYPHS = {
  calendar: 'M-17,-12 L17,-12 L17,15 L-17,15 z M-17,-4 L17,-4 M-8,-18 L-8,-8 M8,-18 L8,-8',
  coin: 'M0,-17 A17,17 0 1,1 0,17 A17,17 0 1,1 0,-17 M0,-9 L0,9 M-5,-5 A5,4.5 0 0,1 5,-5 M5,4 A5,4.5 0 0,1 -5,4',
  file: 'M-13,-17 L6,-17 L15,-7 L15,17 L-13,17 z M6,-17 L6,-7 L15,-7 M-5,4 L7,4 M-5,10 L7,10',
  send: 'M-17,-2 L17,-14 L5,15 L1,3 z M1,3 L-17,-2',
  grid: 'M-15,-13 L15,-13 L15,13 L-15,13 z M-15,-4 L15,-4 M-15,5 L15,5 M-4,-13 L-4,13',
};

const pct = (milliseconds) => (milliseconds / CYCLE * 100).toFixed(2);

const STYLES = `
  .kb-hero-flow-overlay {
    --kb-hero-flow-ink: #16202b;
    --kb-hero-flow-mid: #5b6674;
    --kb-hero-flow-rule: #97a1ad;
    --kb-hero-flow-card: #f7f9fb;
    --kb-hero-flow-accent: var(--kb-accent-light);
    --kb-hero-flow-cycle: ${CYCLE}ms;
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .kb-hero-flow {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .kb-hero-flow-eyebrow { font-size: 20px; font-weight: 600; fill: var(--kb-hero-flow-accent); filter: drop-shadow(0 1px 5px rgba(0, 0, 0, .75)); }
  .kb-hero-flow-ask { font-size: 28px; font-weight: 400; fill: var(--kb-hero-flow-ink); }
  .kb-hero-flow-node-label { font-size: 22px; font-weight: 600; fill: var(--kb-hero-flow-card); filter: drop-shadow(0 1px 5px rgba(0, 0, 0, .6)); }
  .kb-hero-flow-node-line { font-size: 17px; font-weight: 400; fill: var(--kb-hero-flow-card); opacity: .76; filter: drop-shadow(0 1px 5px rgba(0, 0, 0, .7)); }
  .kb-hero-flow-action-label { font-size: 18px; font-weight: 500; fill: var(--kb-hero-flow-card); }
  .kb-hero-flow-outcome-label { font-size: 18px; font-weight: 600; fill: var(--kb-hero-flow-ink); }
  .kb-hero-flow-connector { stroke: var(--kb-hero-flow-card); stroke-width: 2; stroke-dasharray: 5 6; opacity: .5; }
  .kb-hero-flow-source-pulse { fill: none; stroke: var(--kb-hero-flow-accent); stroke-width: 4; opacity: 0; transform-box: fill-box; transform-origin: center; }
  .kb-hero-flow-source-pulse,
  .kb-hero-flow-work,
  .kb-hero-flow-work-path,
  .kb-hero-flow-outcome,
  .kb-hero-flow-outcome-path,
  .kb-hero-flow-loader,
  .kb-hero-flow-agent-ready {
    opacity: 0;
    animation-duration: var(--kb-hero-flow-cycle);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .kb-hero-flow-loader-spinner {
    transform-box: fill-box;
    transform-origin: center;
    animation: kb-hero-flow-spin .72s linear infinite;
  }

  .kb-hero-flow-scene-ask {
    animation: kb-hero-flow-scene-ask var(--kb-hero-flow-cycle) linear infinite;
  }

  .kb-hero-flow-scene-apps {
    opacity: 0;
    animation: kb-hero-flow-scene-apps var(--kb-hero-flow-cycle) linear infinite;
  }

  .kb-hero-flow-app {
    opacity: 1;
  }

  .kb-hero-flow-caret {
    animation: kb-hero-flow-blink .9s steps(1) infinite;
  }

  @media (max-width: 1023px) {
    .kb-hero-flow-scale { transform: translate(860px, 240px) scale(.46); }
  }

  @keyframes kb-hero-flow-blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  @keyframes kb-hero-flow-scene-ask {
    0% { opacity: 1; }
    ${pct(TIMING.askOut)}% { opacity: 1; }
    ${pct(TIMING.askOut + FADE)}% { opacity: 0; }
    100% { opacity: 0; }
  }

  @keyframes kb-hero-flow-scene-apps {
    0% { opacity: 0; }
    ${pct(TIMING.appsIn - 1)}% { opacity: 0; }
    ${pct(TIMING.appsIn)}% { opacity: 1; }
    ${pct(TIMING.appsOut)}% { opacity: 1; }
    ${pct(TIMING.appsOut + FADE)}% { opacity: 0; }
    100% { opacity: 0; }
  }

  @keyframes kb-hero-flow-spin {
    to { transform: rotate(360deg); }
  }

  ${APPS.map((_, index) => {
    const start = TIMING.workStart + index * TIMING.workStep;
    const loadingDone = start + TIMING.loadingDone;
    const outcomeIn = start + TIMING.outcomeIn;

    return `
      @keyframes kb-hero-flow-source-pulse-${index} {
        0%, ${pct(start - 1)}% { opacity: 0; transform: scale(.9); }
        ${pct(start)}% { opacity: 1; transform: scale(.92); }
        ${pct(start + 140)}% { opacity: 1; transform: scale(1.12); }
        ${pct(start + 320)}% { opacity: 1; transform: scale(1); }
        ${pct(start + 760)}% { opacity: .8; transform: scale(1); }
        ${pct(start + 980)}%, 100% { opacity: 0; transform: scale(1); }
      }
      @keyframes kb-hero-flow-work-${index} {
        0%, ${pct(start - 1)}% { opacity: 0; transform: translateX(-10px); }
        ${pct(start + 180)}% { opacity: 1; transform: translateX(0); }
        ${pct(TIMING.appsOut)}% { opacity: 1; transform: translateX(0); }
        ${pct(TIMING.appsOut + FADE)}%, 100% { opacity: 0; transform: translateX(0); }
      }
      @keyframes kb-hero-flow-loader-${index} {
        0%, ${pct(start - 1)}% { opacity: 0; }
        ${pct(start)}%, ${pct(loadingDone - 80)}% { opacity: 1; }
        ${pct(loadingDone)}%, 100% { opacity: 0; }
      }
      @keyframes kb-hero-flow-agent-ready-${index} {
        0%, ${pct(loadingDone - 1)}% { opacity: 0; }
        ${pct(loadingDone + 120)}% { opacity: 1; }
        ${pct(TIMING.appsOut)}% { opacity: 1; }
        ${pct(TIMING.appsOut + FADE)}%, 100% { opacity: 0; }
      }
      @keyframes kb-hero-flow-outcome-${index} {
        0%, ${pct(outcomeIn - 1)}% { opacity: 0; transform: translateX(-8px); }
        ${pct(outcomeIn + 180)}% { opacity: 1; transform: translateX(0); }
        ${pct(TIMING.appsOut)}% { opacity: 1; transform: translateX(0); }
        ${pct(TIMING.appsOut + FADE)}%, 100% { opacity: 0; transform: translateX(0); }
      }
    `;
  }).join('\n')}

  @media (prefers-reduced-motion: reduce) {
    .kb-hero-flow-scene-ask { animation: none; opacity: 0; }
    .kb-hero-flow-scene-apps { animation: none; opacity: 1; }
    .kb-hero-flow-app { animation: none; opacity: 1; }
    .kb-hero-flow-source-pulse,
    .kb-hero-flow-loader { display: none; }
    .kb-hero-flow-work,
    .kb-hero-flow-work-path,
    .kb-hero-flow-outcome,
    .kb-hero-flow-outcome-path,
    .kb-hero-flow-agent-ready { animation: none !important; opacity: 1; transform: none; }
    .kb-hero-flow-caret { display: none; }
  }
`;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(query.matches);

    updatePreference();
    query.addEventListener?.('change', updatePreference);
    return () => query.removeEventListener?.('change', updatePreference);
  }, []);

  return prefersReducedMotion;
}

export default function HeroFlowOverlay({ className = '', style }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [typedQuestion, setTypedQuestion] = useState('');
  const [showCaret, setShowCaret] = useState(false);
  const titleId = `kb-hero-flow-title-${useId().replaceAll(':', '')}`;

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedQuestion(ASK);
      setShowCaret(false);
      return undefined;
    }

    let animationFrame;
    const duration = TIMING.typeEnd - TIMING.typeStart;
    const startedAt = performance.now();

    const typeQuestion = (now) => {
      const elapsed = (now - startedAt) % CYCLE;
      let characterCount = 0;

      if (elapsed >= TIMING.typeStart) {
        characterCount = elapsed < TIMING.typeEnd
          ? Math.floor((elapsed - TIMING.typeStart) / duration * ASK.length)
          : ASK.length;
      }

      const nextQuestion = ASK.slice(0, characterCount);
      setTypedQuestion((currentQuestion) => (
        currentQuestion === nextQuestion ? currentQuestion : nextQuestion
      ));

      const nextCaretState = elapsed >= TIMING.typeStart && elapsed < TIMING.typeEnd;
      setShowCaret((currentState) => (
        currentState === nextCaretState ? currentState : nextCaretState
      ));

      animationFrame = window.requestAnimationFrame(typeQuestion);
    };

    animationFrame = window.requestAnimationFrame(typeQuestion);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [prefersReducedMotion]);

  const halfTile = ROW.tile / 2;
  const appY = (index) => ROW.top + index * ROW.gap;
  const caretX = BOX.x + BOX.pad + typedQuestion.length * (28 * 0.55) + 4;

  return (
    <div
      className={`kb-hero-flow-overlay ${className}`.trim()}
      style={style}
    >
      <style>{STYLES}</style>

      <svg
        className="kb-hero-flow"
        viewBox="0 0 2048 1080"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-labelledby={titleId}
      >
        <title id={titleId}>A question followed by the connected apps working together</title>

        <g className="kb-hero-flow-scale" transform="translate(1090 197) scale(.65)">

        <g className="kb-hero-flow-scene-ask">
          <rect
            x={BOX.x}
            y={BOX.y}
            width={BOX.w}
            height={BOX.h}
            rx={BOX.r}
            fill="#fff"
            stroke="var(--kb-hero-flow-rule)"
            strokeWidth="2"
            strokeOpacity=".45"
          />
          <text x={BOX.x + BOX.pad} y={BOX.y + 66} className="kb-hero-flow-ask">
            {typedQuestion}
          </text>
          {showCaret && (
            <rect
              className="kb-hero-flow-caret"
              x={caretX}
              y={BOX.y + 40}
              width="3"
              height="32"
              fill="var(--kb-hero-flow-ink)"
            />
          )}
        </g>

        <g className="kb-hero-flow-scene-apps">
          <text x={ROW.x - halfTile} y={ROW.top - 76} className="kb-hero-flow-eyebrow">
            {APPS_EYEBROW}
          </text>
          <line
            x1={ROW.x}
            y1={appY(0)}
            x2={ROW.x}
            y2={appY(APPS.length - 1)}
            stroke="var(--kb-hero-flow-rule)"
            strokeWidth="3"
            opacity=".6"
          />

          {APPS.map((app, index) => {
            const y = appY(index);

            return (
              <g
                key={app.label}
                className="kb-hero-flow-app"
              >
                <rect
                  className="kb-hero-flow-source-pulse"
                  x={ROW.x - halfTile - 6}
                  y={y - halfTile - 6}
                  width={ROW.tile + 12}
                  height={ROW.tile + 12}
                  rx="20"
                  style={{ animationName: `kb-hero-flow-source-pulse-${index}` }}
                />
                <rect
                  x={ROW.x - halfTile}
                  y={y - halfTile}
                  width={ROW.tile}
                  height={ROW.tile}
                  rx="19"
                  fill={app.colour}
                />
                <path
                  d={GLYPHS[app.glyph]}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  transform={`translate(${ROW.x} ${y})`}
                />
                <text x={ROW.textX} y={y - 4} className="kb-hero-flow-node-label">
                  {app.label}
                </text>
                <text x={ROW.textX} y={y + 22} className="kb-hero-flow-node-line">
                  {app.line}
                </text>

                <line
                  x1={ROW.textX + 152}
                  y1={y}
                  x2={ACTION.x - 12}
                  y2={y}
                  className="kb-hero-flow-connector kb-hero-flow-work-path"
                  style={{ animationName: `kb-hero-flow-work-${index}` }}
                />

                <g
                  className="kb-hero-flow-work"
                  style={{ animationName: `kb-hero-flow-work-${index}` }}
                >
                  <rect
                    x={ACTION.x}
                    y={y - ACTION.h / 2}
                    width={ACTION.w}
                    height={ACTION.h}
                    rx={ACTION.r}
                    fill="var(--kb-hero-flow-ink)"
                    stroke="var(--kb-hero-flow-accent)"
                    strokeWidth="2"
                    opacity=".94"
                  />
                  <g
                    className="kb-hero-flow-loader"
                    style={{ animationName: `kb-hero-flow-loader-${index}` }}
                  >
                    <circle cx={ACTION.x + 27} cy={y} r="12" fill="none" stroke="var(--kb-hero-flow-card)" strokeWidth="3" opacity=".28" />
                    <circle
                      className="kb-hero-flow-loader-spinner"
                      cx={ACTION.x + 27}
                      cy={y}
                      r="12"
                      fill="none"
                      stroke="var(--kb-hero-flow-accent)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="24 52"
                    />
                  </g>
                  <g
                    className="kb-hero-flow-agent-ready"
                    style={{ animationName: `kb-hero-flow-agent-ready-${index}` }}
                  >
                    <circle cx={ACTION.x + 27} cy={y} r="13" fill="var(--kb-hero-flow-accent)" />
                    <text x={ACTION.x + 27} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--kb-hero-flow-ink)">K</text>
                  </g>
                  <text x={ACTION.x + 50} y={y + 6} className="kb-hero-flow-action-label">
                    {app.action}
                  </text>
                </g>

                <line
                  x1={ACTION.x + ACTION.w + 8}
                  y1={y}
                  x2={OUTCOME.x - 10}
                  y2={y}
                  className="kb-hero-flow-connector kb-hero-flow-outcome-path"
                  style={{ animationName: `kb-hero-flow-outcome-${index}` }}
                />

                <g
                  className="kb-hero-flow-outcome"
                  style={{ animationName: `kb-hero-flow-outcome-${index}` }}
                >
                  <rect
                    x={OUTCOME.x}
                    y={y - OUTCOME.h / 2}
                    width={OUTCOME.w}
                    height={OUTCOME.h}
                    rx={OUTCOME.r}
                    fill="var(--kb-hero-flow-card)"
                    opacity=".96"
                  />
                  <circle cx={OUTCOME.x + 25} cy={y} r="12" fill="var(--kb-hero-flow-accent)" />
                  <path
                    d={`M${OUTCOME.x + 19} ${y} l4 4 8 -9`}
                    fill="none"
                    stroke="var(--kb-hero-flow-ink)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text x={OUTCOME.x + 46} y={y + 6} className="kb-hero-flow-outcome-label">
                    {app.outcome}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        </g>
      </svg>
    </div>
  );
}
