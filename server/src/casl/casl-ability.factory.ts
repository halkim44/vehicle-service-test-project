import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
} from '@casl/ability';
import { Action } from './actions.enum';
import { Injectable } from '@nestjs/common';
import { Vehicle } from '../vehicles/vehicle.interface';
import { User } from '../users/user.interface';

type Subjects = InferSubjects<Vehicle | User>;
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user) {
    const { can, build, cannot } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    // if (user.is_admin) {
    //   can(Action.Manage, 'all');
    // } else {
    //   can(Action.Read, 'all');
    // }
    console.log(user.userId);
    can(Action.Update, 'Vehicle', { owner: user.userId });
    can(Action.Update, 'Vehicle', {
      alternate_drivers: { $in: [user.userId] },
    });
    can(Action.Read, 'User', {
      is_technician: { $eq: true },
    }); // For Testing
    return build();
  }
}
