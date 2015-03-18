var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var swig = require('swig');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');

var models = require('./models')
var routes = require('./routes')

var app = express();

// view engine
app.engine('html', swig.renderFile);

app.set('views', path.join(__dirname + 'views'));
app.set('view engine', 'html');
app.set('view cahce', false);


// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false }));

app.use(sassMiddleware({
	src: path.join(__dirname + 'assets'),
	dest: path.join(__dirname + 'public'),
	debug: true
}))


app.use('/bower_components', express.static(path.join(__dirname + '/bower_components')))
app.use(express.static(path.join(__dirname + 'public')));


app.use('/', routes);

// middleware - error logging
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(function(req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		error: err
	});
});


var port = 3000;
app.listen(port, function () {
	console.log("The server is listening on port ", port);
});


