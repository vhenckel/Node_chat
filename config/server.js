/* importar o módulo do express */
var express = require('express');

/* importar módulo consign */
var consign = require('consign');

/* importar módulo body-parser */
var bodyParser = require('body-parser');

/* importar módulo express validaotr */
var expressValidator = require('express-validator');

/* iniciar objeto express */
var app = express();

/* configurar o EJS como engine de view */ 
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar middleware express.static */
app.use(express.static('./app/public'));

/* configurar middleware body-parser */
app.use(bodyParser.urlencoded({extended : true}));

/* configurar middleware express-validator */
app.use(expressValidator());

consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* exportar o objeto app*/
module.exports = app;