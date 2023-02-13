import { Module } from '@nestjs/common';
import { ScannerController } from './scanner.controller';
import { ScannerService } from './scanner.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${configService.get('CLIMATIQ_API_KEY')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ScannerController],
  providers: [ScannerService],
  exports: [],
})
export class ScannerModule {}
