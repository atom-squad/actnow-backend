import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Organization,
  OrganizationSchema,
} from 'src/schemas/organization.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],
  controllers: [LeaderboardController],
  providers: [LeaderboardService, UserService],
  exports: [LeaderboardService],
})
export class LeaderboardModule {}
