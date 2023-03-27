export function getMonthPoints(pointsHistory: any, key: string): number {
  if (pointsHistory instanceof Map) {
    return pointsHistory.get(key);
  }
  return pointsHistory[key];
}

export function getTotalPoints(pointsHistory: any): number {
  let totalPoints = 0;
  if (pointsHistory instanceof Map) {
    pointsHistory.forEach((month) => {
      totalPoints += month;
    });
  } else {
    for (const monthPoints of pointsHistory) {
      totalPoints += monthPoints;
    }
  }

  return totalPoints;
}
