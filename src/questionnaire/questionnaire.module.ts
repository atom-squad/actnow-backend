import { Module } from '@nestjs/common';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';

@Module({
  imports: [],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService],
  exports: [], //if we want to export ex a provider for another module to use it
})
export class QuestionnaireModule {}
