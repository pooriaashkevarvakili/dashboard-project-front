import React from 'react';
import type { TabId } from './data/types';   // ← Fixed: Import from types.ts

interface TabNavigationProps {
  tabs: Array<{ 
    id: TabId; 
    label: string; 
    icon: React.ElementType 
  }>;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange 
}) => {
  return (
    <div className="flex flex-wrap gap-1 border-b border-gray-200 pb-4 mb-6 overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              isActive
                ? 'bg-[#f7931a]/20 text-[#f7931a] shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Icon className="text-base" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;