import React, { useState, useEffect } from 'react';
import { Booth, BoothStatus } from './types';
import { MOCK_BOOTHS } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AggregateAnalytics from './components/UsageAnalytics';
import Floorplan from './components/Floorplan';
import BoothDetails from './components/BoothDetails';
import StatusModal from './components/StatusModal';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [booths, setBooths] = useState<Booth[]>(MOCK_BOOTHS);
  const [selectedBoothId, setSelectedBoothId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'analytics' | 'floorplan'>('dashboard');
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBoothId, setModalBoothId] = useState<string | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const selectedBooth: Booth | undefined = booths.find(b => b.id === selectedBoothId);
  const modalBooth: Booth | undefined = booths.find(b => b.id === modalBoothId);

  const handleSelectBooth = (id: string | null) => {
    if (id === null) {
      setSelectedBoothId(null);
      return;
    }
    const booth = booths.find(b => b.id === id);
    if (booth && booth.status === 'maintenance') {
      setModalBoothId(id);
      setModalOpen(true);
    } else {
      setSelectedBoothId(id);
    }
  };

  const updateBoothStatus = (id: string, newStatus: BoothStatus) => {
    setBooths(prevBooths => prevBooths.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const updateBoothPosition = (id: string, x: number, y: number) => {
    setBooths(prevBooths => prevBooths.map(b => b.id === id ? { ...b, x, y } : b));
  };

  return (
    <div className="min-h-screen bg-bureau-bg dark:bg-bureau-dark-bg text-bureau-text dark:text-bureau-dark-text font-sans">
      <Sidebar 
        booths={booths}
        selectedBoothId={selectedBoothId}
        onSelectBooth={handleSelectBooth}
        currentView={currentView}
        onChangeView={setCurrentView}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />
      <main className="pl-64 min-h-screen">
        <div className="py-8">
           {selectedBooth ? (
             <BoothDetails 
               booth={selectedBooth} 
               onBack={() => setSelectedBoothId(null)}
               isDarkMode={isDarkMode}
               onOpenStatusModal={() => { setModalBoothId(selectedBooth.id); setModalOpen(true); }}
             />
           ) : currentView === 'analytics' ? (
             <AggregateAnalytics isDarkMode={isDarkMode} />
           ) : currentView === 'floorplan' ? (
             <Floorplan 
                booths={booths} 
                isDarkMode={isDarkMode} 
                onUpdateBoothPosition={updateBoothPosition}
                onSelectBooth={handleSelectBooth}
             />
           ) : (
             <Dashboard 
               booths={booths} 
               isDarkMode={isDarkMode}
               onSelectBooth={handleSelectBooth}
             />
           )}
        </div>
      </main>
      {modalBooth && (
        <StatusModal 
          booth={modalBooth} 
          isOpen={modalOpen} 
          onClose={() => { setModalOpen(false); setModalBoothId(null); }}
          onUpdateStatus={updateBoothStatus}
        />
      )}
    </div>
  );
}

export default App;
