import React, { useState, useEffect } from 'react';
import TabNavigation from './components/TabNavigation';
import KeywordInput from './components/KeywordInput';
import PortfolioInput from './components/PortfolioInput';
import TrafficChart from './components/TrafficChart';
import StateManagement from './components/StateManagement';
import { Keyword, Portfolio, TrafficData } from './types';
import { calculateMonthlyTraffic } from './utils/trafficCalculator';
import { BarChart } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('keywords');
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [errorMargin, setErrorMargin] = useState(0.2);

  useEffect(() => {
    // Tag keywords with matching portfolio terms
    const taggedKeywords = keywords.map(keyword => ({
      ...keyword,
      portfolioTags: portfolios
        .filter(portfolio => 
          portfolio.terms.some(term => 
            keyword.term.toLowerCase().includes(term.toLowerCase())
          )
        )
        .map(portfolio => portfolio.heading)
    }));

    // Calculate traffic forecast
    const newTrafficData = calculateMonthlyTraffic(taggedKeywords, portfolios, errorMargin);
    setTrafficData(newTrafficData);
  }, [keywords, portfolios, errorMargin]);

  const handleStateImport = (newKeywords: Keyword[], newPortfolios: Portfolio[]) => {
    setKeywords(newKeywords);
    setPortfolios(newPortfolios);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BarChart size={32} className="text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-800">
                SEO Traffic Forecasting
              </h1>
            </div>
            <StateManagement
              keywords={keywords}
              portfolios={portfolios}
              onStateImport={handleStateImport}
            />
          </div>
          <TabNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-6">
        {activeTab === 'keywords' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <KeywordInput 
              keywords={keywords}
              onKeywordsChange={setKeywords}
            />
          </div>
        )}

        {activeTab === 'portfolios' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <PortfolioInput
              portfolios={portfolios}
              onPortfoliosChange={setPortfolios}
            />
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-6">
            {trafficData.length > 0 ? (
              <TrafficChart
                data={trafficData}
                errorMargin={errorMargin}
                onErrorMarginChange={setErrorMargin}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
                Add keywords and portfolios to see the traffic forecast analysis.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;