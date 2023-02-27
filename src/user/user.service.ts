import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserByEmail(email: string) {
    return this.userModel
      .findOne({
        email,
      })
      .exec();
  }

  async listUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUsersPerDepartment(departmentId: number): Promise<any> {
    const filter = {
      department: departmentId,
    };
    const dptmUsersData = [];
    const dptmUsers = await this.userModel.find(filter);
    dptmUsers.forEach((user) => {
      dptmUsersData.push({
        userName: user.name,
        points: user.pointsHistory,
      });
    });
    return dptmUsersData;
  }
}
