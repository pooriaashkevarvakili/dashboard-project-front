import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import type { HolderSegment } from './data/types';

interface HoldersChartProps {
    data: HolderSegment[];
    height?: number;
}

const HoldersChart: React.FC<HoldersChartProps> = ({ data, height = 260 }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<ApexCharts | null>(null);

    useEffect(() => {
        if (!chartRef.current || !data.length) return;

        const colors = data.map((d) => d.color);
        const labels = data.map((d) => d.label);
        const series = data.map((d) => d.value);

        const options: ApexCharts.ApexOptions = {
            series: series,
            chart: {
                type: 'donut',
                height: height,
                background: 'transparent',
                fontFamily: 'Inter, system-ui, sans-serif',
                animations: {
                    enabled: true,
                    speed: 600,
                    // easing removed to avoid older type issues
                },
            },
            labels: labels,
            colors: colors,
            stroke: { show: false },
            dataLabels: { enabled: false },
            legend: {
                position: 'bottom',
                fontSize: '12px',
                fontFamily: 'Inter, system-ui, sans-serif',
                labels: {
                    colors: '#333',
                },
                markers: {
                    size: 10,
                    shape: 'circle',
                },
                itemMargin: { horizontal: 12, vertical: 6 },
            },
            plotOptions: {
                pie: {                                 // ✅ correct parent key
                    donut: {                           // ✅ nested as expected
                        size: '72%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '14px',
                                color: '#333',
                            },
                            value: {
                                show: true,
                                fontSize: '20px',
                                color: '#111',
                                fontWeight: 600,
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#555',
                                fontSize: '12px',
                                formatter: () => '100%',
                            },
                        },
                    },
                },
            },
            tooltip: {
                theme: 'light',
                y: {
                    formatter: (val: number) => val + '%',
                },
            },
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

export default HoldersChart;