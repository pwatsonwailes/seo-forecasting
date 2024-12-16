import React from 'react';
import { TrafficData } from '../../types';

interface TrafficPathProps {
  data: TrafficData[];
  getX: (month: number) => number;
  getY: (value: number) => number;
  type: 'fan' | 'line';
}

export function TrafficPath({ data, getX, getY, type }: TrafficPathProps) {
  if (data.length === 0) return null;

  if (type === 'fan') {
    // Create upper bound path
    const upperPath = data.map((d, i) => {
      const x = getX(i);
      const y = getY(d.upperBound);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    // Create lower bound path by continuing from where upper bound ended
    const lowerPath = [...data].reverse().map((d, i) => {
      const x = getX(data.length - 1 - i);
      const y = getY(d.lowerBound);
      return `L ${x} ${y}`;
    }).join(' ');

    // Combine paths to create a closed shape
    const path = `${upperPath} ${lowerPath} Z`;
    
    return (
      <path
        d={path}
        fill="rgba(59, 130, 246, 0.1)"
        stroke="rgba(59, 130, 246, 0.2)"
        strokeWidth="1"
      />
    );
  }

  // Main line showing expected traffic
  const path = data.map((d, i) => {
    const x = getX(i);
    const y = getY(d.expectedTraffic);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <path
      d={path}
      stroke="#3B82F6"
      strokeWidth="2"
      fill="none"
    />
  );
}