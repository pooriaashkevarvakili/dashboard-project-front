// components/TradersTable.tsx
import React from "react";
import { Table, Button, Tooltip, Tag, Progress, Avatar } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  CrownOutlined,
  GoldOutlined,
  TeamOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { BsStarFill, BsStar } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import type { Trader } from "../../../types/Trade";
import { PerformanceChart } from "./PerformanceChart";

interface TradersTableProps {
  traders: Trader[];
  onStar: (id: string) => void;
  onCopy: (trader: Trader) => void;
  onStopCopy: (id: string) => void;
}

const TradersTable: React.FC<TradersTableProps> = ({
  traders,
  onStar,
  onCopy,
  onStopCopy,
}) => {
  const columns: ColumnsType<Trader> = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      width: 80,
      align: "center",
      render: (rank: number) => (
        <div className="flex items-center justify-center">
          {rank === 1 ? (
            <CrownOutlined className="text-yellow-500 text-xl" />
          ) : rank === 2 ? (
            <GoldOutlined className="text-gray-400 text-xl" />
          ) : rank === 3 ? (
            <GoldOutlined className="text-amber-600 text-xl" />
          ) : (
            <span className="font-semibold text-gray-500">#{rank}</span>
          )}
        </div>
      ),
    },
    {
      title: "Trader",
      dataIndex: "name",
      key: "name",
      width: 220,
      render: (name: string, record: Trader) => (
        <div className="flex items-center gap-3">
          <Avatar
            size={40}
            style={{
              backgroundColor: `hsl(${(record.rank * 37) % 360}, 70%, 50%)`,
            }}
          >
            {name.charAt(0)}
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold">{name}</span>
              {record.isVerified && <MdVerified className="text-blue-500" />}
              {record.isStarred && <BsStarFill className="text-yellow-400" />}
            </div>
            <span className="text-gray-500 text-sm">{record.strategy}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Total PnL",
      dataIndex: "totalPnL",
      key: "totalPnL",
      width: 140,
      align: "right",
      render: (value: number) => (
        <div>
          <span
            className={`font-semibold ${value >= 0 ? "text-emerald-500" : "text-red-500"}`}
          >
            {value >= 0 ? "+" : ""}${value.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      title: "Win Rate",
      dataIndex: "winRate",
      key: "winRate",
      width: 120,
      align: "center",
      render: (value: number) => (
        <Progress
          percent={value}
          size="small"
          strokeColor="#10b981"
          format={() => `${value}%`}
        />
      ),
    },
    {
      title: "ROI",
      dataIndex: "roi",
      key: "roi",
      width: 100,
      align: "center",
      render: (value: number) => (
        <Tag color={value >= 0 ? "success" : "error"}>
          {value >= 0 ? "+" : ""}
          {value}%
        </Tag>
      ),
    },
    {
      title: "Followers",
      dataIndex: "followers",
      key: "followers",
      width: 120,
      align: "center",
      render: (value: number) => (
        <div className="flex items-center justify-center gap-1">
          <TeamOutlined />
          <span>{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      title: "Risk",
      dataIndex: "riskLevel",
      key: "riskLevel",
      width: 90,
      align: "center",
      render: (risk: string) => (
        <Tag
          color={
            risk === "Low" ? "success" : risk === "Medium" ? "warning" : "error"
          }
        >
          {risk}
        </Tag>
      ),
    },
    {
      title: "Chart",
      key: "chart",
      width: 140,
      align: "center",
      render: (_, record: Trader) => (
        <div className="w-28 h-12">
          <PerformanceChart trader={record} height={48} />
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 160,
      align: "center",
      render: (_, record: Trader) => (
        <div className="flex items-center justify-center gap-2">
          {record.isCopying ? (
            <Button danger size="small" onClick={() => onStopCopy(record.id)}>
              Stop
            </Button>
          ) : (
            <Button
              type="primary"
              size="small"
              icon={<CopyOutlined />}
              onClick={() => onCopy(record)}
            >
              Copy
            </Button>
          )}
          <Tooltip title={record.isStarred ? "Unstar" : "Star"}>
            <Button
              type="text"
              size="small"
              icon={
                record.isStarred ? (
                  <BsStarFill className="text-yellow-400" />
                ) : (
                  <BsStar />
                )
              }
              onClick={() => onStar(record.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={traders}
      rowKey="id"
      pagination={{ pageSize: 8, showSizeChanger: true }}
      size="middle"
      scroll={{ x: 1200 }}
      rowClassName={(record) => (record.isCopying ? "bg-blue-50" : "")}
    />
  );
};

export default TradersTable;
