'use client';

import React, { useState } from 'react';

type AnalyticsCardProps = {
  title: string;
  total: number | string;
  active?: number | string;
  inactive?: number | string;
  defaulted?: number | string;
  completed?: number | string;
  icon?: React.ReactNode;
};

const AnalyticsCard = ({
  title,
  total,
  active,
  inactive,
  defaulted,
  completed,
  icon,
}: AnalyticsCardProps) => {
  const [view, setView] = useState<'total' | 'active' | 'inactive' | 'defaulted' | 'completed'>(
    'total'
  );

  const getValue = () => {
    if (view === 'active' && active !== undefined) return active;
    if (view === 'inactive' && inactive !== undefined) return inactive;
    if (view === 'defaulted' && defaulted !== undefined) return defaulted;
    if (view === 'completed' && completed !== undefined) return completed;
    return total;
  };

  return (
    <div className="rounded-[var(--radius)] bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] p-6 flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[var(--muted-foreground)]">{title}</p>
        {icon && (
          <div className="bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded-xl p-2 flex items-center justify-center text-lg">
            {icon}
          </div>
        )}
      </div>

      <h3 className="text-3xl font-bold mt-3 tracking-tight">{getValue()}</h3>

      {(active !== undefined ||
        inactive !== undefined ||
        defaulted !== undefined ||
        completed !== undefined) && (
        <div className="flex flex-wrap items-center gap-1.5 mt-3">
          {/* Total */}
          <button
            onClick={() => setView('total')}
            className={`px-2.5 py-0.5 rounded-sm text-sm transition-colors ${
              view === 'total'
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                : 'bg-[var(--secondary)] text-[var(--secondary-foreground)]'
            }`}
          >
            Total
          </button>

          {/* Active */}
          {active !== undefined && (
            <button
              onClick={() => setView('active')}
              className={`px-2.5 py-0.5 rounded-sm text-sm transition-colors ${
                view === 'active'
                  ? 'bg-[var(--success)] text-[var(--success-foreground)]'
                  : 'bg-[#d5f5d5] text-[#1b5e20]' /* light green alt */
              }`}
            >
              Active
            </button>
          )}

          {/* Inactive */}
          {inactive !== undefined && (
            <button
              onClick={() => setView('inactive')}
              className={`px-2.5 py-0.5 rounded-sm text-sm transition-colors ${
                view === 'inactive'
                  ? 'bg-[var(--warning)] text-[var(--warning-foreground)]'
                  : 'bg-[#fff4d6] text-[#8a6d00]' /* light amber alt */
              }`}
            >
              Inactive
            </button>
          )}

          {/* Completed */}
          {completed !== undefined && (
            <button
              onClick={() => setView('completed')}
              className={`px-2.5 py-0.5 rounded-sm text-sm transition-colors ${
                view === 'completed'
                  ? 'bg-[var(--info)] text-[var(--info-foreground)]'
                  : 'bg-[#d6eaff] text-[#0b3d91]' /* light blue alt */
              }`}
            >
              Completed
            </button>
          )}

          {/* Defaulted */}
          {defaulted !== undefined && (
            <button
              onClick={() => setView('defaulted')}
              className={`px-2.5 py-0.5 rounded-sm text-sm transition-colors ${
                view === 'defaulted'
                  ? 'bg-[var(--destructive)] text-[var(--destructive-foreground)]'
                  : 'bg-[#fde0e0] text-[#7b1f1f]' /* soft red alt */
              }`}
            >
              Defaulted
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyticsCard;
