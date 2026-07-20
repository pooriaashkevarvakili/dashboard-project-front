import React from 'react';
import { Card, Row, Col, Button, Dropdown, Typography } from 'antd';
import { MoreOutlined, DownOutlined } from '@ant-design/icons';
import Chart from 'react-apexcharts';

import {
  getAreaChartOptions,
  getDonutOptions,
  getDonutSeries,
} from './data/chart';

import { useMonth } from '../../../hooks/useMonth';
import { useAlocationData } from '../../../hooks/useAlocationData';

const { Text } = Typography;

const MainCharts: React.FC = () => {
  const { data: month } = useMonth();
  const { data: allocationData = [] } = useAlocationData();

  const areaOptions = getAreaChartOptions(month ?? []);

  const areaSeries = [
    {
      name: 'بازده',
      data: (month ?? []).map((item) => item.number),
    },
  ];


  const donutOptions = getDonutOptions(allocationData);

  const donutSeries = getDonutSeries(allocationData);


  return (
    <Row gutter={[16, 16]} className="mb-6">

      <Col xs={24} lg={16}>
        <Card
          className="!bg-white !border-gray-200 shadow-sm h-full"
          bordered={false}
        >

          <div className="flex items-center justify-between mb-4">
            <div>
              <Text className="text-gray-900 font-semibold text-lg">
                عملکرد سبد
              </Text>

              <Text className="text-gray-500 text-sm block">
                بازده تجمعی
              </Text>
            </div>


            <Dropdown
              menu={{
                items: [
                  { key: '1', label: '۶ ماه' },
                  { key: '2', label: '۱ سال' },
                ],
              }}
            >
              <Button type="text" className="text-gray-500">
                امسال <DownOutlined />
              </Button>
            </Dropdown>

          </div>


          <Chart
            options={areaOptions}
            series={areaSeries}
            type="area"
            height={320}
          />

        </Card>
      </Col>



      <Col xs={24} lg={8}>
        <Card
          className="!bg-white !border-gray-200 shadow-sm h-full"
          bordered={false}
        >

          <div className="flex items-center justify-between mb-4">

            <Text className="text-gray-900 font-semibold text-lg">
              تخصیص دارایی
            </Text>


            <Button
              type="text"
              icon={<MoreOutlined />}
              className="text-gray-500"
            />

          </div>


          <Chart
            options={donutOptions}
            series={donutSeries}
            type="donut"
            height={260}
          />



          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6 text-sm">

            {allocationData.map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-3"
              >

                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />


                <Text className="text-gray-700">
                  {item.name}
                </Text>


                <Text className="text-gray-500 ml-auto font-medium">
                  {item.value}%
                </Text>


              </div>

            ))}

          </div>


        </Card>
      </Col>


    </Row>
  );
};


export default MainCharts;