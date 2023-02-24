import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaderboardService } from 'src/leaderboard/leaderboard.service';
import {
  Organization,
  OrganizationSchema,
} from 'src/schemas/organization.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, UserService, LeaderboardService],
  exports: [],
})
export class DashboardModule {}
