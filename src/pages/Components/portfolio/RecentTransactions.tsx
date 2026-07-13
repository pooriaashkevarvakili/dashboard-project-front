import { Card, List, Tag, Typography } from "antd";

const { Text } = Typography;

interface RecentTransactionsProps {
  data?: any[];
}

export default function RecentTransactions({ data = [] }: RecentTransactionsProps) {
  return (
    <Card title="Recent Transactions" className="shadow-sm h-full">
      <List
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item key={item.key}>
            <div className="flex justify-between w-full">
              <div>
                <Text strong>{item.type}</Text>
                <br />
                <Text type="secondary" className="text-xs">
                  {item.time}
                </Text>
              </div>

              <div className="text-right">
                <Text
                  className={
                    item.amount.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {item.amount}
                </Text>
                <br />
                <Tag
                  color={item.status === "Completed" ? "green" : "orange"}
                  className="text-xs"
                >
                  {item.status}
                </Tag>
              </div>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
}