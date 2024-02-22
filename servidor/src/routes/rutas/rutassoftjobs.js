const router = require('express').Router();
const {
	controlNewUser,
	ctrlPostLogin,
	ctrlgettUser,
} = require('../../controllers/ctrlindex');
const{ 
	autenticación,
	registrarUser,
	loginUser,
} = require('../../middlewares/middlewares');
const { controlNewUser } = controlNewUser;
const { ctrlPostLogin } = ctrlPostLogin;
const { ctrlgettUser } = ctrlgettUser; 
router.post('/usuarios', registrarUser, controlNewUser);
router.post('/login', loginUser, ctrlPostLogin);
router.get('/usuarios', autenticación, ctrlgettUser);

module.exports = router;