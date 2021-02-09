import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() user: CreateUserDTO) {
    const newUser = await this.authService.create(user);
    if (!newUser) {
      throw new ConflictException('Username already exist');
    }
    return {
      message: 'User has been created successfully',
      newUser,
    };
  }
}
