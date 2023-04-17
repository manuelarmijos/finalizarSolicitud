// Controllers
const solicitudController = require('../controllers/solicitud');

module.exports = (app) => {

	app.get('/finalizar', (req, res) => res.status(200).send({
		message: '¡Esta es una buena señal! Nuestro Node.js está funcionando correctamente solicitar y asignar carrera;)',
	}));

	app.post('/finalizar/solicitud/finalizarCalificar/', solicitudController.finalizar);
	// app.post('/api/usuarios/createsolicitud/solicitud', usuariosController.createSolicitud);
	// app.post('/api/usuarios/list/one', usuariosController.find);


};