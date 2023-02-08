import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from 'src/dtos/auth.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model <UserDocument>, ) {}

    
}
