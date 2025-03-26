import express from 'express';
import cookieParser from "cookie-parser";

import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import { jwtAuth } from './src/middlewares/jwtAuth.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';

const apiDocs = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));

const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleware);

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define another route
app.get('/about', (req, res) => {
  res.send('This is the about page');
});

// Error handler middleware
app.use((err, req, res, next)=>{
  console.log(err);
  if (err instanceof ApplicationError){
    res.status(err.code).send(err.message);
  }

  // server errors.
  res
  .status(500)
  .send(
    'Something went wrong, please try later'
    );
});

// 4. Middleware to handle 404 requests.
app.use((req, res)=>{
  res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs")
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
