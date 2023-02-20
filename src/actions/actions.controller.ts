import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ActionsService } from './actions.service';

@Controller('actions')
export class ActionsController {

    constructor(private readonly actionsService: ActionsService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get(':type')
    getActionsByType(@Param('type') actionType: string){
        return this.actionsService.getActionsByType(actionType)
    }
}
