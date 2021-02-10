import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // Get a single user
  async getUser(userID: string): Promise<User> {
    const user = await this.userModel
      .findById(userID)
      .select('-password')
      .exec();
    return user;
  }
  // find User using username
  async findUser(username: string): Promise<User> {
    const user = await this.userModel.findOne({ name: username }).exec();
    return user;
  }
  // post a single user
  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await this.userModel.create(createUserDTO);
    return newUser;
  }
  // Edit user details
  async updateUser(
    userID: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userID, updateUserDTO, { new: true })
      .exec();
    return updatedUser;
  }
  // Delete a user
  async deleteUser(userID): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(userID).exec();

    if (!deletedUser) return null;
    return deletedUser;
  }
}
