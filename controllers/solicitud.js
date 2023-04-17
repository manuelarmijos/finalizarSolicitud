const Sequelize = require('sequelize');
const solicitud = require('../models').solicitudes;
const conductor = require('../models').conductor;
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
    finalizar(req, res) {
        console.log('Dentro del recurso para finalizar y calificar una solicitud')
        console.log(req.body)
        if (!req.body.token || req.body.token === '')
            return res.status(401).send({
                err: -1,
                m: 'No se logró validar la identificación, por favor, inténtelo más tarde'
            })
        if (!req.body.costo || req.body.costo === '')
            return res.status(401).send({
                err: -2,
                m: 'Se necesita el costo de la carrera'
            })
        if (!req.body.idSolicitud || req.body.idSolicitud === '')
            return res.status(401).send({
                err: -3,
                m: 'Se necesita el id de la solicitud'
            })
        if (!req.body.idConductor || req.body.idConductor === '')
            return res.status(401).send({
                err: -4,
                m: 'Se necesita el id del conductor'
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
                return solicitud
                    .create({
                        costo: req.body.costo,
                        calificacion: req.body.calificacion,
                    })
                    .then(solicitudes => {
                        console.log('Resultado de la solicitud creada finalizada.')
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
            } else
                return res.status(200).send({
                    en: -1,
                    m: 'No se logró finalizar y calificar la solicitud, por favor, inténtelo nuevamente'
                })
        });
    },
}

const actualizarConductor = (idConductor, callback) => {
    console.log('Cambiando el estado del conductor a libre')
    conductor.update({ estado: 1 }, {
        where: {
            id: idConductor
        }
    })
        .then(conductor => {
            console.log('Resultai de editar al conductor')
            console.log(conductor)
            if (conductor.length === 1)
                return callback({
                    en: 1
                })
            return callback({
                en: -1
            })

            // console.log(conductor[0])
            // console.log(conductor[0].dataValues)
            // console.log(conductor[0].dataValues.id)
            // if (conductor && conductor.length > 0)
            //     if (conductor[0].dataValues && conductor[0].dataValues.id)
            //         return callback({
            //             en: 1,
            //             id: conductor[0].dataValues.id
            //         })
            // return callback({
            //     en: -1,
            //     id: 0
            // })
        })
        .catch(error => {
            console.log(error)
            callback({
                en: -1
            })
        })
}
