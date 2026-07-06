import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import {
  FaDollarSign,
  FaChartLine,
  FaWallet,
} from "react-icons/fa";
import { useMarketStatus } from "../../../hooks/useMarketStatus";

interface MarketStatsProps {
  price: number;
  priceChange: number;
  isMobile: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  FaDollarSign,
  FaChartLine,
  FaWallet,
};

const MarketStats: React.FC<MarketStatsProps> = ({

  isMobile,
}) => {
  const { data: marketStatus = [] } = useMarketStatus();

  return (
    <Row
      gutter={[isMobile ? 8 : 16, isMobile ? 8 : 16]}
      style={{ marginBottom: isMobile ? 16 : 24 }}
    >
      {marketStatus.map((stat: any, index: number) => {
        const Icon = iconMap[stat.prefix] || FaDollarSign;

        return (
          <Col xs={12} sm={12} md={6} key={index}>
            <Card
              style={{
                borderRadius: 12,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <Statistic
                title={
                  <span style={{ fontSize: isMobile ? 11 : 14 }}>
                    {stat.title}
                  </span>
                }
                value={stat.value}
                prefix={<Icon />}
                suffix={stat.suffix}
                valueStyle={{
                  fontSize: isMobile ? 16 : 22,
                  fontWeight: 600,
                }}
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default MarketStats;