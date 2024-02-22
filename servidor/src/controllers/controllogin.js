const db = require('../database/dbindex');
const format = require('pg-format');
const { selectUser } = require('../database/querys/queryindex');

const login = async(req, res) =>{
const {email, password} = req.body

};

module.exports = {
    login,
};