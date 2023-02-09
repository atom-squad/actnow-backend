import { Injectable } from '@nestjs/common';
import { execRekognitionReq } from 'src/apisClients/rekognitionClient';

@Injectable()
export class ScannerService {
  async getEmission(): Promise<any> {
    let result = await execRekognitionReq();
    return result;
  }
}
