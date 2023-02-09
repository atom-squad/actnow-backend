import { Injectable, BadRequestException, ConsoleLogger } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { User, UserDocument } from '../schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto, SigninDto } from 'src/dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private userModel: Model <UserDocument>,
                private jwtService: JwtService ){}

    async getUserByEmail(email: string): Promise<UserDocument | null>{
        return this.userModel.findOne({
            email
        })
        .exec()
    }

    async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }

    async validateUser(email: string, password: string): Promise<any>{
        const user = await this.getUserByEmail(email)
        
        if(user && (await this.comparePassword(password, user.password))){
            return user
        }

        return null
    }

    async signup(signupDto : SignupDto) {

        const createUser = new this.userModel(signupDto);

        const user = await this.getUserByEmail(createUser.email)

        if(user){
            console.log('user already exists')
            throw new BadRequestException()
        } else {
            console.log('new user!')
        }

        createUser.password = await this.hashPassword(createUser.password)

        return createUser.save()
    }

    async login(signinDto : SigninDto) {
        const {email, password} = signinDto
        console.log(signinDto)

        const user = await this.validateUser(email, password)

        console.log('user')

        if(!user) return null;

        const jwt = await this.jwtService.signAsync({ user })

        return { token: jwt }
    }

}
