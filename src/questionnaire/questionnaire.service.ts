import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionnaireService {
  getHello(): string {
    return 'Hello World!';
  }
}
