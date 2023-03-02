import { Schema } from 'mongoose';

export interface RankedUser {
  id: Schema.Types.ObjectId;
  name: string;
  department: number;
  monthPoints: number;
}
