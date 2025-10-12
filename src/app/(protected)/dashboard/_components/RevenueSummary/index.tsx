/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';

import { fetchRevenueSummary } from '@/slices/dashboard/thunk';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';
import ReactECharts from 'echarts-for-react';

import Input from '@/components/shared/Input';
import Skeleton from '@/components/shared/Skeleton';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

// your custom Input

const RevenueLineChart = () => {
  const dispatch = useAppDispatch();
  const { revenueSummary, revenueSummaryLoading } = useAppSelector((state) => state.Dashboard);
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    dispatch(fetchRevenueSummary(period));
  }, [dispatch, period]);

  if (revenueSummaryLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center border rounded-lg shadow-sm p-6">
        <Skeleton rows={6} columns={1} cellWidth="w-full" cellHeight="h-6" />
      </div>
    );
  }

  if (!revenueSummary) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center border rounded-lg shadow-sm p-6 text-muted-foreground">
        No data available
      </div>
    );
  }

  // Prepare chart data based on period
  const labels = revenueSummary.map((r) => r.label);
  const data = revenueSummary.map((r) => r.total);

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => `${params[0].axisValue}: PKR ${params[0].data.toLocaleString()}`,
    },
    xAxis: {
      type: 'category',
      data: labels,
      axisLabel: { color: 'var(--foreground)' },
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'var(--foreground)', formatter: (val: number) => `PKR ${val}` },
    },
    series: [
      {
        data,
        type: 'line',
        smooth: true,
        areaStyle: { color: 'var(--chart-1)' },
        lineStyle: { color: 'var(--chart-1)', width: 2 },
        symbol: 'circle',
        symbolSize: 6,
      },
    ],
  };

  const periodOptions = [
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'This Year', value: 'year' },
  ];

  return (
    <div className="w-full border rounded-lg shadow-sm p-4">
      <div className="flex justify-end mb-4">
        <div className="w-40">
          {' '}
          {/* Adjust width as needed */}
          <Input
            type="select"
            name="period"
            id="period"
            value={period}
            onChange={(val: string) => {
              if (val === 'week' || val === 'month' || val === 'year') {
                setPeriod(val);
              }
            }}
            options={periodOptions}
            placeholder="Select Period"
          />
        </div>
      </div>

      <ReactECharts
        option={option}
        style={{ height: '400px', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
};

export default RevenueLineChart;
