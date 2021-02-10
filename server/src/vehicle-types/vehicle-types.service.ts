import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VehicleType } from './vehicle-type.interface';
import { CreateVehicleTypeDTO } from './create-vehicle-type.dto';
import { UpdateVehicleTypeDTO } from './update-vehicle-type.dto';

@Injectable()
export class VehicleTypesService {
  constructor(
    @InjectModel('VehicleType')
    private readonly vehicleTypeModel: Model<VehicleType>,
  ) {}
  // get a single VehicleType
  async get(id: string): Promise<VehicleType> {
    const result = await this.vehicleTypeModel.findById(id).exec();
    return result;
  }
  // create a single VehicleType
  async create(
    createVehicleTypeDTO: CreateVehicleTypeDTO,
  ): Promise<VehicleType> {
    const newVehicleType = await this.vehicleTypeModel.create(
      createVehicleTypeDTO,
    );
    return newVehicleType;
  }
  // update a vehicleType
  async update(
    id: string,
    updateVehicleTypeDTO: UpdateVehicleTypeDTO,
  ): Promise<any> {
    const result = await this.vehicleTypeModel
      .findByIdAndUpdate(id, updateVehicleTypeDTO, { new: true })
      .exec();
    return result;
  }
  // delete a VehicleType
  async delete(id: string): Promise<any> {
    const deletedUser = await this.vehicleTypeModel
      .findByIdAndRemove(id)
      .exec();
    if (!deletedUser) return null;
    return deletedUser;
  }
}
