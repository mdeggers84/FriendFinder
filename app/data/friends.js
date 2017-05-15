$(document).ready(function () {
  function getMatch(user, arr) {
    var bestScore = 41;
    var currScore = 0;
    var match;

    for (var i = 0; i < arr.length; i++) {
      if (user.name !== arr[i].name) {
        currScore = 0;
        for (var j = 0; j < arr[i].scores.length; j++) {
          currScore += Math.abs(user.scores[j] - arr[i].scores[j]);
        }
        if (currScore < bestScore) {
          bestScore = currScore;
          match = arr[i];
        }
      }
    }

    $('#match').empty();
    $('#match').append(
          '<h1>' + match.name + '</h1>' +
          '<img src="' + match.photo + '" class="img-responsive" alt="' + match.name + '">'
        );
    $('#match-modal').modal('show');
  }

  $('#submit-btn').on('click', function (event) {
    event.preventDefault();

    var newUser = {
      name: $('#name').val().trim(),
      photo: $('#photo').val().trim(),
      scores: []
    };

    for (var i = 1; i <= 10; i++) {
      newUser.scores.push($('#question' + i).val());
    }

    $.post('/api/friends', newUser)
        .done(function (data) {
          console.log(data);
        });

    $.get('/api/friends', function (req, res) {
      getMatch(newUser, req);
    });
  });

  writeQuestions();
});
