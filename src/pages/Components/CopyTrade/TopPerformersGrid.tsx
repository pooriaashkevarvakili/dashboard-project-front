import React from "react";
import { Row, Col, Card, Button, Tag, Avatar } from "antd";
import {
  CopyOutlined,
  TrophyOutlined,
  TeamOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { MdVerified } from "react-icons/md";
import type { Trader } from "../../../types/Trade";
import { PerformanceChart } from "./PerformanceChart";

interface TopPerformersGridProps {
  traders: Trader[];
  isMainGrid?: boolean;
  onCopy?: (trader: Trader) => void;
  onStopCopy?: (id: string) => void;
}

const TopPerformersGrid: React.FC<TopPerformersGridProps> = ({
  traders,
  isMainGrid = false,
  onCopy,
  onStopCopy,
}) => {
  return (
    <div className={isMainGrid ? "mt-6" : ""}>
      {isMainGrid && (
        <div className="flex items-center justify-between mb-4">
          <div>
            <h5 className="text-lg font-semibold mb-0">Top Performers</h5>
            <span className="text-gray-400 text-xs">
              Best performing traders this month
            </span>
          </div>
          <Button type="text" className="text-blue-600">
            View All <RightOutlined />
          </Button>
        </div>
      )}

      <Row gutter={[16, 16]}>
        {traders.map((trader) => (
          <Col xs={24} sm={12} md={8} lg={6} key={trader.id}>
            <Card
              className="rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-0 hover:-translate-y-1 overflow-hidden"
              bodyStyle={{ padding: "16px 16px" }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Avatar
                    size={40}
                    style={{
                      backgroundColor: `hsl(${(trader.rank * 37) % 360}, 70%, 50%)`,
                    }}
                    className="border-2 border-white shadow-sm flex-shrink-0"
                  >
                    {trader.name.charAt(0)}
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm truncate">
                        {trader.name}
                      </span>
                      {trader.isVerified && (
                        <MdVerified className="text-blue-500 text-sm flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <Tag
                        color={
                          trader.riskLevel === "Low"
                            ? "success"
                            : trader.riskLevel === "Medium"
                              ? "warning"
                              : "error"
                        }
                        className="text-xs px-1.5 py-0"
                      >
                        {trader.riskLevel}
                      </Tag>
                      <span className="text-gray-400 truncate">
                        {trader.strategy}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span
                    className={`font-bold text-sm ${trader.totalPnL >= 0 ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {trader.totalPnL >= 0 ? "+" : ""}$
                    {trader.totalPnL.toLocaleString()}
                  </span>
                  <div className="text-xs text-gray-400">
                    ROI: {trader.roi}%
                  </div>
                </div>
              </div>

              <div className="mt-3 h-14 w-full">
                <PerformanceChart trader={trader} height={56} />
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 flex-wrap gap-2">
                <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <TrophyOutlined className="text-yellow-500" />
                    {trader.winRate}% WR
                  </span>
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <TeamOutlined />
                    {trader.followers.toLocaleString()}
                  </span>
                </div>

                {trader.isCopying ? (
                  <Button
                    danger
                    size="small"
                    onClick={() => onStopCopy?.(trader.id)}
                  >
                    Stop Copy
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    size="small"
                    icon={<CopyOutlined />}
                    onClick={() => onCopy?.(trader)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 hover:from-blue-700 hover:to-purple-700"
                  >
                    Copy
                  </Button>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TopPerformersGrid;
