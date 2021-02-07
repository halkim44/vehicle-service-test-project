import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (!user) return null;

    const match = await this.comparePassword(pass, user.password);
    console.log(match);

    if (!match) return null;

    const { password, ...result } = user['_doc']; // separate password from
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async create(user: any) {
    // hash the password
    console.log(user);

    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.usersService.create({ ...user, password: pass });

    console.log(newUser);

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = newUser['_doc'];

    // generate token
    const token = this.jwtService.sign({
      username: user.name,
      sub: user._id,
    });

    // return the user and the token
    return { user: result, token };
  }

  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
  private async comparePassword(
    enteredPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
