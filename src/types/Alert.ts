export type Indicator = "Price" | "Volume" | "RSI" | "MACD";

export type Condition = ">" | "<" | "=";

export interface Alert {
  symbol: string;
  indicator: Indicator;
  condition: Condition;
  value: number;
  icon:string
}