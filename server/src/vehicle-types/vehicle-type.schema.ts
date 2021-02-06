import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleTypeDocument = VehicleType & Document;

@Schema()
export class VehicleType {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 1, min: 1 })
  number_of_technician_required: number;
}

export const VehicleTypeSchema = SchemaFactory.createForClass(VehicleType);
