var buttonColor = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = 0;
var level1 = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level" + level1);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {
  userClickedPattern = [];

  level1++;
  $("#level-title").text("Level" + level1);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColor[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel1) {
  if (gamePattern[currentLevel1] === userClickedPattern[currentLevel1]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 400);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level1=0;
  gamePattern=[];
  started=false;
}
