const Sequelize = require('sequelize');
const solicitud = require('../models').solicitud;
var jwt = require('jsonwebtoken');

module.exports = {

    /**
     * Create a new user validate before if not exists
     *
     * Example:
     *            SELECT * FROM usuarios WHERE username = "lucas"
     *            INSERT INTO usuarios (username, status) VALUES ("lucas", "1");
     *
     * Methoud: POST
     * Headers: -
     * Body: -
     *
     * @param {*} req
     * @param {*} res
     */
    finalizarCliente(req, res) {
        console.log('Dentro del recurso para finalizar y calificar una solicitud')
        console.log(req.body)
        if (!req.body.token || req.body.token === '')
            return res.status(401).send({
                err: -1,
                m: 'No se logró validar la identificación, por favor, inténtelo más tarde'
            })
        if (!req.body.idSolicitud || req.body.idSolicitud === '')
            return res.status(401).send({
                err: -2,
                m: 'Se necesita el id de la solicitud'
            })
        if (!req.body.calificacionCliente || req.body.calificacionCliente === '')
            return res.status(401).send({
                err: -3,
                m: 'Se necesita la calificacion del cliente'
            })
        if (!req.body.comentarioCliente || req.body.comentarioCliente === '')
            return res.status(401).send({
                err: -4,
                m: 'Se necesita el comentario del cliente'
            })
        jwt.verify(req.body.token, process.env.SECRETTOKEN, function (err, decoded) {
            if (err) {
                console.log('Erro al momento de validar el token', err)
                return res.status(401).send({
                    en: -1,
                    m: 'No se logró validar la identificación, por favor, inténtelo más tarde'
                })
            }
            console.log('Datos del token')
            console.log(decoded)
            // return;
            if (decoded) {
                solicitud.findAll({
                    attributes: ['id'],
                    where: {
                        idSolicitud: req.body.idSolicitud
                    },
                    limit: 1
                })
                    .then(solicitudes => {
                        if (solicitudes && solicitudes.length > 0) {
                            if (solicitudes[0].dataValues && solicitudes[0].dataValues.id) {
                                solicitud.update({ calificacionCliente: req.body.calificacionCliente, comentarioCliente: req.body.comentarioCliente }, {
                                    where: {
                                        id: solicitudes[0].dataValues.id
                                    }
                                })
                                    .then(solicitudFinalizar => {
                                        if (solicitudFinalizar.length === 1)
                                            return res.status(200).send({
                                                en: 1,
                                                m: 'Solicitud finalizada y calificada correctamente.'
                                            })
                                        else
                                            return res.status(200).send({
                                                en: -1,
                                                m: 'No se logró calificar la solicitud'
                                            })
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        return res.status(200).send({
                                            en: -1,
                                            m: 'No se logró calificar la solicitud'
                                        })
                                    })
                            }
                        } else {
                            return solicitud
                                .create({
                                    idSolicitud: req.body.idSolicitud,
                                    calificacionCliente: req.body.calificacionCliente,
                                    comentarioCliente: req.body.comentarioCliente
                                })
                                .then(solicitudes => {
                                    console.log('Resultado de la calificacion de la solicitud')
                                    console.log(solicitudes)
                                    console.log(solicitudes.length)
                                    if (solicitudes._options.isNewRecord)
                                        return res.status(200).send({
                                            en: 1,
                                            m: 'Solicitud finalizada y calificada correctamente.'
                                        })
                                    /* return actualizarConductor(req.body.idConductor, function (conductor) {
                                        if (conductor.en === 1)
                                            return res.status(200).send({
                                                en: 1,
                                                m: 'Solicitud finalizada y calificada correctamente.'
                                            })
                                        return res.status(200).send({
                                            en: -1,
                                            m: 'No se logró finalizar y calificar la solicitud, por favor, inténtelo nuevamente'
                                        })
                                    }); */
                                    return res.status(200).send({
                                        en: -1,
                                        m: 'No se logró finalizar y calificar la solicitud, por favor, inténtelo nuevamente'
                                    })
                                })
                                .catch(error => {
                                    console.log(error)
                                    return res.status(200).send({
                                        en: -1,
                                        m: 'No se logró finalizar y calificar la solicitud, por favor, inténtelo nuevamente'
                                    })
                                })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        return res.status(200).send({
                            en: -1,
                            m: 'No se logró finalizar y calificar la solicitud, por favor, inténtelo nuevamente'
                        })
                    })
            } else
                return res.status(200).send({
                    en: -1,
                    m: 'No se logró finalizar y calificar la solicitud, por favor, inténtelo nuevamente'
                })
        });
    },
    finalizarConductor(req, res) {
        console.log('Dentro del recurso para finalizar y calificar una solicitud')
        console.log(req.body)
        if (!req.body.token || req.body.token === '')
            return res.status(401).send({
                err: -1,
                m: 'No se logró validar la identificación, por favor, inténtelo más tarde'
            })
        if (!req.body.idSolicitud || req.body.idSolicitud === '')
            return res.status(401).send({
                err: -2,
                m: 'Se necesita el id de la solicitud'
            })
        if (!req.body.calificacionConductor || req.body.calificacionConductor === '')
            return res.status(401).send({
                err: -3,
                m: 'Se necesita la calificacion del cliente'
            })
        if (!req.body.comentarioConductor || req.body.comentarioConductor === '')
            return res.status(401).send({
                err: -4,
                m: 'Se necesita el coemntario del cliente'
            })
        if (!req.body.precio || req.body.precio === '')
            return res.status(401).send({
                err: -5,
                m: 'Se necesita el precio de la solicitud'
            })
        jwt.verify(req.body.token, process.env.SECRETTOKEN, function (err, decoded) {
            if (err) {
                console.log('Erro al momento de validar el token', err)
                return res.status(401).send({
                    en: -1,
                    m: 'No se logró validar la identificación, por favor, inténtelo más tarde'
                })
            }
            console.log('Datos del token')
            console.log(decoded)
            // return;
            if (decoded) {
                solicitud.findAll({
                    attributes: ['id'],
                    where: {
                        idSolicitud: req.body.idSolicitud
                    },
                    limit: 1
                })
                    .then(solicitud => {
                        if (solicitud && solicitud.length > 0) {
                            if (solicitud[0].dataValues && solicitud[0].dataValues.id) {
                                solicitud.update({ calificacionConductor: req.body.calificacionConductor, comentarioConductor: req.body.comentarioConductor, precio: req.body.precio }, {
                                    where: {
                                        id: solicitud[0].dataValues.id
                                    }
                                })
                                    .then(solicitudFinalizar => {
                                        if (solicitudFinalizar.length === 1)
                                            return res.status(200).send({
                                                en: 1,
                                                m: 'Solicitud finalizada y calificada correctamente.'
                                            })
                                        else
                                            return res.status(200).send({
                                                en: -1,
                                                m: 'No se logró calificar la solicitud'
                                            })
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        return res.status(200).send({
                                            en: -1,
                                            m: 'No se logró calificar la solicitud'
                                        })
                                    })
                            }
                        } else {
                            return solicitud
                                .create({
                                    idSolicitud: req.body.idSolicitud,
                                    calificacionConductor: req.body.calificacionConductor,
                                    comentarioConductor: req.body.comentarioConductor,
                                    precio: req.body.precio
                                })
                                .then(solicitudes => {
                                    console.log('Resultado de la calificacion de la solicitud')
                                    console.log(solicitudes)
                                    console.log(solicitudes.length)
                                    if (solicitudes._options.isNewRecord)
                                        return res.status(200).send({
                                            en: 1,
                                            m: 'Solicitud finalizada y calificada correctamente.'
                                        })
                                    /* return actualizarConductor(req.body.idConductor, function (conductor) {
                                        if (conductor.en === 1)
                                            return res.status(200).send({
                                                en: 1,
                                                m: 'Solicitud finalizada y calificada correctamente.'
                                            })
                                        return res.status(200).send({
                                            en: -1,
                                            m: 'No se logró finalizar y calificar la solicitud, por favor, inténtelo nuevamente'
                                        })
                                    }); */
                                    return res.status(200).send({
                                        en: -1,
                                        m: 'No se logró finalizar y calificar la solicitud, por favor, inténtelo nuevamente'
                                    })
                                })
                                .catch(error => {
                                    console.log(error)
                                    return res.status(200).send({
                                        en: -1,
                                        m: 'No se logró finalizar y calificar la solicitud, por favor, inténtelo nuevamente'
                                    })
                                })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        var queue = 'enviarEmit';
                        console.log('Enviando la información del conductor')
                        rabbit.sendToQueue(queue, Buffer.from(JSON.stringify({ en: -1, idCliente: d.idCliente })), {
                            persistent: true
                        });
                        console.log('Mensaje enviado');
                    })
            } else
                return res.status(200).send({
                    en: -1,
                    m: 'No se logró finalizar y calificar la solicitud, por favor, inténtelo nuevamente'
                })
        });
    },
}

