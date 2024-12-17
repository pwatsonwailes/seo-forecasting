import React from 'react';
import { BarChart2, FileText, Settings, TrendingUp, Sliders } from 'lucide-react';
import StateManagement from './StateManagement';
import { Keyword, Portfolio, SeasonalityFactors } from '../types';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  keywords: Keyword[];
  portfolios: Portfolio[];
  seasonality: SeasonalityFactors;
  startMonth: number;
  onStateImport: (
    keywords: Keyword[],
    portfolios: Portfolio[],
    seasonality: SeasonalityFactors,
    startMonth: number
  ) => void;
}

export default function TabNavigation({
  activeTab,
  onTabChange,
  keywords,
  portfolios,
  seasonality,
  startMonth,
  onStateImport
}: TabNavigationProps) {
  const tabs = [
    { id: 'keywords', label: 'Keywords', icon: FileText },
    { id: 'portfolios', label: 'Portfolios', icon: Settings },
    { id: 'analysis', label: 'Analysis', icon: BarChart2 },
    { id: 'positions', label: 'Positions', icon: TrendingUp },
    { id: 'advanced', label: 'Advanced', icon: Sliders },
  ];

  return (
    <div className="flex justify-between items-center border-b mb-6">
      <div className="flex">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors
              ${activeTab === id 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-600'
              }`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>
      <div className="px-4">
        <StateManagement
          keywords={keywords}
          portfolios={portfolios}
          seasonality={seasonality}
          startMonth={startMonth}
          onStateImport={onStateImport}
        />
      </div>
    </div>
  );
}