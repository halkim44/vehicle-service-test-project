import { Module } from '@nestjs/common';
import { VehicleTypesController } from './vehicle-types.controller';
import { VehicleTypesService } from './vehicle-types.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleSchema } from 'src/vehicles/vehicle.schema';
import { VehicleTypeSchema } from './vehicle-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'VehicleType', schema: VehicleTypeSchema },
    ]),
  ],
  controllers: [VehicleTypesController],
  providers: [VehicleTypesService],
})
export class VehicleTypesModule {}
