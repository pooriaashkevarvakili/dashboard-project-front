
import type React from "react";

export interface StatItem {
  id: string;
  title: string;
  value: string | number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export interface PriceRange {
  high: number;
  low: number;
}

export interface AssetStatsCardsProps {
  stats: StatItem[];

  price: number;
  priceChange: number;

  roi: number;

  totalInvested: number;
  currentValue: number;

  priceRange: PriceRange;

  isMobile: boolean;
}
