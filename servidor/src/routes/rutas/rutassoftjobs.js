const router = require('express').Router();
const {
	controlNewUser,
	controllogin,
	controlgetuser,
} = require('../../controllers/ctrlindex');
const{ 
	autenticación,
	registrarUser,
	loginUser,
} = require('../../middlewares/middlewares');
const { nuevoUsuario } = controlNewUser;
const { login } = controllogin;
const { getUsuario } = controlgetuser; 
router.post('/usuarios', registrarUser, nuevoUsuario);
router.post('/login', loginUser, login);
router.get('/usuarios', autenticación, getUsuario);

module.exports = router;