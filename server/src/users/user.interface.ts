import { Document } from 'mongoose';

export interface User extends Document {
  kind: 'User';
  readonly name: string;
  readonly password: string;
  readonly is_technician: boolean;
}
