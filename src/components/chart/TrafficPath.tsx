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
    const path = `
      M ${getX(0)} ${getY(data[0].upperBound)}
      ${data.map((d, i) => {
        const x = getX(i);
        const y = getY(d.upperBound);
        return isNaN(x) || isNaN(y) ? '' : `L ${x} ${y}`;
      }).join(' ')}
      ${data.map((d, i) => {
        const x = getX(12 - i);
        const y = getY(d.lowerBound);
        return isNaN(x) || isNaN(y) ? '' : `L ${x} ${y}`;
      }).reverse().join(' ')}
      Z
    `;
    
    return <path d={path} fill="rgba(59, 130, 246, 0.1)" />;
  }

  const path = `M ${data.map((d, i) => {
    const x = getX(i);
    const y = getY(d.expectedTraffic);
    return isNaN(x) || isNaN(y) ? '' : `${x} ${y}`;
  }).join(' ')}`;

  return <path d={path} stroke="#3B82F6" strokeWidth="2" fill="none" />;
}