import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { HistoricalItem } from './data/types'; // assume we have this type
import { useHistorical } from '../../../hooks/useHistorical';


export const HistoricalTab: React.FC = () => {
  const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
  
    const { data, pagination, isLoading } = useHistorical(page, pageSize);

  const columns: ColumnsType<HistoricalItem> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Price (USD)',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (price: number) => `$${price.toLocaleString()}`,
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
      align: 'right',
      render: (volume: number) => `$${(volume / 1e9).toFixed(1)}B`,
    },
    {
      title: 'Market Cap',
      dataIndex: 'marketCap',
      key: 'marketCap',
      align: 'right',
      render: (marketCap: number) => `$${(marketCap / 1e9).toFixed(0)}B`,
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Historical Data</h2>
      <Table<HistoricalItem>
        columns={columns}
        rowKey={(record) => record.date}
       dataSource={data}
         loading={isLoading}
        size="middle"
        bordered={false}
         pagination={{
          current: page,
          pageSize,
          total: pagination?.total ?? 0,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
          onChange: (newPage, newPageSize) => {
            setPage(newPage);
            setPageSize(newPageSize);
          },
        }}
      />
    </div>
  );
};