// TransactionFilters.tsx
import React from 'react';
import { Card, Input, Select, Button, DatePicker } from 'antd';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

// اگر types.ts در همان پوشه است:
import type { TransactionType } from './types/types';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface TransactionFiltersProps {
  searchText: string;
  setSearchText: (value: string) => void;
  selectedType: TransactionType | 'all';
  setSelectedType: (value: TransactionType | 'all') => void;
  selectedCoin: string;
  setSelectedCoin: (value: string) => void;
  dateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;
  setDateRange: (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => void;
  uniqueCoins: string[];
  onReset: () => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  searchText, setSearchText, selectedType, setSelectedType,
  selectedCoin, setSelectedCoin, dateRange, setDateRange,
  uniqueCoins, onReset
}) => {
  return (
    <Card className="mb-6 border-0 shadow-sm rounded-xl overflow-hidden" bodyStyle={{ padding: '20px 24px' }}>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <FilterOutlined className="text-gray-400" />
          <span className="font-medium text-gray-700 dark:text-gray-300">فیلترها:</span>
        </div>

        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="جستجو..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            className="flex-1 min-w-[150px] rounded-lg"
          />

          <Select 
            value={selectedType} 
            onChange={setSelectedType} 
            className="min-w-[130px] rounded-lg"
          >
            <Option value="all">همه انواع</Option>
            <Option value="deposit">واریز</Option>
            <Option value="withdraw">برداشت</Option>
            <Option value="buy">خرید</Option>
            <Option value="sell">فروش</Option>
            <Option value="swap">تبادل</Option>
          </Select>

          <Select 
            value={selectedCoin} 
            onChange={setSelectedCoin} 
            className="min-w-[120px] rounded-lg"
          >
            <Option value="all">همه ارزها</Option>
            {uniqueCoins.map(coin => (
              <Option key={coin} value={coin}>{coin}</Option>
            ))}
          </Select>

          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder={['از تاریخ', 'تا تاریخ']}
            format="YYYY/MM/DD"
            className="min-w-[240px] rounded-lg"
          />

          <Button onClick={onReset} className="rounded-lg">پاک کردن</Button>
        </div>
      </div>
    </Card>
  );
};

export default TransactionFilters;