// src/types/Timeframe.ts

export type Timeframe = "1D" | "1W" | "1M" | "1Y";

export interface ChartSeriesItem {
  key: number;
  priceChart: number;
}

export interface ChartSeriesResponse {
  message: string;
  data: ChartSeriesItem[];
}