const router = require('express').Router();

router.get('/', (req, res, next) => {
    return res.status(200).send('woot').end();
});

router.post('/search', (req, res, next) => {
    console.log('SEARCH',req.body)
    return res.status(200).send(JSON.stringify({data: 'working'})).end();
});

module.exports = router;