import { Document } from 'mongoose';
import { Vehicle } from '../vehicles/vehicle.interface';
import { Branch } from '../branches/branch.interface';

export interface User extends Document {
  vehicle: Vehicle;

  technicians_assigned: User[];

  service_started: Date;

  service_ended: Date;

  date: Date;

  branch: Branch;
}
