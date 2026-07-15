// Components/Asset/PriceChart.tsx
import React, { useState, useMemo } from "react";
import { Card, Radio, Select, Space } from "antd";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { FaChartLine } from "react-icons/fa";
import { usePriceChart } from "../../../hooks/usePriceChart";

const { Option } = Select;



interface PriceChartProps {
  isMobile?: boolean;
}

const PriceChart: React.FC<PriceChartProps> = ({ isMobile = false }) => {
  const [chartType, setChartType] = useState<"line" | "area" | "candlestick">("area");
const [chartRange, setChartRange] = useState("30d");

const { data: priceChartAssetChart } = usePriceChart();
const chartData = useMemo(() => {
  if (!priceChartAssetChart) return [];

  return priceChartAssetChart[
    chartRange as keyof typeof priceChartAssetChart
  ] ?? [];
}, [priceChartAssetChart, chartRange]);
  const chartOptions = useMemo<ApexOptions>(() => {
    const isCandle = chartType === "candlestick";
    const isArea = chartType === "area";

    return {
      chart: {
        type: chartType,
        background: "transparent",
        foreColor: "#64748b",
        toolbar: {
          show: !isMobile,
        },
        animations: {
          enabled: true,
        },
      },

      colors: ["#F7931A"],

      stroke: {
        curve: "smooth",
        width: isCandle ? 1 : 3,
        lineCap: "round",
      },

      fill: {
        type: isArea ? "gradient" : "solid",
        opacity: isArea ? undefined : 1,
        gradient: isArea
          ? {
              shade: "light",
              type: "vertical",
              shadeIntensity: 0.4,
              opacityFrom: 0.45,
              opacityTo: 0.05,
              stops: [0, 100],
            }
          : undefined,
      },

      plotOptions: {
        candlestick: {
          colors: {
            upward: "#16a34a",
            downward: "#dc2626",
          },
        },
      },

      dataLabels: {
        enabled: false,
      },

      markers: {
        size: isArea || chartType === "line" ? 0 : 2,
      },

      xaxis: {
        type: "datetime",
        categories: chartData.map((item:any) => item.x),
        labels: {
          format: "dd MMM",
        },
      },

      yaxis: {
        labels: {
          formatter: (v: number) => `$${v.toLocaleString()}`,
        },
      },

      tooltip: {
        theme: "dark",
        y: {
          formatter: (val: number) => `$${val.toLocaleString()}`,
        },
      },
    };
  }, [chartType, chartData, isMobile]);

  const chartSeries = [
    {
      name: "BTC/USD",
      data: chartData.map((d:any) => d.y),
    },
  ];

  return (
    <Card
      title={
        <Space>
          <FaChartLine />
          <span>Price Chart</span>
        </Space>
      }
      extra={
        <Space size={isMobile ? "small" : "middle"}>
          <Radio.Group
            value={chartType}
            onChange={(e) => setChartType(e.target.value as "line" | "area" | "candlestick")}
            size={isMobile ? "small" : "middle"}
            buttonStyle="solid"
          >
            <Radio.Button value="line">Line</Radio.Button>
            <Radio.Button value="area">Area</Radio.Button>
            {!isMobile && <Radio.Button value="candlestick">Candle</Radio.Button>}
          </Radio.Group>

          <Select
            value={chartRange}
            onChange={setChartRange}
            size={isMobile ? "small" : "middle"}
            style={{ width: isMobile ? 70 : 80 }}
          >
            <Option value="7d">7D</Option>
            <Option value="14d">14D</Option>
            <Option value="30d">30D</Option>
            <Option value="90d">90D</Option>
            <Option value="1y">1Y</Option>
          </Select>
        </Space>
      }
      style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
    >
      <Chart
        key={chartType + chartRange}
        options={chartOptions}
        series={chartSeries}
        type={chartType}
        height={isMobile ? 250 : 350}
      />
    </Card>
  );
};

export default PriceChart;