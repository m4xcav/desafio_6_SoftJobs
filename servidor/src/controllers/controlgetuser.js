const db = require('../database/dbindex');
const { selectUser } = require('../database/querys/queryindex');

const getUsuario = async(req, res) =>{
    const {email} = req.body
 try {
    const { rowCount, rows } = await db.query(selectUser, [email]);
    if (rowCount) {
        res.status(200).json({
            msg: 'Data fetch successfuly',
            dataCount: rowCount,
            data: rows,
        });
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