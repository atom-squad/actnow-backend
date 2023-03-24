export interface UserSectionData {
  name: string;
  department: string;
  organization: string;
  totalPoints: number;
  rankingPos: number;
}

export interface ProgressData {
  personalProgress: [
    {
      month: string;
      points: number;
    },
  ];
  departmentProgress: [
    {
      month: string;
      points: number;
    },
  ];
}
