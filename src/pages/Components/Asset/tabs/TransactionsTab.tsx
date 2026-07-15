import React, { useMemo } from "react";
import { Table, Tag, Typography, Tooltip, Space } from "antd";
import {
  FaSignInAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

const { Text } = Typography;

interface TransactionsTabProps {
  transactions: any[];
  isMobile: boolean;
  isSmallMobile: boolean;
}

const TransactionsTab: React.FC<TransactionsTabProps> = ({
  transactions,
  isMobile,
  isSmallMobile,
}) => {
  const dataSource = useMemo(() => {
    return (transactions || []).map((item: any) => ({
      id: item.name || item.key,
      type: item.type === "Buy" ? "Receive" : "Send",
      from: item.type === "Sell" ? "You" : "Market",
      to: item.type === "Buy" ? "You" : "Market",
      amount: Number(item.amount ?? 0),
      value: Number(item.total ?? 0),
      status: "Confirmed",
      time: new Date(item.time).toLocaleString(),
    }));
  }, [transactions]);

  const columns = useMemo(
    () => [
      {
        title: "TX ID",
        dataIndex: "id",
        render: (text: string) => <Text strong>{text}</Text>,
      },
      {
        title: "Type",
        dataIndex: "type",
        render: (type: string) => (
          <Tag
            icon={type === "Receive" ? <FaSignInAlt /> : <FaPaperPlane />}
            color={type === "Receive" ? "green" : "blue"}
          >
            {type}
          </Tag>
        ),
      },
      {
        title: "From",
        dataIndex: "from",
        render: (from: string) => (
          <Tooltip title={from}>
            <Text ellipsis>{from}</Text>
          </Tooltip>
        ),
      },
      {
        title: "To",
        dataIndex: "to",
        render: (to: string) => (
          <Tooltip title={to}>
            <Text ellipsis>{to}</Text>
          </Tooltip>
        ),
      },
      {
        title: "Amount",
        dataIndex: "amount",
        render: (a?: number) => `${(a ?? 0)} BTC`,
      },
      {
        title: "Value",
        dataIndex: "value",
        render: (v?: number) => `$${(v ?? 0).toLocaleString()}`,
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (status: string) => {
          const config: any = {
            Confirmed: { color: "success", icon: <FaCheckCircle /> },
            Pending: { color: "warning", icon: <FaClock /> },
            Failed: { color: "error", icon: <FaTimesCircle /> },
          };

          const { color, icon } = config[status] || {};
          return (
            <Tag color={color}>
              {icon} {status}
            </Tag>
          );
        },
      },
      {
        title: "Time",
        dataIndex: "time",
        render: (t: string) => (
          <Text type="secondary">{t}</Text>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: isMobile ? 3 : 5 }}
        size={isMobile ? "small" : "middle"}
        scroll={{ x: isSmallMobile ? 700 : 900 }}
      />
    </>
  );
};

export default TransactionsTab;