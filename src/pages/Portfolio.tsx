import {
  Card,
  Row,
  Col,
  Typography,
  Statistic,
  Table,
  Tag,
  Button,
  Space,
  Badge,
  List,
} from "antd";
import { SiLitecoin } from "react-icons/si";
import { FaBitcoin, FaEthereum, FaArrowUp, FaArrowDown, // <--- این خط را اضافه کنید
 } from "react-icons/fa";
import { SiBinance, SiTether, SiRipple } from "react-icons/si";
import { HiOutlineTrendingUp, HiOutlineChip } from "react-icons/hi";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useStats } from "../hooks/useStats";
import { useRecentTransactions } from "../hooks/useRecentTransactions";
import { useWeek } from "../hooks/useWeek";
import { useCryptoPriceTable } from "../hooks/useCryptoPriceTable";
import { useChartSeries } from "../hooks/useChartSeries";

const { Title, Text } = Typography;

export default function Portfolio() {
    const { data: week } = useWeek();
const {data:cryptoPriceTable,isLoading} =useCryptoPriceTable()
    const { data: stats } = useStats();
const { data: recentTransactions } = useRecentTransactions();
  const { data:chartSeriesNumber } = useChartSeries();

 const chartData = {
  series: [
    {
      name: "BTC/USDT",
      data: chartSeriesNumber?.map((item) => item.priceChart) ?? [],
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
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
      },
    },
    xaxis: {
      categories: week?.map((item) => item.week) ?? [],
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
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
    },
    grid: {
      borderColor: "#2a2a2a",
      strokeDashArray: 4,
    },
  } as ApexOptions,
};

  const columns = [
    {
      title: "Asset",
      dataIndex: "name",
      render: (text: string, record: any) => (
        <Space>
          {record.icon}
          <div>
            <div className="font-semibold">{text}</div>
            <div className="text-xs text-gray-400">{record.symbol}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number) => `$${price.toLocaleString()}`,
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      title: "24h Change",
      dataIndex: "change",
      render: (change: number) => (
        <Tag
          color={change >= 0 ? "success" : "error"}
          icon={change >= 0 ? <FaArrowUp /> : <FaArrowDown />}
        >
          {change >= 0 ? "+" : ""}
          {change}%
        </Tag>
      ),
      sorter: (a: any, b: any) => a.change - b.change,
    },
    {
      title: "Volume",
      dataIndex: "volume",
    },
    {
      title: "Market Cap",
      dataIndex: "marketCap",
    },
    {
      title: "Action",
      render: () => (
        <Button type="primary" size="small">
          Trade
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Title level={2} className="!mb-0">
            🚀 Crypto Dashboard
          </Title>
          <Text type="secondary">Real-time market overview</Text>
        </div>
        <Space wrap>
          <Badge count="Live" color="green" />
          <Button icon={<HiOutlineTrendingUp />}>Refresh</Button>
        </Space>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        {stats.map((stat) => (
  <Col xs={12} sm={12} md={6} key={stat.key}>
    <Card className="shadow-sm hover:shadow-lg transition-shadow">
      <Statistic
        title={stat.title}
        value={stat.value}
        valueStyle={{
          color: stat.change.startsWith("+")
            ? "#3fb950"
            : "#f85149",
          fontSize: "1.5rem",
        }}
        suffix={
          stat.change !== "0" ? (
            <Tag color={stat.change.startsWith("+") ? "success" : "error"}>
              {stat.change}
            </Tag>
          ) : null
        }
      />
    </Card>
  </Col>
))}
      </Row>

      {/* Chart & Quick Actions */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <div className="flex justify-between items-center">
                <span>BTC/USDT Price Chart</span>
                <Space>
                  <Button size="small">1D</Button>
                  <Button size="small" type="primary">
                    1W
                  </Button>
                  <Button size="small">1M</Button>
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
        </Col>
        <Col xs={24} lg={8}>
         <Card title="Recent Transactions" className="shadow-sm h-full">
  <List
    dataSource={recentTransactions}
    renderItem={(item:any) => (
      <List.Item key={item.key}>
        <div className="flex justify-between w-full">
          <div>
            <Text strong>{item.type}</Text>
            <br />
            <Text type="secondary" className="text-xs">
              {item.time}
            </Text>
          </div>

          <div className="text-right">
            <Text
              className={
                item.amount.startsWith("+")
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {item.amount}
            </Text>
            <br />
            <Tag
              color={item.status === "Completed" ? "green" : "orange"}
              className="text-xs"
            >
              {item.status}
            </Tag>
          </div>
        </div>
      </List.Item>
    )}
  />
</Card>
        </Col>
      </Row>
    <Card
  title="Top Cryptocurrencies"
  className="shadow-sm"
  extra={<Button type="link">View All</Button>}
>
  <Table
    rowKey="key"
    loading={isLoading}
    dataSource={cryptoPriceTable ?? []}
    columns={columns}
    pagination={false}
  />
</Card>

      <Card className="shadow-sm bg-white dark:bg-gray-800">
        <div className="flex flex-wrap justify-center gap-6 text-3xl text-gray-600 dark:text-gray-300">
          <FaBitcoin className="text-yellow-500" />
          <FaEthereum className="text-purple-500" />
          <SiBinance className="text-yellow-400" />
          <SiTether className="text-green-400" />
          <SiRipple className="text-blue-400" />
           <SiLitecoin className="text-gray-400" /> 
          <HiOutlineChip className="text-indigo-400" />
        </div>
        <div className="text-center mt-4 text-gray-400 text-sm">
          Powered by Ant Design, ApexCharts & React
        </div>
      </Card>
    </div>
  );
}