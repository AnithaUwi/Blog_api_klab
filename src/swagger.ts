import swaggerAutogen from 'swagger-autogen';
import { Express } from 'express';

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'LexBridge API',
    description: 'LexBridge is a seamless platform that connects clients with verified legal experts, offering secure communication, easy appointment booking, transparent pricing, and comprehensive legal services all in one place.'
  },
  host: `localhost:${process.env.PORT || 8080}`,
  basePath: '/',
  schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['src/routes/index.ts'];

export const setupSwagger = (app: Express) => {
  const swaggerUi = require('swagger-ui-express');
  const swaggerDocument = require(outputFile);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log('Swagger documentation available at /api-docs');
};console.log('Swagger documentation available at /api-docs');
swaggerAutogen()(outputFile, endpointsFiles);
;