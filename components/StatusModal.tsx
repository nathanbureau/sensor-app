import React from 'react';
import { AlertTriangle, Wrench, CheckCircle, User } from 'lucide-react';
import { Booth, BoothStatus } from '../types';

interface StatusModalProps {
  booth: Booth;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: BoothStatus) => void;
}

const StatusModal: React.FC<StatusModalProps> = ({ booth, isOpen, onClose, onUpdateStatus }) => {
  if (!isOpen) return null;
  const isBroken = booth.status === 'maintenance';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-bureau-dark-card rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 dark:border-bureau-dark-border">
        <div className={`p-6 text-center ${isBroken ? 'bg-red-50 dark:bg-red-900/10' : 'bg-gray-50 dark:bg-white/5'}`}>
          <div className="mx-auto w-12 h-12 rounded-full bg-white dark:bg-bureau-dark-card flex items-center justify-center mb-4 shadow-sm">
            {isBroken ? <AlertTriangle className="text-bureau-danger" size={24} /> : <Wrench className="text-gray-500" size={24} />}
          </div>
          <h2 className="text-xl font-bold dark:text-white mb-1">{isBroken ? 'Out of Service' : 'Manage Pod Status'}</h2>
          <p className="text-sm text-gray-500">{isBroken ? 'Broken Seat - Maintenance Required' : `Current Status: ${booth.status.charAt(0).toUpperCase() + booth.status.slice(1)}`}</p>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center">You can manually override the sensor status for <strong>{booth.name}</strong> below. {isBroken && " Once repairs are complete, mark as Available."}</p>
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => { onUpdateStatus(booth.id, 'available'); onClose(); }} className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-transparent bg-bureau-accent-dim hover:border-bureau-accent transition-all group">
              <CheckCircle className="text-bureau-accent mb-2" size={24} />
              <span className="text-sm font-bold text-bureau-accent">Available</span>
            </button>
            <button onClick={() => { onUpdateStatus(booth.id, 'occupied'); onClose(); }} className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-transparent bg-yellow-50 dark:bg-yellow-900/20 hover:border-yellow-500 transition-all">
              <User className="text-yellow-600 dark:text-yellow-400 mb-2" size={24} />
              <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">Occupied</span>
            </button>
            <button onClick={() => { onUpdateStatus(booth.id, 'maintenance'); onClose(); }} className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-transparent bg-red-50 dark:bg-red-900/20 hover:border-bureau-danger transition-all">
              <Wrench className="text-bureau-danger mb-2" size={24} />
              <span className="text-sm font-bold text-bureau-danger">Maintenance</span>
            </button>
          </div>
        </div>
        <div className="p-4 border-t border-gray-100 dark:border-bureau-dark-border flex justify-center">
          <button onClick={onClose} className="text-sm font-medium text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
