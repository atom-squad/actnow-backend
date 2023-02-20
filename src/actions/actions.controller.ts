import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostActionDto } from 'src/dtos/actions.dto';
import { ActionsService } from './actions.service';

@Controller('actions')
export class ActionsController {

    constructor(private readonly actionsService: ActionsService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get(':type')
    getActionsByType(@Param('type') actionType: string){
        return this.actionsService.getActionsByType(actionType)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('newaction')
    postAction(@Body() postActionDto: PostActionDto,
               @Request() req){
        return this.actionsService.postAction(postActionDto, req.user.email)
    }
}
