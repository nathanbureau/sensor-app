import React, { useState, useRef } from 'react';
import { CheckCircle, Move, Box } from 'lucide-react';
import { Booth } from '../types';

interface FloorplanProps {
  booths: Booth[];
  isDarkMode: boolean;
  onUpdateBoothPosition: (id: string, x: number, y: number) => void;
  onSelectBooth: (id: string) => void;
}

const Floorplan: React.FC<FloorplanProps> = ({ booths, isDarkMode, onUpdateBoothPosition, onSelectBooth }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [selectedPodId, setSelectedPodId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    if (!isEditMode) return;
    setDraggingId(id);
    e.stopPropagation();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));
    onUpdateBoothPosition(draggingId, clampedX, clampedY);
  };

  const handleMouseUp = () => setDraggingId(null);

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold dark:text-white mb-2">Office Floorplan</h2>
          <p className="text-gray-500">View real-time status and manage layout.</p>
        </div>
        <button onClick={() => setIsEditMode(!isEditMode)} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${isEditMode ? 'bg-bureau-accent text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300'}`}>
          {isEditMode ? <CheckCircle size={16} /> : <Move size={16} />}
          {isEditMode ? 'Done Editing' : 'Edit Layout'}
        </button>
      </div>
      <div ref={containerRef} className="relative w-full flex-grow bg-white dark:bg-bureau-dark-card rounded-2xl border border-gray-100 dark:border-bureau-dark-border shadow-sm overflow-hidden min-h-[500px]" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(${isDarkMode ? '#ffffff' : '#000000'} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
        {booths.map(booth => (
          <div key={booth.id} style={{ left: `${booth.x}%`, top: `${booth.y}%`, transform: 'translate(-50%, -50%)' }} className={`absolute flex flex-col items-center group cursor-pointer`} onMouseDown={(e) => handleMouseDown(e, booth.id)} onClick={() => !isEditMode && setSelectedPodId(selectedPodId === booth.id ? null : booth.id)}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${isEditMode && draggingId === booth.id ? 'scale-110 shadow-xl cursor-grabbing' : ''} ${booth.status === 'available' ? 'bg-bureau-accent-dim border-2 border-bureau-accent' : booth.status === 'occupied' ? 'bg-red-50 border-2 border-red-500' : 'bg-yellow-50 border-2 border-yellow-500'}`}>
              <Box className={`${booth.status === 'available' ? 'text-bureau-accent' : booth.status === 'occupied' ? 'text-red-500' : 'text-yellow-500'}`} />
            </div>
            <div className="mt-2 px-2 py-1 bg-white dark:bg-black/50 backdrop-blur-md rounded text-xs font-bold shadow-sm whitespace-nowrap dark:text-white">{booth.name}</div>
            {selectedPodId === booth.id && !isEditMode && (
              <div className="absolute top-full mt-3 bg-white dark:bg-bureau-dark-card p-4 rounded-xl shadow-xl border border-gray-100 dark:border-bureau-dark-border w-48 z-20 animate-fade-in text-center">
                 <h4 className="font-bold text-lg dark:text-white mb-1">{booth.name}</h4>
                 <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${booth.status === 'available' ? 'text-bureau-accent' : booth.status === 'occupied' ? 'text-red-500' : 'text-yellow-500'}`}>{booth.status}</div>
                 <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                   <div className="bg-gray-50 dark:bg-white/5 p-2 rounded"><span className="block text-gray-400">Temp</span><span className="font-bold dark:text-white">{booth.metrics.temp}°</span></div>
                   <div className="bg-gray-50 dark:bg-white/5 p-2 rounded"><span className="block text-gray-400">CO2</span><span className="font-bold dark:text-white">{booth.metrics.co2}</span></div>
                 </div>
                 <button onClick={(e) => { e.stopPropagation(); onSelectBooth(booth.id); }} className="w-full py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold hover:opacity-80 transition-opacity">View Details</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Floorplan;
