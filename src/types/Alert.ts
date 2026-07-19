export type Indicator = "Price" | "Volume" | "RSI" | "MACD";

export type Condition = ">" | "<" | "=";

export interface Alert {
  id: string;
  symbol: string;
  indicator: Indicator;
  condition: Condition;
  value: number;
  active: boolean;
}