import React from "react";
import {
  Card,
  Table,
  Input,
  Button,
  Tooltip,
  Badge,
  Empty,
  Typography,
  Divider,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { WalletAsset } from "./types/walletTypes";
import {
  DownloadOutlined,
  ReloadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import {
  FaBitcoin,
  FaEthereum,
  FaDollarSign,
  FaCoins,
  FaSun,
} from "react-icons/fa";
import {
  SiBinance,
  SiCardano,
  SiRipple,
  SiPolygon,
  SiChainlink,
} from "react-icons/si";
import { useMediaQuery } from "react-responsive";

const { Text } = Typography;

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
  // ---- Responsive breakpoint ----
  const isLargeScreen = useMediaQuery({ minWidth: 1024 }); // lg and up

  // ---- Icon mapping ----
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
    return (
      icons[currency] || (
        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
          {currency.slice(0, 2)}
        </div>
      )
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

  // ---- Table columns ----
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
          {val >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{" "}
          {Math.abs(val).toFixed(2)}%
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

  // ---- Card view component ----
  const AssetCard = ({ asset }: { asset: WalletAsset }) => {
    const isExternalAsset = isExternal && asset.address;
    return (
      <Card
        key={asset.key}
        className="w-full shadow-sm hover:shadow-md transition-shadow"
        loading={loading}
        actions={
          isExternalAsset
            ? [
                <Tooltip title="Copy address">
                  <Button
                    type="text"
                    icon={<CopyOutlined />}
                    onClick={() => navigator.clipboard.writeText(asset.address!)}
                  />
                </Tooltip>,
              ]
            : undefined
        }
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getIcon(asset.currency)}
            <div>
              <Text strong className="text-lg">
                {asset.currency}
              </Text>
              <div className="text-xs text-gray-500">{asset.name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">USD Value</div>
            <Text strong>${formatNumber(asset.usdValue)}</Text>
          </div>
        </div>

        <Divider className="my-3" />

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="text-gray-500">Balance</div>
            <Text>{showBalances ? formatNumber(asset.balance) : "••••"}</Text>
          </div>
          <div>
            <div className="text-gray-500">Available</div>
            <Text>{showBalances ? formatNumber(asset.available) : "••••"}</Text>
          </div>
          <div>
            <div className="text-gray-500">Frozen</div>
            <Text>{showBalances ? formatNumber(asset.frozen) : "••••"}</Text>
          </div>
          <div>
            <div className="text-gray-500">24h Change</div>
            <span
              className={asset.change24h >= 0 ? "text-green-500" : "text-red-500"}
            >
              {asset.change24h >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{" "}
              {Math.abs(asset.change24h).toFixed(2)}%
            </span>
          </div>
        </div>

        {isExternalAsset && (
          <div className="mt-3 pt-2 border-t border-gray-100">
            <div className="text-gray-500 text-xs">Address</div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm truncate">
                {asset.address!.slice(0, 6)}...{asset.address!.slice(-4)}
              </span>
              <Button
                type="link"
                size="small"
                icon={<CopyOutlined />}
                onClick={() => navigator.clipboard.writeText(asset.address!)}
              />
            </div>
          </div>
        )}
      </Card>
    );
  };

  // ---- Header ----
  const header = (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-4 md:px-6 py-4 border-b">
      <div className="flex items-center justify-between lg:justify-start gap-3 flex-wrap">
        <span className="font-semibold text-base md:text-lg">
          {activeTab === "spot" && "Spot Assets"}
          {activeTab === "futures" && "Futures Assets"}
          {activeTab === "margin" && "Margin Assets"}
          {activeTab === "external" && "Connected Wallets"}
        </span>
        <Badge count={assets.length} style={{ backgroundColor: "#1677ff" }} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
        <Input.Search
          placeholder="Search assets..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full sm:w-72"
          allowClear
        />
        <div className="flex justify-end gap-2">
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
    </div>
  );

  // ---- Main Render ----
  return (
    <Card
      className="rounded-xl shadow-sm"
      styles={{ body: { padding: 0 } }} // ✅ Ant Design v5 fix
    >
      {header}

      <div className="overflow-x-auto">
        {isLargeScreen ? (
          <Table
            columns={columns}
            dataSource={assets}
            rowKey="key"
            scroll={{ x: "max-content" }}
            pagination={{
              pageSize: 6,
              hideOnSinglePage: true,
              responsive: true,
            }}
            loading={loading}
            locale={{
              emptyText: <Empty description="No assets found" />,
            }}
            rowClassName="hover:bg-gray-50 dark:hover:bg-gray-800/50"
          />
        ) : (
          <div className="p-4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} loading={true} className="h-48" />
                ))}
              </div>
            ) : assets.length === 0 ? (
              <Empty description="No assets found" className="py-10" />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {assets.map((asset) => (
                  <AssetCard key={asset.key} asset={asset} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default AssetTable;