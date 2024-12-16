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

  // Constants for tooltip dimensions and chart boundaries
  const tooltipWidth = 100;
  const tooltipHeight = 35;
  const tooltipPadding = 8;
  const chartRightBoundary = 800 - 20; // chartWidth - margin.right

  // Calculate tooltip position to keep it within bounds
  let tooltipX = x;
  const tooltipHalfWidth = tooltipWidth / 2;

  // Adjust x position if tooltip would extend beyond right edge
  if (x + tooltipHalfWidth > chartRightBoundary) {
    tooltipX = chartRightBoundary - tooltipHalfWidth - tooltipPadding;
  }
  // Adjust x position if tooltip would extend beyond left edge
  else if (x - tooltipHalfWidth < 60) { // margin.left
    tooltipX = 60 + tooltipHalfWidth + tooltipPadding;
  }

  return (
    <g transform={`translate(${tooltipX}, ${y})`}>
      <rect
        x={-tooltipWidth / 2}
        y={-tooltipHeight - 5}
        width={tooltipWidth}
        height={tooltipHeight}
        rx="4"
        fill="white"
        stroke="#E5E7EB"
        strokeWidth="1"
      />
      <text
        x="0"
        y={-tooltipHeight + 13}
        textAnchor="middle"
        className="text-xs fill-gray-700 font-medium"
      >
        Month {month}
      </text>
      <text
        x="0"
        y={-tooltipHeight + 27}
        textAnchor="middle"
        className="text-xs fill-gray-600"
      >
        {formatTraffic(traffic)} visits
      </text>
    </g>
  );
}