import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostActionDto } from 'src/dtos/actions.dto';
import { Action, ActionDocument } from 'src/schemas/action.schema';
import { User, UserDocument } from 'src/schemas/user.schema';


@Injectable()
export class ActionsService {

    constructor(@InjectModel(Action.name) private actionModel: Model<ActionDocument>, 
                @InjectModel(User.name) private userModel: Model<UserDocument>)  {}


    async getActionById(_id: string){
        return this.actionModel.findById({
            _id
        }).exec()
    }

    async getActionsByType(actionType: string){
        const docs = await this.actionModel.find({ actionType: actionType})

        return docs
    }

    async postAction(postActionDto : PostActionDto, userEmail: string){
        
        const {actionId, txDate} = postActionDto

        const filter = {email: userEmail}

        const update = {
            $addToSet: {
                actionsDone: [
                    {
                        actionId: actionId,
                        txDate: new Date().toLocaleDateString('en-CA', {
                            timeZone: 'America/Vancouver',
                        }),
                    },
                ],
            },
        };
        
        console.log('testing')

        await this.userModel.findOneAndUpdate(filter,update)
    }

    async getUserActionsById(_id: string): Promise<any[]>{

        const user = await this.userModel.findById({
            _id
        }).exec()

        const userActions = user.actionsDone

        console.log(userActions)

        return userActions

    }
}
