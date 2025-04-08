import express from 'express';
import cookieParser from 'cookie-parser';
import swagger from 'swagger-ui-express';
import fs from 'fs';
import dotenv from 'dotenv';

import { ApplicationError } from './src/error-handler/applicationError.js';
import jwtAuth from './src/middlewares/jwtAuth.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';

import userRouter from './src/routes/user.route.js';
import postRouter from './src/routes/post.route.js';
import commentRouter from './src/routes/comment.route.js';
import likeRouter from './src/routes/like.route.js';

const apiDocs = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

app.use('/api', userRouter);

app.use(loggerMiddleware);

app.use('/api/posts', jwtAuth, postRouter);
app.use('/api/comments', jwtAuth, commentRouter);
app.use('/api/likes', jwtAuth, likeRouter);


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
