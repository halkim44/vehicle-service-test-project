import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Branch } from '../branches/branch.schema';
import { User } from '../users/user.schema';
import { Vehicle } from '../vehicles/vehicle.schema';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
  @Prop({
    required: true,
    type: mongooseSchema.Types.ObjectId,
    ref: 'Vehicle',
  })
  vehicle: Vehicle;

  @Prop([
    {
      type: mongooseSchema.Types.ObjectId,
      ref: 'User',
    },
  ])
  technicians_assigned: User[];

  @Prop({
    required: true,
    type: mongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  made_by: User;

  @Prop({ type: Date })
  service_started: Date;

  @Prop({ type: Date })
  service_ended: Date;

  @Prop({ required: true, type: Date })
  due_date: Date;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Branch',
  })
  branch: Branch;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
