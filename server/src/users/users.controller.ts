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
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { Booking } from 'src/bookings/booking.interface';
import { Action } from 'src/casl/actions.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(
    private userService: UsersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  // Fetch a particular user using ID
  @UseGuards(JwtAuthGuard)
  @Get('/:userID')
  async getUser(@Param('userID') userID: string, @Request() req): Promise<any> {
    console.log(req.user, 'hah');

    const ability = this.caslAbilityFactory.createForUser(req.user);
    console.log(ability.can(Action.Read, 'User'));

    if (!ability.can(Action.Read, 'User')) {
      // "user" has read access to everything
      throw new UnauthorizedException('HaaaS');
    }
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

  // get technicians bookedSlot
  @UseGuards(JwtAuthGuard)
  @Get('/:id/booked-slot')
  async getBookedSlots(@Param('id') userId: string): Promise<Booking[]> {
    let results;
    try {
      results = this.userService.getBookedSlots(userId);
    } catch (e) {
      throw e;
    }
    return results;
  }

  // get Service History
  @UseGuards(JwtAuthGuard)
  @Get('/:id/service-history')
  async getServiceHistory(@Param('id') userId: string): Promise<Booking[]> {
    let results;
    try {
      results = this.userService.getServiceHistory(userId);
    } catch (e) {
      throw e;
    }
    return results;
  }
}
