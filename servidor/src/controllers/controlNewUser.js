const db = require('../database/dbindex');
const format = require('pg-format');
const { Newuser } = require('../database/querys/queryindex');

const nuevoUsuario = async(req, res) =>{
const {email, password, rol, lenguage} = req.body

};

module.exports = {
    nuevoUsuario,
};