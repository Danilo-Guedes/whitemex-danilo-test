import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'WhiteMex API',
    version: '1.0.0',
    description: 'Documentation for your Express API at WhiteMex',
  },
  servers: [
    {
      url: 'http://localhost:3000', //mudar para .env
      description: 'WhiteMex API docs',
    },
  ],
};

export default swaggerDefinition;
