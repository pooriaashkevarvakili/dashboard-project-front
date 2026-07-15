import React from "react";
import { Button, Badge } from "antd";
import { DollarOutlined, LineChartOutlined, SafetyOutlined, LinkOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

interface Props {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  showBalances: boolean;
  setShowBalances: (val: boolean) => void;
}

const WalletTabBar: React.FC<Props> = ({ activeTab, setActiveTab, showBalances, setShowBalances }) => {
  const tabs = [
    { key: "spot", label: "Spot", icon: <DollarOutlined /> },
    { key: "futures", label: "Futures", icon: <LineChartOutlined /> },
    { key: "margin", label: "Margin", icon: <SafetyOutlined /> },
    { key: "external", label: "External Wallets", icon: <LinkOutlined /> },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div className="flex flex-wrap gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-white dark:bg-gray-700 shadow-md text-gray-800 dark:text-gray-200"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.key === "futures" && <Badge count="Live" style={{ backgroundColor: "#fa541c" }} />}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button
          icon={showBalances ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          onClick={() => setShowBalances(!showBalances)}
        >
          {showBalances ? "Hide" : "Show"} Balances
        </Button>
       
      </div>
    </div>
  );
};

export default WalletTabBar;