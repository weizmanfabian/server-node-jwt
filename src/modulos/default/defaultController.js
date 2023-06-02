import { create, deleteByKey, findAll, findByKey, update } from '../../DB/mysql.js'
import { error, success } from '../../red/response.js';

export const findAllDefault = (req, res) => findAll(req.params.table)
    .then((rows) => success(req, res, rows))
    .catch((err) => error(req, res, `${err}`, 500));

export const findByKeyDefault = (req, res) => findByKey(req.params.table, req.params.key, req.params.value)
    .then((rows) => success(req, res, rows))
    .catch((err) => error(req, res, `${err}`, 500));

export const createDefault = (req, res) => create(req.params.table, req.params.key, req.body)
    .then((rows) => success(req, res, rows))
    .catch((err) => error(req, res, `${err}`, 500));

export const deleteDefault = (req, res) => deleteByKey(req.params.table, req.params.key, req.params.value)
    .then((rows) => success(req, res, rows))
    .catch(({ msg, status }) => error(req, res, msg, status));

export const updateDefault = (req, res) => update(req.params.table, req.params.key, req.params.value, req.body)
    .then((rows) => success(req, res, rows))
    .catch(({ msg, status }) => error(req, res, msg, status));