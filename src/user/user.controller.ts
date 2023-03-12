import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Types } from 'mongoose';
import { AddPointsDto } from 'src/dtos/users.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':email')
  getEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('points')
  addUserPoints(
    @Body() addPointsDto: AddPointsDto,
    @Request() req,
  ): Promise<any> {
    return this.userService.addUserPoints(addPointsDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('department/:departmentId')
  getUsersPerDepartment(
    @Param('departmentId') departmentId: number,
  ): Promise<any[]> {
    return this.userService.getUsersPerDepartment(departmentId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('organization/:organizationId')
  getUsersPerOrganization(
    @Param('organizationId') organizationId: string,
  ): Promise<any[]> {
    return this.userService.listUsersPerOrganization(
      new Types.ObjectId(organizationId),
    );
  }
}
