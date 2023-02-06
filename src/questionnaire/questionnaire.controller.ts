import { Controller, Get } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { QuestionnaireService } from './questionnaire.service';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get()
  getHello(): string {
    return this.questionnaireService.getHello();
  }

  @Get('questions')
  async getQuestions(): Promise<User[]> {
    return this.questionnaireService.findUsers();
  }
}
