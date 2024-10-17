/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Estia',
    description: 'Official Estia API',
  },
  host: process.env.PORT,
  basePath: '',
  tags: {},
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {},
  paths: {},
};

const outputFile = './server/common/api.yml';
const endpointsFiles = [path.join(__dirname, 'server/routes.ts')];

// Generate Swagger documentation
try {
  swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation generated successfully!');
  });
} catch (err) {
  console.log(err);
}
