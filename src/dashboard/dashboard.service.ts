import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSectionData } from 'src/interfaces/dashboard.interface';
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

  async getUserSection(user: any): Promise<UserSectionData> {
    const organization = await this.getDepartmentData(user.department);
    const userSectionData: UserSectionData = {
      name: user.name,
      department: organization.departments[0].name,
      organization: organization.name,
      monthPoints: this.getCurrentMonthPoints(user.pointsHistory),
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

  getCurrentMonthPoints(pointsHistory: any): number {
    if (pointsHistory instanceof Map) {
      return pointsHistory.get(this.key);
    }
    return pointsHistory[this.key];
  }
}
