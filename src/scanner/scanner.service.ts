import { Injectable } from '@nestjs/common';
import { execRekognitionReq } from 'src/apisClients/rekognition.client';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class ScannerService {
  constructor(private readonly httpService: HttpService) {}

  async getLabels(picture: Express.Multer.File): Promise<any> {
    let labels = await execRekognitionReq(picture);
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
    /*let tries = 0;
    const regions = ['CA', 'US'];*/
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${process.env.CLIMATIQ_URL}?query=${label}&region=CA`)
        .pipe(
          catchError((error: AxiosError) => {
            console.log('Error', error);
            throw 'Error calling Climatiq';
          }),
        ),
    );
    /*if (data.results != undefined && data.results.length > 0) {
      console.log('Warn: ', `No data found for region ${regions[tries]}`);
      tries++;
    } else {
      break;
    }*/

    if (data.results.length < 1)
      return {
        error: `No matches for ${label}`,
      };
    console.log('factor', data.results);
    let result = {
      label: label,
      name: data.results[0].name,
      category: data.results[0].category,
      factor: data.results[0].factor,
      unit: data.results[0].unit,
      description: data.results[0].description,
    };
    return result;
  }
}
