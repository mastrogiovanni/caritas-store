import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async login(username: string, password: string) {
    return await this.userModel.findOne({
      username,
      password
    }).exec()
  }

  async create(createUserDto: CreateUserDto) {
    return await new this.userModel(createUserDto).save();
  }

  async findAll() {
    return await this.userModel.find({})
  }

  async findOne(id: string) {
    return await this.userModel.findById(id)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }
}
