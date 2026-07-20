// RecentTransactions.tsx
import React from 'react';
import { Card, Table, Typography, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import type { Transaction } from '../../../types/Analize';
import { useTradeTable } from '../../../hooks/useTradeTable';

const { Text } = Typography;

const RecentTransactions: React.FC = () => {

  const {
    data,
    isLoading,
    isError,
  } = useTradeTable(1, 10);


  const transactions: Transaction[] = data?.data ?? [];


  const columns: ColumnsType<Transaction> = [
    {
      title: 'جفت ارز',
      dataIndex: 'pair',
      key: 'pair',
      render: (text: string) => (
        <Text className="font-mono font-medium text-gray-800">
          {text}
        </Text>
      ),
    },

    {
      title: 'نوع',
      dataIndex: 'type',
      key: 'type',
      render: (type: 'خرید' | 'فروش') => (
        <Tag
          color={type === 'خرید' ? 'green' : 'red'}
          className="font-medium"
        >
          {type}
        </Tag>
      ),
    },

    {
      title: 'مقدار',
      dataIndex: 'amount',
      key: 'amount',
      render: (value: number | string) => (
        <Text className="font-mono text-gray-700">
          {Number(value)}
        </Text>
      ),
    },

    {
      title: 'قیمت',
      dataIndex: 'price',
      key: 'price',
      render: (value: number | string) => (
        <Text className="font-mono text-gray-700">
          ${Number(value).toLocaleString()}
        </Text>
      ),
    },

    {
      title: 'مجموع',
      dataIndex: 'total',
      key: 'total',
      render: (value: number | string) => (
        <Text className="font-mono font-bold text-gray-900">
          ${Number(value).toLocaleString()}
        </Text>
      ),
    },

    {
      title: 'زمان',
      dataIndex: 'time',
      key: 'time',
      render: (text: string) => (
        <Space>
          <ClockCircleOutlined className="text-gray-400" />
          <Text className="text-gray-500 text-sm">
            {text}
          </Text>
        </Space>
      ),
    },

    {
      title: 'وضعیت',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {

        let icon;
        let color: 'success' | 'warning' | 'error';

        switch (status) {
          case 'تکمیل‌شده':
            icon = <CheckCircleOutlined />;
            color = 'success';
            break;

          case 'در انتظار':
            icon = <SyncOutlined spin />;
            color = 'warning';
            break;

          default:
            icon = <CloseCircleOutlined />;
            color = 'error';
        }


        return (
          <Tag
            icon={icon}
            color={color}
            className="text-xs font-semibold"
          >
            {status}
          </Tag>
        );
      },
    },
  ];


  if (isError) {
    return (
      <Card>
        <Text type="danger">
          دریافت اطلاعات تراکنش‌ها با خطا مواجه شد
        </Text>
      </Card>
    );
  }


  return (
    <Card
      className="!bg-white !border-gray-200 shadow-sm"
      bordered={false}
    >

      <div className="mb-4">
        <Text className="text-gray-900 font-semibold text-lg">
          تراکنش‌های اخیر
        </Text>

        <Text className="text-gray-500 text-sm block">
          آخرین فعالیت‌های سبد شما
        </Text>
      </div>


      <Table
        columns={columns}
        dataSource={transactions}
        loading={isLoading}
        pagination={{
          pageSize: data?.pagination?.limit ?? 10,
          total: data?.pagination?.total ?? 0,
          showSizeChanger: true,
        }}
        rowKey="id"
        scroll={{ x: true }}
        rowClassName="hover:!bg-gray-50 transition-colors"
        className="
          [&_.ant-table-thead_.ant-table-cell]:!bg-gray-50
          [&_.ant-table-thead_.ant-table-cell]:!text-gray-600
          [&_.ant-table-tbody_.ant-table-cell]:!border-b-gray-100
        "
      />

    </Card>
  );
};

export default RecentTransactions;