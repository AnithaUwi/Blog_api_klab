import 'reflect-metadata';
import express, { Express } from 'express';
import * as dotenv from 'dotenv';
// import cors from 'cors';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json';

import { initializeDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';
const cors = require('cors');

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '8080');

app.use(cors());




//Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

// Mount API routes under /api/v1 prefix
app.use('/', routes);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Error handling middleware
app.use(errorHandler);

// Start the server
const startServer = async () => {
    try {
      // Initialize db connection
      await initializeDatabase();
      
      // Start Express server
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
      });
    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  };
  
  // Run the server
  startServer();