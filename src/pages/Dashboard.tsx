import { Card, Row, Col, Typography, Button, Table, List, Tag } from "antd";

import { FaWallet, FaBitcoin, FaEthereum } from "react-icons/fa6";

import { SiSolana, SiBinance } from "react-icons/si";
import { useWeek } from "../hooks/useWeek";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
const { Title, Text } = Typography;
import { useNewsApi } from "../hooks/useNewsApi";
import { useTransactionsTable } from "../hooks/useTransactionsTable";
import { useTransactions } from "../hooks/useTransactions";
import { useCryptoDescription } from "../hooks/useCryptoDescription";
import { useChartSeries } from "../hooks/useChartSeries";
export default function Dashboard() {
  const { data: week } = useWeek();
  const { data: crypto } = useCryptoDescription();

  const { data:chartSeriesNumber } = useChartSeries('1W');

  const chartOptions: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    colors: ["#16a34a"],

    stroke: {
      curve: "smooth",
      width: 4,
    },

    dataLabels: {
      enabled: false,
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },

    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 5,
    },

    xaxis: {
      categories: week?.map((item) => item.week) ?? [],
    },

    tooltip: {
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
  };
  const chartSeries = [
    {
      name: "دارایی",
      data: chartSeriesNumber?.map((item:any) => item.priceChart) ?? [],
    },
  ];

  const { data: transactionsTable, isLoading } = useTransactionsTable();
  const { data: transactions } = useTransactions();
  const icons = {
    FaWallet,
    FaBitcoin,
    FaEthereum,
    SiSolana,
    SiBinance,
  };
  const { dataThree: news } = useNewsApi();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Title level={2} className="!mb-0">
            داشبورد کریپتو
          </Title>

          <Text>نمای کلی از وضعیت بازار و سبد دارایی</Text>
        </div>

        <Button type="primary">بروزرسانی</Button>
      </div>

      <Row gutter={[16, 16]}>
        {crypto?.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons] || FaWallet;

          return (
            <Col xs={24} md={12} xl={6} key={item.key}>
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <Text style={{ fontSize: 20 }} >
                      {item.title}
                    </Text>

                    <Title level={3}>{item.price}</Title>

                    <Tag color="green">{item.priceOne}</Tag>
                  </div>

                  <Icon size={34} className="text-blue-500" />
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={16}>
          <Card title="نمودار ارزش دارایی">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <Title level={4} className="!mb-0">
                  روند ارزش دارایی
                </Title>

                <Text type="secondary">۷ روز اخیر</Text>
              </div>
            </div>

            <Chart
              options={chartOptions}
              series={chartSeries}
              type="area"
              height={360}
            />
          </Card>
        </Col>

        <Col xs={24} xl={8}>
          <Card title="واچ لیست">
            <List
              loading={isLoading}
              dataSource={transactions}
              renderItem={(item) => (
                <List.Item key={item.key}>
                  {item.coin} {item.price}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={16}>
          <Card title="آخرین تراکنش‌ها">
            <Table
              rowKey="key"
              loading={isLoading}
              pagination={false}
              dataSource={transactionsTable ?? []}
              columns={[
                {
                  title: "ارز",
                  dataIndex: "coin",
                  key: "coin",
                },
                {
                  title: "نوع",
                  dataIndex: "type",
                  key: "type",
                  render: (type: string) => (
                    <Tag color={type === "خرید" ? "green" : "red"}>{type}</Tag>
                  ),
                },
                {
                  title: "مقدار",
                  dataIndex: "amount",
                  key: "amount",
                },
                {
                  title: "قیمت",
                  dataIndex: "price",
                  key: "price",
                },
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} xl={8}>
          <Card title="اخبار بازار">
            <List
              dataSource={news ?? []}
              renderItem={(item: any) => (
                <List.Item key={item.key}>{item.description}</List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
