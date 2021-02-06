import { Document } from 'mongoose';
import { VehicleType } from '../vehicle-types/vehicle-type.interface';
import { User } from 'src/users/user.schema';

export interface Vehicle extends Document {
  model_name: string;

  number_plate: string;

  owner: User;

  alternate_drivers: User[];

  type: VehicleType;
}
