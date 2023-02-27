# ActNow - Backend API

## Description

ActNow is an application that helps organizations to generate awareness in their community members about Carbon footprint by offering features to learn about the topic, test themselves and identify possible actions they can take to help the environment in a gamification environment so that different areas/departments can compete to be in the monthly ranking of contributions to the planet.

This project uses NestJS framework with Typescript and Express, and works as an API for our React Native App [actnow-app](https://github.com/atom-squad/actnow-app).

## First steps

- Install the AWS CLI locally and configure it with your AWS SDK credentials to be able to use Amazon Rekognition service [Instructions here](https://docs.aws.amazon.com/rekognition/latest/dg/setup-awscli-sdk.html)
- Be sure the MongoDB is running and functional
- Include the secret .env file in your project root folder to be able to connect to mongodb, AWS and Climatiq API
- This project works with node v16.x and npm 8.x, so check your compatibility

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```