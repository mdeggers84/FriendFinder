// get route /api/friends
// post route /api/friends for incoming survey results
var apiRoutes = function (app, bodyParser) {
  var userArr = [{
    name: 'Sloth',
    photo: 'https://media.giphy.com/media/3NtY188QaxDdC/giphy.gif',
    scores: [1, 3, 5, 2, 4, 4, 2, 3, 1, 1]
  }];

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  app.get('/api/friends', function (req, res) {
    return res.json(userArr);
  });

  app.post('/api/friends', function (req, res) {
    var newUser = req.body;
    userArr.push(newUser);
  });
};

module.exports = apiRoutes;
