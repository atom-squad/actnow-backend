import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { QuizQuestion } from 'src/schemas/quizQuestion.schema';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('questions')
  async getRandomQuestions(): Promise<QuizQuestion[]> {
    return this.quizService.getRandomQuestions();
  }
}
