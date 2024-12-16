import React from 'react';
import { formatTraffic } from '../../utils/formatters';

interface TooltipProps {
  x: number;
  y: number;
  month: number;
  traffic: number;
  visible: boolean;
}

export function Tooltip({ x, y, month, traffic, visible }: TooltipProps) {
  if (!visible) return null;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x="-50"
        y="-40"
        width="100"
        height="35"
        rx="4"
        fill="white"
        stroke="#E5E7EB"
        strokeWidth="1"
      />
      <text
        x="0"
        y="-22"
        textAnchor="middle"
        className="text-xs fill-gray-700 font-medium"
      >
        Month {month}
      </text>
      <text
        x="0"
        y="-8"
        textAnchor="middle"
        className="text-xs fill-gray-600"
      >
        {formatTraffic(traffic)} visits
      </text>
    </g>
  );
}