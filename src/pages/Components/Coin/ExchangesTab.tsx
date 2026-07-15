import React from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Exchange } from "./data/types";

interface ExchangesTabProps {
  exchanges: Exchange[];
}

export const ExchangesTab: React.FC<ExchangesTabProps> = ({ exchanges }) => {
  const columns: ColumnsType<Exchange> = [
    {
      title: "Exchange",
      dataIndex: "name",
      key: "name",
      render: (name) => <span style={{ fontWeight: 500 }}>{name}</span>,
    },
    {
      title: "Pair",
      dataIndex: "pair",
      key: "pair",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right",
      render: (price) => {
        const value = Number(price);
        return `$${value.toLocaleString()}`;
      },
    },
    {
      title: "Volume (24h)",
      dataIndex: "volume",
      key: "volume",
      align: "right",
      render: (volume) => {
        const value = Number(volume);
        return `$${(value / 1_000_000).toFixed(0)}M`;
      },
    },
    {
      title: "Spread",
      dataIndex: "spread",
      key: "spread",
      align: "right",
      render: (spread) => {
        const value = Number(spread);
        return `${value.toFixed(2)}%`;
      },
    },
    {
      title: "Trust",
      dataIndex: "trust",
      key: "trust",
      align: "right",
      render: (trust) => {
        const value = Number(trust);

        let bgColor = "#fee2e2";
        let textColor = "#9b1c1c";

        if (value >= 95) {
          bgColor = "#d1fae5";
          textColor = "#0b6e4f";
        } else if (value >= 90) {
          bgColor = "#fef3c7";
          textColor = "#92400e";
        }

        return (
          <Tag
            style={{
              backgroundColor: bgColor,
              color: textColor,
              border: "none",
              borderRadius: "999px",
              fontWeight: 500,
              fontSize: "12px",
              padding: "2px 12px",
              margin: 0,
            }}
          >
            {value}%
          </Tag>
        );
      },
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 1px 3px rgba(0,0,0,.06)",
      }}
    >
      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#111827",
          marginBottom: 16,
        }}
      >
        Exchanges
      </h2>

      <Table<Exchange>
        columns={columns}
        dataSource={exchanges}
        rowKey={(record) => `${record.name}-${record.pair}`}
        pagination={false}
        bordered={false}
      />
    </div>
  );
};
