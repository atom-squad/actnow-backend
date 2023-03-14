import { Schema } from 'mongoose';

export interface RankedUser {
  id: Schema.Types.ObjectId;
  name: string;
  monthPoints: number;
}

export interface RankedDepartment {
  _id: number;
  name: string;
  totalPoints: number;
}
