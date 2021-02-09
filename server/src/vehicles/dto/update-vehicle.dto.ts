import { Types } from 'mongoose';

export class UpdateVehicleDTO {
  readonly model_name?: string;
  readonly number_plate?: string;
  readonly owner?: string;
  readonly alternate_drivers?: string;
  readonly type?: string;
}
