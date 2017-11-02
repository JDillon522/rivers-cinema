const router = require('express').Router();
const request = require('request');

router.get('/', (req, res, next) => {
    return res.status(200).send('woot').end();
});

router.post('/search', (req, res, next) => {
    const search = req.body;

    request.get('http://www.omdbapi.com/?i=tt3896198&apikey=2d37af8b', (error, response, body) => {
        return res.status(200).send(body).end();
    })

});

module.exports = router;

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=2d37af8b
// Poster API: http://img.omdbapi.com/?i=tt3896198&h=600&apikey=2d37af8b
