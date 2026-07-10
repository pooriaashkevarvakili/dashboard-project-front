import React from "react";
import { Card, Table, Input, Button, Tooltip, Badge, Empty } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { WalletAsset } from "./types/walletTypes";
import {
  DownloadOutlined,
  ReloadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CopyOutlined,
} from "@ant-design/icons";

// react-icons
import {
  FaBitcoin,
  FaEthereum,
  FaDollarSign,
  FaCoins,
  FaSun,
} from "react-icons/fa";
import { SiBinance, SiCardano, SiRipple, SiPolygon, SiChainlink } from "react-icons/si";

interface Props {
  activeTab: string;
  assets: WalletAsset[];
  showBalances: boolean;
  searchText: string;
  setSearchText: (text: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AssetTable: React.FC<Props> = ({
  activeTab,
  assets,
  showBalances,
  searchText,
  setSearchText,
  loading,
  setLoading,
}) => {
  // Mapping currency -> icon
  const getIcon = (currency: string) => {
    const icons: Record<string, React.ReactNode> = {
      BTC: <FaBitcoin className="text-yellow-500 text-xl" />,
      ETH: <FaEthereum className="text-purple-500 text-xl" />,
      USDT: <FaDollarSign className="text-green-500 text-xl" />,
      USDC: <FaDollarSign className="text-blue-500 text-xl" />,
      BNB: <SiBinance className="text-yellow-500 text-xl" />,
      SOL: <FaSun className="text-orange-400 text-xl" />,
      XRP: <SiRipple className="text-blue-600 text-xl" />,
      ADA: <SiCardano className="text-blue-400 text-xl" />,
      LINK: <SiChainlink className="text-blue-500 text-xl" />,
      MATIC: <SiPolygon className="text-purple-500 text-xl" />,
      DAI: <FaCoins className="text-yellow-600 text-xl" />,
    };
    return icons[currency] || (
      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
        {currency.slice(0, 2)}
      </div>
    );
  };

const formatNumber = (num: number | string) => {
  const value = Number(num);

  if (isNaN(value)) return "-";

  if (value >= 1e9) return (value / 1e9).toFixed(2) + "B";
  if (value >= 1e6) return (value / 1e6).toFixed(2) + "M";
  if (value >= 1e3) return (value / 1e3).toFixed(2) + "K";

  return value.toFixed(2);
};

  // Columns
  const baseColumns: ColumnsType<WalletAsset> = [
    {
      title: "Asset",
      dataIndex: "currency",
      key: "currency",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {getIcon(record.currency)}
          <div>
            <div className="font-medium">{record.currency}</div>
            <div className="text-xs text-gray-500">{record.name}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      align: "right",
      render: (val) => (showBalances ? formatNumber(val) : "••••"),
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      align: "right",
      render: (val) => (showBalances ? formatNumber(val) : "••••"),
    },
    {
      title: "Frozen",
      dataIndex: "frozen",
      key: "frozen",
      align: "right",
      render: (val) => (showBalances ? formatNumber(val) : "••••"),
    },
    {
      title: "USD Value",
      dataIndex: "usdValue",
      key: "usdValue",
      align: "right",
      render: (val) => `$${formatNumber(val)}`,
    },
    {
      title: "24h Change",
      dataIndex: "change24h",
      key: "change24h",
      align: "right",
      render: (val) => (
        <span className={val >= 0 ? "text-green-500" : "text-red-500"}>
          {val >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(val).toFixed(2)}%
        </span>
      ),
    },
  ];

  const externalExtraColumns: ColumnsType<WalletAsset> = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) =>
        address ? (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
            <Tooltip title="Copy address">
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined />}
                onClick={() => navigator.clipboard.writeText(address)}
              />
            </Tooltip>
          </div>
        ) : null,
    },
    ...baseColumns,
  ];

  const isExternal = activeTab === "external";
  const columns = isExternal ? externalExtraColumns : baseColumns;

  return (
    <Card className="rounded-xl shadow-sm" bodyStyle={{ padding: 0 }}>
      <div className="flex items-center justify-between w-full px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-lg">
            {activeTab === "spot" && "Spot Assets"}
            {activeTab === "futures" && "Futures Assets"}
            {activeTab === "margin" && "Margin Assets"}
            {activeTab === "external" && "Connected Wallets"}
          </span>
          <Badge count={assets.length} style={{ backgroundColor: "#1677ff" }} />
        </div>
        <div className="flex items-center gap-3">
          <Input.Search
            placeholder="Search assets..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-64"
            allowClear
          />
          <Tooltip title="Export">
            <Button icon={<DownloadOutlined />} />
          </Tooltip>
          <Tooltip title="Refresh">
            <Button
              icon={<ReloadOutlined />}
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 600);
              }}
            />
          </Tooltip>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={assets}
        rowKey="key"
        pagination={{ pageSize: 6, hideOnSinglePage: true }}
        loading={loading}
        locale={{ emptyText: <Empty description="No assets found" /> }}
        rowClassName="hover:bg-gray-50 dark:hover:bg-gray-800/50"
      />
    </Card>
  );
};

export default AssetTable;