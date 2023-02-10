import { Module } from '@nestjs/common';
import { ScannerController } from './scanner.controller';
import { ScannerService } from './scanner.service';

@Module({
  imports: [],
  controllers: [ScannerController],
  providers: [ScannerService],
  exports: [],
})
export class ScannerModule {}
