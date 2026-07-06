// Prompt: Create a clean Overview tab for Bitcoin asset details showing key information like symbol, rank, price, 24h change, high/low, supply and market cap using Ant Design Descriptions component. Keep it responsive and minimal.

import React from "react";
import { Descriptions, Row, Col } from "antd";

interface OverviewTabProps {
  price: number;
  priceChange: number;
  priceRange: { high: number; low: number };
  isMobile: boolean;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ price, priceChange, priceRange, isMobile }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Descriptions
          bordered
          size={isMobile ? "small" : "default"}
          column={{ xs: 1, sm: 2, md: 3 }}
        >
          <Descriptions.Item label="Symbol">BTC</Descriptions.Item>
          <Descriptions.Item label="Name">Bitcoin</Descriptions.Item>
          <Descriptions.Item label="Rank">#1</Descriptions.Item>
          <Descriptions.Item label="Current Price">${price.toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="24h Change">
            <span style={{ color: priceChange >= 0 ? "#52c41a" : "#ff4d4f" }}>
              {priceChange >= 0 ? "+" : ""}{priceChange}%
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="24h High">${priceRange.high.toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="24h Low">${priceRange.low.toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="Total Supply">19.7M BTC</Descriptions.Item>
          <Descriptions.Item label="Market Cap">$1.29T</Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
};

export default OverviewTab;