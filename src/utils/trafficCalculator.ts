import { Keyword, Portfolio, TrafficData, SeasonalityFactors } from '../types';
import { getActualMonth, getSeasonalityFactor } from './seasonality';

const POSITION_TRAFFIC_SHARE: { [key: number]: number } = {
  1: 0.30,
  2: 0.13,
  3: 0.09,
  4: 0.06,
  5: 0.04,
  6: 0.03,
  7: 0.023,
  8: 0.019,
  9: 0.019,
  10: 0.017,
};

export function calculateTrafficShare(position: number): number {
  // Handle exact positions first
  if (Number.isInteger(position) && position <= 10) {
    return POSITION_TRAFFIC_SHARE[position] || 0;
  }

  // Handle positions after 10
  if (position > 10) {
    if (position <= 15) return 0.013;
    if (position <= 20) return 0.01;
    if (position <= 30) return 0.002;
    return 0;
  }

  // Interpolate between positions for decimal values
  const lowerPosition = Math.floor(position);
  const upperPosition = Math.ceil(position);
  const fraction = position - lowerPosition;

  const lowerShare = POSITION_TRAFFIC_SHARE[lowerPosition] || 0;
  const upperShare = POSITION_TRAFFIC_SHARE[upperPosition] || 0;

  // Linear interpolation between the two closest positions
  return lowerShare + (fraction * (upperShare - lowerShare));
}

export function interpolatePosition(startPos: number, endPos: number, month: number): number {
  return startPos + ((endPos - startPos) * (month / 11)); // Changed from 12 to 11 for proper interpolation over 12 months
}

function getLowestPositions(
  keyword: Keyword,
  portfolios: Portfolio[]
): { startPosition: number; endPosition: number } {
  // If keyword has custom positions, use those
  if (keyword.startPosition !== undefined && keyword.endPosition !== undefined) {
    return {
      startPosition: keyword.startPosition,
      endPosition: keyword.endPosition
    };
  }

  // Get all matching portfolio positions
  const matchingPositions = keyword.portfolioTags
    .map(tag => {
      const portfolio = portfolios.find(p => p.heading === tag);
      return portfolio ? {
        startPosition: portfolio.startPosition ?? 30,
        endPosition: portfolio.endPosition ?? 30
      } : null;
    })
    .filter((pos): pos is NonNullable<typeof pos> => pos !== null);

  // If no matching portfolios, use default position 30
  if (matchingPositions.length === 0) {
    return { startPosition: 30, endPosition: 30 };
  }

  // Return the lowest positions
  return {
    startPosition: Math.min(...matchingPositions.map(p => p.startPosition)),
    endPosition: Math.min(...matchingPositions.map(p => p.endPosition))
  };
}

export function calculateMonthlyTraffic(
  keywords: Keyword[],
  portfolios: Portfolio[],
  errorMargin: number = 0.2,
  selectedPortfolios: string[] = [],
  seasonality: SeasonalityFactors = {},
  startMonth: number = 0
): TrafficData[] {
  const startErrorMargin = 0.05;

  return Array.from({ length: 12 }, (_, month) => { // Changed from 13 to 12
    let totalTraffic = 0;

    const filteredKeywords = selectedPortfolios.length > 0
      ? keywords.filter(k => k.portfolioTags.some(tag => selectedPortfolios.includes(tag)))
      : keywords;

    filteredKeywords.forEach(keyword => {
      const { startPosition, endPosition } = getLowestPositions(keyword, portfolios);
      const interpolatedPos = interpolatePosition(startPosition, endPosition, month);
      const trafficShare = calculateTrafficShare(interpolatedPos);
      
      // Apply seasonality factor
      const actualMonth = getActualMonth(startMonth, month);
      const seasonalityFactor = getSeasonalityFactor(actualMonth, seasonality);
      totalTraffic += keyword.searchVolume * trafficShare * seasonalityFactor;
    });

    // Calculate error margin that grows over time
    const currentErrorMargin = startErrorMargin + 
      ((errorMargin - startErrorMargin) * (month / 11)); // Changed from 12 to 11

    return {
      month,
      expectedTraffic: totalTraffic,
      lowerBound: totalTraffic * (1 - currentErrorMargin),
      upperBound: totalTraffic * (1 + currentErrorMargin),
      actualMonth: getActualMonth(startMonth, month)
    };
  });
}