import React from 'react';
import  HoldersChart  from './HoldersChart';
import { useHoldersData } from '../../../hooks/useHoldersData';
import { useHoldersTabAddress } from '../../../hooks/useHoldersTabAddress';
export const HoldersTab: React.FC = () => {
  const {data:holders}=useHoldersData()
  const {data:holdersAddress}=useHoldersTabAddress()
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Holder Distribution</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <HoldersChart data={holders} height={280} />
          </div>
          <div className="flex flex-col justify-center space-y-3">
            {holders.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  <span className="text-gray-700 text-sm">{item.label}</span>
                </div>
                <span className="text-gray-900 font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Top Holder Addresses</h3>
        <div className="space-y-2 text-sm">
          {holdersAddress.map((item, idx) => (
            <div key={idx} className="flex flex-wrap items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200">
              <span className="text-gray-700 font-mono text-xs">{item.addr}</span>
              <div className="flex items-center gap-4">
                <span className="text-gray-900 text-sm">{item.balance}</span>
                <span className="text-gray-500 text-xs">{item.share}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};