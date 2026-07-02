import { Card, Row, Col, Typography, Button, Table, List, Tag } from "antd";

import { FaWallet, FaBitcoin } from "react-icons/fa6";

import { IoTrendingUp, IoTrendingDown } from "react-icons/io5";
import { useWeek } from "../hooks/useWeek";
import { RiBarChartBoxFill } from "react-icons/ri";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
const { Title, Text } = Typography;
import { useNews } from "../hooks/useNews";
import { useTransactionsTable } from "../hooks/useTransactionsTable";
import { useTransactions } from "../hooks/useTransactions";
export default function Dashboard() {
  interface NewsItem {
    key: number;
    description: string;
  }
  const { data: week, isLoadingFour, isErrorFour } = useWeek();

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
      data: [22000, 25000, 24000, 28000, 32000, 34000, 39000],
    },
  ];

  const {
    data: transactionsTable,
    isLoading,
    isError,
  } = useTransactionsTable();
  const { data: transactions, isLoadingTwo, isErrorTwo } = useTransactions();

  const { dataThree: news, isLoadingThree, isErrorThree } = useNews();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Title level={2} className="!mb-0">
            داشبورد کریپتو
          </Title>

          <Text type="secondary">نمای کلی از وضعیت بازار و سبد دارایی</Text>
        </div>

        <Button type="primary">بروزرسانی</Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} xl={6}>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <Text style={{ fontSize: "20px" }} type="secondary">
                  موجودی کل
                </Text>

                <Title level={3}>$254,820</Title>

                <Tag color="green">+12.4%</Tag>
              </div>

              <FaWallet size={34} className="text-blue-500" />
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <Text style={{ fontSize: "20px" }} type="secondary">
                  سود امروز
                </Text>

                <Title level={3}>+$4,280</Title>

                <Tag color="green">
                  <IoTrendingUp />
                  2.3%
                </Tag>
              </div>

              <IoTrendingUp size={34} className="text-green-500" />
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <Text style={{ fontSize: "20px" }} type="secondary">
                  بیت‌کوین
                </Text>

                <Title level={3}>{transactions?.[0]?.price ?? "..."}</Title>

                <Tag color="green">{transactions?.[0]?.amount ?? "..."}</Tag>
              </div>

              <FaBitcoin size={34} className="text-yellow-500" />
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <Text type="secondary">شاخص بازار</Text>

                <Title level={3}>Greed 73</Title>

                <Tag>
                  <IoTrendingDown />
                  -0.6%
                </Tag>
              </div>

              <RiBarChartBoxFill size={34} className="text-purple-500" />
            </div>
          </Card>
        </Col>
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
