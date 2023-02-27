import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

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
}
