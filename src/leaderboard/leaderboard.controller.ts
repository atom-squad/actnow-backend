import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('personal_ranking')
  async getPersonalRanking(@Request() req): Promise<object> {
    const rankedList = await this.leaderboardService.getPersonalRankingList(
      req.user.department,
    );
    const position = await this.leaderboardService.getUserPosition(
      rankedList,
      req.user.userId,
    );
    return {
      userPosition: position,
      usersRanking: rankedList,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('departments_ranking')
  async getDepartmentsRanking(@Request() req): Promise<object> {
    return this.leaderboardService.getDepartmentsRankingList(
      req.user.department,
    );
  }
}
