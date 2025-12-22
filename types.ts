export type BoothStatus = 'available' | 'occupied' | 'maintenance';

export interface Booth {
  id: string;
  name: string;
  location: string;
  status: BoothStatus;
  metrics: {
    co2: number; // ppm
    temp: number; // celsius
    humidity: number; // %
    tvoc: number; // ppb
    occupancy: boolean;
  };
  // Coordinates for floorplan (0-100 percentage)
  x: number;
  y: number;
}

export type TimeFrame = 'today' | 'week' | 'month';

export interface ChartDataPoint {
  time: string;
  co2: number;
  temp: number;
  humidity: number;
  tvoc: number;
  occupancy: number; // 0 or 1 for charting
  usage?: number; // for aggregate
  color?: string; // for bars
}
