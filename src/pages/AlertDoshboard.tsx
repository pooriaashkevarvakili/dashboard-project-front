import React, { useState } from "react";
import { FiBell, FiPlus, FiX } from "react-icons/fi";

import PriceChart from "../pages/Components/Alert/PriceChart";
import NewAlertForm from "../pages/Components/Alert/NewAlertForm";
import AlertsList from "../pages/Components/Alert/AlertsList";

import type {  Indicator, Condition } from "../types/Alert";

import { useChartData } from "../hooks/useChartData";
import { useSymbols } from "../hooks/useSymbols";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAlertGet } from "../hooks/useAlertGet";
import AlertPost from "../services/ALertPost";

const AlertDashboard: React.FC = () => {
  const {
    data: serverAlerts,
  
    refetch,
  } = useAlertGet();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: symbols = [],
  } = useSymbols();

  const [selectedSymbol, setSelectedSymbol] = useState("BTC");

  const {
    data: chartData = [],
  } = useChartData(selectedSymbol);

  const [newSymbol, setNewSymbol] = useState("BTC");
  const [newIndicator, setNewIndicator] = useState<Indicator>("Price");
  const [newCondition, setNewCondition] = useState<Condition>(">");
  const [newValue, setNewValue] = useState(0);
  const addAlert = async () => {
    if (!newValue || newValue <= 0) return;

    const newAlertData = {
      symbol: newSymbol,
      indicator: newIndicator,
      condition: newCondition,
      value: newValue,
    };

    try {
      await AlertPost(newAlertData);



      setNewValue(0);
      setIsModalOpen(false);
      refetch(); 
    } catch (err) {
   
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
              <FiBell className="text-2xl text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Alert Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Create and manage your trading alerts.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 hover:bg-indigo-700 !text-white px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
          >
            <FiPlus />
            New Alert
          </button>
        </div>

        {/* Symbols */}
        <div className="mb-6 flex flex-wrap gap-2 rounded-xl bg-white dark:bg-gray-800 p-2 shadow">
           {
            symbols.map((symbol: string) => (
              <button
                key={symbol}
                onClick={() => setSelectedSymbol(symbol)}
                className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                  selectedSymbol === symbol
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {symbol}
              </button>
            ))
          }
        </div>

        {/* Chart */}
        <div className="mb-8">
        {
            <PriceChart symbol={selectedSymbol} chartData={chartData} />
          }
        </div>

        <AlertsList
  alerts={serverAlerts}
          
        />
      </div>

     
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-gray-800 shadow-2xl"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <FiX size={22} />
            </button>

            <div className="p-6">
              <NewAlertForm
                symbols={symbols}
                newSymbol={newSymbol}
                newIndicator={newIndicator}
                newCondition={newCondition}
                newValue={newValue}
                setNewSymbol={setNewSymbol}
                setNewIndicator={setNewIndicator}
                setNewCondition={setNewCondition}
                setNewValue={setNewValue}
                addAlert={addAlert}
              />
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default AlertDashboard;