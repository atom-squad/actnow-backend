import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Organization,
  OrganizationDocument,
} from 'src/schemas/organization.schema';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
  ) {}

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

  async listUsersPerOrganization(
    organizationId: Types.ObjectId,
  ): Promise<any[]> {
    const organization = await this.organizationModel.findOne({
      _id: organizationId,
    });

    let orgUsers = [];
    for (const department of organization.departments) {
      const dptUsers = await this.getUsersPerDepartment(department.id);
      orgUsers = orgUsers.concat(dptUsers);
    }

    return orgUsers;
  }

  async getUsersPerDepartment(departmentId: number): Promise<any[]> {
    const filter = {
      department: departmentId,
    };
    const dptmUsersData = [];
    const dptmUsers = await this.userModel.find(filter);
    dptmUsers.forEach((user) => {
      dptmUsersData.push({
        userName: user.name,
        points: user.pointsHistory,
        actions: user.actionsDone ? user.actionsDone.length : 0,
      });
    });
    return dptmUsersData;
  }
}
