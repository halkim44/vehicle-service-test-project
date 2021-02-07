import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDTO } from './create-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  // add a user
  @Post('/create')
  async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.addUser(createUserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      user,
    });
  }

  // Fetch a particular user using ID
  @UseGuards(JwtAuthGuard)
  @Get('/:userID')
  async getUser(@Res() res, @Param('userID') userID) {
    const user = await this.userService.getUser(userID);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }
  // Update a user's details
  @Put('/update')
  async updateUser(
    @Res() res,
    @Query('userID') userID,
    @Body() createUserDTO: CreateUserDTO,
  ) {
    const user = await this.userService.updateUser(userID, createUserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      user,
    });
  }

  // Delete a user
  @Delete('/delete')
  async deleteUser(@Res() res, @Query('userID') userID) {
    const user = await this.userService.deleteUser(userID);
    if (!user) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      user,
    });
  }
}
