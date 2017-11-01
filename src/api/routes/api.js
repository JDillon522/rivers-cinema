const router = require('express').Router();

router.get('/', (req, res, next) => {
    console.log('woot');
    return res.status(200).send('woot').end();
});

module.exports = router;