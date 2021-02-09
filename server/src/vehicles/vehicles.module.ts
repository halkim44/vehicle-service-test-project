import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleSchema } from './vehicle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }]),
  ],
  providers: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
