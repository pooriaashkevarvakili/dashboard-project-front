import { Card, Row, Col, Typography, Statistic, Button, Space, Badge, Tag } from "antd";
import { HiOutlineChip, HiOutlineTrendingUp } from "react-icons/hi";
import { useStats } from "../hooks/useStats";
import { useRecentTransactions } from "../hooks/useRecentTransactions";

import PriceChart from "../pages/Components/portfolio/PriceChart";
import CryptoTable from "../pages/Components/portfolio/CryptoTable";
import RecentTransactions from "../pages/Components/portfolio/RecentTransactions";
import { FaBitcoin } from "react-icons/fa6";
import { SiBinance, SiLitecoin, SiRipple, SiTether,SiEthereum } from "react-icons/si";

const { Title, Text } = Typography;

export default function Portfolio() {
  const { data: stats } = useStats();
  const { data: recentTransactions } = useRecentTransactions();

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
       
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        {stats?.map((stat: any) => (
          <Col xs={12} sm={12} md={6} key={stat.key}>
            <Card className="shadow-sm hover:shadow-lg transition-shadow">
              <Statistic
                title={stat.title}
                value={stat.value}
                valueStyle={{
                  color: stat.change.startsWith("+") ? "#3fb950" : "#f85149",
                  fontSize: "1.5rem",
                }}
                suffix={
                  stat.change !== "0" ? (
                    <Tag
                      color={stat.change.startsWith("+") ? "success" : "error"}
                    >
                      {stat.change}
                    </Tag>
                  ) : null
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Chart + Recent Transactions */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <PriceChart />
        </Col>
        <Col xs={24} lg={8}>
          <RecentTransactions data={recentTransactions} />
        </Col>
      </Row>

      <CryptoTable />

      <Card className="shadow-sm bg-white dark:bg-gray-800">
        <div className="flex flex-wrap justify-center gap-6 text-3xl text-gray-600 dark:text-gray-300">
          <FaBitcoin className="text-yellow-500" />
          <SiEthereum className="text-purple-500" />
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