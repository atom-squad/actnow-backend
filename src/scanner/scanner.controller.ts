import {
  Controller,
  FileTypeValidator,
  Get,
  Post,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Request,
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
  @Post('emission')
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
    @Request() req,
  ): Promise<any> {
    return this.scannerService.getLabels(picture, req.user.email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('factor/:label')
  getFactor(@Param('label') label: string, @Request() req): Promise<any> {
    return this.scannerService.getEmission(label, req.user.email);
  }
}
