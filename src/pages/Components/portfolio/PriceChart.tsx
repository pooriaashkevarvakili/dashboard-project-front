import { Card, Button, Space } from "antd";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useState } from "react";

import type { Timeframe } from "../../../types/Timeframe";
import { useWeek } from "../../../hooks/useWeek";
import { useChartSeries } from "../../../hooks/useChartSeries";

export default function PriceChart() {
  const [timeframe, setTimeframe] = useState<Timeframe>("1W");
  const { data: chartSeriesNumber } = useChartSeries(timeframe);
  const { data: week } = useWeek();

  const chartData = {
    series: [
      {
        name: "BTC/USDT",
        data: chartSeriesNumber?.map((item: any) => item.priceChart) ?? [],
      },
    ],
    options: {
      chart: {
        type: "area",
        toolbar: { show: false },
        zoom: { enabled: false },
        background: "transparent",
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      colors: ["#f7931a"],
      fill: {
        type: "gradient",
        gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1 },
      },
      xaxis: {
        categories: week?.map((item: any) => item.week) ?? [],
        labels: { style: { colors: "#8c8c8c" } },
      },
      yaxis: {
        labels: {
          formatter: (val: number) => `$${val.toLocaleString()}`,
          style: { colors: "#8c8c8c" },
        },
      },
      tooltip: {
        theme: "dark",
        y: { formatter: (val: number) => `$${val.toLocaleString()}` },
      },
      grid: {
        borderColor: "#2a2a2a",
        strokeDashArray: 4,
      },
    } as ApexOptions,
  };

  return (
    <Card
      title={
        <div className="flex justify-between items-center">
          <span>BTC/USDT Price Chart</span>
          <Space>
            {(["1D", "1W", "1M", "1Y"] as Timeframe[]).map((item) => (
              <Button
                key={item}
                size="small"
                type={timeframe === item ? "primary" : "default"}
                onClick={() => setTimeframe(item)}
              >
                {item}
              </Button>
            ))}
          </Space>
        </div>
      }
      className="shadow-sm"
    >
      <Chart
        type="area"
        height={300}
        series={chartData.series}
        options={chartData.options}
      />
    </Card>
  );
}