// routes to webpages
var htmlRoutes = function (app, bodyParser, path) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  // route to home
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/home.html'));
  });

  // route to survey
  app.get('/survey', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/survey.html'));
  });
};

// exports file for use in server.js
module.exports = htmlRoutes;
