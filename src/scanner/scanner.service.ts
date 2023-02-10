import { Injectable } from '@nestjs/common';
import { execRekognitionReq } from 'src/apisClients/rekognition.client';

@Injectable()
export class ScannerService {
  async getEmission(picture: Express.Multer.File): Promise<any> {
    let result = await execRekognitionReq(picture);
    //call climatiq
    //save info in db
    return result;
  }
}
