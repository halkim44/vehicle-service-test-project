import {
  Controller,
  Get,
  Body,
  Query,
  NotFoundException,
  Delete,
  Param,
  UseGuards,
  Post,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateVehicleDTO } from './dto/create-vehicle.dto';
import { UpdateVehicleDTO } from './dto/update-vehicle.dto';
import { VehiclesService } from './vehicles.service';

@Controller('vehicle')
export class VehiclesController {
  constructor(private vehicleService: VehiclesService) {}

  // Fetch a particular vehicle using ID
  @UseGuards(JwtAuthGuard)
  @Get('/:vehicleID')
  async getVehicle(@Param('vehicleID') vehicleID: string): Promise<any> {
    const vehicle = await this.vehicleService.getVehicle(vehicleID);
    if (!vehicle) throw new NotFoundException('Vehicle does not exist!');
    return { vehicle };
  }
  // Update a vehicle's details
  @UseGuards(JwtAuthGuard)
  @Put('/update')
  async updateVehicle(
    @Query('vehicleID') vehicleID: string,
    @Body() updateVehicleDTO: UpdateVehicleDTO,
  ) {
    const vehicle = await this.vehicleService.updateVehicle(
      vehicleID,
      updateVehicleDTO,
    );
    if (!vehicle) throw new NotFoundException('Vehicle does not exist!');
    return {
      message: 'Vehicle has been successfully updated',
      vehicle,
    };
  }

  // Delete a vehicle
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deleteVehicle(@Query('vehicleID') vehicleID: string) {
    const vehicle = await this.vehicleService.deleteVehicle(vehicleID);
    if (!vehicle) throw new NotFoundException('Vehicle does not exist');
    return {
      message: 'Vehicle has been deleted',
      deleted: true,
    };
  }
  // add a vehicle
  @Post('/create')
  async addVehicle(@Body() createVehicleDTO: CreateVehicleDTO) {
    const vehicle = await this.vehicleService.create(createVehicleDTO);
    return {
      message: 'Vehicle has been created successfully',
      vehicle,
    };
  }
}
