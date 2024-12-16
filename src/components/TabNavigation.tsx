import React from 'react';
import { BarChart2, FileText, Settings, TrendingUp } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'keywords', label: 'Keywords', icon: FileText },
    { id: 'portfolios', label: 'Portfolios', icon: Settings },
    { id: 'analysis', label: 'Analysis', icon: BarChart2 },
    { id: 'positions', label: 'Positions', icon: TrendingUp },
  ];

  return (
    <div className="flex border-b mb-6">
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
  );
}