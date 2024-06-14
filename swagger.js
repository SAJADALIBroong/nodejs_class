// // swagger.js
// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// const swaggerDefinition = {
//   openapi: '3.0.0',
//   info: {
//     title: 'Node.js API',
//     version: '1.0.0',
//     description: 'API documentation for Node.js application',
//   },
//   servers: [
//     {
//       url: 'http://localhost:4000',
//       description: 'Local server',
//     },
//   ],
// };

// const options = {
//   swaggerDefinition,
//   apis: ['./routes/*.js', './controllers/*.js'], // Path to the API docs
// };

// const swaggerSpec = swaggerJSDoc(options);

// module.exports = (app) => {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// };
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Node.js API',
    version: '1.0.0',
    description: 'API documentation for Node.js application',
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Local server',
    },
  ],
  securityDefinitions: { 
    Bearer: { // Name your security scheme (e.g., Bearer for JWT)
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      scheme: 'bearer',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './controllers/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
