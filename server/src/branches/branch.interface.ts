import { Document } from 'mongoose';

export interface Branch extends Document {
  name: string;

  working_days: number[];

  technicians: string[];
}
