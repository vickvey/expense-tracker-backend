import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Expense Tracker API',
      version: '1.0.0',
      description: 'API documentation for Expense Tracker app',
    },
    servers: [
      {
        url: 'http://localhost:5500',
        description: 'Development API server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/schemas/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
