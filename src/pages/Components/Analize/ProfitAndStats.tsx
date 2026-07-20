import React from 'react';
import { Card, Row, Col, Typography, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import Chart from 'react-apexcharts';

import {
  getBarChartOptions,
  getBarSeries,
} from './data/chart';

import { useWeek } from '../../../hooks/useWeek';
import { useMetrics } from '../../../hooks/useMetrics';

const { Text } = Typography;
const ProfitAndStats: React.FC = () => {
  const { data: week } = useWeek();
  const barChartOptions = getBarChartOptions(week ?? []);
  const barSeries = getBarSeries(week ?? []);
const {data:metrics}=useMetrics()
  return (
    <Row gutter={[16, 16]} className="mb-6">
      <Col xs={24} lg={12}>
        <Card
          className="!bg-white !border-gray-200 shadow-sm"
          bordered={false}
        >
          <div className="flex justify-between mb-4">
            <Text className="text-gray-900 font-semibold text-lg">
              سود هفتگی
            </Text>
          </div>

          <Chart
            options={barChartOptions}
            series={barSeries}
            type="bar"
            height={400}
          />
        </Card>
      </Col>

      <Col xs={24} lg={12}>
        <Card
          className="!bg-white !border-gray-200 shadow-sm h-full"
          bordered={false}
        >
          <div className="flex justify-between mb-4">
            <Text className="text-gray-900 font-semibold text-lg">
              آمار سریع
            </Text>

            <Tooltip title="بر اساس ۳۰ روز اخیر">
              <InfoCircleOutlined className="text-gray-400" />
            </Tooltip>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {metrics.map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 p-4 rounded-2xl"
              >
                <Text className="text-gray-500 text-xs">
                  {item.title}
                </Text>

                <div
                  className={`text-2xl font-bold mt-1 ${item.className}`}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfitAndStats;