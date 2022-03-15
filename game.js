var buttonColor = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started=0;
var level1=0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level" + level1);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
});

function nextSequence() {
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
