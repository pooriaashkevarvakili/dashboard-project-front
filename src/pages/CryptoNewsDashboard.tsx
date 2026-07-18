import React, { useState, useCallback, useMemo } from "react";
import {
  Button,
  Space,
  Badge,
  Skeleton,
  Empty,
  Typography,
  message,
  Card,
} from "antd";
import {
  StarOutlined,
  StarFilled,
  ReloadOutlined,
  BookOutlined,
} from "@ant-design/icons";
import NewsCard from "./Components/News/NewsCard";
import CategoryTabs from "./Components/News/CategoryTabs";
import type {  CategoryKey } from "../types/news";
import { CATEGORY_COLOR } from "./Components/News/CategoryTabs";
import { useNews } from "../hooks/useNewsCrypto";

const { Title, Text } = Typography;

const CryptoNewsDashboard: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const {
    data: news = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useNews();
  console.log(news,'success')
  const handleToggleBookmark = useCallback(
    (id: number, e: React.MouseEvent) => {
      e.stopPropagation();
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
          message.success("Removed from bookmarks");
        } else {
          next.add(id);
          message.success("Added to bookmarks");
        }
        return next;
      });
    },
    [],
  );

  const handleRefresh = useCallback(async () => {
    await refetch();
    message.success("News feed refreshed");
  }, [refetch]);

  const toggleBookmarkFilter = () => setShowBookmarksOnly((prev) => !prev);

  const filteredNews = useMemo(() => {
    let result = news;

    if (activeCategory !== "all") {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (showBookmarksOnly) {
      result = result.filter((item) => bookmarkedIds.has(item.id));
    }

    return [...result].sort((a, b) => {
      if (a.trending && !b.trending) return -1;
      if (!a.trending && b.trending) return 1;

      return ((b.timestamp || 0) as number) - ((a.timestamp || 0) as number);
    });
  }, [news, activeCategory, showBookmarksOnly, bookmarkedIds]);

  const trendingCount = news.filter((item) => item.trending).length;
  const bookmarkedCount = bookmarkedIds.size;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/40 p-4 md:p-6 lg:p-8 ${className}`}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
              <BookOutlined className="text-white text-2xl" />
            </div>
            <div>
              <Title
                level={2}
                className="!mb-0 !text-slate-800 !font-bold tracking-tight"
              >
                اخبار کریپتو
              </Title>
              <Text className="text-slate-500 text-sm font-medium">
                {filteredNews.length} articles · {trendingCount} trending
              </Text>
            </div>
          </div>

          <Space size="middle" wrap>
            <Button
              type={showBookmarksOnly ? "primary" : "default"}
              icon={showBookmarksOnly ? <StarFilled /> : <StarOutlined />}
              onClick={toggleBookmarkFilter}
              className="rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              {showBookmarksOnly ? "Bookmarks" : "Bookmark"}
              {bookmarkedCount > 0 && (
                <Badge
                  count={bookmarkedCount}
                  size="small"
                  style={{ backgroundColor: "#faad14" }}
                />
              )}
            </Button>

            <Button
              type="text"
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              loading={isFetching}
              className="rounded-xl hover:bg-blue-50"
            >
              Refresh
            </Button>
          </Space>
        </div>

        <CategoryTabs
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        {isFetching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="rounded-2xl shadow-sm border-0">
                <Skeleton active paragraph={{ rows: 3 }} />
              </Card>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <Card className="rounded-2xl shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <Empty
              description={
                showBookmarksOnly
                  ? "No bookmarked articles yet."
                  : "No news in this category."
              }
            />
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {filteredNews.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                isBookmarked={bookmarkedIds.has(item.id)}
                onToggleBookmark={handleToggleBookmark}
                categoryLabel={item.category}
                categoryColor={CATEGORY_COLOR[item.category]}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-sm text-slate-400 border-t border-slate-200/60 pt-6">
          {filteredNews.length} articles · {bookmarkedCount} bookmarked
        </div>
      </div>
    </div>
  );
};

export default CryptoNewsDashboard;