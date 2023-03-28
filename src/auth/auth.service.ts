import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto, SigninDto } from 'src/dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import {
  Organization,
  OrganizationDocument,
} from 'src/schemas/organization.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
    private jwtService: JwtService,
  ) {}

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel
      .findOne({
        email,
      })
      .exec();
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.getUserByEmail(email);

    if (user && (await this.comparePassword(password, user.password))) {
      return user;
    }

    return null;
  }

  async signup(signupDto: SignupDto) {
    const createUser = new this.userModel(signupDto);

    const user = await this.getUserByEmail(createUser.email);

    if (user) {
      console.log('user already exists');
      throw new BadRequestException();
    } else {
      console.log('new user!');
    }

    createUser.password = await this.hashPassword(createUser.password);

    const currentDate = new Date().toLocaleDateString('en-CA', {
      timeZone: 'America/Vancouver',
    });
    const key = currentDate.substring(0, 7);
    createUser.set(`pointsHistory.${key}`, 0);

    return createUser.save();
  }

  async login(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.validateUser(email, password);

    if (!user) throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);

    const jwt = await this.jwtService.signAsync({ user });

    return { token: jwt };
  }

  async getOrgDepartments(): Promise<any> {
    const organizations = await this.organizationModel.find();
    return organizations;
  }
}
