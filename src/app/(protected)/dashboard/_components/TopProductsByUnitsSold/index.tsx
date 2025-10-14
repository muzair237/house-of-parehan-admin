'use client';

import React, { useEffect, useMemo } from 'react';

import dashboardThunk from '@/slices/dashboard/thunk';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';
import ReactECharts from 'echarts-for-react';

import Skeleton from '@/components/shared/Skeleton';

const TopProductsChart = () => {
  const dispatch = useAppDispatch();
  const { topProducts, topProductsLoading } = useAppSelector((state) => state.Dashboard);

  useEffect(() => {
    dispatch(dashboardThunk.fetchTopProductsByUnitSold());
  }, [dispatch]);

  const option = useMemo(() => {
    if (!topProducts || topProducts.length === 0) {
      return {};
    }

    return {
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
          return `<b>${name}</b><br/>Units Sold: ${value}`;
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
        name: 'Units Sold',
        axisLine: { show: false },
        splitLine: { lineStyle: { type: 'dashed', color: '#ddd' } },
      },
      yAxis: {
        type: 'category',
        data: topProducts.map((i) => i.productName),
        axisLabel: { fontSize: 12 },
        axisLine: { lineStyle: { color: '#aaa' } },
      },
      series: [
        {
          name: 'Units Sold',
          type: 'bar',
          data: topProducts.map((i) => i.unitsSold),
          itemStyle: {
            color: 'var(--chart-1)',
            borderRadius: [0, 6, 6, 0],
            transition: 'color 0.3s ease',
          },
          emphasis: {
            itemStyle: {
              color: 'var(--chart-1-hover)',
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.15)',
            },
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
  }, [topProducts]);

  // ✅ Now safely use conditional returns
  if (topProductsLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center border rounded-lg shadow-sm p-6">
        <Skeleton rows={6} columns={1} cellWidth="w-full" cellHeight="h-6" />
      </div>
    );
  }

  if (!topProducts || topProducts.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center border rounded-lg shadow-sm p-6 text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] border rounded-lg shadow-sm p-4">
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};

export default TopProductsChart;
