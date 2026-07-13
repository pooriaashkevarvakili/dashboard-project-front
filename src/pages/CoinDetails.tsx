// CoinDetails.tsx
import React, { useState } from 'react';
import { FaChartLine, FaDollarSign, FaExchangeAlt, FaClock, FaUsers, FaGlobe } from 'react-icons/fa';
import type { IconType } from 'react-icons'; // 👈 import the correct type

import { CoinHeader } from './Components/Coin/Header';
import TabNavigation from './Components/Coin/TabNavigation';
import OverviewTab from './Components/Coin/OverviewTab';
import ChartTab from './Components/Coin/ChartTab';
import { MarketTab } from './Components/Coin/MarketTab';
import { ExchangesTab } from './Components/Coin/ExchangesTab';
import { HistoricalTab } from './Components/Coin/HistoricalTab';
import { HoldersTab } from './Components/Coin/HoldersTab';
import { SocialTab } from './Components/Coin/SocialTabs';
import type { TabId, Timeframe } from './Components/Coin/data/types';
import { useExchangeTable } from '../hooks/useExchangeTable';

// 👇 Define tabs as a mutable array with explicit type
const tabsList: { id: TabId; label: string; icon: IconType }[] = [
  { id: 'overview', label: 'Overview', icon: FaChartLine },
  { id: 'chart', label: 'Price Chart', icon: FaChartLine },
  { id: 'market', label: 'Market Data', icon: FaDollarSign },
  { id: 'exchanges', label: 'Exchanges', icon: FaExchangeAlt },
  { id: 'historical', label: 'Historical', icon: FaClock },
  { id: 'holders', label: 'Holders', icon: FaUsers },
  { id: 'social', label: 'Social', icon: FaGlobe },
];

const CoinDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [timeframe, setTimeframe] = useState<Timeframe>('1M');
   const {data:exchange} =useExchangeTable()
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <CoinHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <TabNavigation 
          tabs={tabsList} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <div className="space-y-6">
          {activeTab === 'overview' && <OverviewTab timeframe={timeframe} setTimeframe={setTimeframe} />}
          {activeTab === 'chart' && <ChartTab timeframe={timeframe} setTimeframe={setTimeframe} />}
          {activeTab === 'market' && <MarketTab />}
          {activeTab === 'exchanges' && <ExchangesTab exchanges={exchange} />}
          {activeTab === 'historical' && <HistoricalTab />}
          {activeTab === 'holders' && <HoldersTab />}
          {activeTab === 'social' && <SocialTab />}
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-8 py-6 text-center text-xs text-gray-500">
        <p>Coin Details • Bitcoin • Data updated in real-time</p>
        <p className="mt-1">Built with React • TypeScript • Tailwind • ApexCharts</p>
      </footer>
    </div>
  );
};

export default CoinDetails;