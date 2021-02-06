import { Document } from 'mongoose';

export interface VehicleType extends Document {
  name: string;
  number_of_technician_required: number;
}
