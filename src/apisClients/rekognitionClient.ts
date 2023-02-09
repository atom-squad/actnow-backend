import * as AWS from 'aws-sdk';

const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

AWS.config.update({
  region: 'us-west-2',
});

const rekognitionClient = new AWS.Rekognition();
const params = {
  Features: ['GENERAL_LABELS'],
  Image: {
    Bytes: null,
  },
  MaxLabels: 10,
  MinConfidence: 80,
};

export const execRekognitionReq = async (picture: Express.Multer.File) => {
  params.Image.Bytes = picture.buffer;
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
