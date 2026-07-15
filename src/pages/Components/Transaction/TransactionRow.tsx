import React from 'react';
import { getTypeConfig } from './helpers';

interface TransactionRowProps {
  record: any;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ record }) => {
  const config = getTypeConfig(record.type);
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.bgColor}`}>
        <Icon className="text-lg" />
      </div>

      <div>
        <div className="font-medium">{config.label}</div>
        <div className="text-xs text-gray-500">
          {record.coin} · {record.amount}
        </div>
      </div>
    </div>
  );
};

export default TransactionRow;