// enables node modules
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

// enables use of other js files
require('./app/routing/htmlRoutes.js')(app, bodyParser, path);
require('./app/routing/apiRoutes.js')(app, bodyParser);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// tells server where to find files for use
app.use(express.static(path.join(__dirname, 'app')));

// tells server to listen for access
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});
