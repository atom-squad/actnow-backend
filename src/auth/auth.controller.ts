import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { SigninDto, SignupDto } from 'src/dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() signinDto: SigninDto) {
    return this.authService.login(signinDto);
  }

  @Get('/org-departments')
  getOrgDepartments(): Promise<any> {
    return this.authService.getOrgDepartments();
  }
}
