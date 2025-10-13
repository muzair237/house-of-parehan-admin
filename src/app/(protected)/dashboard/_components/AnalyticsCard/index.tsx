'use client';

import React, { useState } from 'react';

type AnalyticsCardProps = {
  title: string;
  total: number | string;
  paid?: number | string;
  pending?: number | string;
  icon?: React.ReactNode;
};

const AnalyticsCard = ({ title, total, paid, pending, icon }: AnalyticsCardProps) => {
  const [view, setView] = useState<'total' | 'paid' | 'pending'>('total');

  const getValue = () => {
    if (view === 'paid' && paid !== undefined) return paid;
    if (view === 'pending' && pending !== undefined) return pending;
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

      {(paid !== undefined || pending !== undefined) && (
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

          {/* Paid */}
          {paid !== undefined && (
            <button
              onClick={() => setView('paid')}
              className={`px-2.5 py-0.5 rounded-sm text-sm transition-colors ${
                view === 'paid'
                  ? 'bg-[var(--success)] text-[var(--success-foreground)]'
                  : 'bg-[#d5f5d5] text-[#1b5e20]' /* light green alt */
              }`}
            >
              Paid
            </button>
          )}

          {/* Pending */}
          {pending !== undefined && (
            <button
              onClick={() => setView('pending')}
              className={`px-2.5 py-0.5 rounded-sm text-sm transition-colors ${
                view === 'pending'
                  ? 'bg-[var(--destructive)] text-[var(--destructive-foreground)]'
                  : 'bg-[#fde0e0] text-[#7b1f1f]' /* soft red alt */
              }`}
            >
              Pending
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyticsCard;
