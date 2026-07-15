import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import type { WalletAsset } from "./types/walletTypes";
import { useWalletFooter } from "../../../hooks/usewalletFooter";

interface WalletFooterProps {
  filteredAssets: WalletAsset[];
  showBalances: boolean;
}

const WalletFooter: React.FC<WalletFooterProps> = ({
  showBalances,
}) => {
  const { data: walletFooter } = useWalletFooter();

  const footerData = walletFooter?.[0];
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span>
          <CheckCircleOutlined className="text-emerald-500 mr-1" />
          {footerData?.assets ?? 0} assets loaded
        </span>

        <span>
          Total Value:{" "}
          <strong className="text-gray-700 dark:text-gray-300">
        {showBalances
              ? footerData?.value ?? "$0.00"
              : "****"}
          </strong>
        </span>
      </div>
    </div>
  );
};

export default WalletFooter;