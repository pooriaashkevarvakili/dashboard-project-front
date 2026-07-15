import api from "../api/axios";

interface SocialPlatformTrend {
  trend: "up" | "down" | "neutral";
}

export interface TwitterData extends SocialPlatformTrend {
  posts: number;
  sentiment: number;
}

export interface TelegramData extends SocialPlatformTrend {
  members: number;
  activity: number;
}

export interface RedditData extends SocialPlatformTrend {
  subscribers: number;
  posts: number;
}

export interface GithubData extends SocialPlatformTrend {
  stars: number;
  commits: number;
}

export interface YoutubeData extends SocialPlatformTrend {
  views: number;
  videos: number;
}

export interface DiscordData extends SocialPlatformTrend {
  members: number;
  online: number;
}

export interface MediumData extends SocialPlatformTrend {
  followers: number;
  posts: number;
}

export interface SocialData {
  twitter: TwitterData;
  telegram: TelegramData;
  reddit: RedditData;
  github: GithubData;
  youtube: YoutubeData;
  discord: DiscordData;
  medium: MediumData;
}

export interface ApiResponse {
  message: string;
  data: SocialData[];
}

export const getSocialData = async (): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>("/socialData");
  return response.data;
};