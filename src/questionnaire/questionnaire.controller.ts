import { Controller, Get } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get()
  getHello(): string {
    return this.questionnaireService.getHello();
  }

  @Get('questions')
    getQuestions(): string {
      return 'Here go the questions';
    }
}
