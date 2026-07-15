export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category:
    | "bitcoin"
    | "ethereum"
    | "defi"
    | "nft"
    | "regulation"
    | "general";
  source: string;
  timestamp: number;
  trending?: boolean;
  url: string;
}

export type CategoryKey = "all" | NewsItem["category"];