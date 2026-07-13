// PriceChart.tsx
import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import type { PricePoint } from './data/types';

interface PriceChartProps {
    data: PricePoint[];
    height?: number;
}

export const PriceChart: React.FC<PriceChartProps> = ({ data, height = 320 }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<ApexCharts | null>(null);

    useEffect(() => {
        if (!chartRef.current || !data.length) return;

        const options: ApexCharts.ApexOptions = {
            series: [
                {
                    name: 'Price',
                    data: data,
                    type: 'area',
                },
            ],
            chart: {
                type: 'area',
                height: height,
                background: 'transparent',
                toolbar: { show: false },
                zoom: { enabled: false },
                animations: {
                    enabled: true,
                    // easing: 'easeinout',   // removed to avoid TS error
                    speed: 800,
                },
                fontFamily: 'Inter, system-ui, sans-serif',
            },
            dataLabels: { enabled: false },
            stroke: {
                curve: 'smooth',
                width: 2.5,
                colors: ['#f7931a'],
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.35,
                    opacityTo: 0.02,
                    stops: [0, 90, 100],
                },
            },
            grid: {
                borderColor: 'rgba(0,0,0,0.06)',
                strokeDashArray: 4,
                xaxis: { lines: { show: false } },
                yaxis: { lines: { show: true } },
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    style: { colors: '#555', fontSize: '11px' },
                    datetimeUTC: false,
                    format: 'dd MMM',
                },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            yaxis: {
                labels: {
                    style: { colors: '#555', fontSize: '11px' },
                    formatter: (val: number) => '$' + val.toFixed(0),
                },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            tooltip: {
                theme: 'light',
                x: {
                    format: 'dd MMM yyyy',
                },
                y: {
                    formatter: (val: number) => '$' + val.toFixed(2),
                },
            },
            markers: {
                size: 0,
                hover: { size: 6 },
            },
            colors: ['#f7931a'],
        };

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new ApexCharts(chartRef.current, options);
        chartInstance.current.render();

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [data, height]);

    return <div ref={chartRef} className="w-full" />;
};