import { Options } from 'swagger-jsdoc';
import swaggerDefinition from './swaggerDefinition.js';

const swaggerOptions: Options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],
};

export default swaggerOptions;
