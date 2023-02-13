import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/schemas/user.schema';
import { QuestionnaireService } from './questionnaire.service';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(): string {
    return this.questionnaireService.getHello();
  }

  @Get('questions')
  async getQuestions(): Promise<User[]> {
    return this.questionnaireService.findUsers();
  }
}
