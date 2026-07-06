// Prompt: Create ROI (Return on Investment) tab for Bitcoin dashboard.
// Show big ROI percentage with circle progress, total invested, current value, profit/loss,
// and a performance timeline (All Time High, Current Price, All Time Low, YTD).
// Make it responsive with good visual hierarchy.

import React from "react";
import {
  Row,
  Col,
  Card,
  Progress,
  Statistic,
  Timeline,
  Typography,
  Divider,
} from "antd";
import { useProfileSummeryTimeline } from "../../../../hooks/useProfileSummeryTimeLine";
import { useProgressAssetDetails } from "../../../../hooks/useProgressAssetDetails";

const { Text } = Typography;

interface ROITabProps {
  roi: number;
  totalInvested: number;
  currentValue: number;
  price: number;
  isMobile: boolean;
}

const ROITab: React.FC<ROITabProps> = ({


  
  isMobile,
}) => {
  const { data: profileSummeryTime } = useProfileSummeryTimeline();
  const { data: ProgressAssetDetails } = useProgressAssetDetails();
  return (
    <Row gutter={[isMobile ? 8 : 24, isMobile ? 8 : 24]}>
      <Col xs={24} md={12}>
        <Card title="Return on Investment" style={{ borderRadius: 12 }}>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <Text type="secondary">Total ROI</Text>
            <div>
              <Text
                style={{
                  fontSize: isMobile ? 32 : 48,
                  fontWeight: 700,
                  color: ProgressAssetDetails?.[0]?.color ?? "#52c41a",
                }}
              >
                {ProgressAssetDetails?.[0]?.currency}
              </Text>
            </div>

            <Progress
              type="circle"
              percent={42}
              strokeColor={profileSummeryTime?.[0]?.color}
              format={() => "42%"}
              width={isMobile ? 90 : 120}
              style={{ marginTop: 16 }}
            />
          </div>

          <Divider />

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Statistic
                title="Total Invested"
                value={ProgressAssetDetails?.[0]?.TotalInvested}
                prefix="$"
                valueStyle={{
                  fontSize: isMobile ? 16 : 20,
                  color: `${profileSummeryTime?.[0]?.color}`,
                }}
              />
            </Col>

            <Col span={12}>
              <Statistic
                title="Current Value"
                value={ProgressAssetDetails?.[3]?.CurrentValue}
                prefix="$"
                valueStyle={{
                  color: "#52c41a",
                  fontSize: isMobile ? 16 : 20,
                }}
              />
            </Col>

            <Col span={12}>
              <Statistic
                title="Profit / Loss"
                value={ProgressAssetDetails?.[3]?.TotalInvested}
                prefix="$"
                valueStyle={{
                  color: `${profileSummeryTime?.[0]?.color}`,
                  fontSize: isMobile ? 16 : 20,
                }}
              />
            </Col>

            <Col span={12}>
              <Statistic
                title="ROI %"
                value={ProgressAssetDetails?.[3]?.CurrentValue}
                suffix="%"
                valueStyle={{
                  color: `${profileSummeryTime?.[0]?.color}`,
                  fontSize: isMobile ? 16 : 20,
                }}
              />
            </Col>
          </Row>
        </Card>
      </Col>

      <Col xs={24} md={12}>
        <Card title="Performance Summary" style={{ borderRadius: 12 }}>
          <Timeline>
            {profileSummeryTime?.map((item: any) => (
              <Timeline.Item key={item.key} color={item.color}>
                <Text strong>{item.title}</Text>
                <br />
                <Text>{item.value}</Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>
      </Col>
    </Row>
  );
};

export default ROITab;
