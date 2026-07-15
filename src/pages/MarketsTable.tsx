import React, { useState } from "react";
import { Table } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import ReactApexChart from "react-apexcharts";
import type { ColumnsType } from "antd/es/table";

import { useCryptomarket } from "../hooks/useCryptoMarket";
import type { Cryptomarket } from "../services/cryptoMarket";

const MarketsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, pagination, isLoading } = useCryptomarket(page, pageSize);

  const columns: ColumnsType<Cryptomarket> = [
    {
      title: "Coin",
      dataIndex: "coin",
      key: "coin",
      render: (coin) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
            {coin.symbol.slice(0, 2)}
          </div>

          <div>
            <div className="font-semibold">{coin.name}</div>
            <div className="text-xs text-gray-500">{coin.symbol}</div>
          </div>
        </div>
      ),
      sorter: (a, b) => a.coin.name.localeCompare(b.coin.name),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${Number(price).toLocaleString()}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Market Cap",
      dataIndex: "marketCap",
      key: "marketCap",
      render: (value) => `$${Number(value).toLocaleString()}`,
      sorter: (a, b) => a.marketCap - b.marketCap,
    },
    {
      title: "Volume (24h)",
      dataIndex: "volume",
      key: "volume",
      render: (value) => `$${Number(value).toLocaleString()}`,
      sorter: (a, b) => a.volume - b.volume,
    },
    {
      title: "Circulating Supply",
      dataIndex: "circulatingSupply",
      key: "circulatingSupply",
      render: (value) => Number(value).toLocaleString(),
      sorter: (a, b) => a.circulatingSupply - b.circulatingSupply,
    },
    {
      title: "ATH",
      dataIndex: "ath",
      key: "ath",
      render: (value) => `$${Number(value).toLocaleString()}`,
      sorter: (a, b) => a.ath - b.ath,
    },
    {
      title: "ATL",
      dataIndex: "atl",
      key: "atl",
      render: (value) => `$${Number(value).toLocaleString()}`,
      sorter: (a, b) => a.atl - b.atl,
    },
    {
      title: "Change (7d)",
      dataIndex: "change",
      key: "change",
      render: (change: number[]) => {
        const first = change[0];
        const last = change[change.length - 1];

        const percentChange = ((last - first) / first) * 100;
        const isPositive = percentChange >= 0;

        const options: ApexCharts.ApexOptions = {
          chart: {
            type: "line",
            sparkline: { enabled: true },
            toolbar: { show: false },
            animations: { enabled: false },
          },
          stroke: {
            width: 2,
            curve: "smooth",
            colors: [isPositive ? "#10b981" : "#ef4444"],
          },
          tooltip: { enabled: false },
          grid: { show: false },
          xaxis: { labels: { show: false } },
          yaxis: { labels: { show: false } },
        };

        return (
          <div className="flex items-center gap-3">
            <ReactApexChart
              type="line"
              width={80}
              height={40}
              options={options}
              series={[{ data: change }]}
            />

            <div
              className={`flex items-center gap-1 ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? <CaretUpOutlined /> : <CaretDownOutlined />}
              {Math.abs(percentChange).toFixed(2)}%
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">📊 Markets</h2>

      <Table
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
        pagination={{
          current: page,
          pageSize,
          total: pagination?.total ?? 0,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
          onChange: (newPage, newPageSize) => {
            setPage(newPage);
            setPageSize(newPageSize);
          },
        }}
      />
    </div>
  );
};

export default MarketsTable;