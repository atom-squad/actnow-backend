import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from 'src/dtos/auth.dto';
import { UserService } from './user.service';

@Controller('user')

export class UserController {
    
    constructor(private readonly userService: UserService){}

    @Post('/signup')
    signup(
        @Body() signupDto: SignupDto
    ){
        return this.userService.signup(signupDto)
    }
}
