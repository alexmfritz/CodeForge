import { useState } from 'react';
import type { DailyActivityPoint } from '@codeforge/shared';

interface Props {
  data: DailyActivityPoint[];
  height?: number;
}

const MARGIN = { top: 10, right: 10, bottom: 24, left: 32 };

export default function ActivityChart({ data, height = 200 }: Props) {
  const [tooltip, setTooltip] = useState<{ point: DailyActivityPoint; x: number; y: number } | null>(null);

  if (data.length === 0) {
    return (
      <div
        className="rounded-lg flex items-center justify-center"
        style={{ height, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>No activity data for this period.</p>
      </div>
    );
  }

  const width = 800;
  const chartW = width - MARGIN.left - MARGIN.right;
  const chartH = height - MARGIN.top - MARGIN.bottom;

  const maxVal = Math.max(...data.map((d) => d.exercisesAttempted), 1);
  const yTicks = getYTicks(maxVal);
  const yMax = yTicks[yTicks.length - 1];

  const barWidth = Math.max(4, (chartW / data.length) * 0.7);
  const barGap = chartW / data.length;

  const yScale = (v: number) => chartH - (v / yMax) * chartH;

  const labelInterval = data.length <= 14 ? 1 : data.length <= 30 ? 3 : 5;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ height }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Gridlines */}
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={MARGIN.left}
              y1={MARGIN.top + yScale(tick)}
              x2={width - MARGIN.right}
              y2={MARGIN.top + yScale(tick)}
              stroke="var(--border)"
              strokeDasharray="4,4"
              strokeWidth={0.5}
            />
            <text
              x={MARGIN.left - 6}
              y={MARGIN.top + yScale(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              fill="var(--text-muted)"
              fontSize={9}
            >
              {tick}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((day, i) => {
          const x = MARGIN.left + i * barGap + (barGap - barWidth) / 2;
          const attemptedNotCompleted = day.exercisesAttempted - day.exercisesCompleted;
          const completedH = (day.exercisesCompleted / yMax) * chartH;
          const attemptedH = (attemptedNotCompleted / yMax) * chartH;

          return (
            <g key={day.date}>
              {/* Attempted (non-completed) portion — stacked on top */}
              {attemptedNotCompleted > 0 && (
                <rect
                  x={x}
                  y={MARGIN.top + yScale(day.exercisesAttempted)}
                  width={barWidth}
                  height={attemptedH}
                  fill="var(--warning)"
                  rx={2}
                  opacity={0.7}
                />
              )}
              {/* Completed portion */}
              {day.exercisesCompleted > 0 && (
                <rect
                  x={x}
                  y={MARGIN.top + yScale(day.exercisesCompleted)}
                  width={barWidth}
                  height={completedH}
                  fill="var(--success)"
                  rx={2}
                />
              )}
              {/* Hover target */}
              <rect
                x={x}
                y={MARGIN.top}
                width={barWidth}
                height={chartH}
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const svgRect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                  setTooltip({
                    point: day,
                    x: rect.left - svgRect.left + rect.width / 2,
                    y: rect.top - svgRect.top - 8,
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
              />
            </g>
          );
        })}

        {/* X-axis labels */}
        {data.map((day, i) => {
          if (i % labelInterval !== 0) return null;
          const x = MARGIN.left + i * barGap + barGap / 2;
          const label = formatShortDate(day.date);
          return (
            <text
              key={day.date}
              x={x}
              y={height - 4}
              textAnchor="middle"
              fill="var(--text-muted)"
              fontSize={9}
            >
              {label}
            </text>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute rounded-lg px-3 py-2 text-xs pointer-events-none z-10"
          style={{
            backgroundColor: 'var(--bg-root)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
            whiteSpace: 'nowrap',
          }}
        >
          <p className="font-medium mb-1">{tooltip.point.date}</p>
          <p><span style={{ color: 'var(--text-muted)' }}>Active students:</span> {tooltip.point.activeStudentCount}</p>
          <p><span style={{ color: 'var(--success)' }}>Completed:</span> {tooltip.point.exercisesCompleted}</p>
          <p><span style={{ color: 'var(--warning)' }}>Attempted:</span> {tooltip.point.exercisesAttempted}</p>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2 justify-center">
        <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--success)' }} /> Completed
        </span>
        <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--warning)', opacity: 0.7 }} /> Attempted
        </span>
      </div>
    </div>
  );
}

function formatShortDate(dateStr: string): string {
  const [, month, day] = dateStr.split('-');
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[Number(month)]} ${Number(day)}`;
}

function getYTicks(maxVal: number): number[] {
  const step = maxVal <= 5 ? 1 : maxVal <= 20 ? 5 : maxVal <= 50 ? 10 : Math.ceil(maxVal / 5 / 10) * 10;
  const ticks: number[] = [];
  for (let i = 0; i <= maxVal; i += step) {
    ticks.push(i);
  }
  if (ticks[ticks.length - 1] < maxVal) {
    ticks.push(ticks[ticks.length - 1] + step);
  }
  return ticks;
}
