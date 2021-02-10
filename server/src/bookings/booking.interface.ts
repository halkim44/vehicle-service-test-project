import { Document } from 'mongoose';

export interface Booking extends Document {
  vehicle: string;

  technicians_assigned: string[];

  made_by: string;

  service_started: Date;

  service_ended: Date;

  due_date: Date;

  branch: string;
}
