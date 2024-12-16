interface MonthLabelsProps {
  months: number[];
  chartHeight: number;
  getX: (month: number) => number;
  actualMonths: string[];
}

export function MonthLabels({ months, chartHeight, getX, actualMonths }: MonthLabelsProps) {
  return (
    <>
      {months.map((month) => {
        const xPos = getX(month);
        
        if (isNaN(xPos)) return null;
        
        return (
          <text
            key={month}
            x={xPos}
            y={chartHeight + 20}
            textAnchor="middle"
            className="text-xs fill-gray-500"
          >
            {actualMonths[month].slice(0, 3)}
          </text>
        );
      })}
    </>
  );
}