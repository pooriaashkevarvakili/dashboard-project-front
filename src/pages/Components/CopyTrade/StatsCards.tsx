import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  TeamOutlined,
  TrophyOutlined,
  LineChartOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import type { Trader } from "../../../types/Trade";

interface StatsCardsProps {
  traders: Trader[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ traders }) => {
  const totalPnl = traders.reduce((sum, t) => sum + t.totalPnL, 0);
  const avgWinRate =
    traders.reduce((sum, t) => sum + t.winRate, 0) / traders.length;
  const totalFollowers = traders.reduce((sum, t) => sum + t.followers, 0);
  const avgRoi = traders.reduce((sum, t) => sum + t.roi, 0) / traders.length;
  const totalCopying = traders.filter((t) => t.isCopying).length;

  const stats = [
    {
      title: "Total Portfolio PnL",
      value: `$${totalPnl.toLocaleString()}`,
      prefix:
        totalPnl >= 0 ? (
          <ArrowUpOutlined className="text-emerald-500" />
        ) : (
          <ArrowDownOutlined className="text-red-500" />
        ),
      icon: <DollarOutlined className="text-blue-500 text-2xl" />,
      bg: "bg-blue-50",
    },
    {
      title: "Avg Win Rate",
      value: `${avgWinRate.toFixed(1)}%`,
      prefix: <TrophyOutlined className="text-purple-500" />,
      icon: <TrophyOutlined className="text-purple-500 text-2xl" />,
      bg: "bg-purple-50",
    },
    {
      title: "Active Followers",
      value: totalFollowers.toLocaleString(),
      prefix: <TeamOutlined className="text-cyan-500" />,
      icon: <TeamOutlined className="text-cyan-500 text-2xl" />,
      bg: "bg-cyan-50",
    },
    {
      title: "Avg ROI",
      value: `${avgRoi.toFixed(1)}%`,
      prefix: <LineChartOutlined className="text-emerald-500" />,
      icon: <LineChartOutlined className="text-emerald-500 text-2xl" />,
      bg: "bg-emerald-50",
    },
    {
      title: "Copying Now",
      value: totalCopying,
      prefix: null,
      icon: <DollarOutlined className="text-orange-500 text-2xl" />,
      bg: "bg-orange-50",
    },
  ];

  return (
    <Row gutter={[16, 16]} className="mb-6">
      {stats.map((stat, index) => (
        <Col xs={24} sm={12} lg={4} key={index}>
          <Card
            className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-0"
            bodyStyle={{ padding: "16px 20px" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-400 text-xs uppercase tracking-wide font-medium">
                  {stat.title}
                </span>
                <Statistic
                  value={stat.value}
                  valueStyle={{ fontSize: "20px", fontWeight: 700 }}
                  prefix={stat.prefix}
                />
              </div>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}
              >
                {stat.icon}
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatsCards;
