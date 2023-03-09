import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProgressData,
  UserSectionData,
} from 'src/interfaces/dashboard.interface';
import {
  Organization,
  OrganizationDocument,
} from 'src/schemas/organization.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { LeaderboardService } from 'src/leaderboard/leaderboard.service';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
    private userService: UserService,
    private leaderboardService: LeaderboardService,
  ) {}

  currentDate = new Date().toLocaleDateString('en-CA', {
    timeZone: 'America/Vancouver',
  });
  key = this.currentDate.substring(0, 7);
  // eslint-disable-next-line prettier/prettier
  MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  async getUserSection(user: any): Promise<UserSectionData> {
    const organization = await this.getDepartmentData(user.department);
    const updatedUser = await this.userModel.findById({ _id: user.userId });
    const userSectionData: UserSectionData = {
      name: user.name,
      department: organization.departments[0].name,
      organization: organization.name,
      monthPoints: this.getMonthPoints(updatedUser.pointsHistory, this.key),
      rankingPos: await this.leaderboardService.getUserPosition(
        await this.leaderboardService.getPersonalRankingList(),
        user.userId,
      ),
    };
    return userSectionData;
  }

  async getDepartmentData(departmentId: number): Promise<Organization> {
    const filter = {
      'departments.id': departmentId,
    };
    const organization = await this.organizationModel.findOne(filter);
    organization.departments = organization.departments.filter(
      (department) => department.id === departmentId,
    );
    return organization;
  }

  getMonthPoints(pointsHistory: any, key: string): number {
    if (pointsHistory instanceof Map) {
      return pointsHistory.get(key);
    }
    return pointsHistory[key];
  }

  async getProgressData(user: any): Promise<ProgressData> {
    const monthYear: Date = new Date();
    const departmentUsers = await this.userService.getUsersPerDepartment(
      user.department,
    );
    const updatedUser = await this.userModel.findById({ _id: user.userId });
    let personalMonthPoints = this.getMonthPoints(
      updatedUser.pointsHistory,
      this.key,
    );
    const progressData: ProgressData = {
      personalProgress: [
        {
          month: this.MONTHS[monthYear.getMonth()],
          points: personalMonthPoints ? personalMonthPoints : 0,
        },
      ],
      departmentProgress: [
        {
          month: this.MONTHS[monthYear.getMonth()],
          points: this.calculateDptmPoints(departmentUsers, this.key),
        },
      ],
    };

    //filling personal and department progress
    for (let monthAgo = 0; monthAgo < 11; monthAgo++) {
      monthYear.setMonth(monthYear.getMonth() - 1);
      const key = monthYear
        .toLocaleDateString('en-CA', {
          timeZone: 'America/Vancouver',
        })
        .substring(0, 7);

      personalMonthPoints = this.getMonthPoints(updatedUser.pointsHistory, key);

      progressData.personalProgress.push({
        month: this.MONTHS[monthYear.getMonth()],
        points: personalMonthPoints ? personalMonthPoints : 0,
      });

      progressData.departmentProgress.push({
        month: this.MONTHS[monthYear.getMonth()],
        points: this.calculateDptmPoints(departmentUsers, key),
      });
    }

    return progressData;
  }

  calculateDptmPoints(users: any[], key: string): number {
    let points = 0;
    for (const user of users) {
      const userPoints = this.getMonthPoints(user.points, key);
      if (userPoints) points += userPoints;
    }

    return points;
  }

  async getOrganizationActions(departmentId: number): Promise<any> {
    const filter = {
      'departments.id': departmentId,
    };
    const organization = await this.organizationModel.findOne(filter);
    const users = await this.userService.listUsersPerOrganization(
      organization._id,
    );

    return {
      orgActions: this.calculateOrgActions(users),
    };
  }

  calculateOrgActions(users: any[]): number {
    let orgActions = 0;
    for (const user of users) {
      orgActions += user.actions;
    }

    return orgActions;
  }
}
