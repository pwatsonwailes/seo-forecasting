export interface Keyword {
  term: string;
  searchVolume: number;
  startPosition?: number;
  endPosition?: number;
  portfolioTags: string[];
}

export interface Portfolio {
  heading: string;
  terms: string[];
  startPosition?: number;
  endPosition?: number;
}

export interface TrafficData {
  month: number;
  expectedTraffic: number;
  lowerBound: number;
  upperBound: number;
  actualMonth: string;
}

export interface SeasonalityFactors {
  [key: string]: number;
}

export interface AppState {
  keywords: Keyword[];
  portfolios: Portfolio[];
  seasonality: SeasonalityFactors;
  startMonth: number;
}