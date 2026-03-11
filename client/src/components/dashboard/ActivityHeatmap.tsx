import { useMemo, useState, useCallback, useRef } from 'react';
import type { Progress } from '@codeforge/shared';
import { computeActivityData } from '../../utils/activityStats';
import type { DayCell } from '../../utils/activityStats';

interface ActivityHeatmapProps {
  progressItems: Record<string, Progress>;
}

const CELL_SIZE = 12;
const CELL_GAP = 2;
const CELL_STEP = CELL_SIZE + CELL_GAP;
const ROWS = 7;
const COLS = 12; // weeks
const LABEL_WIDTH = 28; // space for Mon/Wed/Fri labels
const MONTH_LABEL_HEIGHT = 14;
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''] as const;
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getOpacity(count: number): number {
  if (count === 0) return 0;
  if (count === 1) return 0.35;
  if (count === 2) return 0.65;
  return 1;
}

function formatTooltipDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00'); // noon to avoid timezone shift
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

interface TooltipInfo {
  cell: DayCell;
  x: number;
  y: number;
}

export default function ActivityHeatmap({ progressItems }: ActivityHeatmapProps) {
  const data = useMemo(() => computeActivityData(progressItems), [progressItems]);
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const svgWidth = LABEL_WIDTH + COLS * CELL_STEP;
  const svgHeight = ROWS * CELL_STEP + MONTH_LABEL_HEIGHT;

  const handleMouseEnter = useCallback((cell: DayCell, e: React.MouseEvent<SVGRectElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      cell,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  // Build month labels — find first column where the 1st of a month appears
  const monthLabels = useMemo(() => {
    const labels: { text: string; col: number }[] = [];
    let lastMonth = -1;
    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row < ROWS; row++) {
        const idx = col * ROWS + row;
        if (idx >= data.days.length) break;
        const d = new Date(data.days[idx].date + 'T12:00:00');
        const m = d.getMonth();
        if (m !== lastMonth && d.getDate() <= 7) {
          labels.push({ text: MONTH_NAMES[m], col });
          lastMonth = m;
          break;
        }
      }
    }
    return labels;
  }, [data.days]);

  return (
    <div
      className="rounded-lg p-4"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
      }}
    >
      <h3
        className="font-heading font-semibold text-sm mb-3"
        style={{ color: 'var(--text-primary)' }}
      >
        Activity
      </h3>

      {/* Heatmap */}
      <div ref={containerRef} className="relative" style={{ position: 'relative' }}>
        <svg
          width={svgWidth}
          height={svgHeight}
          style={{ display: 'block' }}
        >
          {/* Day labels (Mon, Wed, Fri) */}
          {DAY_LABELS.map((label, row) =>
            label ? (
              <text
                key={row}
                x={LABEL_WIDTH - 4}
                y={row * CELL_STEP + CELL_SIZE * 0.8}
                textAnchor="end"
                style={{ fontSize: 9, fill: 'var(--text-faint)', fontFamily: 'Lexend, sans-serif' }}
              >
                {label}
              </text>
            ) : null,
          )}

          {/* Grid cells */}
          {data.days.map((cell, idx) => {
            const col = Math.floor(idx / ROWS);
            const row = idx % ROWS;
            const x = LABEL_WIDTH + col * CELL_STEP;
            const y = row * CELL_STEP;
            const opacity = getOpacity(cell.count);

            return (
              <rect
                key={cell.date}
                x={x}
                y={y}
                width={CELL_SIZE}
                height={CELL_SIZE}
                rx={2}
                style={{
                  fill: opacity === 0 ? 'var(--bg-raised)' : 'var(--accent)',
                  opacity: opacity === 0 ? 1 : opacity,
                }}
                onMouseEnter={(e) => handleMouseEnter(cell, e)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}

          {/* Month labels */}
          {monthLabels.map(({ text, col }) => (
            <text
              key={`${text}-${col}`}
              x={LABEL_WIDTH + col * CELL_STEP}
              y={ROWS * CELL_STEP + MONTH_LABEL_HEIGHT - 2}
              style={{ fontSize: 9, fill: 'var(--text-faint)', fontFamily: 'Lexend, sans-serif' }}
            >
              {text}
            </text>
          ))}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute pointer-events-none px-2 py-1 rounded text-xs whitespace-nowrap"
            style={{
              left: tooltip.x,
              top: tooltip.y - 32,
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              zIndex: 10,
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
          >
            <strong>{tooltip.cell.count}</strong>{' '}
            {tooltip.cell.count === 1 ? 'exercise' : 'exercises'} on{' '}
            {formatTooltipDate(tooltip.cell.date)}
          </div>
        )}

        {/* Legend */}
        <div
          className="flex items-center gap-1 mt-1"
          style={{ paddingLeft: LABEL_WIDTH }}
        >
          <span className="text-xs" style={{ color: 'var(--text-faint)', marginRight: 2 }}>Less</span>
          {[0, 0.35, 0.65, 1].map((op, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: 2,
                backgroundColor: op === 0 ? 'var(--bg-raised)' : 'var(--accent)',
                opacity: op === 0 ? 1 : op,
              }}
            />
          ))}
          <span className="text-xs" style={{ color: 'var(--text-faint)', marginLeft: 2 }}>More</span>
        </div>
      </div>

      {/* Divider */}
      <div
        className="my-3"
        style={{ height: 1, backgroundColor: 'var(--border)' }}
      />

      {/* Summary footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {data.currentStreak > 0
            ? `🔥 ${data.currentStreak}-day streak`
            : 'No current streak'}
        </span>
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          This Week: {data.weekExercises} {data.weekExercises === 1 ? 'exercise' : 'exercises'} · {data.weekPoints} pts
        </span>
      </div>
    </div>
  );
}
