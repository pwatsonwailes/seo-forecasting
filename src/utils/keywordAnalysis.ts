import { Keyword } from '../types';

export interface WordFrequency {
  word: string;
  count: number;
  volume: number;
  examples: string[];
}

function wouldMatchExistingTerms(word: string, existingTerms: string[]): boolean {
  return existingTerms.some(term => 
    term.toLowerCase().includes(word.toLowerCase()) || 
    word.toLowerCase().includes(term.toLowerCase())
  );
}

export function analyzeKeywords(keywords: Keyword[], existingTerms: string[]): WordFrequency[] {
  // Normalize existing terms for comparison
  const normalizedExistingTerms = existingTerms.map(term => term.toLowerCase());

  // Get all words from unmatched keywords
  const wordStats = new Map<string, WordFrequency>();

  keywords.forEach(keyword => {
    const keywordWords = keyword.term.toLowerCase().split(/\s+/);
    
    keywordWords.forEach(word => {
      // Skip if word is too short or would match/be matched by existing terms
      if (word.length <= 2 || wouldMatchExistingTerms(word, existingTerms)) return;

      const existing = wordStats.get(word) || {
        word,
        count: 0,
        volume: 0,
        examples: []
      };

      existing.count++;
      existing.volume += keyword.searchVolume;
      
      if (existing.examples.length < 3 && !existing.examples.includes(keyword.term)) {
        existing.examples.push(keyword.term);
      }

      wordStats.set(word, existing);
    });
  });

  // Convert to array and sort by frequency
  return Array.from(wordStats.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 15); // Return top 10 suggestions
}