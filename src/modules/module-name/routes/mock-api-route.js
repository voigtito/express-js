const { Router } = require('express');
const AppError = require('../../../errors/AppError');
const { MockApiService } = require('../services/mock-api-service');
const { getDataFromAPi } = require('../services/mock-api-service');

const githubRouter = Router();

githubRouter.get('/all', async (request, response) => {

  const { page, limit } = request.query;
  
  let data = await getDataFromAPi({page, limit});
  
  if (data instanceof AppError) {
    return response.json(data);
  }
  console.log(data)
  return response.json(data);
});

module.exports = githubRouter;
