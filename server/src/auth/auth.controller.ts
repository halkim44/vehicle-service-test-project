import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/create-user.dto';
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
  async signup(@Res() res, @Body() user: CreateUserDTO) {
    const newUser = await this.authService.create(user);
    if (!newUser) {
      return res.status(HttpStatus.CONFLICT).json({
        message: 'Username already exist',
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      newUser,
    });
  }
}
