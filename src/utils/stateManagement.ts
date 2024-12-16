import { Keyword, Portfolio } from '../types';

export interface AppState {
  keywords: Keyword[];
  portfolios: Portfolio[];
}

export function exportState(keywords: Keyword[], portfolios: Portfolio[]): void {
  const state: AppState = { keywords, portfolios };
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
    return state;
  } catch (error) {
    console.error('Failed to parse imported state:', error);
    return null;
  }
}