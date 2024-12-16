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
}