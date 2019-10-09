const express = require('express');
const routes = express.Router();

const LendsController = require('./controllers/LendController');
const ContactController = require('./controllers/ContactController');


routes.get('/lends', LendsController.index);
routes.get('/lends/:id', LendsController.show); 
routes.post('/lends', LendsController.things);
routes.put('/lends/:id', LendsController.update);
routes.delete('/lends/:id', LendsController.destroy);

routes.get('/contacts', ContactController.index);
routes.get('/contacts/:id', ContactController.show); 
routes.post('/contacts', ContactController.things);
routes.put('/contacts/:id', ContactController.update);
routes.delete('/contacts/:id', ContactController.destroy);

module.exports = routes;