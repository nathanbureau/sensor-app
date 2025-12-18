import React from 'react';

// Tooltip Component
export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-bureau-dark-card border border-gray-100 dark:border-gray-700 p-3 rounded-lg shadow-lg text-sm">
        <p className="font-semibold mb-2">{label}</p>
        {payload.map((p: any, index: number) => (
          <p key={index} style={{ color: p.color || p.fill }} className="text-xs mb-1 font-medium">
            {p.name}: {p.value} {p.unit}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Card Container
export const ChartCard: React.FC<{ title: string; subTitle: string; children: React.ReactNode; height?: number }> = ({ title, subTitle, children, height = 250 }) => (
  <div className="bg-white dark:bg-bureau-dark-card p-6 rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm">
    <h3 className="text-lg font-bold mb-1 dark:text-white">{title}</h3>
    <p className="text-xs text-gray-400 mb-6">{subTitle}</p>
    <div style={{ height: `${height}px` }} className="w-full">
      {children}
    </div>
  </div>
);
