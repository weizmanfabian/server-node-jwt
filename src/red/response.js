export const success = (req, res, msg = '', status = 200) => {
    res.status(status).send({
        err: false,
        status: status,
        body: msg
    })
}

export const error = (req, res, msg = 'Error interno', status = 500) => {
    res.status(status).send({
        err: true,
        status: status,
        body: msg
    })
}