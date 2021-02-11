import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch } from './branch.interface';
import { CreateBranchDTO } from './create-branch.dto';
import { UpdateBranchDTO } from './update-branch.dto';
import { BookingsService } from '../bookings/bookings.service';
import { Booking } from 'src/bookings/booking.interface';

@Injectable()
export class BranchesService {
  constructor(
    @InjectModel('Branch') private readonly branchModel: Model<Branch>,
    private bookingsService: BookingsService,
  ) {}

  // get a single Branch
  async get(id: string): Promise<Branch> {
    const result = await this.branchModel
      .findById(id)
      .populate('technicians')
      .exec();
    return result;
  }
  // create a single Branch
  async create(createBranchDTO: CreateBranchDTO): Promise<Branch> {
    const newBranch = await this.branchModel.create(createBranchDTO);
    return newBranch;
  }
  // update a branch
  async update(id: string, updateBranchDTO: UpdateBranchDTO): Promise<any> {
    const result = await this.branchModel
      .findByIdAndUpdate(id, updateBranchDTO, { new: true })
      .exec();
    return result;
  }
  // delete a Branch
  async delete(id: string): Promise<any> {
    const deletedUser = await this.branchModel.findByIdAndRemove(id).exec();
    if (!deletedUser) return null;
    return deletedUser;
  }
  async getBookedList(branchId: string): Promise<Booking[]> {
    const results = this.bookingsService.getBranchBookedSlots(branchId);

    return results;
  }
}
