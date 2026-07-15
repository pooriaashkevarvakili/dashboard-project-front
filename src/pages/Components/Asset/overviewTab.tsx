// components/OverviewTab.tsx

import React from "react";
import {
  Row,
  Col,
  Card,
  Descriptions,
  Statistic,
  Progress,
  Tag,
  Typography,
  Space,
} from "antd";

import {
  FaDollarSign,
  FaChartLine,
  FaWallet,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const { Text } = Typography;

interface OverviewTabProps {
  price: number;
  priceChange: number;
  currentValue: number;
  totalInvested: number;
  roi: number;
  priceRange: {
    high: number;
    low: number;
  };
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  price,
  priceChange,
  currentValue,
  totalInvested,
  roi,
  priceRange,
}) => {
  return (
    <Row gutter={[16, 16]}>
      {/* ================= Asset Information ================= */}

      <Col span={24}>
        <Card title="Asset Information">

          <Descriptions
            bordered
            column={{ xs: 1, sm: 2, md: 3 }}
          >
            <Descriptions.Item label="Symbol">
              BTC
            </Descriptions.Item>

            <Descriptions.Item label="Name">
              Bitcoin
            </Descriptions.Item>

            <Descriptions.Item label="Rank">
              #1
            </Descriptions.Item>

            <Descriptions.Item label="Current Price">
              ${price.toLocaleString()}
            </Descriptions.Item>

            <Descriptions.Item label="24H Change">
              <Tag color={priceChange >= 0 ? "green" : "red"}>
                {priceChange >= 0 ? (
                  <FaArrowUp />
                ) : (
                  <FaArrowDown />
                )}
                {" "}
                {priceChange}%
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label="24H High">
              ${priceRange.high.toLocaleString()}
            </Descriptions.Item>

            <Descriptions.Item label="24H Low">
              ${priceRange.low.toLocaleString()}
            </Descriptions.Item>

            <Descriptions.Item label="Market Cap">
              $1.29T
            </Descriptions.Item>

            <Descriptions.Item label="Circulating Supply">
              19.7M BTCgg
            </Descriptions.Item>
          </Descriptions>

        </Card>
      </Col>

      {/* ================= Statistics ================= */}

      <Col xs={24} md={8}>
        <Card>
          <Statistic
            title="Current Value"
            value={currentValue}
            precision={2}
            prefix={<FaDollarSign />}
          />
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card>
          <Statistic
            title="Invested"
            value={totalInvested}
            precision={2}
            prefix={<FaWallet />}
          />
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card>
          <Statistic
            title="ROI"
            value={roi}
            precision={2}
            suffix="%"
            valueStyle={{
              color: roi >= 0 ? "#52c41a" : "#ff4d4f",
            }}
            prefix={<FaChartLine />}
          />
        </Card>
      </Col>

      {/* ================= ROI Progress ================= */}

      <Col span={24}>
        <Card title="Investment Performance">

          <Space
            direction="vertical"
            style={{ width: "100%" }}
          >

            <Text>
              ROI Progress
            </Text>

            <Progress
              percent={Math.min(Math.abs(roi), 100)}
              strokeColor={
                roi >= 0 ? "#52c41a" : "#ff4d4f"
              }
            />

            <Text type="secondary">
              Current Value:
              ${currentValue.toLocaleString()}
            </Text>

            <Text type="secondary">
              Total Invested:
              ${totalInvested.toLocaleString()}
            </Text>

          </Space>

        </Card>
      </Col>
    </Row>
  );
};

export default OverviewTab;