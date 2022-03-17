const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const AppError = require('./errors/AppError');
const routes = require('./routes');

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err, request, response, _) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

module.exports = app;