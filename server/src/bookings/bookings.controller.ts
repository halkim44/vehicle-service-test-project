import {
  Controller,
  UseGuards,
  Get,
  Param,
  NotFoundException,
  Put,
  Query,
  Body,
  Delete,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { CreateBookingDTO } from './create-booking.dto';
import { UpdateBookingDTO } from './update-booking.dto';
@Controller('bookings')
export class BookingsController {
  constructor(private bookingService: BookingsService) {}

  // Fetch a particular booking using ID
  @UseGuards(JwtAuthGuard)
  @Get('detail/:bookingID')
  async getBooking(@Param('bookingID') bookingID: string): Promise<any> {
    const booking = await this.bookingService.get(bookingID);
    if (!booking) throw new NotFoundException('Booking does not exist!');
    return { booking };
  }
  // Update a booking's details
  @UseGuards(JwtAuthGuard)
  @Put('')
  async updateBooking(
    @Query('bookingID') bookingID: string,
    @Body() updateBookingDTO: UpdateBookingDTO,
  ) {
    const booking = await this.bookingService.update(
      bookingID,
      updateBookingDTO,
    );
    if (!booking) throw new NotFoundException('Booking does not exist!');
    return {
      message: 'Booking has been successfully updated',
      booking,
    };
  }

  // Delete a booking
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deleteBooking(@Query('bookingID') bookingID: string) {
    const booking = await this.bookingService.delete(bookingID);
    if (!booking) throw new NotFoundException('Booking does not exist');
    return {
      message: 'Booking has been deleted',
      deleted: true,
    };
  }

  // add a booking
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async addBooking(@Body() createBookingDTO: CreateBookingDTO) {
    const booking = await this.bookingService.create(createBookingDTO);
    return {
      message: 'Booking has been created successfully',
      booking,
    };
  }
}
