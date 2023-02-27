import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { UserSectionData } from 'src/interfaces/dashboard.interface';
import {
  Organization,
  OrganizationDocument,
} from 'src/schemas/organization.schema';
import { RankedUser } from 'src/interfaces/ranking.interface';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
    private userService: UserService,
  ) {}

  currentDate = new Date().toLocaleDateString('en-CA', {
    timeZone: 'America/Vancouver',
  });
  key = this.currentDate.substring(0, 7);

  getCurrentMonthPoints(pointsHistory: any): number {
    if (pointsHistory instanceof Map) {
      return pointsHistory.get(this.key);
    }
    return pointsHistory[this.key];
  }

  async getPersonalRankingList(): Promise<RankedUser[]> {
    const users = await this.userService.listUsers();
    const rankedUsers: RankedUser[] = [];
    users.forEach((user) => {
      const currentMonthPoints = this.getCurrentMonthPoints(user.pointsHistory);
      const rankedUser: RankedUser = {
        id: user._id,
        name: user.name,
        department: user.department,
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
}
