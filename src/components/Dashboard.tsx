import React, { useState, useEffect } from 'react';
import { NavigationBar } from './navigation/NavigationBar';
import KeywordInput from './keyword/KeywordInput';
import PortfolioInput from './PortfolioInput';
import TrafficChart from './TrafficChart';
import { TrafficStats } from './chart/TrafficStats';
import { TrafficTable } from './chart/TrafficTable';
import PositionChart from './PositionChart';
import { SeasonalityControls } from './seasonality/SeasonalityControls';
import { Keyword, Portfolio, TrafficData, AppState } from '../types';
import { calculateMonthlyTraffic } from '../utils/trafficCalculator';
import { DEFAULT_SEASONALITY } from '../utils/seasonality';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('keywords');
  const [seasonality, setSeasonality] = useState(DEFAULT_SEASONALITY);
  const [startMonth, setStartMonth] = useState(0);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [errorMargin, setErrorMargin] = useState(0.2);
  const [selectedPortfolios, setSelectedPortfolios] = useState<string[]>([]);

  // Update keyword tags whenever portfolios change
  useEffect(() => {
    const taggedKeywords = keywords.map(keyword => {
      const matchingPortfolios = portfolios
        .filter(portfolio => 
          portfolio.terms.some(term => 
            keyword.term.toLowerCase().includes(term.toLowerCase())
          )
        )
        .map(portfolio => portfolio.heading);

      return {
        ...keyword,
        portfolioTags: matchingPortfolios
      };
    });

    const tagsChanged = taggedKeywords.some((newKeyword, index) => {
      const oldKeyword = keywords[index];
      return !oldKeyword || 
        JSON.stringify(newKeyword.portfolioTags) !== JSON.stringify(oldKeyword.portfolioTags);
    });

    if (tagsChanged) {
      setKeywords(taggedKeywords);
    }
  }, [portfolios, keywords]);

  // Handle raw keyword updates separately
  const handleKeywordsChange = (newKeywords: Keyword[]) => {
    const taggedKeywords = newKeywords.map(keyword => ({
      ...keyword,
      portfolioTags: portfolios
        .filter(portfolio => 
          portfolio.terms.some(term => 
            keyword.term.toLowerCase().includes(term.toLowerCase())
          )
        )
        .map(portfolio => portfolio.heading)
    }));
    
    setKeywords(taggedKeywords);
  };

  // Calculate traffic data
  useEffect(() => {
    const newTrafficData = calculateMonthlyTraffic(
      keywords, 
      portfolios, 
      errorMargin,
      selectedPortfolios,
      seasonality,
      startMonth
    );
    setTrafficData(newTrafficData);
  }, [keywords, portfolios, errorMargin, selectedPortfolios, seasonality, startMonth]);

  const handleSeasonalityChange = (month: string, value: number) => {
    setSeasonality({
      ...seasonality,
      [month]: value
    });
  };

  const handleStateImport = (state: AppState) => {
    setKeywords(state.keywords);
    setPortfolios(state.portfolios);
    setSeasonality(state.seasonality);
    setStartMonth(state.startMonth);
  };

  const currentAppState: AppState = {
    keywords,
    portfolios,
    seasonality,
    startMonth
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <NavigationBar 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            appState={currentAppState}
            onStateImport={handleStateImport}
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-6">
        {activeTab === 'keywords' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <KeywordInput 
              keywords={keywords}
              onKeywordsChange={handleKeywordsChange}
            />
          </div>
        )}

        {activeTab === 'portfolios' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <PortfolioInput
              portfolios={portfolios}
              onPortfoliosChange={setPortfolios}
              keywords={keywords}
            />
          </div>
        )}

        {activeTab === 'analysis' && trafficData.length > 0 && (
          <div className="space-y-6">
            <div>
              <TrafficChart
                data={trafficData}
                errorMargin={errorMargin}
                onErrorMarginChange={setErrorMargin}
                portfolios={portfolios}
                onPortfolioFilterChange={setSelectedPortfolios}
              />
              <TrafficStats
                data={trafficData}
                keywords={keywords}
                portfolios={portfolios}
                selectedPortfolios={selectedPortfolios}
              />
              <TrafficTable data={trafficData} />
            </div>
          </div>
        )}

        {activeTab === 'positions' && (
          <PositionChart portfolios={portfolios} />
        )}

        {activeTab === 'advanced' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Advanced Settings</h2>
            <SeasonalityControls
              seasonality={seasonality}
              onSeasonalityChange={handleSeasonalityChange}
              startMonth={startMonth}
              onStartMonthChange={setStartMonth}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;