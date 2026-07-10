import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { WalletOutlined, ArrowUpOutlined, ArrowDownOutlined, LineChartOutlined, ClockCircleOutlined } from "@ant-design/icons";
import type { WalletSummary } from "./types/walletTypes";

const { Text } = Typography;

interface Props {
  summary: WalletSummary;
  showBalances: boolean;
}

const WalletSummaryCards: React.FC<Props> = ({ summary, showBalances }) => {
  const items = [
    { title: "Total Balance", value: `$${summary.totalBalance.toLocaleString()}`, icon: <WalletOutlined className="text-blue-500 text-xl" /> },
    {
      title: "24h Profit/Loss",
      value: `${summary.totalProfit >= 0 ? "+" : ""}$${summary.totalProfit.toLocaleString()}`,
      icon: summary.totalProfit >= 0 ? <ArrowUpOutlined className="text-emerald-500 text-xl" /> : <ArrowDownOutlined className="text-red-500 text-xl" />,
      color: summary.totalProfit >= 0 ? "text-emerald-600" : "text-red-600"
    },
    { title: "Active Positions", value: summary.activePositions, icon: <LineChartOutlined className="text-purple-500 text-xl" /> },
    { title: "Pending Orders", value: summary.pendingOrders, icon: <ClockCircleOutlined className="text-amber-500 text-xl" /> },
  ];

  return (
    <Row gutter={[16, 16]} className="mb-6">
      {items.map((item, i) => (
        <Col xs={24} sm={12} lg={6} key={i}>
          <Card className="shadow-sm hover:shadow-md transition-all rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {item.title}
                </Text>
                <div className={`text-2xl font-bold mt-1 ${item.color || "text-gray-800 dark:text-gray-200"}`}>
                  {showBalances ? item.value : "••••••"}
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {item.icon}
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default WalletSummaryCards;