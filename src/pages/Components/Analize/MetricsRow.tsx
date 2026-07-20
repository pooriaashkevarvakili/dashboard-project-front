// MetricsRow.tsx
import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

const metrics: MetricCardProps[] = [ /* تمام داده‌های metrics را اینجا کپی کنید */ ];

const MetricsRow: React.FC = () => {
  return (
    <Row gutter={[16, 16]} className="mb-6">
      {metrics.map((metric, idx) => (
        <Col xs={24} sm={12} lg={24 / 5} key={idx}>
          <Card className="!bg-white !border-gray-200 hover:!border-indigo-300 transition-all duration-300 shadow-sm hover:shadow-md" bordered={false}>
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-gray-500 text-sm">{metric.title}</Text>
                <div className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</div>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${metric.bg} ${metric.color}`}>
                {metric.icon}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className={metric.change >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                {metric.change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                {Math.abs(metric.change)}%
              </span>
              <span className="text-gray-400 text-xs">نسبت به ماه قبل</span>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MetricsRow;