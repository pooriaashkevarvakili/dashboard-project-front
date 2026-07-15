import React from "react";
import { Row, Col, Card, Progress, Typography, Spin } from "antd";
import { useSummery } from "../../../hooks/useSummery";

const { Text } = Typography;

interface PriceSummaryProps {
  isMobile: boolean;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ isMobile }) => {
  const { data: summery, isLoading, error } = useSummery();

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <Text type="danger">Failed to load summary.</Text>;
  }

  if (!summery) {
    return null;
  }

  return (
    <Row
      gutter={[isMobile ? 8 : 16, isMobile ? 8 : 16]}
      style={{ marginBottom: isMobile ? 16 : 24 }}
    >
      <Col span={24}>
        <Card
          style={{
            borderRadius: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <Row gutter={[isMobile ? 8 : 24, isMobile ? 8 : 16]}>
            <Col xs={24} md={8}>
              <div>
                <Text type="secondary">24h Range</Text>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 4,
                  }}
                >
                  <Text>${summery.priceRange.low.toLocaleString()}</Text>
                  <Text>${summery.priceRange.high.toLocaleString()}</Text>
                </div>

                <Progress
                  percent={
                    ((summery.price - summery.priceRange.low) /
                      (summery.priceRange.high - summery.priceRange.low)) *
                    100
                  }
                  showInfo={false}
                  strokeColor="#f7931a"
                  style={{ marginTop: 4 }}
                />
              </div>
            </Col>

            <Col xs={24} md={8}>
              <div>
                <Text type="secondary">ROI (All Time)</Text>

                <div style={{ marginTop: 4 }}>
                  <Text
                    style={{
                      fontSize: isMobile ? 18 : 24,
                      fontWeight: 700,
                      color:
                        summery.roi >= 0 ? "#52c41a" : "#ff4d4f",
                    }}
                  >
                    {summery.roi >= 0 ? "+" : ""}
                    {summery.roi.toFixed(2)}%
                  </Text>

                  <Text
                    type="secondary"
                    style={{
                      marginLeft: 12,
                      fontSize: isMobile ? 12 : 14,
                    }}
                  >
                    ${summery.currentValue.toLocaleString()} / $
                    {summery.totalInvested.toLocaleString()}
                  </Text>
                </div>

                <Progress
                  percent={Math.min(Math.abs(summery.roi), 100)}
                  showInfo={false}
                  strokeColor={
                    summery.roi >= 0 ? "#52c41a" : "#ff4d4f"
                  }
                  style={{ marginTop: 4 }}
                />
              </div>
            </Col>

            <Col xs={24} md={8}>
              <div
                style={{
                  display: "flex",
                  gap: isMobile ? 8 : 16,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <Text type="secondary">Total Balance</Text>

                  <div>
                    <Text
                      style={{
                        fontSize: isMobile ? 16 : 20,
                        fontWeight: 600,
                      }}
                    >
                      {summery.totalBalance.toLocaleString()}
                    </Text>
                  </div>
                </div>

                <div>
                  <Text type="secondary">USD Value</Text>

                  <div>
                    <Text
                      style={{
                        fontSize: isMobile ? 16 : 20,
                        fontWeight: 600,
                      }}
                    >
                      ${summery.currentValue.toLocaleString()}
                    </Text>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default PriceSummary;