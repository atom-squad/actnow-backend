import * as AWS from 'aws-sdk';
import * as path from 'path';
import * as fs from 'fs';

const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

AWS.config.update({
  region: 'us-west-2',
});

const imageName = 'image.jpeg';
const imagePath = path.resolve('src/apisClients/', imageName);
const image = fs.readFileSync(imagePath);
const buffer = new Buffer(image);

const rekognitionClient = new AWS.Rekognition();
const params = {
  Features: ['GENERAL_LABELS'],
  Image: {
    // eslint-disable-next-line prettier/prettier
    Bytes: buffer
  },
  MaxLabels: 10,
  MinConfidence: 80,
};

export const execRekognitionReq = async () => {
  return new Promise((success, failure) => {
    rekognitionClient.detectLabels(params, function (err, response) {
      if (err) {
        console.log(err, err.stack);
        return failure(err);
      } else {
        console.log('Success', response);
        return success(response.Labels);
      }
    });
  });
};
