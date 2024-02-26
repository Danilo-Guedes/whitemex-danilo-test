import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerOptions.js';

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
