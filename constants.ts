import { Booth } from './types';

export const MOCK_BOOTHS: Booth[] = [
  {
    id: '1',
    name: 'Pod 1',
    location: 'Goswell Road',
    status: 'occupied',
    metrics: { co2: 850, temp: 22.4, humidity: 45, tvoc: 120, occupancy: true, noise: 55 },
    x: 20,
    y: 30
  },
  {
    id: '2',
    name: 'Pod 1+',
    location: 'Goswell Road',
    status: 'available',
    metrics: { co2: 420, temp: 21.8, humidity: 40, tvoc: 45, occupancy: false, noise: 30 },
    x: 35,
    y: 30
  },
  {
    id: '3',
    name: 'Quad+',
    location: 'Goswell Road',
    status: 'maintenance',
    metrics: { co2: 405, temp: 20.1, humidity: 40, tvoc: 15, occupancy: false, noise: 0 },
    x: 60,
    y: 60
  },
  {
    id: '4',
    name: 'Tuesday',
    location: 'Shoreditch High',
    status: 'available',
    metrics: { co2: 450, temp: 21.0, humidity: 38, tvoc: 50, occupancy: false, noise: 35 },
    x: 80,
    y: 20
  },
  {
    id: '5',
    name: 'Pod 2',
    location: 'Shoreditch High',
    status: 'maintenance',
    metrics: { co2: 410, temp: 20.5, humidity: 42, tvoc: 20, occupancy: false, noise: 25 },
    x: 20,
    y: 70
  }
];

export const THEME_COLORS = {
  accent: '#00D68F', // Available (Green)
  danger: '#FF6B6B', // Occupied (Red)
  warning: '#FACC15', // Maintenance
  darkBg: '#1E1E1E',
  lightBg: '#FFFFFF',
  textSecondary: '#94a3b8'
};
