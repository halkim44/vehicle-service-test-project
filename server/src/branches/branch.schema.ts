import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { User } from 'src/users/user.schema';

export type BranchDocument = Branch & Document;

@Schema()
export class Branch {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: [{ type: Number, min: 1, max: 7 }],
    validate: [
      weekdayLimit,
      '{PATH} exceeds the limit of number of days in a week',
    ],
  })
  working_days: number[];

  @Prop({
    type: [
      {
        type: mongooseSchema.Types.ObjectId,
        ref: 'User',
      },
    ],
  })
  technicians: User[];
}

function weekdayLimit(val: number[]): boolean {
  return val.length <= 7;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
