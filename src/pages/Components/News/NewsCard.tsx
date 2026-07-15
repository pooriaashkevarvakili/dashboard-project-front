import React from "react";
import { Card, Button, Tag, Typography, Tooltip } from "antd";
import { StarOutlined, StarFilled, FireOutlined } from "@ant-design/icons";
import type { NewsItem } from "./data/types";

const { Title, Text, Paragraph } = Typography;

interface NewsCardProps {
  item: NewsItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: number, e: React.MouseEvent) => void;
  categoryLabel: string;
  categoryColor: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  item,
  isBookmarked,
  onToggleBookmark,
  categoryLabel,
  categoryColor,
}) => {
  const formatTime = (timestamp: number | string | undefined | null): string => {
    // اگر timestamp وجود نداشت، از زمان فعلی استفاده کن
    const time = timestamp ? Number(timestamp) : Date.now();
    
    if (isNaN(time)) return "زمان نامشخص";

    const diff = Date.now() - time;
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "همین الان";
    if (minutes < 60) return `${minutes} دقیقه پیش`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ساعت پیش`;

    return `${Math.floor(hours / 24)} روز پیش`;
  };

  return (
    <Card
      className={`rounded-2xl shadow-sm border-0 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-white/90 backdrop-blur-sm ${
        item.trending ? "ring-2 ring-orange-400/20 ring-offset-2" : ""
      }`}
      styles={{ body: { padding: "1.25rem" } }}
      actions={[
        <Tooltip title={isBookmarked ? "Remove bookmark" : "Bookmark"} key="bookmark">
          <Button
            type="text"
            icon={isBookmarked ? <StarFilled style={{ color: "#faad14" }} /> : <StarOutlined />}
            onClick={(e) => onToggleBookmark(item.id, e)}
            className="text-base"
          />
        </Tooltip>,
        <Tooltip title="Read more" key="read">
          <Button
            type="text"
            icon={<span className="text-base">📄</span>}
            onClick={() => window.open(item.url, "_blank")}
            className="text-base"
          />
        </Tooltip>,
      ]}
    >
      {item.trending && (
        <div className="flex items-center gap-1.5 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-2">
          <FireOutlined />
          <span>Trending</span>
        </div>
      )}

      <Title level={5} className="!mb-2 !text-slate-800 leading-snug">
        {item.title}
      </Title>

      <Paragraph
        ellipsis={{ rows: 2, expandable: false }}
        className="text-slate-500 text-sm leading-relaxed mb-3"
      >
        {item.summary}
      </Paragraph>

      <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <Tag color={categoryColor} className="rounded-full text-xs font-medium px-3 py-0.5 border-0">
            {categoryLabel}
          </Tag>
          <Text className="text-xs text-slate-400">{item.source}</Text>
        </div>
        <Text className="text-xs text-slate-400 font-medium">
          {formatTime(item.timestamp)}
        </Text>
      </div>
    </Card>
  );
};

export default NewsCard;