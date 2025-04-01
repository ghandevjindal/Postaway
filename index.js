import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import swagger from 'swagger-ui-express';
import fs from 'fs';
import dotenv from 'dotenv';

import userRouter from './src/routes/user.route.js';
import postRouter from './src/routes/post.route.js';

import { uploadFile } from './src/middlewares/file-upload.middleware.js';;
import { ApplicationError } from './src/error-handler/applicationError.js';
import jwtAuth from './src/middlewares/jwtAuth.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';

const apiDocs = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleware);

app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
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
  res.status(404).send("API not found. Please check our documentation for more information at localhost:3000/api-docs")
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
