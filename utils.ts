import { TimeFrame, ChartDataPoint } from './types';
import { THEME_COLORS } from './constants';

export const generateChartData = (timeFrame: TimeFrame, businessHoursOnly: boolean): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const now = new Date();
  
  if (timeFrame === 'today') {
    // Generate data from midnight (00:00) up to current time (or 23:00)
    for (let i = 0; i < 24; i++) {
       // Filter business hours (08:00 - 18:00)
       if (businessHoursOnly && (i < 8 || i > 18)) continue;

       const hourStr = i < 10 ? `0${i}:00` : `${i}:00`;
       
       // Logic for activity based on time
       const isActiveHour = i >= 8 && i <= 18;
       const isWeekend = now.getDay() === 0 || now.getDay() === 6; 
       
       const showActivity = businessHoursOnly ? true : (isActiveHour && !isWeekend);

       const baseCo2 = showActivity ? 800 : 420;
       const co2 = Math.floor(baseCo2 + (Math.random() * 300 - 150));
       const temp = Number((21.5 + (Math.random() * 2 - 1)).toFixed(1));
       const humidity = Math.floor(45 + (Math.random() * 10 - 5));
       const tvoc = Math.floor((showActivity ? 120 : 30) + (Math.random() * 40 - 20));
       const isOccupied = showActivity && Math.random() > 0.4;
       const usage = showActivity ? Math.floor(Math.random() * 60 + 40) : Math.floor(Math.random() * 10);
       const color = usage > 70 ? THEME_COLORS.danger : THEME_COLORS.accent;

       data.push({
         time: hourStr,
         co2: Math.max(400, co2),
         temp,
         humidity,
         tvoc: Math.max(0, tvoc),
         occupancy: isOccupied ? 1 : 0,
         usage,
         color
       });
    }
  } else {
    // Logic for Week/Month
    let daysToGenerate = timeFrame === 'week' ? 7 : 30;
    
    // We generate data backwards from today
    for (let i = daysToGenerate - 1; i >= 0; i--) {
       const d = new Date();
       d.setDate(now.getDate() - i);
       
       const dayOfWeek = d.getDay(); // 0 is Sun, 6 is Sat
       const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

       // If strictly business hours, skip weekend data points entirely
       if (businessHoursOnly && isWeekend) continue;

       const label = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' });
       const isActiveDay = !isWeekend;

       const baseCo2 = isActiveDay ? 750 : 410;
       const co2 = Math.floor(baseCo2 + Math.random() * 200);
       const temp = Number((21 + Math.random()).toFixed(1));
       const humidity = Math.floor(40 + Math.random() * 10);
       const tvoc = Math.floor((isActiveDay ? 100 : 20) + Math.random() * 30);
       
       // For week/month view, occupancy 1 means "High Utilization" for that day
       const isOccupied = isActiveDay ? 1 : 0; 
       const usage = isActiveDay ? Math.floor(Math.random() * 50 + 50) : Math.floor(Math.random() * 20);
       const color = usage > 60 ? THEME_COLORS.danger : THEME_COLORS.accent;

       data.push({
         time: label,
         co2,
         temp,
         humidity,
         tvoc,
         occupancy: isOccupied,
         usage,
         color
       });
    }
  }

  return data;
};
