import { Descriptions, Tag } from "antd";
import { useCoinInterview } from "../../hooks/usecoinInterview";

interface CoinInterviewProps {
  isMobile: boolean;
}

export default function CoinInterview({
  isMobile,
}: CoinInterviewProps) {
   const { data: coin  } = useCoinInterview();
const change24h = coin?.change24h ?? 0;

  return (
    <Descriptions
      bordered
      size={isMobile ? "small" : "default"}
      column={{ xs: 1, sm: 2, md: 3 }}
    >
 <Descriptions.Item label="Symbol">
  {coin?.symbol}
</Descriptions.Item>

<Descriptions.Item label="Name">
  {coin?.name}
</Descriptions.Item>

<Descriptions.Item label="Rank">
  #{coin?.rank}
</Descriptions.Item>

<Descriptions.Item label="Current Price">
  ${coin?.currentPrice.toLocaleString()}
</Descriptions.Item>

<Descriptions.Item label="24h Change">
 <Tag color={change24h >= 0 ? "green" : "red"}>
  {change24h >= 0 ? "+" : ""}
  {change24h}%
</Tag>
</Descriptions.Item>

<Descriptions.Item label="24h High">
  ${coin?.high24h.toLocaleString()}
</Descriptions.Item>

<Descriptions.Item label="24h Low">
  ${coin?.low24h.toLocaleString()}
</Descriptions.Item>

<Descriptions.Item label="Total Supply">
  {coin?.totalSupply}
</Descriptions.Item>

<Descriptions.Item label="Market Cap">
  {coin?.marketCap}
</Descriptions.Item>
    </Descriptions>
  );
}