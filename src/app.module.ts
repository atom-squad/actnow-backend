import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ScannerModule } from './scanner/scanner.module';
import { ActionsModule } from './actions/actions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    QuestionnaireModule,
    UserModule,
    AuthModule,
    ScannerModule,
    ActionsModule,
  ],
})
export class AppModule {}
