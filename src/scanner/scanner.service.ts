import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { execRekognitionReq } from 'src/apisClients/rekognition.client';
import { HttpService } from '@nestjs/axios';
import { getEmissionClimatiq } from 'src/apisClients/climatiq.client';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model, Schema } from 'mongoose';
import { EmissionResult } from 'src/interfaces/scanner.interface';

@Injectable()
export class ScannerService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getLabels(
    picture: Express.Multer.File,
    userEmail: string,
  ): Promise<any> {
    const labels = await execRekognitionReq(picture);
    let result = undefined;
    if (labels != undefined && labels.length > 0) {
      let pos = 0;
      while (result == undefined || pos < labels.length) {
        console.log('Analyzing ', labels[pos].Label);
        result = await this.getEmission(labels[pos].Label, userEmail);
        if (result.error == undefined) break;
        pos++;
      }
    } else {
      throw new HttpException(
        'Sorry, we could not recognize your image',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return result;
  }

  async getEmission(label: string, userEmail: string): Promise<EmissionResult> {
    let tries = 0;
    const regions = ['CA', 'GLOBAL', 'US'];
    let result: EmissionResult = undefined;

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
        console.log('Warn: ', `Data found for region ${regions[tries]}`);
        await this.saveTxInDB(result, userEmail);
        break;
      }
    }

    if (result.error) {
      throw new HttpException(result, HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async saveTxInDB(result: any, userEmail: string) {
    const filter = { email: userEmail };
    const update = {
      $addToSet: {
        scansHistory: [
          {
            scanValue: `${result.factor} ${result.unit}`,
            scanObject: result.label,
            category: result.category,
            txDate: new Date().toLocaleDateString('en-CA', {
              timeZone: 'America/Vancouver',
            }),
          },
        ],
      },
    };
    await this.userModel.findOneAndUpdate(filter, update);
  }

  async getUserScansHistory(userId: Schema.Types.ObjectId): Promise<any[]> {
    const user = await this.userModel.findById({ _id: userId });

    return user.scansHistory;
  }
}
