import React from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShareAlt,
  FaBookmark,
} from "react-icons/fa";
import { useSocialData } from "../../../hooks/useSocialData";
import { useReactionData } from "../../../hooks/useReactionData";

export const SocialTab: React.FC = () => {
  const { data: social, isLoading } = useSocialData();
   const {data:reactions}=useReactionData()

  if (isLoading) return <div>Loading...</div>;

  const socialData = social?.[0];
  const reactionData = reactions;
if (!socialData || !reactionData) {
  return <div>No data found</div>;
}
  return (
    <div className="space-y-6">
      {/* Reactions */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Community Reactions
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3 border border-gray-200">
            <FaThumbsUp className="text-emerald-500 text-xl" />
            <span className="text-gray-900 font-semibold text-lg">
              {reactionData.likes.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm">Likes</span>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3 border border-gray-200">
            <FaThumbsDown className="text-rose-500 text-xl" />
            <span className="text-gray-900 font-semibold text-lg">
              {reactionData.dislikes.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm">Dislikes</span>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3 border border-gray-200">
            <FaShareAlt className="text-blue-500 text-xl" />
            <span className="text-gray-900 font-semibold text-lg">
              {reactionData.shares.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm">Shares</span>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-3 border border-gray-200">
            <FaBookmark className="text-yellow-500 text-xl" />
            <span className="text-gray-900 font-semibold text-lg">
              {reactionData.bookmarks.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm">Bookmarks</span>
          </div>
        </div>
      </div>

      {/* Social Channels */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Social Channels
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            {
              name: "Twitter",
              data: `${socialData.twitter.posts.toLocaleString()} posts`,
            },
            {
              name: "Telegram",
              data: `${socialData.telegram.members.toLocaleString()} members`,
            },
            {
              name: "Reddit",
              data: `${socialData.reddit.subscribers.toLocaleString()} subs`,
            },
            {
              name: "GitHub",
              data: `${socialData.github.stars.toLocaleString()} stars`,
            },
            {
              name: "YouTube",
              data: `${(socialData.youtube.views / 1_000_000).toFixed(1)}M views`,
            },
            {
              name: "Discord",
              data: `${socialData.discord.members.toLocaleString()} members`,
            },
            {
              name: "Medium",
              data: `${socialData.medium.followers.toLocaleString()} followers`,
            },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="text-gray-900 font-medium text-sm">
                {item.name}
              </div>
              <div className="text-gray-500 text-xs mt-1">{item.data}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};