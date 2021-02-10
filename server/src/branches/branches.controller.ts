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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BranchesService } from './branches.service';
import { CreateBranchDTO } from './create-branch.dto';
import { UpdateBranchDTO } from './update-branch.dto';
@Controller('branch')
export class BranchesController {
  constructor(private branchService: BranchesService) {}

  // Fetch a particular branch using ID
  @UseGuards(JwtAuthGuard)
  @Get(':branchID')
  async getBranch(@Param('branchID') branchID: string): Promise<any> {
    const branch = await this.branchService.get(branchID);
    if (!branch) throw new NotFoundException('Branch does not exist!');
    return { branch };
  }
  // Update a branch's details
  @UseGuards(JwtAuthGuard)
  @Put('')
  async updateBranch(
    @Query('branchID') branchID: string,
    @Body() updateBranchDTO: UpdateBranchDTO,
  ) {
    const branch = await this.branchService.update(branchID, updateBranchDTO);
    if (!branch) throw new NotFoundException('Branch does not exist!');
    return {
      message: 'Branch has been successfully updated',
      branch,
    };
  }

  // Delete a branch
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deleteBranch(@Query('branchID') branchID: string) {
    const branch = await this.branchService.delete(branchID);
    if (!branch) throw new NotFoundException('Branch does not exist');
    return {
      message: 'Branch has been deleted',
      deleted: true,
    };
  }

  // add a branch
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async addBranch(@Body() createBranchDTO: CreateBranchDTO) {
    const branch = await this.branchService.create(createBranchDTO);
    return {
      message: 'Branch has been created successfully',
      branch,
    };
  }
}
