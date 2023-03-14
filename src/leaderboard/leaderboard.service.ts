import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';

import {
  Organization,
  OrganizationDocument,
} from 'src/schemas/organization.schema';
import { RankedUser, RankedDepartment } from 'src/interfaces/ranking.interface';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { MONTHS_MAP_KEY } from 'src/utils/constants';
import { getMonthPoints } from 'src/utils/utils';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
    private userService: UserService,
  ) {}

  async getPersonalRankingList(departmentId): Promise<RankedUser[]> {
    const filter = {
      'departments.id': departmentId,
    };
    const organization = await this.organizationModel.findOne(filter);
    const users = await this.userService.listUsersPerOrganization(
      organization._id,
    );
    const rankedUsers: RankedUser[] = [];
    users.forEach((user) => {
      const currentMonthPoints = getMonthPoints(user.points, MONTHS_MAP_KEY);
      const rankedUser: RankedUser = {
        id: user.id,
        name: user.userName,
        monthPoints: currentMonthPoints ? currentMonthPoints : 0,
      };
      rankedUsers.push(rankedUser);
    });

    //Sort the array of rankedUsers
    rankedUsers.sort((user1, user2) => {
      return user2.monthPoints - user1.monthPoints;
    });

    return rankedUsers;
  }

  async getUserPosition(
    rankedUsers: RankedUser[],
    userId: Schema.Types.ObjectId,
  ) {
    //Find the user's specific position within the ranking
    const position =
      rankedUsers.findIndex((user) => {
        return user.id == userId;
      }) + 1;

    return position;
  }

  async getDepartmentsRankingList(departmentId): Promise<RankedDepartment[]> {
    const filter = {
      'departments.id': departmentId,
    };
    const organization = await this.organizationModel.findOne(filter);
    const departments = organization.departments;
    const rankedDepartments: RankedDepartment[] = [];

    for (const department of departments) {
      const count = await this.getDptmUsersTotalPoints(
        department.id,
        MONTHS_MAP_KEY,
      );
      const dptMonthData = {
        ...count,
        name: department.name,
      };

      rankedDepartments.push(dptMonthData);
    }

    //Sort the array of rankedDepartments
    rankedDepartments.sort((dpt1, dpt2) => {
      return dpt2.totalPoints - dpt1.totalPoints;
    });

    return rankedDepartments;
  }

  async getDptmUsersTotalPoints(
    departmentId: number,
    key: string,
  ): Promise<any> {
    const count = await this.userModel.aggregate([
      {
        $match: {
          department: departmentId,
        },
      },
      {
        $group: {
          _id: '$department',
          totalPoints: {
            $sum: `$pointsHistory.${key}`,
          },
        },
      },
    ]);
    return count[0];
  }

  async getDptmPosition(rankedDpts: RankedDepartment[], departmentId: number) {
    //Find the department's specific position within the ranking
    const position =
      rankedDpts.findIndex((department) => {
        return department._id == departmentId;
      }) + 1;

    return position;
  }
}
