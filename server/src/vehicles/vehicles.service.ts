import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVehicleDTO } from '../vehicles/dto/create-vehicle.dto';
import { UpdateVehicleDTO } from './dto/update-vehicle.dto';
import { Vehicle } from './vehicle.interface';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel('Vehicle') private readonly vehicleModel: Model<Vehicle>,
  ) {}

  // Get a single vehicle
  async getVehicle(vehicleID: string): Promise<Vehicle> {
    const vehicle = await this.vehicleModel.findById(vehicleID).exec();
    return vehicle;
  }

  // post a single vehicle
  async create(createVehicleDTO: CreateVehicleDTO): Promise<Vehicle> {
    const newVehicle = await this.vehicleModel.create(createVehicleDTO);
    return newVehicle;
  }

  // Delete a vehicle
  async deleteVehicle(vehicleID): Promise<any> {
    const deletedVehicle = await this.vehicleModel
      .findByIdAndRemove(vehicleID)
      .exec();

    if (!deletedVehicle) return null;
    return deletedVehicle;
  }
  // async updateVehicle(
  //   vehicleID: string,
  //   updateVehicleDTO: CreateVehicleDTO,
  // ): Promise<Vehicle> {
  //   const updatedVehicle = await this.vehicleModel
  //     .findByIdAndUpdate(vehicleID, updateVehicleDTO, { new: true })
  //     .exec();
  //   return updatedVehicle;
  // }
}
