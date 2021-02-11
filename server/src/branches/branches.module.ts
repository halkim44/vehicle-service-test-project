import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchSchema } from './branch.schema';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  imports: [
    BookingsModule,
    MongooseModule.forFeature([{ name: 'Branch', schema: BranchSchema }]),
  ],
  providers: [BranchesService],
  controllers: [BranchesController],
})
export class BranchesModule {}
