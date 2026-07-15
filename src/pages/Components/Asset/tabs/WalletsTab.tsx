// Prompt: Create Wallets tab showing list of wallets with name, address (copy button), balance, value, type and actions (Send/Receive). Use Avatar and responsive design.

import React from "react";
import { Table, Button, Space, Avatar, Typography, Badge } from "antd";
import { FaWallet, FaCopy, FaPaperPlane, FaSignInAlt } from "react-icons/fa";
const {Text}=Typography
interface WalletsTabProps {
  wallets: any[];
  isMobile: boolean;
  isSmallMobile: boolean;
}

const WalletsTab: React.FC<WalletsTabProps> = ({ wallets, isMobile, isSmallMobile }) => {
  const columns = [
    {
      title: "Wallet",
      dataIndex: "name",
      render: (name: string, record: any) => (
        <Space>
          <Avatar icon={<FaWallet />} style={{ backgroundColor: record.type === "Cold" ? "#1890ff" : "#52c41a" }} />
          <div>
            <Text strong>{name}</Text><br />
            <Text type="secondary">{record.type}</Text>
          </div>
        </Space>
      )
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (address: string) => (
        <Space>
          <Text ellipsis style={{ maxWidth: isSmallMobile ? 100 : 180 }}>{address}</Text>
          <Button type="text" icon={<FaCopy />} size="small" onClick={() => navigator.clipboard.writeText(address)} />
        </Space>
      )
    },
    { title: "Balance", dataIndex: "balance", render: (b: number) => `${b} BTC` },
    { title: "Value (USD)", dataIndex: "value", render: (v: number) => `$${v.toLocaleString()}` },
    { title: "Status", dataIndex: "status", render: () => <Badge status="success" text="Active" /> },
    {
      title: "Action",
      render: () => (
        <Space>
          <Button type="text" icon={<FaPaperPlane />} size="small">Send</Button>
          <Button type="text" icon={<FaSignInAlt />} size="small">Receive</Button>
        </Space>
      )
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={wallets} 
      pagination={false} 
      size={isMobile ? "small" : "middle"}
      scroll={{ x: isSmallMobile ? 600 : 800 }}
    />
  );
};

export default WalletsTab;