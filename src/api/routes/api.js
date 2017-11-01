const router = require('express').Router();

router.get('/', (req, res, next) => {
    return res.status(200).send('woot').end();
});

module.exports = router;