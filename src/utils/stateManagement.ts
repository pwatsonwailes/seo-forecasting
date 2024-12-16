import { Keyword, Portfolio, AppState, SeasonalityFactors } from '../types';
import { DEFAULT_SEASONALITY } from './seasonality';

export function exportState(
  keywords: Keyword[], 
  portfolios: Portfolio[],
  seasonality: SeasonalityFactors,
  startMonth: number
): void {
  const state: AppState = { 
    keywords, 
    portfolios,
    seasonality,
    startMonth
  };
  
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'export.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function parseImportedState(jsonString: string): AppState | null {
  try {
    const state = JSON.parse(jsonString);
    if (!state.keywords || !state.portfolios) {
      throw new Error('Invalid state format');
    }
    
    // Handle backward compatibility for seasonality and startMonth
    if (!state.seasonality) {
      state.seasonality = DEFAULT_SEASONALITY;
    }
    if (typeof state.startMonth !== 'number') {
      state.startMonth = 0;
    }
    
    return state;
  } catch (error) {
    console.error('Failed to parse imported state:', error);
    return null;
  }
}