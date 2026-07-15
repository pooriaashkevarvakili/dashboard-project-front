import React from "react";
import { Card, Typography, Alert } from "antd";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import type { ApexOptions } from "apexcharts";
import type { Transaction } from "./types/types";
import { useWeek } from "../../../hooks/useWeek";
import { useChartSeries } from "../../../hooks/useChartSeries";

const { Title } = Typography;

interface VolumeChartProps {
  filteredTransactions: Transaction[];
}

const VolumeChart: React.FC<VolumeChartProps> = ({
  filteredTransactions,
}) => {
  const { data: week } = useWeek();

  const { data: chartSeriesNumber } = useChartSeries("1W");

  const chartData = React.useMemo(() => {
    return {
      dates: filteredTransactions.map((tx) =>
        dayjs(tx.date).format("MM/DD HH:mm")
      ),
      volume: filteredTransactions.map((tx) => tx.total),
    };
  }, [filteredTransactions]);

  if (chartData.dates.length === 0) {
    return (
      <Card>
        <Title level={4}>Transaction Volume</Title>
        <Alert
          message="No data available"
          type="warning"
        />
      </Card>
    );
  }

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: week?.map((item: any) => item.week) ?? [],
    },
  };

  return (
    <Card>
      <Title level={4}>Transaction Volume</Title>

      <Chart
        type="line"
        height={320}
        options={options}
        series={[
          {
            name: "Price",
            data:
              chartSeriesNumber?.map(
                (item: any) => item.priceChart
              ) ?? [],
          },
        ]}
      />
    </Card>
  );
};

export default VolumeChart;