import { Document } from 'mongoose';

export interface Vehicle extends Document {
  kind: 'Vehicle';

  model_name: string;

  number_plate: string;

  owner: string;

  alternate_drivers: string[];

  class: string;
}
