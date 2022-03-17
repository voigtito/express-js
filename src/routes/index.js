const { Router } = require('express');

const mockApiRoute = require('../modules/module-name/routes/mock-api-route');

const routes = Router();

routes.use('/teste', mockApiRoute);

module.exports = routes;