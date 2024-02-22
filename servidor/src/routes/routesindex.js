const router = require('express').Router();
const rutassoftjobs = require('./rutas/rutassoftjobs');

router.use('/softjobs', rutassoftjobs);

module.exports = router;