const router = require('express').Router();
const {
	ctrlGetJoyas,
	ctrlGetFiltros,
	ctrlGetjoyaId,
} = require('../../controllers/ctrlindex');
const { getTodoJoyas } = ctrlGetJoyas;
const { getJoyasFiltro } = ctrlGetFiltros;
const { getjoyaid } = ctrlGetjoyaId; 
router.get('/', getTodoJoyas);
router.get('/joya/:id', getjoyaid);
router.get('/filtros', getJoyasFiltro);

module.exports = router;