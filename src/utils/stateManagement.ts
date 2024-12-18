import { AppState } from '../types';
import { DEFAULT_SEASONALITY } from './seasonality';

export function exportState(state: AppState): void {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'seo-forecast-export.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function parseImportedState(jsonString: string): AppState | null {
  try {
    const state = JSON.parse(jsonString);
    
    // Validate required fields
    if (!state.keywords || !Array.isArray(state.keywords)) {
      throw new Error('Invalid keywords format');
    }
    
    if (!state.portfolios || !Array.isArray(state.portfolios)) {
      throw new Error('Invalid portfolios format');
    }
    
    // Handle backward compatibility
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