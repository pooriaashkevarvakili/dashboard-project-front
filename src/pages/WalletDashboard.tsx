import React, { useState } from "react";
import type { WalletSummary,WalletAsset } from "./Components/Wallets/types/walletTypes";
import WalletSummaryCards from "./Components/Wallets/WalletSummeryCards";
import WalletTabBar from "./Components/Wallets/WalletTabBar";
import AssetTable from "./Components/Wallets/AssetTable";
import WalletFooter from "./Components/Wallets/WalletFooter";
import { useSpotAsset } from "../hooks/useSpotAsset";
import { useFutureAsset } from "../hooks/useFutureAsset";
import { useMarginAsset } from "../hooks/useMarginAsset";
import { useExternalWallet } from "../hooks/useExternalWallet";

const summaryData: Record<string, WalletSummary> = {
  spot: { totalBalance: 118375, totalProfit: 2450, totalProfitPercent: 2.11, activePositions: 0, pendingOrders: 3 },
  futures: { totalBalance: 102580, totalProfit: -1240, totalProfitPercent: -1.19, activePositions: 4, pendingOrders: 2 },
  margin: { totalBalance: 44810, totalProfit: 380, totalProfitPercent: 0.85, activePositions: 2, pendingOrders: 1 },
  external: { totalBalance: 203650, totalProfit: 0, totalProfitPercent: 0, activePositions: 0, pendingOrders: 0 },
};

const WalletDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"spot" | "futures" | "margin" | "external">("spot");
  const [showBalances, setShowBalances] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const {data:spotAsset}=useSpotAsset()
  const {data:futureAsset}=useFutureAsset()
  const {data:marginAsset} =useMarginAsset()
  const {data:externalWallet}=useExternalWallet()
const getAssets = (tab: string): WalletAsset[] => {
  switch (tab) {
    case "spot":
      return Array.isArray(spotAsset) ? spotAsset : [];

    case "futures":
      return Array.isArray(futureAsset) ? futureAsset : [];

    case "margin":
      return Array.isArray(marginAsset) ? marginAsset : [];

    case "external":
      return Array.isArray(externalWallet) ? externalWallet : [];

    default:
      return [];
  }
};

  const filteredAssets = getAssets(activeTab).filter((asset) =>
    asset.currency.toLowerCase().includes(searchText.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const summary = summaryData[activeTab] || summaryData.spot;



  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 bg-gray-50/50 dark:bg-gray-900/50 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <span>💼</span> Wallets
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Manage all your crypto assets in one place</p>
        </div>
      </div>

      <WalletSummaryCards summary={summary} showBalances={showBalances} />
      <WalletTabBar activeTab={activeTab} setActiveTab={setActiveTab} showBalances={showBalances} setShowBalances={setShowBalances} />

    

      <AssetTable
        activeTab={activeTab}
        assets={filteredAssets}
        showBalances={showBalances}
        searchText={searchText}
        setSearchText={setSearchText}
        loading={loading}
        setLoading={setLoading}
      />

      <WalletFooter filteredAssets={filteredAssets} showBalances={showBalances} />
    </div>
  );
};

export default WalletDashboard;