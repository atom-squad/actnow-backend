import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuizQuestion,
  QuizQuestionSchema,
} from 'src/schemas/quizQuestion.schema';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizQuestion.name, schema: QuizQuestionSchema },
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [], //if we want to export ex a provider for another module to use it
})
export class QuizModule {}
