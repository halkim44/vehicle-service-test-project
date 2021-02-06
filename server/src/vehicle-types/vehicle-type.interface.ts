import { Document } from 'mongoose';
import { User } from '../users/Schema/user.interface';

export interface VehicleType extends Document {
  name: string;
  number_of_technician_required: number;
}
