
import React from "react";

export interface PriceRange {
  high: number;
  low: number;
}

export interface StatItem {
  title: string;
  value: number | string;
  prefix?: React.ReactNode;
  suffix?: string;
}

export interface AssetHeaderProps {
  price: number;
  priceChange: number;
  roi: number;
  currentValue: number;
  totalInvested: number;

  isFavorite: boolean;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;

  stats: StatItem[];

  priceRange: PriceRange;

  isMobile: boolean;
}
