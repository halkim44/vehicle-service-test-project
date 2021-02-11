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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVehicleTypeDTO } from './create-vehicle-type.dto';
import { UpdateVehicleTypeDTO } from './update-vehicle-type.dto';
import { VehicleTypesService } from './vehicle-types.service';

@Controller('vehicle-type')
export class VehicleTypesController {
  constructor(private vehicleTypeService: VehicleTypesService) {}

  // Fetch a particular vehicleType using ID
  @UseGuards(JwtAuthGuard)
  @Get('detail/:vehicleTypeID')
  async getVehicleType(
    @Param('vehicleTypeID') vehicleTypeID: string,
  ): Promise<any> {
    const vehicleType = await this.vehicleTypeService.get(vehicleTypeID);
    if (!vehicleType)
      throw new NotFoundException('VehicleType does not exist!');
    return { vehicleType };
  }
  // Update a vehicleType's details
  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateVehicleType(
    @Query('vehicleTypeID') vehicleTypeID: string,
    @Body() updateVehicleTypeDTO: UpdateVehicleTypeDTO,
  ) {
    const vehicleType = await this.vehicleTypeService.update(
      vehicleTypeID,
      updateVehicleTypeDTO,
    );
    if (!vehicleType)
      throw new NotFoundException('VehicleType does not exist!');
    return {
      message: 'VehicleType has been successfully updated',
      vehicleType,
    };
  }

  // Delete a vehicleType
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deleteVehicleType(@Query('vehicleTypeID') vehicleTypeID: string) {
    const vehicleType = await this.vehicleTypeService.delete(vehicleTypeID);
    if (!vehicleType) throw new NotFoundException('VehicleType does not exist');
    return {
      message: 'VehicleType has been deleted',
      deleted: true,
    };
  }

  // add a vehicleType
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async addVehicleType(@Body() createVehicleTypeDTO: CreateVehicleTypeDTO) {
    const vehicleType = await this.vehicleTypeService.create(
      createVehicleTypeDTO,
    );
    return {
      message: 'VehicleType has been created successfully',
      vehicleType,
    };
  }

  // Get VehicleTypeList
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getVehicleTypeList() {
    const vehicleTypes = await this.vehicleTypeService.getAll();
    return vehicleTypes;
  }
}
