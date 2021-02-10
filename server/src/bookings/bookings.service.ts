import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './booking.interface';
import { CreateBookingDTO } from './create-booking.dto';
import { UpdateBookingDTO } from './update-booking.dto';
import { UsersService } from '../users/users.service';
import { VehiclesService } from 'src/vehicles/vehicles.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel('Booking')
    private readonly bookingModel: Model<Booking>,
    private usersService: UsersService,
    private vehicleService: VehiclesService,
  ) {}
  // get a single Booking
  async get(id: string): Promise<Booking> {
    const result = await this.bookingModel.findById(id).exec();
    return result;
  }

  // create a single Booking
  async create(createBookingDTO: CreateBookingDTO): Promise<Booking> {
    // get vehicle
    const vehicle = await this.vehicleService.getVehicle(
      createBookingDTO.vehicle,
    );
    if (!vehicle) throw new NotFoundException('Vehicle does not exist!');
    // check if creator is not owner
    if (vehicle.owner !== createBookingDTO.made_by) {
      // check if creator is not one of alt driver
      if (!vehicle.alternate_drivers.includes(createBookingDTO.made_by)) {
        throw new ForbiddenException(
          'Forbidden. User is not an owner or alternate driver',
        );
      }
    }
    const today = new Date();
    if (
      today.getFullYear === createBookingDTO.due_date.getFullYear &&
      today.getMonth === createBookingDTO.due_date.getMonth &&
      today.getDay === createBookingDTO.due_date.getDay
    ) {
      throw new ForbiddenException('Forbidden. cannot book on current day');
    }
    // aggregate :
    // match due date
    // get if assigned technician is booked that day
    // const slotBooked = await this.bookingModel.aggregate([
    //   {
    //     $match: {
    //       technicians_assigned: {
    //         $in: [createBookingDTO.technicians_assigned],
    //       },
    //     },
    //   },
    // ]);
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
