import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Edit2, Activity, Wind, CloudFog, Thermometer, Droplets 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, LineChart, Line 
} from 'recharts';
import { Booth, TimeFrame } from '../types';
import { THEME_COLORS } from '../constants';
import { generateChartData } from '../utils';
import { ChartCard, CustomTooltip } from './shared/ChartComponents';

interface BoothDetailsProps {
  booth: Booth;
  onBack: () => void;
  isDarkMode: boolean;
  onOpenStatusModal: () => void;
}

const BoothDetails: React.FC<BoothDetailsProps> = ({ booth, onBack, isDarkMode, onOpenStatusModal }) => {
  const [sliderValue, setSliderValue] = useState(0); // 0: today, 1: week, 2: month
  const [businessHoursOnly, setBusinessHoursOnly] = useState(false);
  
  const timeFrame: TimeFrame = sliderValue === 0 ? 'today' : sliderValue === 1 ? 'week' : 'month';
  const displayData = useMemo(() => generateChartData(timeFrame, businessHoursOnly), [timeFrame, businessHoursOnly]);
  const axisColor = isDarkMode ? '#525252' : '#9ca3af';

  const showDemarcation = timeFrame === 'today' && !businessHoursOnly;
  const startWorkLabel = displayData.find(d => d.time.startsWith('08'))?.time;
  const endWorkLabel = displayData.find(d => d.time.startsWith('18'))?.time;

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold dark:text-white">{booth.name}</h1>
            <p className="text-gray-500">{booth.location}</p>
          </div>
        </div>
        <button onClick={onOpenStatusModal} className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-transform hover:scale-105 ${booth.status === 'available' ? 'bg-bureau-accent-dim text-bureau-accent hover:bg-bureau-accent hover:text-white' : booth.status === 'maintenance' ? 'bg-red-50 text-bureau-danger dark:bg-red-900/20 hover:bg-bureau-danger hover:text-white' : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-400 hover:text-white'}`}>
          <div className={`w-2 h-2 rounded-full ${booth.status === 'available' ? 'bg-bureau-accent' : booth.status === 'maintenance' ? 'bg-bureau-danger' : 'bg-yellow-500'} ${booth.status === 'available' ? 'group-hover:bg-white' : ''}`} />
          <span className="uppercase tracking-wider mr-1">{booth.status}</span>
          <Edit2 size={12} className="opacity-50" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white dark:bg-bureau-dark-card p-4 rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Occupancy</span>
            <Activity size={16} className="text-bureau-accent" />
          </div>
          <div className="text-2xl font-bold dark:text-white">{booth.metrics.occupancy ? 'Occupied' : 'Vacant'}</div>
          <p className="text-xs text-gray-400 mt-1">Real-time status</p>
        </div>
        <div className="bg-white dark:bg-bureau-dark-card p-4 rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">CO₂</span>
            <Wind size={16} className={booth.metrics.co2 > 1000 ? 'text-bureau-danger' : 'text-gray-400'} />
          </div>
          <div className="text-2xl font-bold dark:text-white">{booth.metrics.co2} <span className="text-sm font-normal text-gray-500">ppm</span></div>
          <p className="text-xs mt-1 font-medium" style={{ color: booth.metrics.co2 > 1000 ? '#FF6B6B' : '#00D68F' }}>{booth.metrics.co2 > 1000 ? 'Ventilation Active' : 'Optimal Air Quality'}</p>
        </div>
        <div className="bg-white dark:bg-bureau-dark-card p-4 rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">TVOC</span>
            <CloudFog size={16} className="text-gray-400" />
          </div>
          <div className="text-2xl font-bold dark:text-white">{booth.metrics.tvoc} <span className="text-sm font-normal text-gray-500">ppb</span></div>
          <p className="text-xs text-gray-400 mt-1">Volatile Compounds</p>
        </div>
        <div className="bg-white dark:bg-bureau-dark-card p-4 rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Temperature</span>
            <Thermometer size={16} className="text-gray-400" />
          </div>
          <div className="text-2xl font-bold dark:text-white">{booth.metrics.temp}°C</div>
          <p className="text-xs text-gray-400 mt-1">Stable Environment</p>
        </div>
        <div className="bg-white dark:bg-bureau-dark-card p-4 rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Humidity</span>
            <Droplets size={16} className="text-blue-400" />
          </div>
          <div className="text-2xl font-bold dark:text-white">{booth.metrics.humidity}<span className="text-sm font-normal text-gray-500">%</span></div>
          <p className="text-xs text-gray-400 mt-1">Relative Humidity</p>
        </div>
      </div>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="col-span-1 lg:col-span-2">
           <ChartCard title="Occupancy Trends" subTitle="Historical Usage Patterns" height={200}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#f0f0f0'} vertical={false} />
                  <XAxis dataKey="time" stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} ticks={[0, 1]} tickFormatter={(val) => val === 1 ? 'Occupied' : 'Vacant'} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: axisColor, strokeWidth: 1 }} />
                  {showDemarcation && startWorkLabel && <ReferenceLine x={startWorkLabel} stroke="#FF6B6B" strokeDasharray="3 3" />}
                  {showDemarcation && endWorkLabel && <ReferenceLine x={endWorkLabel} stroke="#FF6B6B" strokeDasharray="3 3" />}
                  <Area type="step" dataKey="occupancy" stroke={THEME_COLORS.danger} fill={THEME_COLORS.danger} fillOpacity={0.2} name="State" unit="" />
                </AreaChart>
              </ResponsiveContainer>
           </ChartCard>
        </div>
        <ChartCard title="Carbon Dioxide (CO₂)" subTitle="Air Quality in PPM">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={displayData}>
              <defs>
                <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D68F" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#00D68F" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#f0f0f0'} vertical={false} />
              <XAxis dataKey="time" stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: axisColor, strokeWidth: 1 }} />
              {showDemarcation && startWorkLabel && <ReferenceLine x={startWorkLabel} stroke="#FF6B6B" strokeDasharray="3 3" />}
              {showDemarcation && endWorkLabel && <ReferenceLine x={endWorkLabel} stroke="#FF6B6B" strokeDasharray="3 3" />}
              <Area type="monotone" dataKey="co2" stroke="#00D68F" strokeWidth={2} fillOpacity={1} fill="url(#colorCo2)" name="CO₂" unit="ppm" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Temperature" subTitle="Ambient Temperature in Celsius">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={displayData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#f0f0f0'} vertical={false} />
              <XAxis dataKey="time" stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: axisColor, strokeWidth: 1 }} />
              {showDemarcation && startWorkLabel && <ReferenceLine x={startWorkLabel} stroke="#FF6B6B" strokeDasharray="3 3" />}
              {showDemarcation && endWorkLabel && <ReferenceLine x={endWorkLabel} stroke="#FF6B6B" strokeDasharray="3 3" />}
              <Line type="monotone" dataKey="temp" stroke="#FF6B6B" strokeWidth={2} dot={false} name="Temp" unit="°C" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="TVOC Levels" subTitle="Total Volatile Organic Compounds (ppb)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={displayData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#f0f0f0'} vertical={false} />
              <XAxis dataKey="time" stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: axisColor, strokeWidth: 1 }} />
              {showDemarcation && startWorkLabel && <ReferenceLine x={startWorkLabel} stroke="#FF6B6B" strokeDasharray="3 3" />}
              {showDemarcation && endWorkLabel && <ReferenceLine x={endWorkLabel} stroke="#FF6B6B" strokeDasharray="3 3" />}
              <Line type="monotone" dataKey="tvoc" stroke="#a855f7" strokeWidth={2} dot={false} name="TVOC" unit="ppb" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Humidity" subTitle="Relative Humidity (%)">
           <ResponsiveContainer width="100%" height="100%">
            <LineChart data={displayData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#f0f0f0'} vertical={false} />
              <XAxis dataKey="time" stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: axisColor, strokeWidth: 1 }} />
              {showDemarcation && startWorkLabel && <ReferenceLine x={startWorkLabel} stroke="#FF6B6B" strokeDasharray="3 3" />}
              {showDemarcation && endWorkLabel && <ReferenceLine x={endWorkLabel} stroke="#FF6B6B" strokeDasharray="3 3" />}
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} dot={false} name="Humidity" unit="%" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default BoothDetails;
