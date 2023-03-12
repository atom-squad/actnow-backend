import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModule } from './quiz/quiz.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ScannerModule } from './scanner/scanner.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ActionsModule } from './actions/actions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    QuizModule,
    UserModule,
    AuthModule,
    ScannerModule,
    DashboardModule,
    LeaderboardModule,
    ActionsModule,
  ],
})
export class AppModule {}
