import React from 'react';
import { Card, Row, Col, InputNumber, Button, Tag } from 'antd';

interface BuySellPanelProps {
  buyPrice: number;
  setBuyPrice: (val: number) => void;
  buyAmount: number;
  setBuyAmount: (val: number) => void;
  sellPrice: number;
  setSellPrice: (val: number) => void;
  sellAmount: number;
  setSellAmount: (val: number) => void;
}

const BuySellPanel: React.FC<BuySellPanelProps> = ({
  buyPrice, setBuyPrice, buyAmount, setBuyAmount,
  sellPrice, setSellPrice, sellAmount, setSellAmount,
}) => {
  return (
    <Card
      className="bg-white border-gray-200 shadow-sm"
      bodyStyle={{ padding: '10px 12px' }}
      bordered={false}
    >
      <Row gutter={10}>
        <Col span={12}>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-green-500 transition-all duration-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-green-600">خرید</span>
              <Tag color="success" className="!m-0 !text-[10px]">محدود</Tag>
            </div>
            <InputNumber
              className="w-full"
              value={buyPrice}
              onChange={(val) => setBuyPrice(val || 0)}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => parseFloat(value?.replace(/\$\s?|(,*)/g, '') || '0')}
              size="small"
              style={{ backgroundColor: '#fff' }}
            />
            <InputNumber
              className="w-full mt-1"
              value={buyAmount}
              onChange={(val) => setBuyAmount(val || 0)}
              size="small"
              min={0}
              step={0.01}
              placeholder="مقدار"
              style={{ backgroundColor: '#fff' }}
            />
            <Button
              type="primary"
              className="w-full mt-2 bg-green-500 border-green-500 hover:bg-green-600 transition-all font-medium"
              size="small"
            >
              خرید BTC
            </Button>
          </div>
        </Col>

        <Col span={12}>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-red-500 transition-all duration-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-red-500">فروش</span>
              <Tag color="error" className="!m-0 !text-[10px]">محدود</Tag>
            </div>
            <InputNumber
              className="w-full"
              value={sellPrice}
              onChange={(val) => setSellPrice(val || 0)}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => parseFloat(value?.replace(/\$\s?|(,*)/g, '') || '0')}
              size="small"
              style={{ backgroundColor: '#fff' }}
            />
            <InputNumber
              className="w-full mt-1"
              value={sellAmount}
              onChange={(val) => setSellAmount(val || 0)}
              size="small"
              min={0}
              step={0.01}
              placeholder="مقدار"
              style={{ backgroundColor: '#fff' }}
            />
            <Button
              danger
              className="w-full mt-2 hover:opacity-80 transition-all font-medium"
              size="small"
            >
              فروش BTC
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default BuySellPanel;