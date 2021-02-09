import { Types } from 'mongoose';

export class CreateVehicleDTO {
  model_name: string;

  number_plate: string;

  owner: Types.ObjectId;

  alternate_drivers: Types.ObjectId[];

  type: Types.ObjectId;
}
