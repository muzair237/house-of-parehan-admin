'use client';

import React, { useEffect } from 'react';

import dashboardThunk from '@/slices/dashboard/thunk';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';
import ReactECharts from 'echarts-for-react';

import Skeleton from '@/components/shared/Skeleton';

const TopShopkeepersChart = () => {
  const dispatch = useAppDispatch();
  const { topShopkeepers, topShopkeepersLoading } = useAppSelector((state) => state.Dashboard);

  useEffect(() => {
    dispatch(dashboardThunk.fetchTopShopkeepers());
  }, [dispatch]);

  if (topShopkeepersLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center border rounded-lg shadow-sm p-6">
        <Skeleton rows={6} columns={1} cellWidth="w-full" cellHeight="h-6" />
      </div>
    );
  }

  if (!topShopkeepers || topShopkeepers.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center border rounded-lg shadow-sm p-6 text-muted-foreground">
        No data available
      </div>
    );
  }

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#fff',
      borderColor: '#ddd',
      borderWidth: 1,
      textStyle: { color: '#333' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        const { name, value } = params[0];
        return `<b>${name}</b><br/>Active Installments: ${value}`;
      },
    },
    grid: {
      left: '0%',
      right: '16%',
      bottom: '5%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      name: 'Active Installments',
      axisLine: { show: false },
      splitLine: { lineStyle: { type: 'dashed', color: '#ddd' } },
    },
    yAxis: {
      type: 'category',
      data: topShopkeepers.map((i) => i.shopkeeperName),
      axisLabel: {
        fontSize: 12,
      },
      axisLine: { lineStyle: { color: '#aaa' } },
    },
    series: [
      {
        name: 'Active Installments',
        type: 'bar',
        data: topShopkeepers.map((i) => i.activeInstallments),
        itemStyle: {
          color: '#6c5ce7', // different color (purple shade for contrast)
          borderRadius: [0, 6, 6, 0],
        },
        label: {
          show: true,
          position: 'right',
          fontSize: 12,
          color: '#444',
        },
      },
    ],
  };

  return (
    <div className="w-full h-[400px] border rounded-lg shadow-sm p-4">
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
};

export default TopShopkeepersChart;
