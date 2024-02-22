const router = require('express').Router();
const joyasRouter = require('./rutasJoyas/rutasJoyas');

router.use('/joyas', joyasRouter);

module.exports = router;