import React from "react";
import { FiBell} from "react-icons/fi";
import type { Alert, Indicator } from "../../../types/Alert";

interface AlertsListProps {
  alerts: Alert[];
  toggleAlert: (id: string) => void;
  deleteAlert: (id: string) => void;
}

const getIndicatorIcon = (indicator: Indicator) => {
  const icons = {
    Price: <span className="text-blue-500">💲</span>,
    Volume: <span className="text-purple-500">📊</span>,
    RSI: <span className="text-red-500">📉</span>,
    MACD: <span className="text-green-500">📈</span>,
  };
  return icons[indicator];
};

const AlertsList: React.FC<AlertsListProps> = ({
  alerts,

}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <FiBell /> Your Alerts ({alerts.length})
        </h2>
      </div>

      {alerts.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <FiBell className="mx-auto text-3xl mb-2 opacity-30" />
          <p>No alerts yet. Add one above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`relative p-4 rounded-xl border transition-all ${
                alert.active
                  ? "border-l-4 border-l-green-500 bg-gray-50 dark:bg-gray-800/60"
                  : "opacity-60 bg-gray-100 dark:bg-gray-800/40"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                    {getIndicatorIcon(alert.indicator)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800 dark:text-white">
                        {alert.symbol}
                      </span>
                      <span className="text-xs font-mono bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                        {alert.indicator}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      <span className="font-medium">{alert.condition}</span>{" "}
                      <span className="font-mono">
                        {alert.value.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsList;