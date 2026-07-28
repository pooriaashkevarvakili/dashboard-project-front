// components/PerformanceChart.tsx
import React from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { Trader } from "../../../types/Trade";

interface Props {
  trader: Trader;
  height?: number;
}

export const PerformanceChart: React.FC<Props> = ({ trader, height = 48 }) => {
  const options: ApexOptions = {
    chart: {
      type: "area",
      height,
      toolbar: { show: false },
      background: "transparent",
    },
    stroke: { curve: "smooth", width: 2 },
    fill: { type: "gradient", gradient: { opacityFrom: 0.6, opacityTo: 0.1 } },
    colors: [trader.totalPnL >= 0 ? "#10b981" : "#ef4444"],
    xaxis: { labels: { show: false } },
    yaxis: { labels: { show: false } },
    grid: { show: false },
    tooltip: { theme: "dark" },
  };

  return (
    <ReactApexChart
      options={options}
      series={[
        { name: "Value", data: trader.performanceData.map((d) => d.value) },
      ]}
      type="area"
      height={height}
    />
  );
};
