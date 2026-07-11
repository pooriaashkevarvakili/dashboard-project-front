import React from 'react';
import {  Typography } from 'antd';

const { Title, Text } = Typography;

interface TransactionHeaderProps {
  onRefresh: () => void;
  loading: boolean;
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({  }) => {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Title level={2} className="!mb-1 text-gray-900 dark:text-white">
            تاریخچه تراکنش‌ها
          </Title>
          <Text className="text-gray-500 dark:text-gray-400">
            مدیریت و بررسی تمام تراکنش‌های شما در یک نگاه
          </Text>
        </div>
       
      </div>
    </div>
  );
};

export default TransactionHeader;