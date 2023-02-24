import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserSectionData } from 'src/interfaces/dashboard.interface';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  getUserSection(@Request() req): Promise<UserSectionData> {
    return this.dashboardService.getUserSection(req.user);
  }
}
