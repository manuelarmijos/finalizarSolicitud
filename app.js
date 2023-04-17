const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'default.env' })

const http = require('http');

// Swagger needs
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json');
const basicAuth = require('express-basic-auth');

// Setting express
const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setting up the welcome message
require('./routes')(app);

/****************
 * SWAGGER
 ****************/
var swaggerUiOptions = {
	explorer: false,
	operationsSorter: 'alpha',
}

// Swagger basic Auth 
app.use('/doc', basicAuth({
	users: {
		'admin': 'admin'
	},
	challenge: true,
}), swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerUiOptions));

// Default message
app.get('/', (req, res) => res.status(200).send({
	message: 'Bienvenid@s, estás en la Web Services de Finalizar y calificar solicitud.',
}));

// Setting port
const port = parseInt(process.env.PORT, 10) || 3003;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;