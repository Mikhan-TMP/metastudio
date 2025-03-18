import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(name: string, email: string): Promise<User> {
    return this.userModel.create({ name, email });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
