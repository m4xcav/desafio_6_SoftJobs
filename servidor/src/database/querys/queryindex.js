const selectUser = `SELECT * FROM usuarios WHERE email = $1`;
const newusers = `INSERT INTO usuarios (email, password, rol, lenguage)
VALUES ($1, $2, $3, $4)`;
module.exports = {
	selectUser,
	newusers,
};