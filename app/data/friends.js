$(document).ready(function () {
  // clears form after successfully finding a match
  function clearForm() {
    $('#name').val('');
    $('#photo').val('');
    for (var i = 1; i <= 10; i++) {
      $('#question' + i).val('');
    }
  }
  // takes current user data and compares with stored users
  function getMatch(user, arr) {
    var bestScore = 41;
    var currScore = 0;
    var match;

    // ensures user isn't matched to himself/herself
    // then proceeds to match logic.
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

    // clears and then posts user match to modal
    $('#match').empty();
    $('#match').append(
          '<h1>' + match.name + '</h1>' +
          '<img src="' + match.photo + '" class="img-responsive" alt="' + match.name + '">'
        );
    $('#match-modal').modal('show');

    clearForm();
  }

  // ensures user has input in all fields
  function validate() {
    var validated = true;

    if ($('#name').val().trim() === '' || $('#photo').val().trim() === '') {
      validated = false;
    }
    for (var i = 1; i <= 10; i++) {
      if ($('#question' + i).val() === null) {
        validated = false;
      }
    }
    return validated;
  }

  // on click even to process user submitted info
  $('#submit-btn').on('click', function (event) {
    event.preventDefault();

    if (validate()) {
       // creates newUser obj
      var newUser = {
        name: $('#name').val().trim(),
        photo: $('#photo').val().trim(),
        scores: []
      };

    // pushes scores to arr in newUser
      for (var i = 1; i <= 10; i++) {
        newUser.scores.push($('#question' + i).val());
      }

    // posts newUser to friends api
      $.post('/api/friends', newUser)
        .done(function (data) {
          console.log(data);
        });

    // retrieves friends api in order to find a match
    // then calls the getMatch function
      $.get('/api/friends', function (req, res) {
        console.log(req);
        getMatch(newUser, req);
      });
    } else {
      alert('Please enter information into all fields!');
    }
  });
});
