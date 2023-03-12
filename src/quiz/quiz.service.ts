import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  QuizQuestion,
  QuizQuestionDocument,
} from 'src/schemas/quizQuestion.schema';
import { QUIZ_NUMBER_OF_QUESTIONS } from 'src/utils/constants';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(QuizQuestion.name)
    private quizQuestionModel: Model<QuizQuestionDocument>,
  ) {}

  async getRandomQuestions(): Promise<QuizQuestion[]> {
    const questions = await this.quizQuestionModel.aggregate([
      {
        $sample: { size: QUIZ_NUMBER_OF_QUESTIONS },
      },
    ]);
    return questions;
  }
}
