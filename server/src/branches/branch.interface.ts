import { Document } from 'mongoose';
import { User } from '../users/user.schema';

export interface Branch extends Document {
  name: string;

  working_days: number[];

  technicians: User[];
}
