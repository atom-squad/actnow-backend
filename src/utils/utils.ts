export function getMonthPoints(pointsHistory: any, key: string): number {
  if (pointsHistory instanceof Map) {
    return pointsHistory.get(key);
  }
  return pointsHistory[key];
}
