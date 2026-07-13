// types.ts

export interface PricePoint {
  x: number;
  y: number;
}

// داده‌های نمودار از API
export interface ChartCoin {
  x: number;
  y: number;
}

export interface MarketData {
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  ath: number;
  athDate: string;
  atl: number;
  atlDate: string;
  dominance: number;
  rank: number;
}

export interface Exchange {
  name: string;
  pair: string;
  price: number;
  volume: number;
  spread: number;
  trust: number;
}

export interface HistoricalItem {
  date: string;
  price: number;
  volume: number;
  marketCap: number;
}

export interface HolderSegment {
  label: string;
  value: number;
  color: string;
}

export interface SocialData {
  twitter: {
    posts: number;
    sentiment: number;
    trend: 'up' | 'down' | 'neutral';
  };
  telegram: {
    members: number;
    activity: number;
    trend: 'up' | 'down' | 'neutral';
  };
  reddit: {
    subscribers: number;
    posts: number;
    trend: 'up' | 'down' | 'neutral';
  };
  github: {
    stars: number;
    commits: number;
    trend: 'up' | 'down' | 'neutral';
  };
  youtube: {
    views: number;
    videos: number;
    trend: 'up' | 'down' | 'neutral';
  };
  discord: {
    members: number;
    online: number;
    trend: 'up' | 'down' | 'neutral';
  };
  medium: {
    followers: number;
    posts: number;
    trend: 'up' | 'down' | 'neutral';
  };
}

export interface Reactions {
  likes: number;
  dislikes: number;
  shares: number;
  bookmarks: number;
}

export type TabId =
  | 'overview'
  | 'chart'
  | 'market'
  | 'exchanges'
  | 'historical'
  | 'holders'
  | 'social';

export type Timeframe =
  | '1W'
  | '1M'
  | '3M'
  | '1Y'
  | 'ALL';