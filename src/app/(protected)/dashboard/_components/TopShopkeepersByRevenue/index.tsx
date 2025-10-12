/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect } from 'react';

import dashboardThunk from '@/slices/dashboard/thunk';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';
import ReactECharts from 'echarts-for-react';

import Skeleton from '@/components/shared/Skeleton';

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const TopRevenueChart = () => {
  const dispatch = useAppDispatch();
  const { revenueByShopkeepers, revenueByShopkeepersLoading } = useAppSelector(
    (state) => state.Dashboard
  );

  useEffect(() => {
    dispatch(dashboardThunk.fetchRevenueShopkeepers());
  }, [dispatch]);

  if (revenueByShopkeepersLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center border rounded-lg shadow-sm p-6">
        <Skeleton rows={6} columns={1} cellWidth="w-full" cellHeight="h-6" />
      </div>
    );
  }

  if (!revenueByShopkeepers || revenueByShopkeepers.length === 0) {
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
      formatter: (params: any) => {
        const { name, value } = params[0];
        return `<b>${name}</b><br/>Revenue: PKR ${value.toLocaleString()}`;
      },
    },
    grid: {
      left: '0%',
      right: '9%',
      bottom: '5%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      name: 'Revenue',
      axisLine: { show: false },
      splitLine: { lineStyle: { type: 'dashed', color: '#ddd' } },
    },
    yAxis: {
      type: 'category',
      data: revenueByShopkeepers.map((i) => i.shopkeeperName),
      axisLabel: {
        fontSize: 12,
      },
      axisLine: { lineStyle: { color: '#aaa' } },
    },
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        data: revenueByShopkeepers.map((i) => i.totalRevenue),
        itemStyle: {
          color: '#0984e3',
          borderRadius: [0, 6, 6, 0],
        },
        label: {
          show: true,
          position: 'right',
          fontSize: 12,
          color: '#444',
          formatter: (val: any) => `PKR ${val.value.toLocaleString()}`,
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

export default TopRevenueChart;
