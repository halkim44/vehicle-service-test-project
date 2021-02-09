import {
  Controller,
  Get,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  // Fetch a particular user using ID
  // @UseGuards(JwtAuthGuard)
  @Get('/:userID')
  async getUser(@Param('userID') userID: string): Promise<any> {
    const user = await this.userService.getUser(userID);
    if (!user) throw new NotFoundException('User does not exist!');
    return { user };
  }
  // Update a user's details
  @UseGuards(JwtAuthGuard)
  @Put('/update')
  async updateUser(
    @Query('userID') userID: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const user = await this.userService.updateUser(userID, updateUserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return {
      message: 'User has been successfully updated',
      user,
    };
  }

  // Delete a user
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deleteUser(@Query('userID') userID: string) {
    const user = await this.userService.deleteUser(userID);
    if (!user) throw new NotFoundException('User does not exist');
    return {
      message: 'User has been deleted',
      deleted: true,
    };
  }
}
