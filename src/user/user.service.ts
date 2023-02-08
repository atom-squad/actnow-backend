import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from 'src/dtos/auth.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model <UserDocument>,
                private readonly authService: AuthService ) {}

    async getUserByEmail(email: string){
        return this.userModel.findOne({
            email
        })
        .exec()
    }

    async signup(signupDto : SignupDto) {
        console.log('hello')

        const createUser = new this.userModel(signupDto);

        const user = await this.getUserByEmail(createUser.email)

        if(user){
            console.log('user already exists')
            throw new BadRequestException()
        } else {
            console.log('new user!')
        }

        createUser.password = await this.authService.hashPassword(createUser.password)

        return createUser.save()
    }

}
