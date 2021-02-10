import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchSchema } from './branch.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Branch', schema: BranchSchema }]),
  ],
  providers: [BranchesService],
  controllers: [BranchesController],
})
export class BranchesModule {}
