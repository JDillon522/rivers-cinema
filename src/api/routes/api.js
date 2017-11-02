const router = require('express').Router();
const request = require('request');

router.get('/', (req, res, next) => {
    return res.status(200).send('woot').end();
});

router.post('/search', (req, res, next) => {
    const search = req.body.search;

    if (search.length) {
        request.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${search}`, (error, response, body) => {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(body).end();
        });
    } else {
        return res.status(200).send({}).end();
    }
});

router.post('/movieData', (req, res, next) => {
    const id = req.body.id;

    if (id.length) {
        request.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${id}`, (error, response, body) => {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(body).end();
        });
    } else {
        return res.status(200).send({}).end();
    }
});

module.exports = router;

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=2d37af8b
// Poster API: http://img.omdbapi.com/?i=tt3896198&h=600&apikey=2d37af8b
