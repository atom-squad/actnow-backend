export const CURRENT_DATE = new Date().toLocaleDateString('en-CA', {
  timeZone: 'America/Vancouver',
});

export const MONTHS_MAP_KEY = CURRENT_DATE.substring(0, 7);

export function getMonthPoints(pointsHistory: any, key: string): number {
  if (pointsHistory instanceof Map) {
    return pointsHistory.get(key);
  }
  return pointsHistory[key];
}

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
