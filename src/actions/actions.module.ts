import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Action, ActionSchema } from 'src/schemas/action.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Action.name,
      schema: ActionSchema
    }]),
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }])
  ],
  controllers: [ActionsController],
  providers: [ActionsService]
})
export class ActionsModule {}
