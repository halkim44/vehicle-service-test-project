import { Document } from 'mongoose';
import { User } from '../users/Schema/user.interface';
import { VehicleType } from '../vehicle-types/vehicle-type.interface';

export interface Vehicle extends Document {
  model_name: string;

  number_plate: string;

  owner: User;

  alternate_drivers: User[];

  type: VehicleType;
}
