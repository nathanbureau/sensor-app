import React from 'react';
import { 
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip as RechartsTooltip 
} from 'recharts';
import { Booth } from '../types';
import { THEME_COLORS } from '../constants';
import { generateChartData } from '../utils';

interface DashboardProps {
  booths: Booth[];
  isDarkMode: boolean;
  onSelectBooth: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ booths, isDarkMode, onSelectBooth }) => {
  const availableCount = booths.filter(b => b.status === 'available').length;
  const occupiedCount = booths.filter(b => b.status === 'occupied').length;
  const totalCount = booths.length;

  const donutData = [
    { name: 'Available', value: availableCount },
    { name: 'Occupied', value: totalCount - availableCount },
  ];
  
  // Use "Today" hourly data for the bar chart
  const hourlyData = generateChartData('today', false); 
  const COLORS = [THEME_COLORS.accent, THEME_COLORS.danger];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold dark:text-white mb-2">Hello!</h2>
        <p className="text-gray-500">Your current pods summary and activity.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Usage of All Pods', value: '+12.4%', delta: '↑ 18%', positive: true },
          { label: 'Avg Daily Usage per Pod', value: '4h 12min', delta: '↑ 5%', positive: true },
          { label: 'Pods in Total', value: totalCount, delta: `${availableCount} Available`, positive: true },
          { label: 'Collecting Usage Data', value: totalCount, delta: null, positive: true },
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-bureau-dark-card p-6 rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm">
            <h3 className="text-sm font-semibold text-bureau-text dark:text-white mb-2">{item.label}</h3>
            <div className="text-2xl font-bold text-bureau-text dark:text-white mb-1">{item.value}</div>
            {item.delta && (
               <span className={`inline-block px-2 py-1 rounded-md text-xs font-semibold ${item.positive ? 'bg-bureau-accent-dim text-bureau-accent' : 'bg-red-50 text-red-500'}`}>
                 {item.delta}
               </span>
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        <div className="col-span-2 bg-white dark:bg-bureau-dark-card p-6 rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm flex flex-col items-center justify-center relative">
          <h3 className="text-lg font-bold self-start mb-4 dark:text-white">Pods Usage Overview</h3>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} startAngle={90} endAngle={-270} dataKey="value" stroke="none">
                  {donutData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
              </RePieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-bold dark:text-white">{availableCount}</span>
                <span className="text-xs text-gray-500">Available</span>
            </div>
          </div>
          <div className="flex gap-8 mt-4">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-bureau-accent"></div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-semibold">Available</span>
                  <span className="text-lg font-bold dark:text-white">{availableCount}</span>
                </div>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-bureau-danger"></div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-semibold">Occupied</span>
                  <span className="text-lg font-bold dark:text-white">{occupiedCount}</span>
                </div>
             </div>
          </div>
        </div>
        <div className="col-span-3 bg-white dark:bg-bureau-dark-card p-6 rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm">
           <div className="flex justify-between items-center mb-2">
             <h3 className="text-lg font-bold dark:text-white">Workplace Activity</h3>
             <span className="bg-bureau-accent-dim text-bureau-accent px-3 py-1 rounded-full text-xs font-bold">Today</span>
           </div>
           <p className="text-xs text-gray-400 mb-6">Real-time Activity (Last 24 Hours)</p>
           <div className="h-[200px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={hourlyData}>
                 <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} dy={10} interval={3} />
                  <RechartsTooltip cursor={{fill: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                 <Bar dataKey="usage" radius={[4, 4, 4, 4]}>
                    {hourlyData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
      <h3 className="text-lg font-bold mb-4 dark:text-white">Live Sensor Telemetry</h3>
      <div className="bg-white dark:bg-bureau-dark-card rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm overflow-hidden">
        <div className="grid grid-cols-5 p-4 border-b border-gray-100 dark:border-bureau-dark-border text-sm font-bold text-gray-800 dark:text-white bg-gray-50 dark:bg-white/5">
          <div className="col-span-2">Pod Name</div>
          <div>Status</div>
          <div>CO₂ (ppm)</div>
          <div className="text-right">Temp (°C)</div>
        </div>
        {booths.map((booth) => (
          <div key={booth.id} onClick={() => onSelectBooth(booth.id)} className="grid grid-cols-5 p-4 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors items-center group">
            <div className="col-span-2 flex flex-col">
              <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-bureau-accent transition-colors">{booth.name}</span>
              <span className="text-xs text-gray-400">{booth.location}</span>
            </div>
            <div>
              <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${booth.status === 'available' ? 'bg-bureau-accent-dim text-bureau-accent' : booth.status === 'occupied' ? 'bg-red-50 text-red-500' : 'bg-yellow-50 text-yellow-600'}`}>
                {booth.status}
              </span>
            </div>
            <div className={`font-medium ${booth.metrics.co2 > 1000 ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}>{booth.metrics.co2}</div>
            <div className="text-right text-gray-600 dark:text-gray-400 font-medium">{booth.metrics.temp}°</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
