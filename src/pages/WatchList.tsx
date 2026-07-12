import React, { useEffect, useState } from 'react';
import { Table, Card, Tag, Switch, Space, Typography } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { useCryptoTables } from '../hooks/useCryptoTables';

const { Title, Text } = Typography;

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  changePercent: number; // growth percentage
  alert: boolean;
  sparklineData: number[]; // price history for chart
}

const Watchlist: React.FC = () => {
  // Sample watchlist data
   
  
const { data } = useCryptoTables();

const [watchlist, setWatchlist] = useState<CoinData[]>([]);
const toggleAlert = (record: CoinData) => {
  setWatchlist((prev) =>
    prev.map((item) =>
      item.id === record.id
        ? { ...item, alert: !item.alert }
        : item
    )
  );
};
useEffect(() => {
  if (Array.isArray(data)) {
    setWatchlist(data);
  }
}, [data]);

  // Helper for growth color
  const getGrowthColor = (value: number) =>
    value >= 0 ? 'text-green-500' : 'text-red-500';

  // Columns definition for Ant Design Table
  const columns = [
    {
      title: 'Coin',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: CoinData) => (
        <Space>
          <span className="font-semibold">{text}</span>
          <Tag color="blue">{record.symbol}</Tag>
        </Space>
      ),
    },
    {
      title: 'Price (USD)',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <Text className="font-mono">
          ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: 'Growth % (24h)',
      dataIndex: 'changePercent',
      key: 'changePercent',
      render: (change: number) => (
        <span className={`font-bold ${getGrowthColor(change)}`}>
          {change > 0 ? '+' : ''}{change.toFixed(2)}%
        </span>
      ),
    },
    {
      title: 'Price Alert',
      dataIndex: 'alert',
      key: 'alert',
      render: (alert: boolean, record: CoinData) => (
        <Switch
          checked={alert}
          onChange={() => toggleAlert(record)}
          checkedChildren={<BellOutlined />}
          unCheckedChildren={<BellOutlined />}
        />
      ),
    },
    {
      title: 'Trend (7d)',
      dataIndex: 'sparklineData',
      key: 'sparkline',
      render: (data: number[]) => {
        const options: ApexOptions = {
          chart: {
            type: 'line',
            sparkline: { enabled: true },
            animations: { enabled: false },
          },
          stroke: { curve: 'smooth', width: 2 },
          colors: ['#1890ff'],
          tooltip: { enabled: false },
        };
        const series = [{ data }];
        return (
          <Chart
            options={options}
            series={series}
            type="line"
            width={120}
            height={40}
          />
        );
      },
    },
  ];

  return (
    <Card className="shadow-lg rounded-2xl p-4 m-4" bordered={false}>
      <Title level={4} className="flex items-center gap-2 mb-4">
        <BellOutlined className="text-blue-500" />
        Watchlist / لیست علاقه‌مندی
      </Title>
      <Table
        dataSource={watchlist}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="border border-gray-100 rounded-lg overflow-hidden"
        rowClassName="hover:bg-gray-50 transition-colors"
      />
    </Card>
  );
};

export default Watchlist;