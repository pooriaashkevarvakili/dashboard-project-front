import React, { useState } from "react";
import { Layout, Row, Col } from "antd";

import TradingHeader from "./Components/Trading/TradingHeader";
import ChartAndTabs from "./Components/Trading/ChartAndTabs";
import OrderBookPanel from "./Components/Trading/OrderBookPanel";
import MarketTradesPanel from "./Components/Trading/MarketTradesPanel";
import BuySellPanel from "./Components/Trading/BuySellPanel";
import { useMarketTrade } from "../hooks/useMarketTrades";
import { useOrderBook } from "../hooks/useOrderBook";

const { Content } = Layout;

const TradingTerminal: React.FC = () => {
  const [buyPrice, setBuyPrice] = useState<number>(43200);
  const [buyAmount, setBuyAmount] = useState<number>(0.1);
  const [sellPrice, setSellPrice] = useState<number>(43250);
  const [sellAmount, setSellAmount] = useState<number>(0.1);
  const { data: marketTradesData } = useMarketTrade();
  const { data: orderBookData } = useOrderBook();

  return (
      <>
      <TradingHeader />

      <Content className="p-3">
        <Row gutter={[12, 12]}>
          <Col xs={24} xl={16} xxl={17}>
            <ChartAndTabs />
          </Col>

          <Col xs={24} xl={8} xxl={7}>
            <Row gutter={[0, 12]}>
              <Col span={24}>
                <OrderBookPanel data={orderBookData || []} />
              </Col>

              <Col span={24}>
                <MarketTradesPanel data={marketTradesData || []} />
              </Col>

              <Col span={24}>
                <BuySellPanel
                  buyPrice={buyPrice}
                  setBuyPrice={setBuyPrice}
                  buyAmount={buyAmount}
                  setBuyAmount={setBuyAmount}
                  sellPrice={sellPrice}
                  setSellPrice={setSellPrice}
                  sellAmount={sellAmount}
                  setSellAmount={setSellAmount}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
      </>
   
  );
};

export default TradingTerminal;