/**
 * Largely ignore this. Its just a cobbled together express server to serve it on Heroku.
 * Its just the bulk of the express boilerplate to get it up.
 */
require('dotenv').load();

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = express.Router();
const api = require('./src/api/routes/api');
const http = require('http');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/dist')));

// Routes
app.get('/', (req, res, next) => {
	res.redirect('/app').end();
});

app.use('/app', (req, res, next) => {
	process.stdout.write('\n--- Hitting ALL route. Method: ' + req.method + ', Path: ' + req.path + ' ---\n');
	res.sendFile(path.join(__dirname+'/dist/index.html'));
});

app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	process.stderr.write('--- ERROR ---');
	process.stderr.write(err);
	next(err);
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	process.stderr.write('--- ERR HANDLER ---');
	process.stderr.write(err)
	// render the error page
	res.status(err.status || 500);
});

app.set('port', process.env.PORT || 3000);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

server.listen(app.get('port'), () => {
	process.stdout.write('--- App is running, server is listening on port ' + app.get('port') + ' ---\n');
});
server.on('error', onError);

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = `Port ${process.env.PORT || 3000}`;

	// handle specific listen errors with friendly messages
	switch (error.code) {
	case 'EACCES':
		process.stderr.write(bind + ' requires elevated privileges');
		process.exit(1);
		break;
	case 'EADDRINUSE':
		process.stderr.write(bind + ' is already in use');
		process.exit(1);
		break;
	default:
		throw error;
	}
}

module.exports = app;