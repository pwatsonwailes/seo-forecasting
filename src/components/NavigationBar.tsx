import React from 'react';
import TabNavigation from './TabNavigation';
import StateManagement from './state/StateManagement';
import { AppState } from '../types';

interface NavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  appState: AppState;
  onStateImport: (state: AppState) => void;
}

export function NavigationBar({
  activeTab,
  onTabChange,
  appState,
  onStateImport
}: NavigationBarProps) {
  return (
    <div className="flex justify-between items-center">
      <TabNavigation 
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      <div className="px-4">
        <StateManagement
          appState={appState}
          onStateImport={onStateImport}
        />
      </div>
    </div>
  );
}