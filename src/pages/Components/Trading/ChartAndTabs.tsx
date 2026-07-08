import { Card, Tabs, Table, Tag, Badge } from 'antd';
import {
  OrderedListOutlined,
  HistoryOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

import { useOrderTable } from '../../../hooks/useorderTable';
import { useHistoryTable } from '../../../hooks/useHistoryTable';
import { usePositionColumnsTable } from '../../../hooks/usePositionColumnsTable';
import { useChartCanslick } from '../../../hooks/useChartCanslick';

const { TabPane } = Tabs;

const ChartAndTabs: React.FC = () => {

  const { data: Orders } = useOrderTable();
  const { data: orderHistory } = useHistoryTable();
  const { data: positionOrderTable } = usePositionColumnsTable();
  const { data: chartCanslick } = useChartCanslick();

  // ---------- Chart Component ----------
  const ChartComponent: React.FC<{ data: any[] }> = ({ data }) => {
    const chartOptions: ApexOptions = {
      chart: {
        type: 'candlestick',
        height: 380,
        background: 'transparent',
        toolbar: {
          show: true,
          tools: {
            download: false,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
          autoSelected: 'zoom',
        },
        animations: {
          enabled: true,
          dynamicAnimation: { enabled: true, speed: 1000 },
        },
        zoom: { enabled: true, type: 'x', autoScaleYaxis: true },
      },
      title: {
        text: 'BTC/USDT · 1m',
        align: 'right',
        style: { color: '#1e2329', fontSize: '14px', fontWeight: '500' },
      },
      xaxis: {
        type: 'datetime',
        labels: { style: { colors: '#555', fontSize: '10px' } },
        axisBorder: { color: '#ddd' },
        axisTicks: { color: '#ddd' },
      },
      yaxis: {
        labels: { style: { colors: '#555', fontSize: '10px' } },
        opposite: true,
        tooltip: { enabled: true },
      },
      grid: {
        borderColor: '#e8e8e8',
        strokeDashArray: 2,
        row: { colors: ['transparent'], opacity: 0.5 },
      },
      plotOptions: {
        candlestick: {
          colors: { upward: '#0ecb81', downward: '#f84960' },
          wick: { useFillColor: true },
        },
      },
      tooltip: { theme: 'light', x: { show: true } },
    };

    const series = [
      {
        name: 'BTC/USDT',
        data: data?.map((item: any) => ({
          x: new Date(item.time),
          y: [item.open, item.high, item.low, item.close],
        })) ?? [],
      },
    ];

    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-[380px] text-gray-500">
          در حال بارگذاری داده‌های نمودار...
        </div>
      );
    }

    return (
      <Chart
        options={chartOptions}
        series={series}
        type="candlestick"
        height={380}
      />
    );
  };

  // ---------- Table Columns ----------
  const orderColumns = [
    { title: 'شماره سفارش', dataIndex: 'name', key: 'name', width: 120 },
    {
      title: 'طرف',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      render: (type: string) => (
        <Tag color={type === 'Buy' ? 'green' : 'red'} className="!m-0">
          {type === 'Buy' ? 'خرید' : 'فروش'}
        </Tag>
      ),
    },
    { title: 'قیمت (USDT)', dataIndex: 'price', key: 'price', width: 120 },
    { title: 'مقدار', dataIndex: 'amount', key: 'amount', width: 90 },
    { title: 'جمع', dataIndex: 'total', key: 'total', width: 120 },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: boolean) => (
        <Tag color={status ? 'green' : 'red'} className="!m-0">
          {status ? 'تکمیل شده' : 'لغو شده'}
        </Tag>
      ),
    },
    { title: 'زمان', dataIndex: 'time', key: 'time', width: 180 },
  ];

  const positionColumns = [
    { title: 'نماد', dataIndex: 'symbol', key: 'symbol', width: 90 },
    {
      title: 'طرف',
      dataIndex: 'side',
      key: 'side',
      width: 70,
      render: (side: string) => (
        <Tag color={side === 'Long' ? 'green' : 'red'} className="!m-0">
          {side === 'Long' ? 'لانگ' : 'شورت'}
        </Tag>
      ),
    },
    { title: 'حجم', dataIndex: 'size', key: 'size', width: 70 },
    { title: 'قیمت ورود', dataIndex: 'entryPrice', key: 'entryPrice', width: 90 },
    { title: 'قیمت مارک', dataIndex: 'markPrice', key: 'markPrice', width: 90 },
    {
      title: 'PNL',
      dataIndex: 'pnl',
      key: 'pnl',
      width: 100,
      render: (pnl: number | string) => {
        const value = Number(pnl) || 0;
        return (
          <span style={{ color: value >= 0 ? '#0ecb81' : '#f84960', fontWeight: 600 }}>
            {value >= 0 ? '+' : ''}{value.toFixed(2)}
          </span>
        );
      },
    },
    {
      title: 'PNL %',
      dataIndex: 'pnlPercent',
      key: 'pnlPercent',
      width: 100,
      render: (pct: number | string) => {
        const value = Number(pct) || 0;
        return (
          <span style={{ color: value >= 0 ? '#0ecb81' : '#f84960', fontWeight: 600 }}>
            {value >= 0 ? '+' : ''}{value.toFixed(2)}%
          </span>
        );
      },
    },
  ];

  return (
    <>
      {/* Chart Card */}
      <Card
        className="bg-white border-gray-200 shadow-sm"
        bodyStyle={{ padding: '10px' }}
        bordered={false}
      >
        <ChartComponent data={chartCanslick} />
      </Card>

      {/* Tabs Card */}
      <Card
        className="bg-white border-gray-200 shadow-sm mt-3"
        bordered={false}
        bodyStyle={{ padding: '8px 12px' }}
      >
        <Tabs
          defaultActiveKey="1"
          size="small"
        >
          <TabPane
            tab={
              <span className="flex items-center gap-1">
                <OrderedListOutlined /> سفارشات باز <Badge className="mr-1" />
              </span>
            }
            key="1"
          >
            <Table
              dataSource={Orders}
              columns={orderColumns}
              pagination={false}
              rowKey="id"
              size="small"
              scroll={{ x: 700 }}
            />
          </TabPane>

          <TabPane
            tab={
              <span className="flex items-center gap-1">
                <HistoryOutlined /> تاریخچه
              </span>
            }
            key="2"
          >
            <Table
              dataSource={orderHistory}
              columns={orderColumns}
              pagination={false}
              rowKey="id"
              size="small"
              scroll={{ x: 700 }}
            />
          </TabPane>

          <TabPane
            tab={
              <span className="flex items-center gap-1">
                <WalletOutlined /> موقعیت‌ها
              </span>
            }
            key="3"
          >
            <Table
              dataSource={positionOrderTable}
              columns={positionColumns}
              pagination={false}
              rowKey="symbol"
              size="small"
              scroll={{ x: 700 }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default ChartAndTabs;