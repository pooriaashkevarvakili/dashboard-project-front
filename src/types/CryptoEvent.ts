export type EventType =
  | 'Unlock Tokens'
  | 'Airdrops'
  | 'ICO'
  | 'Listing'
  | 'Halving';

export interface CryptoEvent {
  id: number;
  title: string;
  description: string;
  eventDate: string; // YYYY-MM-DD
  type: EventType;
  link?: string;
}

export const EVENT_COLORS: Record<EventType, string> = {
  'Unlock Tokens': '#faad14',
  Airdrops: '#52c41a',
  ICO: '#1890ff',
  Listing: '#722ed1',
  Halving: '#f5222d',
};