import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Action, ActionDocument } from 'src/schemas/action.schema';
import { threadId } from 'worker_threads';

@Injectable()
export class ActionsService {

    constructor(@InjectModel(Action.name) private actionModel: Model<ActionDocument>) {}

    async getActionById(_id: string){
        return this.actionModel.findById({
            _id
        }).exec()
    }

    async getActionsByType(actionType: string){
        const docs = await this.actionModel.find({ actionType: actionType})

        return docs
    }
}
