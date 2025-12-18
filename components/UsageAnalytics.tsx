import React, { useState, useMemo } from 'react';
import { TrendingUp, Clock, Users, Calendar } from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Cell 
} from 'recharts';
import { TimeFrame } from '../types';
import { generateChartData } from '../utils';
import { CustomTooltip } from './shared/ChartComponents';

interface AggregateAnalyticsProps {
  isDarkMode: boolean;
}

const AggregateAnalytics: React.FC<AggregateAnalyticsProps> = ({ isDarkMode }) => {
  const [sliderValue, setSliderValue] = useState(0); // 0: today, 1: week, 2: month
  const [businessHoursOnly, setBusinessHoursOnly] = useState(true);
  
  const timeFrame: TimeFrame = sliderValue === 0 ? 'today' : sliderValue === 1 ? 'week' : 'month';
  const hourlyData = useMemo(() => generateChartData(timeFrame, businessHoursOnly), [timeFrame, businessHoursOnly]);
  const axisColor = isDarkMode ? '#525252' : '#9ca3af';

  // Calculate averages from the hourly data for display
  const totalUsage = hourlyData.reduce((acc, curr) => acc + (curr.usage || 0), 0);
  const averageUtilization = Math.round(totalUsage / hourlyData.length);
  const peakLabel = timeFrame === 'today' ? 'Peak Time' : 'Peak Day';
  const peakValue = hourlyData.reduce((max, curr) => (curr.usage || 0) > (max.usage || 0) ? curr : max, hourlyData[0] || { time: 'N/A', usage: 0 }).time;

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white mb-2">Aggregate Analytics</h2>
          <p className="text-gray-500">Insights into how your pods are being utilized.</p>
        </div>
      </div>
      
      {/* Controls */}
      <div className="bg-white dark:bg-bureau-dark-card p-6 rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-1/2">
             <div className="flex justify-between mb-2">
               <span className="text-sm font-bold dark:text-white">Time Scale</span>
               <span className="text-xs font-medium text-bureau-accent uppercase tracking-wider">
                 {sliderValue === 0 ? 'Past 24 Hours' : sliderValue === 1 ? 'Past 7 Days' : 'Past 30 Days'}
               </span>
             </div>
             <input type="range" min="0" max="2" step="1" value={sliderValue} onChange={(e) => setSliderValue(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-bureau-accent" />
             <div className="flex justify-between mt-2">
               <button onClick={() => setSliderValue(0)} className={`text-xs font-medium transition-colors ${sliderValue === 0 ? 'text-bureau-accent font-bold' : 'text-gray-400 hover:text-gray-600'}`}>Today</button>
               <button onClick={() => setSliderValue(1)} className={`text-xs font-medium transition-colors ${sliderValue === 1 ? 'text-bureau-accent font-bold' : 'text-gray-400 hover:text-gray-600'}`}>Week</button>
               <button onClick={() => setSliderValue(2)} className={`text-xs font-medium transition-colors ${sliderValue === 2 ? 'text-bureau-accent font-bold' : 'text-gray-400 hover:text-gray-600'}`}>Month</button>
             </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center cursor-pointer gap-3">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={businessHoursOnly} onChange={() => setBusinessHoursOnly(!businessHoursOnly)} />
                <div className={`block w-10 h-6 rounded-full transition-colors ${businessHoursOnly ? 'bg-bureau-accent' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${businessHoursOnly ? 'transform translate-x-4' : ''}`}></div>
              </div>
              <span className="text-sm font-medium text-gray-500">Business Hours Only</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-bureau-dark-card p-6 rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
             <div className="p-2 bg-bureau-accent-dim rounded-lg"><TrendingUp size={20} className="text-bureau-accent" /></div>
             <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded">+12%</span>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Avg Utilization</p>
          <h3 className="text-2xl font-bold dark:text-white">{averageUtilization}%</h3>
        </div>
        <div className="bg-white dark:bg-bureau-dark-card p-6 rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
             <div className="p-2 bg-blue-50 rounded-lg"><Clock size={20} className="text-blue-500" /></div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">{peakLabel}</p>
          <h3 className="text-2xl font-bold dark:text-white">{peakValue}</h3>
        </div>
        <div className="bg-white dark:bg-bureau-dark-card p-6 rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
             <div className="p-2 bg-purple-50 rounded-lg"><Users size={20} className="text-purple-500" /></div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Total Sessions</p>
          <h3 className="text-2xl font-bold dark:text-white">342</h3>
        </div>
        <div className="bg-white dark:bg-bureau-dark-card p-6 rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
             <div className="p-2 bg-orange-50 rounded-lg"><Calendar size={20} className="text-orange-500" /></div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Busiest Day</p>
          <h3 className="text-2xl font-bold dark:text-white">Tuesday</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-bureau-dark-card p-6 rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm">
          <h3 className="text-lg font-bold mb-1 dark:text-white">Usage Distribution</h3>
          <p className="text-xs text-gray-400 mb-6">Utilization percentage by time period</p>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#f0f0f0'} vertical={false} />
                <XAxis dataKey="time" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                {timeFrame === 'today' && !businessHoursOnly && (
                  <ReferenceLine x="08:00" stroke={isDarkMode ? '#555' : '#ccc'} strokeDasharray="3 3" label={{ position: 'top', value: 'Start', fontSize: 10, fill: axisColor }} />
                )}
                {timeFrame === 'today' && !businessHoursOnly && (
                   <ReferenceLine x="18:00" stroke={isDarkMode ? '#555' : '#ccc'} strokeDasharray="3 3" label={{ position: 'top', value: 'End', fontSize: 10, fill: axisColor }} />
                )}
                <Bar dataKey="usage" radius={[4, 4, 0, 0]} name="Usage">
                  {hourlyData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AggregateAnalytics;
