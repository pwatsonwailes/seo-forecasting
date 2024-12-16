export const MONTHS = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  
  export const DEFAULT_SEASONALITY = MONTHS.reduce((acc, month) => {
    acc[month] = 100;
    return acc;
  }, {} as { [key: string]: number });
  
  export function getActualMonth(startMonth: number, forecastMonth: number): string {
    const monthIndex = (startMonth + forecastMonth) % 12;
    return MONTHS[monthIndex];
  }
  
  export function getSeasonalityFactor(month: string, seasonality: { [key: string]: number }): number {
    return (seasonality[month] || 100) / 100;
  }