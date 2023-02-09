import { Injectable } from '@nestjs/common';
import { execRekognitionReq } from 'src/apisClients/rekognitionClient';

@Injectable()
export class ScannerService {
  async getEmission(picture: Express.Multer.File): Promise<any> {
    let result = await execRekognitionReq(picture);
    return result;
  }
}
