import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { User } from '../users/user.schema';
import { VehicleType } from '../vehicle-types/vehicle-type.schema';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  number_plate: string;

  @Prop({ required: true, type: mongooseSchema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'User' }] })
  alternate_drivers: User[];

  @Prop({
    required: true,
    type: mongooseSchema.Types.ObjectId,
    ref: 'VehicleType',
  })
  class: VehicleType;
}
export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
