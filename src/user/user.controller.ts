import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { SignupDto } from 'src/dtos/auth.dto';
import { UserService } from './user.service';

@Controller('user')

export class UserController {
    
    constructor(private readonly userService: UserService){}

    // Code for Testing Protected Routes
    // @UseGuards(JwtGuard)
    // @Get(':email')
    // getEmail(@Param('email') email:string){
    //     return this.userService.getUserByEmail(email)
    // }

}
