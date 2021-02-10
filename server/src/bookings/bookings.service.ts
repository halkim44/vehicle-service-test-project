import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './booking.interface';
import { CreateBookingDTO } from './create-booking.dto';
import { UpdateBookingDTO } from './update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel('Booking')
    private readonly bookingModel: Model<Booking>,
  ) {}
  // get a single Booking
  async get(id: string): Promise<Booking> {
    const result = await this.bookingModel.findById(id).exec();
    return result;
  }
  // create a single Booking
  async create(createBookingDTO: CreateBookingDTO): Promise<Booking> {
    const newBooking = await this.bookingModel.create(createBookingDTO);
    return newBooking;
  }
  // update a booking
  async update(id: string, updateBookingDTO: UpdateBookingDTO): Promise<any> {
    const result = await this.bookingModel
      .findByIdAndUpdate(id, updateBookingDTO, { new: true })
      .exec();
    return result;
  }
  // delete a Booking
  async delete(id: string): Promise<any> {
    const deletedUser = await this.bookingModel.findByIdAndRemove(id).exec();
    if (!deletedUser) return null;
    return deletedUser;
  }
  // get all booking
  async getAll(): Promise<Booking[]> {
    const result = await this.bookingModel.find().exec();
    return result;
  }
}
