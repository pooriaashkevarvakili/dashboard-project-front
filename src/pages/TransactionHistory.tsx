// TransactionHistory.tsx
import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fa';

import TransactionHeader from './Components/Transaction/TransactionHeader';
import StatsCards from './Components/Transaction/StatsCards';
import VolumeChart from './Components/Transaction/VolumeChart';
import TransactionFilters from './Components/Transaction/TransactionFilters';
import TransactionTableSection from './Components/Transaction/TransactionTableSection';

import type { Transaction, TransactionStats, TransactionType } from './Components/Transaction/types/types';
import { getTransactionsFilter } from '../services/transactionSearch';
import { useQuery } from '@tanstack/react-query';

const TransactionHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState<TransactionType | 'all'>('all');
  const [selectedCoin, setSelectedCoin] = useState('all');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);

  const { data } = useQuery<Transaction[]>({
    queryKey: ['transactions', searchText, selectedType, selectedCoin, dateRange],
    queryFn: async () => {
      const rawData = await getTransactionsFilter({
        search: searchText || undefined,
        type: selectedType === 'all' ? undefined : selectedType,
        coin: selectedCoin === 'all' ? undefined : selectedCoin,
        from: dateRange?.[0]?.format('YYYY-MM-DD'),
        to: dateRange?.[1]?.format('YYYY-MM-DD'),
      });

      // نگاشت کامل با تمام فیلدهای Transaction
    const mapped: Transaction[] = rawData.map((item): Transaction => ({
  id: String((item as any).id),
  type: (item as any).type,
  coin: (item as any).coin,
  amount: (item as any).amount ?? 0,
  price: (item as any).price ?? 0,
  total: (item as any).total ?? ((item as any).amount ?? 0),
  fee: (item as any).fee ?? 0,
  status: (item as any).status ?? 'completed',
  date: (item as any).date ?? new Date().toISOString(),
  from: (item as any).from ?? '',
  to: (item as any).to ?? '',
  description: (item as any).description ?? '',
  txHash: (item as any).txHash ?? '',
}));

      return mapped;
    },
    initialData: [],
  });

  const transactions = data ?? [];

  const uniqueCoins = useMemo(() => {
    return [...new Set(transactions.map((tx) => tx.coin))].sort();
  }, [transactions]);

  const stats = useMemo<TransactionStats>(() => {
    const total = transactions.length;
    const deposits = transactions.filter((tx) => tx.type === 'deposit').length;
    const withdrawals = transactions.filter((tx) => tx.type === 'withdraw').length;
    const buys = transactions.filter((tx) => tx.type === 'buy').length;
    const sells = transactions.filter((tx) => tx.type === 'sell').length;
    const swaps = transactions.filter((tx) => tx.type === 'swap').length;
    const completed = transactions.filter((tx) => tx.status === 'completed').length;
    const totalVolume = transactions.reduce((sum, tx) => sum + tx.total, 0);

    return {
      totalTransactions: total,
      totalVolume,
      totalDeposits: deposits,
      totalWithdrawals: withdrawals,
      totalBuys: buys,
      totalSells: sells,
      totalSwaps: swaps,
      successRate: total > 0 ? (completed / total) * 100 : 0,
    };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // جستجو
    if (searchText.trim()) {
      const search = searchText.toLowerCase();
      result = result.filter(
        (tx) =>
          String(tx.id).includes(search) ||
          tx.coin.toLowerCase().includes(search) ||
          tx.description?.toLowerCase().includes(search) ||
          tx.txHash?.toLowerCase().includes(search) ||
          tx.from?.toLowerCase().includes(search) ||
          tx.to?.toLowerCase().includes(search)
      );
    }

    // فیلتر کوین
    if (selectedCoin !== 'all') {
      result = result.filter((tx) => tx.coin === selectedCoin);
    }

    // فیلتر تاریخ
    if (dateRange?.[0] && dateRange?.[1]) {
      const start = dateRange[0].startOf('day');
      const end = dateRange[1].endOf('day');
      result = result.filter((tx) => {
        const txDate = dayjs(tx.date);
        return (txDate.isAfter(start) || txDate.isSame(start)) && (txDate.isBefore(end) || txDate.isSame(end));
      });
    }

    // فیلتر نوع (تب اولویت دارد)
    if (activeTab !== 'all') {
      result = result.filter((tx) => tx.type === activeTab);
    } else if (selectedType !== 'all') {
      result = result.filter((tx) => tx.type === selectedType);
    }

    return result;
  }, [transactions, searchText, selectedCoin, dateRange, activeTab, selectedType]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const handleResetFilters = () => {
    setSearchText('');
    setSelectedType('all');
    setSelectedCoin('all');
    setDateRange(null);
    setActiveTab('all');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 lg:p-8 font-sans" dir="rtl">
      <TransactionHeader onRefresh={handleRefresh} loading={loading} />
      <StatsCards stats={stats} uniqueCoins={uniqueCoins.length} />
      <VolumeChart filteredTransactions={filteredTransactions} />
      <TransactionFilters
        searchText={searchText}
        setSearchText={setSearchText}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
        dateRange={dateRange}
        setDateRange={setDateRange}
        uniqueCoins={uniqueCoins}
        onReset={handleResetFilters}
      />
      <TransactionTableSection
        filteredTransactions={filteredTransactions}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        loading={loading}
      />
      <div className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
        © 2026 تمامی حقوق محفوظ است · داده‌ها به‌روز رسانی شدند
      </div>
    </div>
  );
};

export default TransactionHistory;