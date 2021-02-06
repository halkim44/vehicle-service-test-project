import { Document } from 'mongoose';
import { User } from 'src/users/user.schema';

export interface Branch extends Document {
  name: string;

  working_days: number[];

  technicians: User[];
}
