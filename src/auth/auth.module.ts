import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../schemas/user.schema'
import { MongooseModule } from '@nestjs/mongoose';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [UserModule, 
            JwtModule.registerAsync({
              useFactory: () => ({
                  secret: 'secret',
                  signOptions: { expiresIn: '3600s' },
                 }),
           }),
            MongooseModule.forFeature([{
                  name: User.name,
                  schema: UserSchema
                }])    
           ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy],
  exports: [AuthService, JwtGuard, JwtStrategy, AuthModule],
})
export class AuthModule {}
