import React from 'react';
import { Card, Tabs, Table, Button, Typography, Dropdown, Empty } from 'antd';
import { DownloadOutlined, MoreOutlined, EyeOutlined, DollarOutlined, PrinterOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Transaction } from './types/types';
import TransactionRow from './TransactionRow';

const { Text } = Typography;

interface TransactionTableSectionProps {
  filteredTransactions: Transaction[];
  activeTab: string;
  setActiveTab: (key: string) => void;
  loading: boolean;
}

const TransactionTableSection: React.FC<TransactionTableSectionProps> = ({
  filteredTransactions,
  activeTab,
  setActiveTab,
  loading,
}) => {
  const tabItems = [
    { key: 'all', label: 'All' },
    { key: 'deposit', label: 'Deposits' },
    { key: 'withdraw', label: 'Withdrawals' },
    { key: 'buy', label: 'Buys' },
    { key: 'sell', label: 'Sells' },
    { key: 'swap', label: 'Swaps' },
  ];

  const columns = [
    { title: 'Transaction', dataIndex: 'id', key: 'id', render: (_: any, record: Transaction) => <TransactionRow record={record} /> },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <div>
          <div>{dayjs(date).format('MMM DD, YYYY')}</div>
          <div className="text-xs text-gray-500">{dayjs(date).format('HH:mm')}</div>
        </div>
      ),
      sorter: (a: Transaction, b: Transaction) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right' as const,
      render: (amount: number, record: Transaction) => (
        <div className="text-right">
          <div>{amount.toFixed(6)} {record.coin}</div>
        <div className="text-xs text-gray-500">
  {Number(amount).toLocaleString()} {record.coin}
</div>
        </div>
      ),
      sorter: (a: Transaction, b: Transaction) => a.total - b.total,
    },
  {
  title: 'Status',
  key: 'status',
  render: (_: any, record: Transaction) => {
    const config = {
      deposit: { label: 'Deposit', color: 'success' },
      withdraw: { label: 'Withdraw', color: 'warning' },
      buy: { label: 'Buy', color: 'processing' },
      sell: { label: 'Sell', color: 'error' },
      swap: { label: 'Swap', color: 'default' },
    }[record.type];

    return (
      <span className={`tag tag-${config?.color ?? 'default'}`}>
        {config?.label ?? record.type}
      </span>
    );
  },
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right' as const,
      render: (_: any, record: Transaction) => (
        <Dropdown menu={{ items: [
          { key: 'view', icon: <EyeOutlined />, label: 'View Details' },
          { key: 'explorer', icon: <DollarOutlined />, label: 'View on Explorer', disabled: !record.txHash },
          { key: 'print', icon: <PrinterOutlined />, label: 'Print Receipt' },
        ]}} trigger={['click']}>
          <Button type="text" size="small" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <Card className="border-0 shadow-sm rounded-xl overflow-hidden" bodyStyle={{ padding: '0' }}>
      <div className="px-4 pt-4 md:px-6 md:pt-6 border-b border-gray-100 dark:border-gray-800">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems.map(item => ({
            key: item.key,
            label: item.label,
          }))}
        />
      </div>

      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            {filteredTransactions.length} تراکنش یافت شد
          </Text>
          <Button size="small" icon={<DownloadOutlined />}>خروجی CSV</Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredTransactions}
          rowKey="id"
          pagination={{ pageSize: 8, showSizeChanger: true, showQuickJumper: true }}
          loading={loading}
          locale={{ emptyText: <Empty description="هیچ تراکنشی یافت نشد" /> }}
          scroll={{ x: 800 }}
        />
      </div>
    </Card>
  );
};

export default TransactionTableSection;