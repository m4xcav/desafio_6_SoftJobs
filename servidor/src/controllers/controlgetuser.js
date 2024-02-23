const db = require('../database/dbindex');
const { selectUser } = require('../database/querys/queryindex');

const getUsuario = async(req, res) =>{
    const {email} = req.params
    const mail = req.email
 try {
    const { rowCount, rows } = await db.query(selectUser, [mail]);
    if (rowCount) {
        const data = rows[0];
        const user = {
            id: data.id,
            email: data.email,
            lenguage: data.lenguage,
            rol: data.rol,
        };
        res.status(200).json(user);
    } else {
        res.status(200).json({
            msg: 'No data found',
        });
    } 
} catch (error) {
    res.status(400).send({
        status: 'Bad request',
        msg: error,
    });
}
};

module.exports = {
    getUsuario,
};