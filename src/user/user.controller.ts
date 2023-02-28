import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Types } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':email')
  getEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
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
