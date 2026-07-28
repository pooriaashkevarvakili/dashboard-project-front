import React, { useState, useMemo } from "react";
import { Card, Tabs, Button } from "antd";
import { tradersData } from "../pages/Components/CopyTrade/mock/mock";
import type { Trader } from "../types/Trade";

import Header from "../pages/Components/CopyTrade/Header";
import StatsCards from "../pages/Components/CopyTrade/StatsCards";
import TradersTable from "../pages/Components/CopyTrade/TradersTable";
import TopPerformersGrid from "../pages/Components/CopyTrade/TopPerformersGrid";
import CopyModal from "../pages/Components/CopyTrade/CopyModal";

const CopyTrading: React.FC = () => {
  const [traders, setTraders] = useState<Trader[]>(tradersData);

  const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);

  const [copyAmount, setCopyAmount] = useState<number>(1000);
  const [riskMultiplier, setRiskMultiplier] = useState<number>(1);
  const [autoCopy, setAutoCopy] = useState<boolean>(true);
  const [stopLoss, setStopLoss] = useState<number>(10);
  const [takeProfit, setTakeProfit] = useState<number>(20);

  const [activeTab, setActiveTab] = useState<string>("top");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const handleStar = (traderId: string) => {
    setTraders((prev) =>
      prev.map((t) =>
        t.id === traderId ? { ...t, isStarred: !t.isStarred } : t,
      ),
    );
  };

  const handleOpenCopyModal = (trader: Trader) => {
    setSelectedTrader(trader);
    setCopyAmount(trader.copyAmount || 1000);
    setIsCopyModalOpen(true);
  };

  const handleCopyTrade = () => {
    if (selectedTrader) {
      setTraders((prev) =>
        prev.map((t) =>
          t.id === selectedTrader.id
            ? { ...t, isCopying: true, copyAmount }
            : t,
        ),
      );
      setIsCopyModalOpen(false);
      setSelectedTrader(null);
    }
  };

  const handleStopCopying = (traderId: string) => {
    setTraders((prev) =>
      prev.map((t) =>
        t.id === traderId
          ? { ...t, isCopying: false, copyAmount: undefined }
          : t,
      ),
    );
  };

  const filteredTraders = useMemo(() => {
    let result = [...traders];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.strategy.toLowerCase().includes(query),
      );
    }

    switch (activeTab) {
      case "top":
        result.sort((a, b) => a.rank - b.rank);
        break;
      case "followers":
        result.sort((a, b) => b.followers - a.followers);
        break;
      case "roi":
        result.sort((a, b) => b.roi - a.roi);
        break;
      case "winrate":
        result.sort((a, b) => b.winRate - a.winRate);
        break;
      case "starred":
        result = result.filter((t) => t.isStarred);
        break;
      default:
        break;
    }

    return result;
  }, [traders, searchQuery, activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <StatsCards traders={traders} />

      <Card
        className="rounded-xl shadow-sm border-0 overflow-hidden"
        bodyStyle={{ padding: "20px 24px" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <Tabs activeKey={activeTab} onChange={setActiveTab} size="small">
            <Tabs.TabPane tab="🏆 Top Traders" key="top" />
            <Tabs.TabPane tab="🔥 Most Followed" key="followers" />
            <Tabs.TabPane tab="📈 Highest ROI" key="roi" />
            <Tabs.TabPane tab="🎯 Best Win Rate" key="winrate" />
            <Tabs.TabPane tab="⭐ Starred" key="starred" />
          </Tabs>

          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs mr-1">
              {filteredTraders.length} traders
            </span>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
              <Button
                type={viewMode === "list" ? "primary" : "text"}
                size="small"
                onClick={() => setViewMode("list")}
              >
                List
              </Button>
              <Button
                type={viewMode === "grid" ? "primary" : "text"}
                size="small"
                onClick={() => setViewMode("grid")}
              >
                Grid
              </Button>
            </div>
          </div>
        </div>

        {viewMode === "list" ? (
          <TradersTable
            traders={filteredTraders}
            onStar={handleStar}
            onCopy={handleOpenCopyModal}
            onStopCopy={handleStopCopying}
          />
        ) : (
          <TopPerformersGrid
            traders={filteredTraders}
            onCopy={handleOpenCopyModal}
            onStopCopy={handleStopCopying}
          />
        )}
      </Card>

      <TopPerformersGrid
        traders={traders.slice(0, 4)}
        isMainGrid
        onCopy={handleOpenCopyModal}
        onStopCopy={handleStopCopying}
      />

      <CopyModal
        open={isCopyModalOpen}
        trader={selectedTrader}
        copyAmount={copyAmount}
        setCopyAmount={setCopyAmount}
        riskMultiplier={riskMultiplier}
        setRiskMultiplier={setRiskMultiplier}
        autoCopy={autoCopy}
        setAutoCopy={setAutoCopy}
        stopLoss={stopLoss}
        setStopLoss={setStopLoss}
        takeProfit={takeProfit}
        setTakeProfit={setTakeProfit}
        onClose={() => {
          setIsCopyModalOpen(false);
          setSelectedTrader(null);
        }}
        onCopy={handleCopyTrade}
      />
    </div>
  );
};

export default CopyTrading;
