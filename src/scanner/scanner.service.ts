import { Injectable } from '@nestjs/common';
import { execRekognitionReq } from 'src/apisClients/rekognition.client';
import { HttpService } from '@nestjs/axios';
import { getEmissionClimatiq } from 'src/apisClients/climatiq.client';

@Injectable()
export class ScannerService {
  constructor(private readonly httpService: HttpService) {}

  async getLabels(picture: Express.Multer.File): Promise<any> {
    const labels = await execRekognitionReq(picture);
    let result = undefined;
    if (labels != undefined && labels.length > 0) {
      let pos = 0;
      while (result == undefined || pos < labels.length) {
        console.log('Analyzing ', labels[pos].Label);
        result = await this.getEmission(labels[pos].Label);
        if (result.error == undefined) break;
        pos++;
      }
      //save info in db
    } else {
      result = {
        Error: 'Sorry, we could not recognize your image',
      };
    }

    return result;
  }

  async getEmission(label: string): Promise<any> {
    let tries = 0;
    const regions = ['CA', 'GLOBAL', 'US'];
    let result = undefined;

    while (tries < regions.length && (result == undefined || result.error)) {
      result = await getEmissionClimatiq(
        label,
        this.httpService,
        regions[tries],
      );
      if (result.error) {
        console.log('Warn: ', `No data found for region ${regions[tries]}`);
        tries++;
      } else {
        break;
      }
    }

    return result;
  }
}
