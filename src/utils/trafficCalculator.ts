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
  if (position <= 10) return POSITION_TRAFFIC_SHARE[position] || 0;
  if (position <= 15) return 0.013;
  if (position <= 20) return 0.01;
  if (position <= 30) return 0.002;
  return 0;
}

export function interpolatePosition(startPos: number, endPos: number, month: number): number {
  return startPos + ((endPos - startPos) * (month / 12));
}

export function calculateMonthlyTraffic(
  keywords: Keyword[],
  portfolios: Portfolio[],
  errorMargin: number = 0.2,
  selectedPortfolios: string[] = []
): TrafficData[] {
  const startErrorMargin = 0.05;

  return Array.from({ length: 13 }, (_, month) => {
    let totalTraffic = 0;

    const filteredKeywords = selectedPortfolios.length > 0
      ? keywords.filter(k => k.portfolioTags.some(tag => selectedPortfolios.includes(tag)))
      : keywords;

    filteredKeywords.forEach(keyword => {
      const startPos = keyword.startPosition ?? 
        Math.min(...keyword.portfolioTags.map(tag => 
          portfolios.find(p => p.heading === tag)?.startPosition ?? 30));
      
      const endPos = keyword.endPosition ?? 
        Math.min(...keyword.portfolioTags.map(tag => 
          portfolios.find(p => p.heading === tag)?.endPosition ?? 30));

      const interpolatedPos = interpolatePosition(startPos, endPos, month);
      const trafficShare = calculateTrafficShare(Math.round(interpolatedPos));
      totalTraffic += keyword.searchVolume * trafficShare;
    });

    const currentErrorMargin = startErrorMargin + 
      ((errorMargin - startErrorMargin) * (month / 12));

    return {
      month,
      expectedTraffic: totalTraffic,
      lowerBound: totalTraffic * (1 - currentErrorMargin),
      upperBound: totalTraffic * (1 + currentErrorMargin)
    };
  });
}