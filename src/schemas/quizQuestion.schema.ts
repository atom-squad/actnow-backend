import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

export type QuizQuestionDocument = HydratedDocument<QuizQuestion>;

@Schema({ collection: 'quizQuestions' })
export class QuizQuestion {
  @Prop({ auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  description: string;

  @Prop([
    raw({
      value: { type: String },
      correct: { type: Boolean },
      feedback: { type: String },
    }),
  ])
  answerOptions: Record<string, any>[];

  @Prop({ required: true })
  points: number;
}

export const QuizQuestionSchema = SchemaFactory.createForClass(QuizQuestion);
