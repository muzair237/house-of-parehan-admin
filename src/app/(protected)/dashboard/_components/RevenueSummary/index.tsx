/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { fetchRevenueSummary } from '@/slices/dashboard/thunk';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';
import ReactECharts from 'echarts-for-react';

import Input from '@/components/shared/Input';
import Skeleton from '@/components/shared/Skeleton';

import { formatCurrency } from '@/lib/utils/helper';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const RevenueLineChart = () => {
  const dispatch = useAppDispatch();
  const { revenueSummary, revenueSummaryLoading } = useAppSelector((state) => state.Dashboard);
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    dispatch(fetchRevenueSummary(period));
  }, [dispatch, period]);

  const labels = useMemo(() => revenueSummary?.map((r) => r.label) || [], [revenueSummary]);
  const data = useMemo(() => revenueSummary?.map((r) => r.total) || [], [revenueSummary]);

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        textStyle: { color: '#333' },
        formatter: (params: any) =>
          `${params[0].axisValue}: <b>PKR ${formatCurrency(params[0].data)}</b>`,
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: labels,
        boundaryGap: false,
        axisLabel: { color: 'var(--foreground)' },
        axisLine: { lineStyle: { color: 'var(--muted-foreground)' } },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: 'var(--foreground)',
          formatter: (val: number) => `PKR ${formatCurrency(val)}`,
        },
        splitLine: {
          lineStyle: { type: 'dashed', color: 'var(--muted)' },
        },
      },
      series: [
        {
          name: 'Revenue',
          data,
          type: 'line',
          smooth: true,
          lineStyle: { color: 'var(--chart-1)', width: 2 },
          areaStyle: {
            color: 'var(--chart-1)',
            opacity: 0.2,
          },
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: {
            color: 'var(--chart-1)',
          },
          emphasis: {
            itemStyle: {
              color: 'var(--chart-1-hover)',
              borderColor: 'var(--chart-1-hover)',
              borderWidth: 2,
            },
            lineStyle: {
              color: 'var(--chart-1-hover)',
              width: 3,
            },
            areaStyle: {
              color: 'var(--chart-1-hover)',
              opacity: 0.3,
            },
          },
        },
      ],
    }),
    [labels, data]
  );

  const periodOptions = [
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'This Year', value: 'year' },
  ];

  if (revenueSummaryLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center border rounded-lg shadow-sm p-6">
        <Skeleton rows={1} columns={1} cellWidth="w-370" cellHeight="h-70" />
      </div>
    );
  }

  if (!revenueSummary || revenueSummary.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center border rounded-lg shadow-sm p-6 text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full border rounded-lg shadow-sm p-4">
      <div className="flex justify-end mb-4">
        <div className="w-40">
          <Input
            type="select"
            name="period"
            id="period"
            value={period}
            onChange={(val: string) => {
              if (val === 'week' || val === 'month' || val === 'year') setPeriod(val);
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
        notMerge
        lazyUpdate
      />
    </div>
  );
};

export default RevenueLineChart;
