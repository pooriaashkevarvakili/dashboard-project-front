import React from "react";
import { Tabs } from "antd";
import type { CategoryKey } from "./data/types";

interface CategoryTabsProps {
  activeCategory: CategoryKey;
  onChange: (key: CategoryKey) => void;
}

const CATEGORIES = [
  { key: "all", label: "all", icon: <span>🕒</span> },
  { key: "bitcoin", label: "bitcoin", icon: <span>₿</span> },
  { key: "ethereum", label: "ethereum", icon: <span>⟠</span> },
  { key: "defi", label: "defi", icon: <span>📊</span> },
  { key: "nft", label: "nft", icon: <span>🖼️</span> },
  { key: "regulation", label: "regulation", icon: <span>⚖️</span> },
  { key: "general", label: "general", icon: <span>🌐</span> },
] as const;

const CATEGORY_COLOR: Record<CategoryKey, string> = {
  all: "blue",
  bitcoin: "orange",
  ethereum: "purple",
  defi: "cyan",
  nft: "pink",
  regulation: "red",
  general: "geekblue",
};

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onChange }) => {
  return (
    <div className="mb-6 bg-white/70 backdrop-blur-sm rounded-2xl p-1 shadow-sm border border-white/50">
      <Tabs
        activeKey={activeCategory}
        onChange={(key) => onChange(key as CategoryKey)}
        tabBarGutter={4}
        size="large"
        items={CATEGORIES.map(({ key, label, icon }) => ({
          key,
          label: (
            <span className="flex items-center gap-2 px-2 py-1 text-sm font-medium">
              {icon}
              {label}
            </span>
          ),
        }))}
      />
    </div>
  );
};

export default CategoryTabs;
export { CATEGORY_COLOR };