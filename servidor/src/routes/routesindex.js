const router = require('express').Router();
const rutassoftjobs = require('./rutas/rutassoftjobs');

router.use('/', rutassoftjobs);

module.exports = router;