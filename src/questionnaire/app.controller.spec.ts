import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';

describe('QuestionnaireController', () => {
  let questionnaireController: QuestionnaireController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QuestionnaireController],
      providers: [QuestionnaireService],
    }).compile();

    questionnaireController = app.get<QuestionnaireController>(QuestionnaireController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(questionnaireController.getHello()).toBe('Hello World!');
    });
  });
});
