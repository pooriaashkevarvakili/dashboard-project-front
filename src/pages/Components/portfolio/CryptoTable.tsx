import { Card, Table, Tag, Button, Space } from "antd";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useCryptoPriceTable } from "../../../hooks/useCryptoPriceTable";

const columns = [
  {
    title: "Asset",
    dataIndex: "name",
    render: (text: string, record: any) => (
      <Space>
        {record.icon}
        <div>
          <div className="font-semibold">{text}</div>
          <div className="text-xs text-gray-400">{record.symbol}</div>
        </div>
      </Space>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (price: number) => `$${price.toLocaleString()}`,
    sorter: (a: any, b: any) => a.price - b.price,
  },
  {
    title: "24h Change",
    dataIndex: "change",
    render: (change: number) => (
      <Tag
        color={change >= 0 ? "success" : "error"}
        icon={change >= 0 ? <FaArrowUp /> : <FaArrowDown />}
      >
        {change >= 0 ? "+" : ""}
        {change}%
      </Tag>
    ),
    sorter: (a: any, b: any) => a.change - b.change,
  },
  { title: "Volume", dataIndex: "volume" },
  { title: "Market Cap", dataIndex: "marketCap" },
  {
    title: "Action",
    render: () => (
      <Button type="primary" size="small">
        Trade
      </Button>
    ),
  },
];

export default function CryptoTable() {
  const { data: cryptoPriceTable, isLoading } = useCryptoPriceTable();

  return (
    <Card
      title="Top Cryptocurrencies"
      className="shadow-sm"
      extra={<Button type="link">View All</Button>}
    >
      <Table
        rowKey="key"
        loading={isLoading}
        dataSource={cryptoPriceTable ?? []}
        columns={columns}
        pagination={false}
      />
    </Card>
  );
}