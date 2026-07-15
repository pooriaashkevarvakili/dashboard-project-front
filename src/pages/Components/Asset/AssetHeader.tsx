
import React from "react";
import { Row, Col, Space, Avatar, Button, Tag, Typography } from "antd"; // assuming proper imports
import { FaStar } from "react-icons/fa";
import moment from "moment";
import { useAssetHeader } from "../../../hooks/useAssetHeader";
const {Title, Text}=Typography
interface AssetHeaderProps {
  isFavorite: boolean;
  setIsFavorite: (val: boolean) => void;
  isMobile: boolean;
  price: number;
}

const AssetHeader: React.FC<AssetHeaderProps> = ({

  isFavorite,
  setIsFavorite,
  isMobile,
}) => {
    const { data: assetHeader } = useAssetHeader();
  return (
    <Row justify="space-between" align="middle" style={{ marginBottom: isMobile ? 16 : 24 }}>
      <Col>
        <Space size={isMobile ? "small" : "middle"} align="center">
          <Avatar
            size={isMobile ? 40 : 56}
            src={assetHeader?.avatar}
            style={{ border: "2px solid #f7931a" }}
          />
          <div>
            <Title
              level={isMobile ? 4 : 2}
              style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}
            >
             {assetHeader && assetHeader?.title} 
              <Button
                type="text"
                icon={isFavorite ? <FaStar style={{ color: "#f7931a" }} /> : <FaStar />}
                onClick={() => setIsFavorite(!isFavorite)}
                size={isMobile ? "small" : "middle"}
              />
              <Tag color="gold" style={{ fontSize: isMobile ? 10 : 12 }}>
                {assetHeader && assetHeader?.title}
              </Tag>
            </Title>
            <Text type="secondary" style={{ fontSize: isMobile ? 11 : 14 }}>
                 {assetHeader?.tag}{moment().format("MMM DD, YYYY HH:mm")}
            </Text>
          </div>
        </Space>
      </Col>
     
    </Row>
  );
};

export default AssetHeader;