import React from "react";
import ApexCharts from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface PriceChartProps {
  symbol: string;
  chartData: Array<{
    x: string;
    y: number;
  }>;
}

const PriceChart: React.FC<PriceChartProps> = ({
  symbol,
  chartData,
}) => {
  const getChartColor = (symbol: string) => {
    switch (symbol.toUpperCase()) {
      case "BTC":
        return "#F7931A";
      case "ETH":
        return "#627EEA";
      case "BNB":
        return "#F3BA2F";
      case "SOL":
        return "#14F195";
      default:
        return "#6366F1";
    }
  };

  const getSymbolIcon = (symbol: string) => {
    switch (symbol.toUpperCase()) {
      case "BTC":
        return "₿";
      case "ETH":
        return "⟠";
      case "BNB":
        return "🟡";
      case "SOL":
        return "◎";
      default:
        return "💰";
    }
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
      },
      background: "transparent",
      fontFamily: "Vazirmatn",
    },

    stroke: {
      curve: "smooth",
      width: 3,
    },

    colors: [getChartColor(symbol)],

    xaxis: {
      type: "category",
      categories: chartData.map((item) => item.x),
      labels: {
        rotate: -45,
        style: {
          fontSize: "10px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      labels: {
        formatter: (value) => `$${value.toLocaleString()}`,
        style: {
          fontSize: "10px",
        },
      },
    },

    grid: {
      borderColor: "rgba(0,0,0,0.08)",
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },

    tooltip: {
      theme: "dark",
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },

    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 220,
          },
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: symbol,
      data: chartData.map((item) => item.y),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {symbol} Price (Last 30 Days)
        </h2>

        <span className="text-sm flex items-center gap-2 text-gray-500 dark:text-gray-400">
          {getSymbolIcon(symbol)} Live
        </span>
      </div>

      <ApexCharts
        options={chartOptions}
        series={series}
        type="line"
        height={260}
      />
    </div>
  );
};

export default PriceChart;