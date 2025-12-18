import React from 'react';
import { LayoutDashboard, Box, Settings, LogOut, PieChart, Map } from 'lucide-react';
import { Booth } from '../types';

interface SidebarProps {
  booths: Booth[];
  selectedBoothId: string | null;
  onSelectBooth: (id: string | null) => void;
  currentView: 'dashboard' | 'analytics' | 'floorplan';
  onChangeView: (view: 'dashboard' | 'analytics' | 'floorplan') => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  booths, selectedBoothId, onSelectBooth, currentView, onChangeView, isDarkMode, toggleTheme
}) => {
  return (
    <div className="w-64 h-screen flex flex-col border-r border-gray-200 dark:border-bureau-dark-border bg-bureau-card dark:bg-bureau-dark-card transition-colors duration-200 fixed left-0 top-0 z-10">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight dark:text-white">Bureau</h1>
      </div>
      <nav className="flex-1 overflow-y-auto px-4 space-y-2">
        <div className="mb-6">
          <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main</p>
          <button onClick={() => { onSelectBooth(null); onChangeView('dashboard'); }} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedBoothId === null && currentView === 'dashboard' ? 'bg-bureau-accent-dim text-bureau-accent dark:bg-opacity-10' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          <button onClick={() => { onSelectBooth(null); onChangeView('analytics'); }} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedBoothId === null && currentView === 'analytics' ? 'bg-bureau-accent-dim text-bureau-accent dark:bg-opacity-10' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}>
            <PieChart size={18} />
            <span>Aggregate Analytics</span>
          </button>
          <button onClick={() => { onSelectBooth(null); onChangeView('floorplan'); }} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedBoothId === null && currentView === 'floorplan' ? 'bg-bureau-accent-dim text-bureau-accent dark:bg-opacity-10' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}>
            <Map size={18} />
            <span>Floorplan</span>
          </button>
        </div>
        <div>
          <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">My Pods & Spaces</p>
          <div className="space-y-1">
            {booths.map((booth) => (
              <button key={booth.id} onClick={() => onSelectBooth(booth.id)} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors group ${selectedBoothId === booth.id ? 'bg-bureau-accent-dim text-bureau-accent dark:bg-opacity-10' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                <div className="flex items-center space-x-3">
                  <Box size={18} />
                  <span>{booth.name}</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${booth.status === 'available' ? 'bg-bureau-accent' : booth.status === 'occupied' ? 'bg-bureau-danger' : 'bg-yellow-400'}`} />
              </button>
            ))}
          </div>
        </div>
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-bureau-dark-border">
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Dark Mode</span>
          <button onClick={toggleTheme} className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${isDarkMode ? 'bg-bureau-accent' : 'bg-gray-300'}`}>
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5">
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
