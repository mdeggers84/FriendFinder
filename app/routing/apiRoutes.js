// get route /api/friends
// post route /api/friends for incoming survey results
var fs = require('fs');
var apiRoutes = function (app, bodyParser) {
  // default users for testing

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  // // displays current list of json objects
  // app.get('/api/friends', function (req, res) {
  //   return res.json(userArr);
  // });

  // // pushes new user content to arr
  // app.post('/api/friends', function (req, res) {
  //   var newUser = req.body;
  //   userArr.push(newUser);
  // });
    // displays current list of json objects
  app.get('/api/friends', function (req, res) {
    var userArr = JSON.parse(fs.readFileSync('app/data/users.json', 'utf8'));
    return res.json(userArr);
  });

  // pushes new user content to arr
  app.post('/api/friends', function (req, res) {
    var newUser = req.body;
    var userArr = JSON.parse(fs.readFileSync('app/data/users.json', 'utf8'));

    userArr.push(newUser);
    fs.writeFileSync('app/data/users.json', JSON.stringify(userArr));
    res.json(newUser);
  });
};

// exports file for us in server.js
module.exports = apiRoutes;
