import { Document } from 'mongoose';
import { User } from '../users/Schema/user.interface';

export interface Branch extends Document {
  name: string;

  working_days: number[];

  technicians: User[];
}
