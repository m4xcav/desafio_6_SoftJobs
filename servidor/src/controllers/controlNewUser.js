const db = require('../database/dbindex');
const { newusers } = require('../database/querys/queryindex');

const nuevoUsuario = async (req, res) =>{
const {email, password, rol, lenguage, passwordHash} = req.user
try {
    switch (true) {
        case !req.user:
            res.status(400).json({
                status: 'Bad request',
                msg: 'Body is required',
            });
            break;

        case !email || !password || !rol || !lenguage || !passwordHash:
            res.status(400).json({
                status: 'Bad request',
                msg: 'All fields are required',
            });
            break;

        default:
            const values = [email, passwordHash, rol, lenguage];

            const { rowCount, rows } = await db.query(newusers, values);

            if (rowCount) {
                res.status(200).json({
                    msg: 'user created success!!',
                    dataCount: rowCount,
                    data: rows,
                });
            } else {
                res.status(400).json({
                    msg: 'user is not created',
                });
            }
            break;
    }
} catch (error) {
    res.status(400).json({
        status: 'Bad request',
        msg: error,
    });
}
};

module.exports = {
    nuevoUsuario,
};