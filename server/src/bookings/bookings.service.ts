import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking } from './booking.interface';
import { CreateBookingDTO } from './create-booking.dto';
import { UpdateBookingDTO } from './update-booking.dto';
import { VehiclesService } from 'src/vehicles/vehicles.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel('Booking')
    private readonly bookingModel: Model<Booking>,
    private vehicleService: VehiclesService,
  ) {}
  // get a single Booking
  async get(id: string): Promise<Booking> {
    const result = await this.bookingModel.findById(id).exec();
    return result;
  }

  // create a single Booking
  async create(createBookingDTO: CreateBookingDTO): Promise<Booking> {
    const vehicle = await this.vehicleService.getVehicle(
      createBookingDTO.vehicle,
    );
    if (!vehicle) throw new NotFoundException('Vehicle does not exist!');

    // check if creator is not owner
    if (vehicle.owner !== createBookingDTO.made_by) {
      // check if creator is not one of alt driver
      if (!vehicle.alternate_drivers.includes(createBookingDTO.made_by)) {
        throw new ForbiddenException(
          'User is not an owner or alternate driver of the vehicle.',
        );
      }
    }
    // check if user did not create booking on current day
    const today = new Date();
    if (
      today.getFullYear === createBookingDTO.due_date.getFullYear &&
      today.getMonth === createBookingDTO.due_date.getMonth &&
      today.getDay === createBookingDTO.due_date.getDay
    ) {
      throw new ForbiddenException('cannot book on current day');
    }

    // check if technicians had been booked
    const technicianBooked = await this.bookingModel.find({
      due_date: createBookingDTO.due_date,
      branch: createBookingDTO.branch,
      technicians_assigned: { $in: createBookingDTO.technicians_assigned },
    });
    if (!technicianBooked) {
      throw new ConflictException(
        'One of the technician specified is already booked.',
      );
    }
    // check if vehicle already booked on that date
    const vehicleBooked = await this.bookingModel.find({
      due_date: createBookingDTO.due_date,
      vehicle: createBookingDTO.vehicle,
    });
    if (!vehicleBooked) {
      throw new ConflictException(
        'Vehicle is already booked on the date specified.',
      );
    }
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

  async getTechniciansBookedSlots(id: string): Promise<Booking[]> {
    const BookedSlots = await this.bookingModel.aggregate([
      {
        $match: {
          due_date: {
            $gt: {
              $date: Date.now(),
            },
          },
          technicians_assigned: {
            $in: [id],
          },
        },
      },
    ]);

    return BookedSlots;
  }

  async getHistoryByUserId(id: string): Promise<Booking[]> {
    const bookedHistory = await this.bookingModel.aggregate([
      {
        $match: {
          due_date: {
            $lt: {
              $date: Date.now(),
            },
          },
          made_by: Types.ObjectId(id),
        },
      },
    ]);

    return bookedHistory;
  }
}
