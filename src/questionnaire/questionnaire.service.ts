import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class QuestionnaireService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  
  getHello(): string {
    return 'Hello World!';
  }

  async findUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
