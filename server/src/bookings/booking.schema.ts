import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Branch } from 'src/branches/branch.schema';
import { User } from 'src/users/Schema/user.schema';
import { Vehicle } from 'src/vehicles/vehicle.schema';

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
  technicians: User[];

  @Prop()
  service_started: Date;

  @Prop()
  service_ended: Date;

  @Prop()
  date: Date;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Branch',
  })
  branch: Branch;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);