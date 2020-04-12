
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  if (started) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  }
});

function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour)
    .addClass("pressed")
    .delay(100)
    .queue(function(next) {
      $(this).removeClass('pressed');
      next();
    })
}

function checkAnswer(currentLevel) {
  var user = userClickedPattern[currentLevel];
  var game = gamePattern[currentLevel];

  if (user === game) {
    console.log("success, user logged " + user + " game logged " + game + " !");
    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  } else {
    console.log("failure, user logged " + user + " game logged " + game + " !");
    $("body")
      .addClass("game-over")
      .delay(100)
      .queue(function(next) {
        $(this).removeClass('game-over');
        next();
      })

    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");

    startOver();
  }
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}
