import React, { useState } from "react";
import { Card, Row, Col, Tabs, Grid, Tag, Badge } from "antd";
import {
  FaHistory,
  FaExchangeAlt,
  FaWallet,
  FaFileAlt,
  FaDollarSign,
} from "react-icons/fa";

// Main Components
import AssetHeader from "./Components/Asset/AssetHeader";
import MarketStats from "./Components/Asset/MarketStatus";
import PriceSummary from "./Components/Asset/PriceSummary";
import PriceChart from "./Components/Asset/PriceChart";

import OrderHistoryTab from "./Components/Asset/tabs/OrderHistoryTabs";
import TransactionsTab from "./Components/Asset/tabs/TransactionsTab";
import WalletsTab from "./Components/Asset/tabs/WalletsTab";
import NotesTab from "./Components/Asset/tabs/NotesTab";
import ROITab from "./Components/Asset/tabs/RioTabs";

import CoinInterview from "./Components/CoinInterview";
import { useHistoryTable } from "../hooks/useHistoryTable";
import { useWalletTable } from "../hooks/useWalletTable";
import {useOrderTable} from '../hooks/useorderTable'
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;

const AssetDetails: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const isSmallMobile = !screens.sm;
  const {data:orderHistory}=useHistoryTable()
  const {data:wallets}=useWalletTable()
  const [activeTab, setActiveTab] = useState("overview");
  const [price] = useState(65720.5);
  const [priceChange] = useState(2.35);
  const [isFavorite, setIsFavorite] = useState(false);

const {data:orderTable}=useOrderTable()
  const totalInvested = 125000;
  const currentValue = 180675;
  const roi = ((currentValue - totalInvested) / totalInvested) * 100;

  return (
    <div
      style={{
        padding: isMobile ? "12px" : "24px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <AssetHeader
          price={price}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          isMobile={isMobile}
        />

        <MarketStats
          price={price}
          priceChange={priceChange}
          isMobile={isMobile}
        />

        <PriceSummary isMobile={isMobile} />

        <Row
          gutter={[isMobile ? 8 : 16, isMobile ? 8 : 16]}
          style={{ marginBottom: isMobile ? 16 : 24 }}
        >
          <Col xs={24}>
            <PriceChart isMobile={isMobile} />
          </Col>
        </Row>

        <Card
          style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            size={isMobile ? "small" : "middle"}
            tabBarExtraContent={
              <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Tag color="blue">Live</Tag>
                <Badge status="processing" text="Synced" />
              </span>
            }
          >
            <TabPane
          
              tab={
                <span className="flex flex-col items-center justify-center">
                  <FaHistory /> Overview
                </span>
              }
              key="overview"
            >
              <CoinInterview isMobile={isMobile} />
            </TabPane>

            <TabPane
              tab={
                <span className="flex flex-col items-center justify-center">
                  <FaHistory /> Order History
                </span>
              }
              key="orders"
            >
              <OrderHistoryTab
                orders={orderTable}
                isMobile={isMobile}
                isSmallMobile={isSmallMobile}
              />
            </TabPane>

            <TabPane
              tab={
                <span className="flex flex-col items-center justify-center">
                  <FaExchangeAlt /> Transactions
                </span>
              }
              key="transactions"
            >
              <TransactionsTab
                isMobile={isMobile}
                isSmallMobile={isSmallMobile}
  transactions={orderHistory ?? []}

              />
            </TabPane>

            <TabPane
              tab={
                <span className="flex flex-col items-center justify-center">
                  <FaWallet /> Wallets
                </span>
              }
              key="wallets"
            >
              <WalletsTab
                wallets={wallets}
                isMobile={isMobile}
                isSmallMobile={isSmallMobile}
              />
            </TabPane>

            <TabPane
              tab={
                <span className="flex flex-col items-center justify-center">
                  <FaFileAlt /> Notes
                </span>
              }
              key="notes"
            >
              <NotesTab isMobile={isMobile} />
            </TabPane>

            <TabPane
              tab={
                <span className="flex flex-col items-center justify-center">
                  <FaDollarSign /> ROI
                </span>
              }
              key="roi"
            >
              <ROITab
                roi={roi}
                totalInvested={totalInvested}
                currentValue={currentValue}
                price={price}
                isMobile={isMobile}
              />
            </TabPane>
          </Tabs>
        </Card>

      
      </div>
    </div>
  );
};

export default AssetDetails;
