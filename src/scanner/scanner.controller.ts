import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ScannerService } from './scanner.service';

@Controller('scanner')
export class ScannerController {
  constructor(private readonly scannerService: ScannerService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('emission')
  @UseInterceptors(FileInterceptor('file'))
  getEmission(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    picture: Express.Multer.File,
  ): Promise<any> {
    return this.scannerService.getLabels(picture);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('factor/:label')
  getFactor(@Param('label') label: string): Promise<any> {
    return this.scannerService.getEmission(label);
  }
}
