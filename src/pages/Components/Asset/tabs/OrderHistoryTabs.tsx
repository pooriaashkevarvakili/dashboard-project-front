import React, { useMemo, useState } from "react";
import { Table, Tag, Typography, Space, Select, Row } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Text } = Typography;

interface OrderHistoryTabProps {
  orders: any[];
  isMobile: boolean;
  isSmallMobile: boolean;
}

const OrderHistoryTab: React.FC<OrderHistoryTabProps> = ({
  orders,
  isMobile,
  isSmallMobile,
}) => {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // ✅ Normalize API data
  const dataSource = useMemo(() => {
    return (orders || []).map((item: any) => ({
      id: item.name,
      type: item.type, // Buy / Sell
      price: Number(item.price),
      amount: Number(item.amount),
      total: Number(item.total),
      status: "Completed", // چون API نداری
      time: new Date(item.time).toLocaleString(),
    }));
  }, [orders]);

  // ✅ Filters
  const filteredData = useMemo(() => {
    return dataSource.filter((item) => {
      const typeOk = typeFilter === "all" || item.type === typeFilter;
      const statusOk = statusFilter === "all" || item.status === statusFilter;
      return typeOk && statusOk;
    });
  }, [dataSource, typeFilter, statusFilter]);

  // ✅ Columns
  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: "Order ID",
        dataIndex: "id",
        render: (text: string) => <Text strong>{text}</Text>,
      },
      {
        title: "Type",
        dataIndex: "type",
        render: (type: string) => (
          <Tag color={type === "Buy" ? "green" : "red"}>{type}</Tag>
        ),
      },
      {
        title: "Price",
        dataIndex: "price",
        render: (p: number) => `$${p.toLocaleString()}`,
      },
      {
        title: "Amount",
        dataIndex: "amount",
        render: (a: number) => `${a} BTC`,
      },
      {
        title: "Total",
        dataIndex: "total",
        render: (t: number) => `$${t.toLocaleString()}`,
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (status: string) => (
          <Tag color="success">{status}</Tag>
        ),
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
      {/* Filters */}
      <Row style={{ marginBottom: 16 }}>
        <Space wrap>
          <Select
            value={typeFilter}
            onChange={setTypeFilter}
            style={{ width: 140 }}
            size="small"
          >
            <Select.Option value="all">All Types</Select.Option>
            <Select.Option value="Buy">Buy</Select.Option>
            <Select.Option value="Sell">Sell</Select.Option>
          </Select>

          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 140 }}
            size="small"
          >
            <Select.Option value="all">All Status</Select.Option>
            <Select.Option value="Completed">Completed</Select.Option>
          </Select>

          
        </Space>
      </Row>

      {/* Table */}
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: isMobile ? 3 : 5 }}
        size={isMobile ? "small" : "middle"}
        scroll={{ x: isSmallMobile ? 600 : 900 }}
      />
    </>
  );
};

export default OrderHistoryTab;