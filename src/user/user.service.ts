import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from 'src/dtos/auth.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model <UserDocument> ) {}

    async getUserByEmail(email: string){
        return this.userModel.findOne({
            email
        })
        .exec()
    }

    async signup(signupDto : SignupDto) {
        console.log('hello')

        const createUser = new this.userModel(signupDto);

        console.log(createUser)
    }

}
