import React from "react";
import { FiBell } from "react-icons/fi";
import type { Alert } from "../../../types/Alert";

interface AlertsListProps {
  alerts: Alert[];
}


const AlertsList: React.FC<AlertsListProps> = ({ alerts }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-white">
          <FiBell className="text-indigo-600" />
          Your Alerts
        </h2>

        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 font-semibold">
          {alerts.length}
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <FiBell className="text-6xl text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            No Alerts
          </h3>
          <p className="text-gray-500 mt-2">
            Create your first crypto alert.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                 <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
  <span className="text-xl">{alert.icon}</span>
</div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {alert.symbol}
                    </h3>

                    <span className="inline-block mt-1 px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                      {alert.indicator}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-500 text-sm">Condition</span>
                  <span className="font-bold text-indigo-600 text-lg">
                    {alert.condition}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Target</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {alert.value.toLocaleString()}
                  </span>
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