import express from 'express';

const app = express();
const port = 3000;

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define another route
app.get('/about', (req, res) => {
  res.send('This is the about page');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
