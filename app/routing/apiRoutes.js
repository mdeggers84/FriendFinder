// get route /api/friends
// post route /api/friends for incoming survey results
var apiRoutes = function (app, bodyParser) {
  // default users for testing
  var userArr = [
    {
      name: 'Sloth',
      photo: 'https://media.giphy.com/media/3NtY188QaxDdC/giphy.gif',
      scores: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    {
      name: 'Bugs Bunny',
      photo: 'https://s-media-cache-ak0.pinimg.com/736x/69/81/3c/69813c795d54ad2065b4a058592ce7ad.jpg',
      scores: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
    },
    {
      name: 'Bigby',
      photo: 'http://i6.lisimg.com/6044876/411full.jpg',
      scores: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    }
  ];

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  // displays current list of json objects
  app.get('/api/friends', function (req, res) {
    return res.json(userArr);
  });

  // pushes new user content to arr
  app.post('/api/friends', function (req, res) {
    var newUser = req.body;
    userArr.push(newUser);
  });
};

// exports file for us in server.js
module.exports = apiRoutes;
