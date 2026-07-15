// Components/Asset/PriceChart.tsx
import React, { useState, useMemo } from "react";
import {
  Card,
  Radio,
  Select,
  Space,
} from "antd";
import Chart from "react-apexcharts";
import { FaChartLine } from "react-icons/fa";

const { Option } = Select;

// ==================== داده‌های ثابت (Hardcoded) ====================
const staticChartData: Record<string, { x: string; y: number }[]> = {
  "7d": [
    { x: "2025-06-29", y: 64250 }, { x: "2025-06-30", y: 64890 },
    { x: "2025-07-01", y: 65520 }, { x: "2025-07-02", y: 64980 },
    { x: "2025-07-03", y: 66210 }, { x: "2025-07-04", y: 67150 },
    { x: "2025-07-05", y: 66840 },
  ],
  "14d": [
    { x: "2025-06-22", y: 61800 }, { x: "2025-06-23", y: 62350 },
    { x: "2025-06-24", y: 63120 }, { x: "2025-06-25", y: 62780 },
    { x: "2025-06-26", y: 63540 }, { x: "2025-06-27", y: 64250 },
    { x: "2025-06-28", y: 64890 }, { x: "2025-06-29", y: 64250 },
    { x: "2025-06-30", y: 64890 }, { x: "2025-07-01", y: 65520 },
    { x: "2025-07-02", y: 64980 }, { x: "2025-07-03", y: 66210 },
    { x: "2025-07-04", y: 67150 }, { x: "2025-07-05", y: 66840 },
  ],
  "30d": [
    { x: "2025-06-06", y: 59200 }, { x: "2025-06-07", y: 59850 },
    { x: "2025-06-08", y: 60510 }, { x: "2025-06-09", y: 60180 },
    { x: "2025-06-10", y: 61240 }, { x: "2025-06-11", y: 61980 },
    { x: "2025-06-12", y: 61520 }, { x: "2025-06-13", y: 62450 },
    { x: "2025-06-14", y: 63100 }, { x: "2025-06-15", y: 63890 },
    { x: "2025-06-16", y: 64560 }, { x: "2025-06-17", y: 64210 },
    { x: "2025-06-18", y: 65180 }, { x: "2025-06-19", y: 65840 },
    { x: "2025-06-20", y: 66420 }, { x: "2025-06-21", y: 65980 },
    { x: "2025-06-22", y: 61800 }, { x: "2025-06-23", y: 62350 },
    { x: "2025-06-24", y: 63120 }, { x: "2025-06-25", y: 62780 },
    { x: "2025-06-26", y: 63540 }, { x: "2025-06-27", y: 64250 },
    { x: "2025-06-28", y: 64890 }, { x: "2025-06-29", y: 64250 },
    { x: "2025-06-30", y: 64890 }, { x: "2025-07-01", y: 65520 },
    { x: "2025-07-02", y: 64980 }, { x: "2025-07-03", y: 66210 },
    { x: "2025-07-04", y: 67150 }, { x: "2025-07-05", y: 66840 },
  ],
  "90d": [
    { x: "2025-04-07", y: 58200 }, { x: "2025-04-08", y: 58950 },
    { x: "2025-04-09", y: 59510 }, { x: "2025-04-10", y: 59180 },
    { x: "2025-04-11", y: 60240 }, { x: "2025-04-12", y: 61230 },
    { x: "2025-04-13", y: 60890 }, { x: "2025-04-14", y: 61850 },
    { x: "2025-04-15", y: 62500 }, { x: "2025-04-16", y: 63120 },
    { x: "2025-04-17", y: 62890 }, { x: "2025-04-18", y: 63540 },
    { x: "2025-04-19", y: 64210 }, { x: "2025-04-20", y: 64870 },
    { x: "2025-04-21", y: 65520 }, { x: "2025-04-22", y: 65180 },
    { x: "2025-04-23", y: 65900 }, { x: "2025-04-24", y: 66450 },
    { x: "2025-04-25", y: 67120 }, { x: "2025-04-26", y: 66780 },
    { x: "2025-04-27", y: 67490 }, { x: "2025-04-28", y: 68210 },
    { x: "2025-04-29", y: 67850 }, { x: "2025-04-30", y: 68540 },
    { x: "2025-05-01", y: 69200 }, { x: "2025-05-02", y: 68890 },
    { x: "2025-05-03", y: 69560 }, { x: "2025-05-04", y: 70120 },
    { x: "2025-05-05", y: 69840 }, { x: "2025-05-06", y: 70480 },
    { x: "2025-05-07", y: 71250 }, { x: "2025-05-08", y: 70910 },
    { x: "2025-05-09", y: 71680 }, { x: "2025-05-10", y: 72340 },
    { x: "2025-05-11", y: 71980 }, { x: "2025-05-12", y: 72750 },
    { x: "2025-05-13", y: 73420 }, { x: "2025-05-14", y: 73100 },
    { x: "2025-05-15", y: 73890 }, { x: "2025-05-16", y: 74560 },
    { x: "2025-05-17", y: 74210 }, { x: "2025-05-18", y: 74980 },
    { x: "2025-05-19", y: 75640 }, { x: "2025-05-20", y: 75320 },
    { x: "2025-05-21", y: 76150 }, { x: "2025-05-22", y: 76890 },
    { x: "2025-05-23", y: 76540 }, { x: "2025-05-24", y: 77280 },
    { x: "2025-05-25", y: 77950 }, { x: "2025-05-26", y: 77610 },
    { x: "2025-05-27", y: 78340 }, { x: "2025-05-28", y: 79020 },
    { x: "2025-05-29", y: 78780 }, { x: "2025-05-30", y: 79510 },
    { x: "2025-05-31", y: 80250 }, { x: "2025-06-01", y: 79980 },
    { x: "2025-06-02", y: 80720 }, { x: "2025-06-03", y: 81460 },
    { x: "2025-06-04", y: 81190 }, { x: "2025-06-05", y: 81950 },
    { x: "2025-06-06", y: 59200 }, { x: "2025-06-07", y: 59850 },
    { x: "2025-06-08", y: 60510 }, { x: "2025-06-09", y: 60180 },
    { x: "2025-06-10", y: 61240 }, { x: "2025-06-11", y: 61980 },
    { x: "2025-06-12", y: 61520 }, { x: "2025-06-13", y: 62450 },
    { x: "2025-06-14", y: 63100 }, { x: "2025-06-15", y: 63890 },
    { x: "2025-06-16", y: 64560 }, { x: "2025-06-17", y: 64210 },
    { x: "2025-06-18", y: 65180 }, { x: "2025-06-19", y: 65840 },
    { x: "2025-06-20", y: 66420 }, { x: "2025-06-21", y: 65980 },
    { x: "2025-06-22", y: 61800 }, { x: "2025-06-23", y: 62350 },
    { x: "2025-06-24", y: 63120 }, { x: "2025-06-25", y: 62780 },
    { x: "2025-06-26", y: 63540 }, { x: "2025-06-27", y: 64250 },
    { x: "2025-06-28", y: 64890 }, { x: "2025-06-29", y: 64250 },
    { x: "2025-06-30", y: 64890 }, { x: "2025-07-01", y: 65520 },
    { x: "2025-07-02", y: 64980 }, { x: "2025-07-03", y: 66210 },
    { x: "2025-07-04", y: 67150 }, { x: "2025-07-05", y: 66840 },
  ],
  "1y": [
    { x: "2024-07-05", y: 56800 }, { x: "2024-10-05", y: 61250 },
    { x: "2024-12-05", y: 67890 }, { x: "2025-01-05", y: 71240 },
    { x: "2025-02-05", y: 68950 }, { x: "2025-03-05", y: 72180 },
    { x: "2025-04-05", y: 69560 }, { x: "2025-05-05", y: 73420 },
    { x: "2025-06-05", y: 65200 }, { x: "2025-06-15", y: 63890 },
    { x: "2025-06-20", y: 66420 }, { x: "2025-06-25", y: 62780 },
    { x: "2025-07-01", y: 65520 }, { x: "2025-07-05", y: 66840 },
  ],
};

interface PriceChartProps {
  isMobile?: boolean;
}

const PriceChart: React.FC<PriceChartProps> = ({ isMobile = false }) => {
  const [chartType, setChartType] = useState<"line" | "area" | "candlestick">("area");
  const [chartRange, setChartRange] = useState<string>("30d");

  const chartData = useMemo(() => {
    return staticChartData[chartRange] || staticChartData["30d"];
  }, [chartRange]);

  const chartSeries = useMemo(() => [
    {
      name: "Bitcoin Price (USD)",
      data: chartData,
    },
  ], [chartData]);

  const chartOptions: any = useMemo(() => ({
    chart: {
      type: chartType,
      toolbar: { show: true },
      zoom: { enabled: true },
    },
    xaxis: {
      type: "datetime",
      labels: { format: "dd MMM" },
    },
    yaxis: {
      title: { text: "Price (USD)" },
      labels: {
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
    },
    stroke: {
      curve: "smooth",
      width: chartType === "line" ? 3 : 2,
    },
    fill: {
      type: chartType === "area" ? "gradient" : "solid",
      gradient: {
        shadeIntensity: 0.4,
        opacityFrom: 0.7,
        opacityTo: 0.1,
      },
    },
    colors: ["#f7931a"],
    grid: {
      borderColor: "#f0f0f0",
    },
    dataLabels: { enabled: false },
  }), [chartType]);

  return (
    <Card
      title={
        <Space>
          <FaChartLine />
          <span>Price Chart</span>
        </Space>
      }
      extra={
        <Space>
          <Radio.Group
            value={chartType}
            onChange={(e) => setChartType(e.target.value as "line" | "area" | "candlestick")}
          >
            <Radio.Button value="line">Line</Radio.Button>
            <Radio.Button value="area">Area</Radio.Button>
            {!isMobile && <Radio.Button value="candlestick">Candle</Radio.Button>}
          </Radio.Group>

          <Select
            value={chartRange}
            onChange={setChartRange}
            style={{ width: 90 }}
          >
            <Option value="7d">7D</Option>
            <Option value="14d">14D</Option>
            <Option value="30d">30D</Option>
            <Option value="90d">90D</Option>
            <Option value="1y">1Y</Option>
          </Select>
        </Space>
      }
    >
      <Chart
        options={chartOptions}
        series={chartSeries}
        type={chartType === "candlestick" ? "candlestick" : chartType}
        height={isMobile ? 250 : 350}
      />
    </Card>
  );
};

export default PriceChart;