// components/OrdersTransactionsTab.tsx

import React from "react";
import {
  Tabs,
  Table,
  Space,
  Select,
  Input,
  DatePicker,
} from "antd";

import {
  FaHistory,
  FaExchangeAlt,
} from "react-icons/fa";

const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface Props {
  activeTab: string;
  setActiveTab: (key: string) => void;

  orderColumns: any[];
  transactionColumns: any[];

  mockOrders: any[];
  mockTransactions: any[];

  isMobile: boolean;
  isSmallMobile: boolean;
}

const OrdersTransactionsTab: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  orderColumns,
  transactionColumns,
  mockOrders,
  mockTransactions,
  isMobile,
  isSmallMobile,
}) => {
  return (
    <Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
    >
      {/* ================= Orders ================= */}

      <TabPane
        key="orders"
        tab={
          <span>
            <FaHistory /> Order History
          </span>
        }
      >
        <Space
          wrap
          style={{ marginBottom: 20 }}
        >
          <Select
            defaultValue="all"
            style={{ width: 130 }}
          >
            <Option value="all">
              All Types
            </Option>

            <Option value="buy">
              Buy
            </Option>

            <Option value="sell">
              Sell
            </Option>
          </Select>

          <Select
            defaultValue="all"
            style={{ width: 140 }}
          >
            <Option value="all">
              All Status
            </Option>

            <Option value="completed">
              Completed
            </Option>

            <Option value="pending">
              Pending
            </Option>

            <Option value="cancelled">
              Cancelled
            </Option>
          </Select>

          <RangePicker />

        
        </Space>

        <Table
          columns={orderColumns}
          dataSource={mockOrders}
          pagination={{
            pageSize: isMobile ? 3 : 5,
          }}
          scroll={{
            x: isSmallMobile ? 650 : 900,
          }}
        />
      </TabPane>

      {/* ================= Transactions ================= */}

      <TabPane
        key="transactions"
        tab={
          <span>
            <FaExchangeAlt /> Transactions
          </span>
        }
      >
        <Space
          wrap
          style={{ marginBottom: 20 }}
        >
          <Search
            placeholder="Search transaction..."
            style={{ width: 300 }}
          />

        </Space>

        <Table
          columns={transactionColumns}
          dataSource={mockTransactions}
          pagination={{
            pageSize: isMobile ? 3 : 5,
          }}
          scroll={{
            x: isSmallMobile ? 750 : 1000,
          }}
        />
      </TabPane>
    </Tabs>
  );
};

export default OrdersTransactionsTab;